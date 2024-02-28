import { QuizCategory } from '@/enums/quiz-category';

export interface FindQuizzesDoneParams {
  userId: string;
  filters?: {
    category?: keyof typeof QuizCategory;
  };
  orderBy?: {
    timestamp?: 'asc' | 'desc';
  };
}
