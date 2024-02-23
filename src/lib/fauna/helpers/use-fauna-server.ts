import { currentUser } from '@clerk/nextjs';
import { fauna, fql, QueryManyResult, RawUser } from '../config';
import { FaunaUserMapper } from '../mappers/fauna-user.mapper';

export const useFaunaServer = async () => {
  const clerkUser = await currentUser();

  const getFaunaUser = async () => {
    const {
      data: {
        data: [rawUser],
      },
    } = await fauna.query<{ data: QueryManyResult<RawUser> }>(
      fql`users.byEmail(${clerkUser?.emailAddresses[0].emailAddress as string})`,
    );

    const user = FaunaUserMapper.toDomain(rawUser);

    return user;
  };

  return {
    getFaunaUser,
  };
};
