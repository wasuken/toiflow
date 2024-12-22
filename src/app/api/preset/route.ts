import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client"; 

const prisma = new PrismaClient();

interface RequstBody {
  title: string;
  questions: string[];
}

/*
 * プリセットを登録する
 * */
export async function POST(req: Request) {
  const {
    title, questions
  } =  await req.json() as RequstBody;
  const data = await prisma.questionList.create({
    data: {
      title,
      questionList: {
        create: questions.map((name) => {
          return {
            name
          }
        })
      }
    }
  });
 
  return Response.json({ data })
}
