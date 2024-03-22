import type { QueryValue } from 'fauna';

export type QueryManyResults<T> = QueryValue & Array<T>;
