import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

interface RequstBody {
  title: string;
  questions: string[];
}

interface DeleteParam {
  id: number;
}

interface DeleteInfo {
  params: DeleteParam;
}

/*
 * プリセットを登録する
 * */
export async function DELETE(req: Request, { params }: DeleteInfo) {
  const { id } = params;
  const data = await prisma.questionList.delete({
    data: {
      id,
    },
  });

  return Response.json({ data });
}
