import { QuizCategory } from '@/enums/quiz-category';

export interface Quiz {
  id: string;
  title: string;
  thumbnailURL: string;
  category: keyof typeof QuizCategory;
  questions: Question[];
  createdAt: string;
}

export interface Question {
  title: string;
  answers: Answer[];
  correct: string;
}

export interface Answer {
  id: string;
  text: string;
}
