import { useFaunaServer } from '@/lib/fauna/helpers/use-fauna-server';
import { QuizPageClientComponent } from './component';

export default async function QuizPageServerComponent() {
  const { findQuizzes } = await useFaunaServer();

  const quizzes = await findQuizzes();

  return <QuizPageClientComponent quizzes={quizzes} />;
}
