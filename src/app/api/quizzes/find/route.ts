import { NextRequest, NextResponse } from 'next/server';
import { fauna, fql, QueryManyResult, RawQuiz } from '@/lib/fauna/config';
import { FaunaQuizMapper } from '@/lib/fauna/mappers/fauna-quiz.mapper';

export const GET = async (request: NextRequest) => {
  try {
    const queryParams = request.nextUrl.searchParams;
    const category = queryParams.get('category');
    const orderByTimesPlayed = queryParams.get('times_played');

    let rawQuizzes: Array<RawQuiz> = [];
    let orderBy = 'order(desc(.ts))';

    if (orderByTimesPlayed === 'asc') {
      orderBy = 'order(asc(.times_played))';
    } else if (orderByTimesPlayed === 'desc') {
      orderBy = 'order(desc(.times_played))';
    }

    if (!category) {
      const {
        data: { data },
      } = await fauna.query<{ data: QueryManyResult<RawQuiz> }>(fql([`quizzes.all().${orderBy}`]));

      rawQuizzes = data;
    } else {
      const {
        data: { data },
      } = await fauna.query<{ data: QueryManyResult<RawQuiz> }>(
        fql([`quizzes.all().where(.category == '${category}').${orderBy}`]),
      );

      rawQuizzes = data;
    }

    const quizzes = rawQuizzes.map((rawQuiz) => FaunaQuizMapper.toDomain(rawQuiz));

    return NextResponse.json(quizzes);
  } catch (error) {
    return NextResponse.json(error, { status: 500 });
  }
};
