import { NextResponse } from 'next/server';
import { fauna, fql, QueryResult } from '@/lib/fauna';
import { Quiz } from '@/interfaces/quiz';

export const GET = async () => {
  try {
    const {
      data: { data },
    } = await fauna.query<{ data: QueryResult<Quiz> }>(fql`quizzes.all()`);

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(error, { status: 500 });
  }
};
