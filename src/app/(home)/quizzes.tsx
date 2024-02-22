import Link from 'next/link';
import type { FC } from 'react';
import { QuizCard } from './quiz-card';
import { Quiz } from '@/interfaces/quiz';
import { createSlug } from '@/helpers/create-slug';

type QuizzesProps = {
  quizzes: Array<Quiz>;
};

export const Quizzes: FC<QuizzesProps> = ({ quizzes }) => {
  return (
    <div className="pt-[100px] pb-10 grid grid-cols-4 max-w-[1110px] mx-auto gap-6">
      {quizzes?.map((quiz) => {
        const urlForQuizPage = '/quiz/'.concat(createSlug(quiz.title).concat('--').concat(quiz.id));

        return (
          <Link href={urlForQuizPage} key={quiz.id}>
            <QuizCard quiz={quiz} />
          </Link>
        );
      })}
    </div>
  );
};
