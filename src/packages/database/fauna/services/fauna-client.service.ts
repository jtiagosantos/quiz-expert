import { useUser } from '@/packages/auth';
import {
  fauna,
  fql,
  FaunaUserMapper,
  FaunaQuizMapper,
  FaunaQuizDoneMapper,
  SaveQuizAsDoneParams,
} from '@/packages/database';
import type {
  QueryManyResults,
  RawUser,
  RawQuiz,
  FindQuizzesParams,
  QueryUniqueResult,
  SaveQuizAsPlayedParams,
  FindQuizzesDoneParams,
  RawQuizDoneQuery,
} from '@/packages/database';

export const useFaunaClient = () => {
  const { user: clerkUser, isLoaded } = useUser();

  const getUser = async () => {
    const {
      data: {
        data: [rawUser],
      },
    } = await fauna.query<{ data: QueryManyResults<RawUser> }>(
      fql`users.byEmail(${clerkUser?.primaryEmailAddress?.emailAddress as string})`,
    );

    const user = FaunaUserMapper.toDomain(rawUser);

    return user;
  };

  const findQuizzes = async ({ filters, orderBy }: FindQuizzesParams = {}) => {
    let rawQuizzes: Array<RawQuiz> = [];
    let order = 'order(desc(.ts))';

    if (orderBy?.timesPlayed === 'asc') {
      order = 'order(asc(.times_played))';
    } else if (orderBy?.timesPlayed === 'desc') {
      order = 'order(desc(.times_played))';
    }

    if (!filters?.category) {
      const {
        data: { data },
      } = await fauna.query<{ data: QueryManyResults<RawQuiz> }>(fql([`quizzes.all().${order}`]));

      rawQuizzes = data;
    } else {
      const {
        data: { data },
      } = await fauna.query<{ data: QueryManyResults<RawQuiz> }>(
        fql([`quizzes.all().where(.category == '${filters.category}').${order}`]),
      );

      rawQuizzes = data;
    }

    const quizzes = rawQuizzes.map((rawQuiz) => FaunaQuizMapper.toDomain(rawQuiz));

    return quizzes;
  };

  const saveQuizAsDone = async ({ quizId, userId }: SaveQuizAsDoneParams) => {
    const {
      data: {
        data: [quizDone],
      },
    } = await fauna.query<{ data: QueryManyResults<Record<string, string> | null> }>(
      fql`quizzes_done.byUserId(${userId}).where(.quiz_id == ${quizId})`,
    );

    if (!quizDone) {
      const { data: quiz } = await fauna.query<QueryUniqueResult<RawQuiz>>(
        fql`quizzes.byId(${quizId})`,
      );

      const quizDone = FaunaQuizDoneMapper.toDatabase({
        title: quiz.title,
        thumbnailURL: quiz.thumbnail_url,
        category: quiz.category,
        quizId,
        userId,
      });

      await fauna.query(fql`quizzes_done.create(${{ ...quizDone }})`);
    }
  };

  const saveQuizAsPlayed = async ({ quizId, timesPlayed }: SaveQuizAsPlayedParams) => {
    await fauna.query(fql`quizzes.byId(${quizId})!.update(
      {
        times_played: ${timesPlayed}
      }
    )`);
  };

  const findQuizzesDone = async ({ userId, filters, orderBy }: FindQuizzesDoneParams) => {
    let rawQuizzesDone: Array<RawQuizDoneQuery> = [];
    let order = 'order(desc(.ts))';

    if (orderBy?.timestamp === 'asc') {
      order = 'order(asc(.ts))';
    } else if (orderBy?.timestamp === 'desc') {
      order = 'order(desc(.ts))';
    }

    if (!filters?.category) {
      const {
        data: { data },
      } = await fauna.query<{ data: QueryManyResults<RawQuizDoneQuery> }>(
        fql([
          `
            quizzes_done
              .byUserId('${userId}')
              .${order}
              .map((data) => quizzes.byId(data.quiz_id) {
                id,
                title,
                thumbnail_url,
                category,
              }
            )
          `,
        ]),
      );

      rawQuizzesDone = data;
    } else {
      const {
        data: { data: quizzesDone },
      } = await fauna.query<{ data: QueryManyResults<RawQuizDoneQuery> }>(
        fql([
          `
            quizzes_done
              .byUserId('${userId}')
              .${order}
              .map((data) => quizzes.byId(data.quiz_id) {
                id,
                title,
                thumbnail_url,
                category,
              }
            )
          `,
        ]),
      );

      const { data } = await fauna.query<QueryManyResults<RawQuizDoneQuery>>(
        fql`${quizzesDone}.filter((quiz) => quiz.category == ${filters.category})`,
      );

      rawQuizzesDone = data;
    }

    const quizzesDone = rawQuizzesDone.map((rawQuizDone) =>
      FaunaQuizDoneMapper.toDomain(rawQuizDone),
    );

    return quizzesDone;
  };

  return {
    isLoaded,
    getUser,
    findQuizzes,
    saveQuizAsDone,
    saveQuizAsPlayed,
    findQuizzesDone,
  };
};
