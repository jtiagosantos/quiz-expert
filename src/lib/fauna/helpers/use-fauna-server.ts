import { currentUser } from '@clerk/nextjs';
import { fauna, fql, QueryManyResult, QueryUniqueResult, RawQuiz, RawUser } from '../config';
import { FaunaUserMapper } from '../mappers/fauna-user.mapper';
import { FaunaQuizMapper } from '../mappers/fauna-quiz.mapper';
import { FindQuizzesParams } from '../interfaces/find-quizzes-params';
import { GetQuizParams } from '../interfaces/get-quiz-params';

export const useFaunaServer = async () => {
  const clerkUser = await currentUser();

  const getFaunaUser = async () => {
    const {
      data: {
        data: [rawUser],
      },
    } = await fauna.query<{ data: QueryManyResult<RawUser> }>(
      fql`users.byEmail(${clerkUser?.emailAddresses[0].emailAddress as string})`,
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
      } = await fauna.query<{ data: QueryManyResult<RawQuiz> }>(fql([`quizzes.all().${order}`]));

      rawQuizzes = data;
    } else {
      const {
        data: { data },
      } = await fauna.query<{ data: QueryManyResult<RawQuiz> }>(
        fql([`quizzes.all().where(.category == '${filters.category}').${order}`]),
      );

      rawQuizzes = data;
    }

    const quizzes = rawQuizzes.map((rawQuiz) => FaunaQuizMapper.toDomain(rawQuiz));

    return quizzes;
  };

  const getQuiz = async ({ id }: GetQuizParams) => {
    const { data: rawQuiz } = await fauna.query<QueryUniqueResult<RawQuiz>>(
      fql`quizzes.byId(${id})`,
    );

    const quiz = FaunaQuizMapper.toDomain(rawQuiz);

    return quiz;
  };

  const findForMostPlayedQuizzes = async () => {
    const {
      data: { data: rawQuizzes },
    } = await fauna.query<{ data: QueryManyResult<RawQuiz> }>(
      fql`quizzes.all().order((desc(.times_played))).take(10)`,
    );

    const quizzes = rawQuizzes.map((rawQuiz) => FaunaQuizMapper.toDomain(rawQuiz));

    return quizzes;
  };

  return {
    getFaunaUser,
    findQuizzes,
    getQuiz,
    findForMostPlayedQuizzes,
  };
};
