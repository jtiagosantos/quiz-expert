import { NextRequest, NextResponse } from 'next/server';
import { fauna, fql, QueryManyResult } from '@/lib/fauna/config';
import { z } from 'zod';
import { Quiz } from '@/interfaces/quiz';

interface Context {
  params: {
    quizId: string;
  };
}

const quizSchema = z
  .object({
    id: z.string(),
    ts: z.object({
      isoString: z.string(),
    }),
    title: z.string(),
    thumbnailURL: z.string(),
    category: z.string(),
    questions: z.array(
      z.object({
        title: z.string(),
        answers: z.array(
          z.object({
            id: z.string(),
            text: z.string(),
          }),
        ),
        correct: z.string(),
      }),
    ),
  })
  .transform((data) => ({
    id: data.id,
    title: data.title,
    thumbnailURL: data.thumbnailURL,
    category: data.category,
    questions: data.questions,
    createdAt: data.ts.isoString,
  }));

export const GET = async (_: NextRequest, context: Context) => {
  try {
    const { quizId } = context.params;

    const {
      data: { data },
    } = await fauna.query<{ data: QueryManyResult<Quiz> }>(
      fql`quizzes.all().where(.id == ${quizId})`,
    );

    const [rawQuiz] = data;

    const quiz = quizSchema.parse(rawQuiz);

    return NextResponse.json(quiz);
  } catch (error) {
    return NextResponse.json(error, { status: 500 });
  }
};
