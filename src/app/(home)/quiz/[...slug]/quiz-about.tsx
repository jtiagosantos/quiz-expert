import Image from 'next/image';
import type { FC } from 'react';
import { formatDate } from '@/helpers/format-date';
import { QuizCategory } from '@/enums/quiz-category';
import { Quiz } from '@/interfaces/quiz';
import CalendarIcon from '@/assets/icons/calendar.svg';
import CategoryIcon from '@/assets/icons/category.svg';
import BookIcon from '@/assets/icons/book.svg';

type QuizAboutProps = {
  quiz: Quiz;
  onStartQuiz: () => void;
};

export const QuizAbout: FC<QuizAboutProps> = ({ quiz, onStartQuiz }) => {
  return (
    <>
      <h2 className="text-gray-700 font-lexend font-semibold text-2xl">{quiz.title}</h2>
      <div className="w-full h-[480px] relative rounded-2xl overflow-hidden my-4">
        <Image
          src={quiz.thumbnailURL}
          alt={quiz.title}
          fill={true}
          style={{
            objectFit: 'cover',
          }}
        />
      </div>
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-1">
          <CalendarIcon />
          <p className="font-lexend font-normal text-sm text-gray-500">
            {formatDate(quiz.createdAt)}
          </p>
        </div>
        <div className="flex items-center gap-1">
          <CategoryIcon />
          <p className="font-lexend font-normal text-sm text-gray-500">
            {QuizCategory[quiz.category]}
          </p>
        </div>
        <div className="flex items-center gap-1">
          <BookIcon />
          <p className="font-lexend font-normal text-sm text-gray-500">
            {quiz.questions.length} perguntas
          </p>
        </div>
      </div>
      <button
        className="w-full bg-indigo-500 p-3 rounded-md text-white font-lexend font-semibold text-[18px] mt-6 hover:bg-indigo-400 transition-all duration-300"
        onClick={onStartQuiz}>
        Iniciar o Quiz
      </button>
    </>
  );
};
