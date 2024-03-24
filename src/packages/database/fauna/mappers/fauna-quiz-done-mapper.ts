import { QuizDone } from '@/interfaces/quiz-done';
import type { QuizDoneToDatabaseParams, RawQuizDoneQuery, RawQuizDone } from '@/packages/database';

export class FaunaQuizDoneMapper {
  public static toDomain(raw: RawQuizDoneQuery): QuizDone {
    return {
      id: raw.id,
      title: raw.title,
      thumbnailURL: raw.thumbnail_url,
      category: raw.category,
    };
  }

  public static toDatabase(quizDone: QuizDoneToDatabaseParams): RawQuizDone {
    return {
      quiz_id: quizDone.quizId,
      user_id: quizDone.userId,
    };
  }
}
