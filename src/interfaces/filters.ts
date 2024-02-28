import { QuizCategory } from '@/enums/quiz-category';

export type Filters = {
  category: null | undefined | keyof typeof QuizCategory;
};
