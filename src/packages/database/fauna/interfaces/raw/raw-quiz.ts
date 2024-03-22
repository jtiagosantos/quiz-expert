import { QuizCategory } from '@/enums/quiz-category';
import type { RawQuestion } from './raw-question';

export interface RawQuiz {
  id: string;
  title: string;
  thumbnail_url: string;
  category: keyof typeof QuizCategory;
  times_played: number;
  questions: Array<RawQuestion>;
  ts: {
    isoString: string;
  };
}
