import {
  describe,
  it,
  expect,
  beforeEach,
  afterEach,
} from '@jest/globals';
import { PrismaClient } from '@prisma/client';
import { POST } from './route';

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

    await POST(req);

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
