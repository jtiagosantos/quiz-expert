import { useUser } from '@clerk/nextjs';
import {
  fauna,
  fql,
  QueryManyResult,
  QueryUniqueResult,
  RawQuiz,
  RawQuizDone,
  RawUser,
} from '../config';
import { FaunaUserMapper } from '../mappers/fauna-user.mapper';
import { FaunaQuizDoneMapper } from '../mappers/fauna-quiz-done.mapper';
import { SaveQuizAsDoneParams } from '../interfaces/save-quiz-as-done-params';
import { SaveQuizAsPlayedParams } from '../interfaces/save-quiz-as-played-params';
import { FindQuizzesDoneParams } from '../interfaces/find-quizzes-done-params';

export const useFaunaClient = () => {
  const { user: clerkUser } = useUser();

  const getFaunaUser = async () => {
    const {
      data: {
        data: [rawUser],
      },
    } = await fauna.query<{ data: QueryManyResult<RawUser> }>(
      fql`users.byEmail(${clerkUser?.primaryEmailAddress?.emailAddress as string})`,
    );

    const user = FaunaUserMapper.toDomain(rawUser);

    return user;
  };

  const saveQuizAsDone = async ({ quizId, userId }: SaveQuizAsDoneParams) => {
    const {
      data: {
        data: [quizDone],
      },
    } = await fauna.query<{ data: QueryManyResult<Record<string, string> | null> }>(
      fql`quizzes_done.byUserId(${userId}).where(.quiz_id == ${quizId})`,
    );

    if (!quizDone) {
      const { data: quiz } = await fauna.query<QueryUniqueResult<RawQuiz>>(
        fql`quizzes.byId(${quizId})`,
      );

      await fauna.query(
        fql`quizzes_done.create({
          title: ${quiz.title},
          thumbnail_url: ${quiz.thumbnail_url},
          category: ${quiz.category},
          quiz_id: ${quizId},
          user_id: ${userId}
        })`,
      );
    }
  };

  const saveQuizAsPlayed = async ({ quizId, timesPlayed }: SaveQuizAsPlayedParams) => {
    await fauna.query(fql`quizzes.byId(${quizId})!.update(
      {
        times_played: ${timesPlayed}
      }
    )`);
  };

  const findQuizzesDone = async ({ userId }: FindQuizzesDoneParams) => {
    const {
      data: { data: rawQuizzesDone },
    } = await fauna.query<{ data: QueryManyResult<RawQuizDone> }>(
      fql`quizzes_done.byUserId(${userId}).order(desc(.ts))`,
    );

    const quizzesDone = rawQuizzesDone.map((rawQuizDone) =>
      FaunaQuizDoneMapper.toDomain(rawQuizDone),
    );

    return quizzesDone;
  };

  return {
    getFaunaUser,
    saveQuizAsDone,
    saveQuizAsPlayed,
    findQuizzesDone,
  };
};
