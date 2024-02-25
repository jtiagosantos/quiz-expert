/* eslint-disable @typescript-eslint/no-unused-vars */

import { QuizPageClientComponent } from './component';
import { QuizRunner } from './quiz-runner';
import { Quiz } from '@/interfaces/quiz';

type QuizPageParams = {
  params: {
    slug: Array<string>;
  };
};

export default async function QuizPageServerCompoent({ params }: QuizPageParams) {
  const [pathname] = params.slug;
  const [_, quizId] = pathname.split('--');

  const response = await fetch(`http://localhost:3333/api/quizzes/find/${quizId}`, {
    cache: 'no-store',
    next: {
      revalidate: 0,
    },
  });
  const quiz = (await response.json()) as Quiz;

  return <QuizPageClientComponent quiz={quiz} />;
}
