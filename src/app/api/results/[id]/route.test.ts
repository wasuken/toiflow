import { PrismaClient } from '@prisma/client';
import { DELETE } from './route';

describe('DELETE API Route', () => {
  let prisma: PrismaClient;

  beforeEach(async () => {
    // テスト用DBのセットアップ
    prisma = new PrismaClient();
    // テストデータのクリーンアップ
    await prisma.question.deleteMany({});
    await prisma.questionList.deleteMany({});
    await prisma.user.deleteMany({});
    await prisma.userQuestionAnswer.deleteMany({});
    await prisma.userQuestionList.deleteMany({});
    await prisma.$executeRaw`ALTER TABLE QuestionList AUTO_INCREMENT = 1;`;
    await prisma.$executeRaw`ALTER TABLE Question AUTO_INCREMENT = 1;`;
    await prisma.$executeRaw`ALTER TABLE User AUTO_INCREMENT = 1;`;
    await prisma.$executeRaw`ALTER TABLE UserQuestionAnswer AUTO_INCREMENT = 1;`;
    await prisma.$executeRaw`ALTER TABLE UserQuestionList AUTO_INCREMENT = 1;`;
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

  it('正常に削除できること', async () => {
    // テストデータを挿入
    const testData = {
      memo: 'test memo',
      userId: 1,
    }
    const testDataAL = [
        {
          id: 1,
          answer: 'Test Answer',
          questionId: 1,
        },
        {
          id: 2,
          answer: 'Test Answer2',
          questionId: 2,
        },
      ]
    const alistRec = await prisma.userAnswerList.create({
      data: testData,
    })
    for(const rec of testDataAL){
      await prisma.userQuestionAnswer.create({
        data: rec,
      });
    }

    const req = new Request('http://localhost:3000/api/results/1', {
      method: 'DELETE',
    });

    const response = await DELETE(req, { params: { id: 1 } });

    // レスポンスの検証
    expect(response.status).toBe(200);
    const answer = await prisma.userQuestionAnswer.findFirst({
      where: {
        id: 1,
      },
    });

    expect(answer).toBeNull();
  });
});
