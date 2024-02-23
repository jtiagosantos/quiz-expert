import { QuizCategory } from '@/enums/quiz-category';

export interface QuizDone {
  id: string;
  title: string;
  thumbnailURL: string;
  category: keyof typeof QuizCategory;
  quizId: string;
  userId: string;
  createdAt: string;
}
