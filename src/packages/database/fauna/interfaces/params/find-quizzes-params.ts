import { QuizCategory } from '@/enums/quiz-category';

export interface FindQuizzesParams {
  filters?: {
    category?: keyof typeof QuizCategory;
  };
  orderBy?: {
    timesPlayed?: 'asc' | 'desc';
  };
}
