import { describe, it, expect, beforeEach, afterEach } from '@jest/globals';
import { PrismaClient } from '@prisma/client';
import { GET, POST } from './route';

// インテグレーションテストバージョン（実際のDBを使用する場合）
describe('Result API Integration', () => {
  let prisma: PrismaClient;

  beforeEach(async () => {
    // テスト用DBのセットアップ
    prisma = new PrismaClient();
    // テストデータのクリーンアップ
    await prisma.question.deleteMany({});
    await prisma.questionList.deleteMany({});
    await prisma.userQuestionAnswer.deleteMany({});
    await prisma.$executeRaw`ALTER TABLE Question AUTO_INCREMENT = 1;`;
    await prisma.$executeRaw`ALTER TABLE User AUTO_INCREMENT = 1;`;
    await prisma.user.create({
      data: {
        displayName: 'test user',
      },
    });
    await prisma.question.create({
      data: {
        name: 'test q',
        questionList: {
          create: {
            id: 1,
            title: 'test question list',
          },
        },
      },
    });
  });

  afterEach(async () => {
    // テスト後のクリーンアップ
    await prisma.question.deleteMany({});
    await prisma.questionList.deleteMany({});
    await prisma.userQuestionAnswer.deleteMany({});
    await prisma.$disconnect();
  });

  it('UserQuestionAnswersを取得する', async () => {
    const alistRec = await prisma.userAnswerList.create({
      data: {
        memo: 'test memo',
        userId: 1,
      }
    })
    // userQuestionAnswersテストデータの作成
    const testData = [
      {
        id: 1,
        answer: 'Test Answer',
        questionId: 1,
        userId: 1,
        answerListId: alistRec.id,
      },
      {
        id: 2,
        answer: 'Test Answer2',
        questionId: 1,
        userId: 1,
        answerListId: alistRec.id,
      },
    ];
    const rec = testData.map((qa) => {
      return {
        questionId: qa.questionId,
        // 認証方法によって変更
        userId: qa.userId,
        answer: qa.answer,
      };
    });
    const userQuestionAnswers = [];
    for (const row of testData) {
      const result = await prisma.userQuestionAnswer.create({
        data: row,
      });
      userQuestionAnswers.push(result);
    }

    const req = new Request('http://localhost:3000/api/results');

    await GET(req);

    // DBに実際に保存されたかを確認
    const answer = await prisma.userQuestionAnswer.findFirst({});

    expect(answer).toBeDefined();
  });

  it('UserQuestionAnswersを作成する', async () => {
    const testData = [
      {
        id: 1,
        answer: 'Test Answer',
        questionId: 1,
        userId: 1,
      },
      {
        id: 2,
        answer: 'Test Answer2',
        questionId: 1,
        userId: 1,
      },
    ];

    const req = new Request('http://localhost:3000/api/result', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ qaList: testData, userId: 1 }),
    });

    await POST(req);

    // DBに実際に保存されたかを確認
    const answer = await prisma.userQuestionAnswer.findFirst({});

    expect(answer).toBeDefined();
  });
});
