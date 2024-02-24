import { NextRequest, NextResponse } from 'next/server';
import { fauna, fql, QueryUniqueResult, RawQuiz } from '@/lib/fauna/config';
import { FaunaQuizMapper } from '@/lib/fauna/mappers/fauna-quiz.mapper';

interface Context {
  params: {
    quizId: string;
  };
}

export const GET = async (_: NextRequest, context: Context) => {
  try {
    const { quizId } = context.params;

    const { data: rawQuiz } = await fauna.query<QueryUniqueResult<RawQuiz>>(
      fql`quizzes.byId(${quizId})`,
    );

    const quiz = FaunaQuizMapper.toDomain(rawQuiz);

    return NextResponse.json(quiz);
  } catch (error) {
    return NextResponse.json(error, { status: 500 });
  }
};
