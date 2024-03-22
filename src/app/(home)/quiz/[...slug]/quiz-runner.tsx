'use client';

import { useEffect, useRef, useState } from 'react';
import type { FC } from 'react';
import { Progress, useToast } from '@/packages/ui';
import { Quiz } from '@/interfaces/quiz';
import { useFaunaClient } from '@/packages/database';
import { CalculationAnswersLoading } from './calculation-answers-loading';

type QuizRunnerProps = {
  quiz: Quiz;
  onPlayAgain: () => void;
};

const ONE_SECOND_MS = 1000;

export const QuizRunner: FC<QuizRunnerProps> = ({ quiz, onPlayAgain }) => {
  const [questionIndex, setQuestionIndex] = useState(0);
  const [areButtonsDisabled, setAreButtonsDisabled] = useState(false);
  const [isQuizFinished, setIsQuizFinished] = useState(false);
  const [isCalculatingAnswers, setIsCalculatingAnswers] = useState(false);
  const [faunaUserId, setFaunaUserId] = useState<string | null>(null);
  const totalCorrectAnswers = useRef(0);
  const { toast, dismiss } = useToast();
  const { getUser, saveQuizAsDone, saveQuizAsPlayed } = useFaunaClient();

  const progress = questionIndex * 10;
  const question = quiz.questions[questionIndex];
  const totalQuestions = quiz.questions.length;
  const isLastQuestion = questionIndex + 1 === totalQuestions;

  const handleQuiz = async () => {
    try {
      setIsCalculatingAnswers(true);

      await saveQuizAsDone({
        quizId: quiz.id,
        userId: faunaUserId as string,
      });

      await saveQuizAsPlayed({
        quizId: quiz.id,
        timesPlayed: quiz.timesPlayed + 1,
      });
    } finally {
      setIsCalculatingAnswers(false);
    }
  };

  const handleAnswerQuestion = async (answerId: string) => {
    setAreButtonsDisabled(true);

    let toastRef: { id: string };

    if (question.correct === answerId) {
      totalCorrectAnswers.current++;
      toastRef = toast({
        title: 'Resposta Certa!',
        variant: 'success',
      });
    } else {
      toastRef = toast({
        title: 'Resposta Errada!',
        variant: 'destructive',
      });
    }

    await new Promise((resolve) => {
      const timeoutId = setTimeout(() => {
        dismiss(toastRef.id);

        if (!isLastQuestion) {
          setQuestionIndex((state) => state + 1);
        }
        setAreButtonsDisabled(false);

        resolve(timeoutId);
      }, ONE_SECOND_MS);
    }).then((timeoutId) => {
      clearTimeout(timeoutId as NodeJS.Timeout);
    });

    if (isLastQuestion) {
      await handleQuiz();
      setIsQuizFinished(true);
    }
  };

  useEffect(() => {
    getUser().then((user) => {
      setFaunaUserId(user.id);
    });
  }, []);

  return (
    <>
      {!isQuizFinished && (
        <>
          <div className="flex flex-col items-center gap-2">
            <p className="font-lexend font-semibold text-[18px] text-gray-700">
              {questionIndex + 1} / {totalQuestions}
            </p>
            <Progress value={progress} className="w-full bg-gray-200" />
          </div>

          <h2 className="w-full text-center mt-8 font-lexend text-[20px] text-gray-700 font-medium leading-8">
            {question.title}
          </h2>

          <div className="w-full flex flex-col gap-3 mt-6">
            {question.answers.map((answer) => (
              <button
                key={answer.id}
                onClick={() => handleAnswerQuestion(answer.id)}
                disabled={areButtonsDisabled}
                className="bg-indigo-500 p-[10px] rounded-md text-white font-lexend font-normal text-[18px] text-left hover:scale-110 transition-all duration-300">
                {answer.text}
              </button>
            ))}
          </div>
        </>
      )}
      {isQuizFinished && (
        <>
          <div className="w-full flex items-center gap-4 max-[430px]:flex-col">
            <div className="w-full bg-white rounded-[12px] overflow-hidden border border-gray-200 shadow-md shadow-gray-200 p-4 flex flex-col items-center gap-2">
              <span className="text-2xl">🤩</span>
              <span className="font-lexend font-semibold text-xl text-gray-700">
                {totalQuestions}
              </span>
              <span className="font-lexend font-normal text-base text-gray-700">
                Perguntas no Total
              </span>
            </div>
            <div className="w-full bg-white rounded-[12px] overflow-hidden border border-gray-200 shadow-md shadow-gray-200 p-4 flex flex-col items-center gap-2">
              <span className="text-2xl">😎</span>
              <span className="font-lexend font-semibold text-xl text-gray-700">
                {totalCorrectAnswers.current}
              </span>
              <span className="font-lexend font-normal text-base text-gray-700">
                Respostas Corretas
              </span>
            </div>
          </div>
          <div className="w-full flex justify-center">
            <button
              className="w-full bg-indigo-500 p-3 rounded-md text-white font-lexend font-semibold text-[18px] mt-6 hover:bg-indigo-400 transition-all duration-300"
              onClick={onPlayAgain}>
              Jogar Novamente
            </button>
          </div>
        </>
      )}
      {isCalculatingAnswers && <CalculationAnswersLoading />}
    </>
  );
};
