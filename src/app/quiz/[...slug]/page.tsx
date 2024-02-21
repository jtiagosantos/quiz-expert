/* eslint-disable @typescript-eslint/no-unused-vars */

'use client';

import { useState } from 'react';
import { QuizAbout } from './quiz-about';
import { QuizRunner } from './quiz-runner';
import { Quiz } from '@/interfaces/quiz';

type QuizPageParams = {
  params: {
    slug: Array<string>;
  };
};

export default function QuizPage({ params }: QuizPageParams) {
  const [doesQuizStart, setDoesQuizStart] = useState(false);
  const [quiz, setQuiz] = useState({} as Quiz);

  const [pathname] = params.slug;
  const [_, quizId] = pathname.split('--');

  return (
    <main className="max-w-[690px] w-full pt-[100px] mx-auto pb-6">
      {!doesQuizStart ? (
        <QuizAbout quizId={quizId} onStartQuiz={() => setDoesQuizStart(true)} onSetQuiz={setQuiz} />
      ) : (
        <QuizRunner quiz={quiz} />
      )}
    </main>
  );
}
