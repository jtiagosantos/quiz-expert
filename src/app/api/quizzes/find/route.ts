import { NextRequest, NextResponse } from 'next/server';
import { fauna, fql, QueryManyResult, RawQuiz } from '@/lib/fauna/config';
import { FaunaQuizMapper } from '@/lib/fauna/mappers/fauna-quiz.mapper';

export const GET = async (request: NextRequest) => {
  try {
    const queryParams = request.nextUrl.searchParams;
    const category = queryParams.get('category');

    let rawQuizzes: Array<RawQuiz> = [];

    if (!category) {
      const {
        data: { data },
      } = await fauna.query<{ data: QueryManyResult<RawQuiz> }>(
        fql`quizzes.all().order(desc(.ts))`,
      );

      rawQuizzes = data;
    } else {
      const {
        data: { data },
      } = await fauna.query<{ data: QueryManyResult<RawQuiz> }>(
        fql`quizzes.all().where(.category == ${category}).order(desc(.ts))`,
      );

      rawQuizzes = data;
    }

    const quizzes = rawQuizzes.map((rawQuiz) => FaunaQuizMapper.toDomain(rawQuiz));

    return NextResponse.json(quizzes);
  } catch (error) {
    return NextResponse.json(error, { status: 500 });
  }
};
