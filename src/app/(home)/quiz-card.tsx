import Image from 'next/image';
import type { FC } from 'react';
import { Quiz } from '@/interfaces/quiz';
import { QuizCategory } from '@/enums/quiz-category';

type QuizCardProps = {
  quiz: Quiz;
};

export const QuizCard: FC<QuizCardProps> = ({ quiz }) => {
  return (
    <div className="max-w-[260px] h-[270px] bg-white rounded-[12px] overflow-hidden border border-gray-200 shadow-md shadow-gray-200">
      <div className="relative h-[170px]">
        <Image src={quiz.thumbnailURL} alt={quiz.title} fill={true} />
        <span className="absolute bg-indigo-200 text-indigo-700 p-1 rounded-md text-sm font-medium left-2 bottom-2">
          {QuizCategory[quiz.category]}
        </span>
      </div>
      <p className="font-lexend font-semibold text-gray-700 text-[18px] p-4 leading-6">
        {quiz.title}
      </p>
    </div>
  );
};
