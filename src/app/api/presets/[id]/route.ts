import { PrismaClient } from '@prisma/client';
import { revalidateTag } from 'next/cache'

const prisma = new PrismaClient();

interface DeleteParam {
  id: number;
}

interface DeleteInfo {
  params: DeleteParam;
}

export async function DELETE(req: Request, { params }: DeleteInfo) {
  try {
    const id = Number(params.id);
    
    const data = await prisma.questionList.delete({
      where: {
        id,
      },
    });

    if (!data) {
      return Response.json(
        { error: 'Record not found' },
        { status: 404 }
      );
    }
    revalidateTag('preset');

    return Response.json({ data });
    
  } catch (error) {
    return Response.json(
      { error: `${error}`},
      { status: 500 }
    );
  }
}

export async function GET(req: Request, { params }: DeleteInfo) {
  const id = Number(params.id);
  const data = await prisma.questionList.findFirst({
    where: {
      id,
    },
  });

  return Response.json({ data });
}
