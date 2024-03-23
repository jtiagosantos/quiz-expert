import { QuizCategory } from '@/enums/quiz-category';

export interface RawQuizDoneQuery {
  id: string;
  title: string;
  thumbnail_url: string;
  category: keyof typeof QuizCategory;
}
