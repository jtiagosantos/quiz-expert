/* eslint-disable no-extra-boolean-cast */

'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import type { FC } from 'react';
import { QuizCard } from './quiz-card';
import { QuizCardSkeleton } from './quiz-card-skeleton';
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
import { orderByContent } from './data/order-by-content';
import XIcon from '@/assets/icons/x.svg';

type QuizPageClientComponentProps = {
  quizzes: Array<Quiz>;
};

type Filters = {
  category: null | undefined | keyof typeof QuizCategory;
};

type OrderBy = {
  timesPlayed:
    | {
        key: string;
        label: string;
        value: 'asc' | 'desc';
      }
    | undefined
    | null;
};

export const QuizPageClientComponent: FC<QuizPageClientComponentProps> = (serverProps) => {
  const [quizzes, setQuizzes] = useState(serverProps.quizzes ?? []);
  const [filters, setFilters] = useState<Filters>({
    category: undefined,
  });
  const [orderBy, setOrderBy] = useState<OrderBy>({
    timesPlayed: undefined,
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleFetchQuizzesByParams = async () => {
    setIsLoading(true);

    const url = new URL('http://localhost:3333/api/quizzes/find');

    if (!!filters.category) {
      url.searchParams.append('category', filters.category!);
    } else {
      url.searchParams.delete('category');
    }

    if (orderBy.timesPlayed) {
      url.searchParams.append('times_played', orderBy.timesPlayed.value);
    } else {
      url.searchParams.delete('times_played');
    }

    const response = await fetch(url);
    const quizzes = (await response.json()) as Array<Quiz>;

    setQuizzes(quizzes);

    setIsLoading(false);
  };

  useEffect(() => {
    if (filters.category !== undefined || orderBy.timesPlayed !== undefined) {
      handleFetchQuizzesByParams();
    }
  }, [filters, orderBy]);

  return (
    <main className="pt-[100px] pb-10 max-w-[1110px] mx-auto">
      <h1 className="font-lexend text-gray-700 text-2xl font-semibold">
        🤩 O que você quer <span className="font-black text-indigo-500">jogar?</span>
      </h1>

      <div className="flex items-center gap-8">
        <div className="flex items-center gap-2 mt-4">
          <p className="font-lexend font-medium text-base text-gray-700">Filtrar por:</p>
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
        <div className="flex items-center gap-2 mt-4">
          <p className="font-lexend font-medium text-base text-gray-700">Ordenar por:</p>
          <Select
            value={!orderBy.timesPlayed ? '' : JSON.stringify(orderBy.timesPlayed)}
            onValueChange={(input) => {
              const { key, label, value } = JSON.parse(input);
              setOrderBy({
                [key]: { key, label, value },
              } as OrderBy);
            }}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Parâmetro" />
            </SelectTrigger>
            <SelectContent>
              {orderByContent.map((orderBy) => (
                <SelectItem value={JSON.stringify(orderBy)} key={orderBy.label}>
                  {orderBy.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {(!!filters.category || !!orderBy.timesPlayed) && (
        <div className="mt-4 flex items-center gap-3">
          {!!filters.category && (
            <button
              onClick={() => setFilters({ category: null })}
              className="bg-indigo-500 font-lexend font-normal text-white text-base w-fit py-1 px-2 rounded-md flex items-center gap-2 hover:bg-indigo-400 transition-all duration-300">
              {QuizCategory[filters.category as keyof typeof QuizCategory]}
              <XIcon />
            </button>
          )}
          {!!orderBy.timesPlayed && (
            <button
              onClick={() => setOrderBy({ timesPlayed: null })}
              className="bg-indigo-500 font-lexend font-normal text-white text-base w-fit py-1 px-2 rounded-md flex items-center gap-2 hover:bg-indigo-400 transition-all duration-300">
              {orderBy.timesPlayed.label}
              <XIcon />
            </button>
          )}
        </div>
      )}

      <div className="grid grid-cols-4 gap-6 mt-6">
        {isLoading && (
          <>
            {Array.from({ length: 8 }).map((_, index) => (
              <QuizCardSkeleton key={index} />
            ))}
          </>
        )}
        {!isLoading && (
          <>
            {quizzes.map((quiz) => {
              const urlForQuizPage = '/quiz/'.concat(
                createSlug(quiz.title).concat('--').concat(quiz.id),
              );

              return (
                <Link href={urlForQuizPage} key={quiz.id}>
                  <QuizCard quiz={quiz} />
                </Link>
              );
            })}
          </>
        )}
      </div>
    </main>
  );
};
