import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const prisma = new PrismaClient();

interface RequstBody {
  title: string;
  questions: string[];
}

/*
 * プリセットを登録する
 * */
export async function POST(req: NextRequest) {
  const reqData = await req.json();
  const { title, questions } = reqData;
  const qaList = await prisma.questionList.create({
    data: {
      title,
    },
  });
  console.log('kokomade')
  const qlist = [];
  for(const name of questions){
    const qdata = await prisma.question.create({
      data: {
        questionListId: qaList.id,
        name,
      }
    });
    qlist.push(qdata);
  }

  return NextResponse.json({ data: qlist }, { status: 200});
}
