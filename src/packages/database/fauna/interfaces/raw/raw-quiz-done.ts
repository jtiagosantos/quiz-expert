import { QuizCategory } from '@/enums/quiz-category';

export interface RawQuizDone {
  id: string;
  title: string;
  thumbnail_url: string;
  category: keyof typeof QuizCategory;
  quiz_id: string;
  user_id: string;
  ts: {
    isoString: string;
  };
}
