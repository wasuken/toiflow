import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  // 本来なら認証情報からユーザーIDを引き出してWhereに入れる
  const data = await prisma.userQuestionAnswer.findMany({});
  return NextResponse.json({ data });
}

// 質問リストと対応する回答の配列がRequestBodyに乗せられる
export async function POST(req: NextRequest) {
  const params = await req.json();
  const data = params.qaList.map((qa) => {
    return {
      id: qa.id,
      questionId: qa.questionId,
      // 認証方法によって変更
      userId: params.userId,
      answer: qa.answer,
    };
  });
  const userQuestionAnswers = [];
  for (const row of data) {
    const result = await prisma.userQuestionAnswer.create({
      data: row,
    });
    userQuestionAnswers.push(result);
  }

  return NextResponse.json({ data: userQuestionAnswers });
}
