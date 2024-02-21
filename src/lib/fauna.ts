import { Client, fql, QueryValue } from 'fauna';

const fauna = new Client({
  secret: process.env.FAUNA_SECRET,
});

type QueryResult<T> = QueryValue & Array<T>;

export { fauna, fql };
export type { QueryResult };
