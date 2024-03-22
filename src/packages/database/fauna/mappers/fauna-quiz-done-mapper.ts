import { QuizDone } from '@/interfaces/quiz-done';
import type { QuizDoneToDatabaseParams, RawQuizDone } from '@/packages/database';

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

  public static toDatabase(quizDone: QuizDoneToDatabaseParams): Omit<RawQuizDone, 'id' | 'ts'> {
    return {
      title: quizDone.title,
      thumbnail_url: quizDone.thumbnailURL,
      category: quizDone.category,
      quiz_id: quizDone.quizId,
      user_id: quizDone.userId,
    };
  }
}
