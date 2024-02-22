import { NextResponse } from 'next/server';
import { fauna, fql, QueryManyResult, RawQuiz } from '@/lib/fauna/config';
import { FaunaQuizMapper } from '@/lib/fauna/mappers/fauna-quiz.mapper';

export const GET = async () => {
  try {
    const {
      data: { data: rawQuizzes },
    } = await fauna.query<{ data: QueryManyResult<RawQuiz> }>(fql`quizzes.all().order(desc(.ts))`);

    const quizzes = rawQuizzes.map((rawQuiz) => FaunaQuizMapper.toDomain(rawQuiz));

    return NextResponse.json(quizzes);
  } catch (error) {
    return NextResponse.json(error, { status: 500 });
  }
};
