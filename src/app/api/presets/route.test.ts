import { describe, it, expect, beforeEach, afterEach } from '@jest/globals';
import { PrismaClient } from '@prisma/client';
import { GET, POST } from './route';

describe('QuestionList API テスト', () => {
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
  it('QuestionListを取得する', async () => {
    const testData = {
      title: 'Test List',
      questions: ['Question 1', 'Question 2'],
    };

    const qaRec = await prisma.questionList.create({
      data: {
        title: testData.title,
      },
    });
    for (const name of testData.questions) {
      await prisma.question.create({
        data: {
          name,
          questionListId: qaRec.id,
        },
      });
    }

    const req = new Request('http://localhost:3000/api/presets');

    await GET(req);

    // DBに実際に保存されたかを確認
    const savedList = await prisma.questionList.findFirst({
      where: { title: testData.title },
      include: { questionList: true },
    });

    expect(savedList).toBeDefined();
    expect(savedList?.title).toBe(testData.title);
    expect(savedList?.questionList).toHaveLength(testData.questions.length);
  });

  it('QuestionListを作成する', async () => {
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
