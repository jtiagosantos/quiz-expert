import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { fauna, fql, QueryManyResults } from '@/packages/database';

const bodySchema = z.object({
  type: z.enum(['user.created']),
  data: z.object({
    id: z.string(),
    first_name: z.string(),
    last_name: z.string(),
    image_url: z.string(),
    email_addresses: z.array(
      z.object({
        email_address: z.string(),
      }),
    ),
  }),
});

export const POST = async (request: NextRequest) => {
  const body = await request.json();

  const { type, data } = bodySchema.parse(body);

  switch (type) {
    case 'user.created': {
      const [{ email_address: userEmail }] = data.email_addresses;

      const {
        data: {
          data: [userByEmailResult],
        },
      } = await fauna.query<{ data: QueryManyResults<Record<string, string> | null> }>(
        fql`users.byEmail(${userEmail})`,
      );

      const userDoesNotExist = !userByEmailResult;

      if (userDoesNotExist) {
        const user = {
          clerk_id: data.id,
          first_name: data.first_name,
          last_name: data.last_name,
          avatar_url: data.image_url,
          email: userEmail,
        };

        await fauna.query(fql`users.create(${user})`);
      }
    }
  }

  return NextResponse.json(null, { status: 200 });
};
