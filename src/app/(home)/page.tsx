import { useFaunaServer } from '@/lib/fauna/helpers/use-fauna-server';
import { QuizzesPageClientComponent } from './component';
import { QuizCategory } from '@/enums/quiz-category';

type QuizzesPageProps = {
  searchParams: {
    category: undefined | keyof typeof QuizCategory;
    times_played: undefined | 'asc' | 'desc';
  };
};

export default async function QuizzesPageServerComponent({ searchParams }: QuizzesPageProps) {
  const { findQuizzes } = await useFaunaServer();

  const quizzes = await findQuizzes({
    filters: {
      category: searchParams?.category,
    },
    orderBy: {
      timesPlayed: searchParams?.times_played,
    },
  });

  return <QuizzesPageClientComponent quizzes={quizzes} />;
}
