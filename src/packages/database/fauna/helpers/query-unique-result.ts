import type { QueryValue } from 'fauna';

export type QueryUniqueResult<T> = QueryValue & T;
