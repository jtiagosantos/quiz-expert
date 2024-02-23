import { useFaunaServer } from '@/lib/fauna/helpers/use-fauna-server';
import { MyQuizzesClientComponent } from './component';
import { QuizDone } from '@/interfaces/quiz-done';

export default async function MyQuizzesServerComponent() {
  const { getFaunaUser } = await useFaunaServer();

  const user = await getFaunaUser();

  const response = await fetch(`http://localhost:3333/api/quizzes/find/done/${user.id}`, {
    next: {
      tags: ['quizzes.done'],
    },
  });
  const quizzesDone = (await response.json()) as Array<QuizDone>;

  return <MyQuizzesClientComponent quizzesDone={quizzesDone} />;
}
