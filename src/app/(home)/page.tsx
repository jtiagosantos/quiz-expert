import { useFaunaServer } from '@/packages/database';
import { QuizzesPageClientComponent } from './component';
import { QuizCategory } from '@/enums/quiz-category';

type QuizzesPageProps = {
  searchParams: {
    category: undefined | keyof typeof QuizCategory;
    times_played: undefined | 'asc' | 'desc';
  };
};

export default async function QuizzesPageServerComponent({ searchParams }: QuizzesPageProps) {
  const { findQuizzes, findForMostPlayedQuizzes } = await useFaunaServer();

  const [quizzes, mostPlayedQuizzes] = await Promise.all([
    findQuizzes({
      filters: {
        category: searchParams?.category,
      },
      orderBy: {
        timesPlayed: searchParams?.times_played,
      },
    }),
    findForMostPlayedQuizzes(),
  ]);

  return <QuizzesPageClientComponent quizzes={quizzes} mostPlayedQuizzes={mostPlayedQuizzes} />;
}
