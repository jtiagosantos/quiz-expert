/* eslint-disable @typescript-eslint/no-unused-vars */

'use client';

import { useState } from 'react';
import type { FC } from 'react';
import { usePathname } from 'next/navigation';
import { useAuth } from '@clerk/nextjs';
import { QuizAbout } from './quiz-about';
import { QuizRunner } from './quiz-runner';
import { Quiz } from '@/interfaces/quiz';
import { AuthModal } from './auth-modal';

type QuizPageClientComponentProps = {
  quiz: Quiz;
};

export const QuizPageClientComponent: FC<QuizPageClientComponentProps> = ({ quiz }) => {
  const [doesQuizStart, setDoesQuizStart] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const { isSignedIn: isUserSignedIn } = useAuth();
  const pathname = usePathname();

  const handleStartQuiz = () => {
    if (!isUserSignedIn) {
      setShowAuthModal(true);
      return;
    }

    setDoesQuizStart(true);
  };

  return (
    <>
      <main className="max-w-[690px] w-full pt-[100px] mx-auto pb-6">
        {!doesQuizStart ? (
          <QuizAbout quiz={quiz} onStartQuiz={handleStartQuiz} />
        ) : (
          <QuizRunner quiz={quiz} onPlayAgain={() => setDoesQuizStart(false)} />
        )}
      </main>
      {showAuthModal && <AuthModal redirectURL={pathname} />}
    </>
  );
};
