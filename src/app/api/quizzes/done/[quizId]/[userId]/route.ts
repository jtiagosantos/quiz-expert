import { NextRequest, NextResponse } from 'next/server';
import { fauna, fql, QueryManyResult, QueryUniqueResult, RawQuiz } from '@/lib/fauna/config';

interface Context {
  params: {
    quizId: string;
    userId: string;
  };
}

export const GET = async (_: NextRequest, context: Context) => {
  try {
    const { quizId, userId } = context.params;

    const {
      data: {
        data: [quizDone],
      },
    } = await fauna.query<{ data: QueryManyResult<Record<string, string> | null> }>(
      fql`quizzes_done.byUserId(${userId}).where(.quizId == ${quizId})`,
    );

    if (!quizDone) {
      const { data: quiz } = await fauna.query<QueryUniqueResult<RawQuiz>>(
        fql`quizzes.byId(${quizId})`,
      );

      await fauna.query(
        fql`quizzes_done.create({
          title: ${quiz.title},
          thumbnail_url: ${quiz.thumbnail_url},
          category: ${quiz.category},
          quiz_id: ${quizId},
          user_id: ${userId}
        })`,
      );
    }

    return NextResponse.json({});
  } catch (error) {
    return NextResponse.json(error, { status: 500 });
  }
};
