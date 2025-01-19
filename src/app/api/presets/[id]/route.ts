import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

interface DeleteParam {
  id: number;
}

interface DeleteInfo {
  params: DeleteParam;
}

export async function DELETE(req: Request, { params }: DeleteInfo) {
  try {
    const id = Number(await params.id);
    
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

    return Response.json({ data });
    
  } catch (error) {
    return Response.json(
      { error: `${error}`},
      { status: 500 }
    );
  }
}

export async function GET(req: Request, { params }: DeleteInfo) {
  const { id } = await params;
  const data = await prisma.questionList.findFirst({
    where: {
      id,
    },
  });

  return Response.json({ data });
}
