import type { Quiz } from '@/interfaces/quiz';
import type { RawQuiz } from '@/packages/database';

export class FaunaQuizMapper {
  public static toDomain(raw: RawQuiz): Quiz {
    return {
      id: raw.id,
      title: raw.title,
      thumbnailURL: raw.thumbnail_url,
      category: raw.category,
      timesPlayed: raw.times_played,
      questions: raw.questions,
      createdAt: raw.ts.isoString,
    };
  }
}
