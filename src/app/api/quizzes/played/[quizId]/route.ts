import { NextRequest, NextResponse } from 'next/server';
import { fauna, fql } from '@/lib/fauna/config';
import { z } from 'zod';

interface Context {
  params: {
    quizId: string;
  };
}

const bodySchema = z.object({
  timesPlayed: z.number(),
});

export const PUT = async (request: NextRequest, context: Context) => {
  try {
    const { timesPlayed } = bodySchema.parse(await request.json());
    const { quizId } = context.params;

    await fauna.query(fql`quizzes.byId(${quizId})!.update(
      {
        times_played: ${timesPlayed}
      }
    )`);

    return NextResponse.json({});
  } catch (error) {
    return NextResponse.json(error, { status: 500 });
  }
};
