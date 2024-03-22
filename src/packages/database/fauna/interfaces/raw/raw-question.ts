import type { RawAnswer } from './raw-answer';

export interface RawQuestion {
  title: string;
  answers: Array<RawAnswer>;
  correct: string;
}
