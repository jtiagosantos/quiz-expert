import { QuizCategory } from '@/enums/quiz-category';

export interface QuizDoneToDatabaseParams {
  title: string;
  thumbnailURL: string;
  category: keyof typeof QuizCategory;
  quizId: string;
  userId: string;
}
