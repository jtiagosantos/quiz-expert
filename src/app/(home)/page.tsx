import { QuizPageClientComponent } from './component';
import { Quiz } from '@/interfaces/quiz';

export default async function QuizPageServerComponent() {
  const response = await fetch('http://localhost:3333/api/quizzes/find', {
    cache: 'no-store',
    next: {
      revalidate: 0,
    },
  });
  const quizzes = (await response.json()) as Array<Quiz>;

  return <QuizPageClientComponent quizzes={quizzes} />;
}
