import {
  describe,
  it,
  expect,
  beforeEach,
  afterEach,
  jest,
} from '@jest/globals';
import { PrismaClient, Prisma } from '@prisma/client';
import { NextRequest } from 'next/server';
import { POST } from './route';

interface Question {
  id: number;
  name: string;
}

interface QuestionList {
  id: number;
  title: string;
  questionList: Question[];
}

// モックPrismaClientを作成
jest.mock('@prisma/client', () => {
  return {
    PrismaClient: jest.fn().mockImplementation(() => ({
      questionList: {
        create: jest.fn<() => Promise<QuestionList>>().mockResolvedValue({
          id: 1,
          title: 'Test List',
          questionList: [
            { id: 1, name: 'Question 1' },
            { id: 2, name: 'Question 2' },
          ],
        }),
      },
    })),
  };
});

describe('Question List API', () => {
  let prisma: jest.Mocked<PrismaClient>;

  beforeEach(() => {
    // テストの前にモックをリセット
    jest.clearAllMocks();
  });

  it('should create a question list with questions', async () => {
    // テストデータ
    const testData = {
      title: 'Test List',
      questions: ['Question 1', 'Question 2'],
    };

    // リクエストオブジェクトの作成
    const req = new Request('http://localhost:3000/api/questionList', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(testData),
    });

    // APIハンドラーの実行
    const response = await POST(req);
    const responseData = await response.json();

    // レスポンスの検証
    expect(response.status).toBe(200);
    expect(responseData.data).toBeDefined();
    expect(responseData.data.title).toBe(testData.title);
  });
});

// インテグレーションテストバージョン（実際のDBを使用する場合）
describe('Question List API Integration', () => {
  let prisma: PrismaClient;

  beforeEach(async () => {
    // テスト用DBのセットアップ
    prisma = new PrismaClient();
    // テストデータのクリーンアップ
    await prisma.question.deleteMany({});
    await prisma.questionList.deleteMany({});
  });

  afterEach(async () => {
    // テスト後のクリーンアップ
    await prisma.question.deleteMany({});
    await prisma.questionList.deleteMany({});
    await prisma.$disconnect();
  });

  it('should create a question list in database', async () => {
    const testData = {
      title: 'Test List',
      questions: ['Question 1', 'Question 2'],
    };

    const req = new Request('http://localhost:3000/api/preset', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(testData),
    });

    const response = await POST(req);
    const responseData = await response.json();

    // DBに実際に保存されたかを確認
    const savedList = await prisma.questionList.findFirst({
      where: { title: testData.title },
      include: { questionList: true },
    });

    expect(savedList).toBeDefined();
    expect(savedList?.title).toBe(testData.title);
    expect(savedList?.questionList).toHaveLength(testData.questions.length);
  });
});
