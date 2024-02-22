import { Client, fql, QueryValue } from 'fauna';

const fauna = new Client({
  secret: process.env.NEXT_PUBLIC_FAUNA_SECRET,
});

type QueryManyResult<T> = QueryValue & Array<T>;

type QueryUniqueResult<T> = QueryValue & T;

type RawUser = {
  id: string;
  clerk_id: string;
  first_name: string;
  last_name: string;
  email: string;
  avatar_url: string;
  ts: {
    isoString: string;
  };
};

export { fauna, fql };
export type { QueryManyResult, QueryUniqueResult, RawUser };
