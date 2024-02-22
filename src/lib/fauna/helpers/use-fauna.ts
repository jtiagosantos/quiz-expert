import { useUser } from '@clerk/nextjs';
import { fauna, fql, QueryManyResult, RawUser } from '../config';
import { FaunaUserMapper } from '../mappers/fauna-user.mapper';

export const useFauna = () => {
  const { user: clerkUser } = useUser();

  const getFaunaUser = async () => {
    const {
      data: {
        data: [rawUser],
      },
    } = await fauna.query<{ data: QueryManyResult<RawUser> }>(
      fql`users.byEmail(${clerkUser?.primaryEmailAddress?.emailAddress as string})`,
    );

    const user = FaunaUserMapper.toDomain(rawUser);

    return user;
  };

  return {
    getFaunaUser,
  };
};
