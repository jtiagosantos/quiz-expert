import { Client, fql } from 'fauna';

const fauna = new Client({
  secret: process.env.FAUNA_SECRET,
});

type QueryResult<T> = Array<T>;

export { fauna, fql };
export type { QueryResult };
