'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import type { FC } from 'react';
import { QuizCard } from './quiz-card';
import { Quiz } from '@/interfaces/quiz';
import { QuizCategory } from '@/enums/quiz-category';
import { createSlug } from '@/helpers/create-slug';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import XIcon from '@/assets/icons/x.svg';

type QuizPageClientComponentProps = {
  quizzes: Array<Quiz>;
};

type Filters = {
  category: '' | null | keyof typeof QuizCategory;
};

export const QuizPageClientComponent: FC<QuizPageClientComponentProps> = (serverProps) => {
  const [quizzes, setQuizzes] = useState(serverProps.quizzes);
  const [filters, setFilters] = useState<Filters>({
    category: null,
  });

  const handleFilterQuizzes = async () => {
    const url = new URL('http://localhost:3333/api/quizzes/find');

    if (filters.category !== '') {
      url.searchParams.append('category', filters.category!);
    } else {
      url.searchParams.delete('category');
    }

    const response = await fetch(url);
    const quizzes = (await response.json()) as Array<Quiz>;

    setQuizzes(quizzes);
  };

  useEffect(() => {
    if (filters.category !== null) {
      handleFilterQuizzes();
    }
  }, [filters]);

  return (
    <main className="pt-[100px] pb-10 max-w-[1110px] mx-auto">
      <h1 className="font-lexend text-gray-700 text-2xl font-semibold">
        🤩 O que você quer <span className="font-black text-indigo-500">jogar?</span>
      </h1>

      <div className="flex items-center gap-2 mt-4">
        <p className="font-lexend font-medium text-base text-gray-700">Filtrar por: </p>
        <Select
          value={filters.category ?? ''}
          onValueChange={(value) => setFilters({ category: value as keyof typeof QuizCategory })}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Categoria" />
          </SelectTrigger>
          <SelectContent>
            {Object.keys(QuizCategory).map((category) => (
              <SelectItem value={category} key={category}>
                {QuizCategory[category as keyof typeof QuizCategory]}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {!!filters.category && (
        <div className="mt-4">
          <button
            onClick={() => setFilters({ category: '' })}
            className="bg-indigo-500 font-lexend font-normal text-white text-base w-fit py-1 px-2 rounded-md flex items-center gap-2 hover:bg-indigo-400 transition-all duration-300">
            {QuizCategory[filters.category as keyof typeof QuizCategory]}
            <XIcon />
          </button>
        </div>
      )}

      <div className="grid grid-cols-4 gap-6 mt-6">
        {quizzes?.map((quiz) => {
          const urlForQuizPage = '/quiz/'.concat(
            createSlug(quiz.title).concat('--').concat(quiz.id),
          );

          return (
            <Link href={urlForQuizPage} key={quiz.id}>
              <QuizCard quiz={quiz} />
            </Link>
          );
        })}
      </div>
    </main>
  );
};
