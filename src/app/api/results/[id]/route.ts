import { PrismaClient } from '@prisma/client';
import { revalidateTag } from 'next/cache'

const prisma = new PrismaClient();

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
  const { id } = await params;
  const data = await prisma.userQuestionAnswer.delete({
    where: {
      id,
    },
  });
  revalidateTag('result');

  return Response.json({ data });
}
export async function GET(req: Request, { params }: DeleteInfo) {
  const { id } = await params;
  const data = await prisma.userQuestionAnswer.findFirst({
    where: {
      id,
    },
  });

  return Response.json({ data });
}
