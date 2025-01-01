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
    await prisma.$executeRaw`ALTER TABLE QuestionList AUTO_INCREMENT = 1;`;
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
    await prisma.$disconnect();
  });

  it('正常に削除できること', async () => {
    // モックの戻り値を設定
    const mockData = {
      id: 1,
      title: 'テストプリセット',
      questions: ['質問1', '質問2'],
    };

    const req = new Request('http://localhost:3000/api/presets/1', {
      method: 'DELETE',
    });

    const response = await DELETE(req, { params: { id: 1 } });

    // レスポンスの検証
    expect(response.status).toBe(200);
    const recs = await prisma.questionList.findFirst({
      where: {
        id: 1,
      },
    });
    expect(recs).toBeNull();
  });
});
