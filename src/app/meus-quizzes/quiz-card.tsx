import Image from 'next/image';
import type { FC } from 'react';
import { QuizCategory } from '@/enums/quiz-category';
import { QuizDone } from '@/interfaces/quiz-done';

type QuizCardProps = {
  quizDone: QuizDone;
};

export const QuizCard: FC<QuizCardProps> = ({ quizDone }) => {
  return (
    <div className="max-w-[260px] h-[270px] bg-white rounded-[12px] overflow-hidden border border-gray-200 shadow-md shadow-gray-200">
      <div className="relative">
        <Image src={quizDone.thumbnailURL} alt={quizDone.title} width={260} height={200} />
        <span className="absolute bg-indigo-200 text-indigo-700 p-1 rounded-md text-sm font-medium left-2 bottom-2">
          {QuizCategory[quizDone.category]}
        </span>
      </div>
      <p className="font-lexend font-semibold text-gray-700 text-[18px] p-4 leading-6">
        {quizDone.title}
      </p>
    </div>
  );
};
