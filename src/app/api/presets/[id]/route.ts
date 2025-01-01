import { PrismaClient } from '@prisma/client';

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
  const { id } = params;
  const data = await prisma.questionList.delete({
    where: {
      id,
    },
  });

  return Response.json({ data });
}

export async function GET(req: Request, { params }: DeleteInfo) {
  const { id } = params;
  const data = await prisma.questionList.findFirst({
    where: {
      id,
    },
  });

  return Response.json({ data });
}
