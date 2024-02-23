import { NextRequest, NextResponse } from 'next/server';
import { fauna, fql, QueryManyResult, RawQuizDone } from '@/lib/fauna/config';
import { FaunaQuizDoneMapper } from '@/lib/fauna/mappers/fauna-quiz-done.mapper';

interface Context {
  params: {
    userId: string;
  };
}

export const GET = async (_: NextRequest, context: Context) => {
  try {
    const { userId } = context.params;

    const {
      data: { data: rawQuizzesDone },
    } = await fauna.query<{ data: QueryManyResult<RawQuizDone> }>(
      fql`quizzes_done.byUserId(${userId}).order(desc(.ts))`,
    );

    const quizzesDone = rawQuizzesDone.map((rawQuizDone) =>
      FaunaQuizDoneMapper.toDomain(rawQuizDone),
    );

    return NextResponse.json(quizzesDone);
  } catch (error) {
    return NextResponse.json(error, { status: 500 });
  }
};
