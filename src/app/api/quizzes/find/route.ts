import { NextResponse } from 'next/server';
import { fauna, fql, QueryManyResult } from '@/lib/fauna/config';
import { Quiz } from '@/interfaces/quiz';

export const GET = async () => {
  try {
    const {
      data: { data },
    } = await fauna.query<{ data: QueryManyResult<Quiz> }>(fql`quizzes.all().order(desc(.ts))`);

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(error, { status: 500 });
  }
};
