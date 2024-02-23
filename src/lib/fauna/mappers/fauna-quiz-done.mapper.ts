import { QuizDone } from '@/interfaces/quiz-done';
import { RawQuizDone } from '../config';

export class FaunaQuizDoneMapper {
  public static toDomain(raw: RawQuizDone): QuizDone {
    return {
      id: raw.id,
      title: raw.title,
      thumbnailURL: raw.thumbnail_url,
      category: raw.category,
      quizId: raw.quiz_id,
      userId: raw.user_id,
      createdAt: raw.ts.isoString,
    };
  }
}
