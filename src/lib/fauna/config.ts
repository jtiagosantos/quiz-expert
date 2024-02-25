import { QuizCategory } from '@/enums/quiz-category';
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

type RawQuiz = {
  id: string;
  title: string;
  thumbnail_url: string;
  category: keyof typeof QuizCategory;
  times_played: number;
  questions: Array<RawQuestion>;
  ts: {
    isoString: string;
  };
};

type RawQuestion = {
  title: string;
  answers: Array<RawAnswer>;
  correct: string;
};

type RawAnswer = {
  id: string;
  text: string;
};

type RawQuizDone = {
  id: string;
  title: string;
  thumbnail_url: string;
  category: keyof typeof QuizCategory;
  quiz_id: string;
  user_id: string;
  ts: {
    isoString: string;
  };
};

export { fauna, fql };
export type { QueryManyResult, QueryUniqueResult, RawUser, RawQuiz, RawQuizDone };
