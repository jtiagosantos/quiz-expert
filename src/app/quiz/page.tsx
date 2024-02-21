import { Quizzes } from './quizzes';
import { Quiz } from '@/interfaces/quiz';

export default async function QuizPage() {
  const response = await fetch('http://localhost:3333/api/quizzes/find', {
    next: {
      //revalidate: 60 * 60, //1 hour
      revalidate: 0,
    },
  });
  const quizzes = (await response.json()) as Array<Quiz>;

  return <Quizzes quizzes={quizzes} />;
}
