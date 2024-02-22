import { Quiz } from '@/interfaces/quiz';
import { RawQuiz } from '../config';

export class FaunaQuizMapper {
  public static toDomain(raw: RawQuiz): Quiz {
    return {
      id: raw.id,
      title: raw.title,
      thumbnailURL: raw.thumbnail_url,
      category: raw.category,
      questions: raw.questions,
      createdAt: raw.ts.isoString,
    };
  }
}