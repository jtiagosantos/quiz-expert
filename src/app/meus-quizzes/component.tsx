import Link from 'next/link';
import { QuizDone } from '@/interfaces/quiz-done';
import type { FC } from 'react';
import { createSlug } from '@/helpers/create-slug';
import { QuizCard } from '@/components/quiz-card';
import BookRemoveIcon from '@/assets/icons/book-remove.svg';
import { QuizCategory } from '@/enums/quiz-category';

type MyQuizzesClientComponentProps = {
  quizzesDone: Array<QuizDone>;
};

export const MyQuizzesClientComponent: FC<MyQuizzesClientComponentProps> = ({ quizzesDone }) => {
  return (
    <main className="pt-[100px] pb-10 max-w-[1110px] mx-auto">
      <h1 className="font-lexend text-gray-700 text-2xl font-semibold">
        🎯 Quizzes que você já fez
      </h1>

      {quizzesDone.length === 0 && (
        <div className="w-full mt-[80px] flex flex-col items-center justify-center gap-2">
          <BookRemoveIcon />
          <p className="font-lexend text-gray-500 font-normal text-[18px]">
            Sem quizzes feitos até o momento!
          </p>
        </div>
      )}
      {quizzesDone.length !== 0 && (
        <div className="grid grid-cols-4 gap-6 mt-6">
          {quizzesDone?.map((quizDone) => {
            const urlForQuizPage = '/quiz/'.concat(
              createSlug(quizDone.title).concat('--').concat(quizDone.quizId),
            );

            return (
              <Link href={urlForQuizPage} key={quizDone.id}>
                <QuizCard.Root>
                  <QuizCard.ThumbnailWrap>
                    <QuizCard.Thumbnail
                      src={quizDone.thumbnailURL}
                      fill={true}
                      alt={quizDone.title}
                    />
                    <QuizCard.Flag>{QuizCategory[quizDone.category]}</QuizCard.Flag>
                  </QuizCard.ThumbnailWrap>
                  <QuizCard.Title>{quizDone.title}</QuizCard.Title>
                </QuizCard.Root>
              </Link>
            );
          })}
        </div>
      )}
    </main>
  );
};
