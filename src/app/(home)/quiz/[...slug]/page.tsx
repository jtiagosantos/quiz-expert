/* eslint-disable @typescript-eslint/no-unused-vars */

import { QuizPageClientComponent } from './component';
import { useFaunaServer } from '@/lib/fauna/helpers/use-fauna-server';

type QuizPageParams = {
  params: {
    slug: Array<string>;
  };
};

export default async function QuizPageServerCompoent({ params }: QuizPageParams) {
  const [pathname] = params.slug;
  const [_, quizId] = pathname.split('--');

  const { getQuiz } = await useFaunaServer();

  const quiz = await getQuiz({ id: quizId });

  return <QuizPageClientComponent quiz={quiz} />;
}
