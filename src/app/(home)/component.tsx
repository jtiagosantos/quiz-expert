/* eslint-disable no-extra-boolean-cast */

'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import type { FC } from 'react';
import queryString from 'query-string';
import { QuizCard } from '@/packages/ui';
import { Quiz } from '@/interfaces/quiz';
import { QuizCategory } from '@/enums/quiz-category';
import { createSlug } from '@/helpers/create-slug';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/packages/ui';
import { useLoading } from '@/helpers/use-loading';
import { useFaunaClient } from '@/packages/database';
import { Filters } from '@/interfaces/filters';
import { OrderBy } from '@/interfaces/order-by';
import XIcon from '@/assets/icons/x.svg';

const orderByContent = [
  {
    key: 'timesPlayed',
    label: 'Mais jogados',
    value: 'desc',
  },
  {
    key: 'timesPlayed',
    label: 'Menos jogados',
    value: 'asc',
  },
];

type URLParam = 'category' | 'timesPlayed';

type QuizPageClientComponentProps = {
  quizzes: Array<Quiz>;
  mostPlayedQuizzes: Array<Quiz>;
};

export const QuizzesPageClientComponent: FC<QuizPageClientComponentProps> = (serverProps) => {
  const searchParams = useSearchParams();

  const queryParams = queryString.parse(searchParams.toString());

  const categoryParam = queryParams?.['category'] as undefined | keyof typeof QuizCategory;
  const timesPlayedParam = queryParams?.['times_played'] as undefined | 'asc' | 'desc';

  const [quizzes, setQuizzes] = useState(serverProps.quizzes ?? []);
  const [filters, setFilters] = useState<Filters>({
    category: categoryParam,
  });
  const [orderBy, setOrderBy] = useState<OrderBy>({
    timesPlayed: timesPlayedParam && {
      key: 'timesPlayed',
      label: timesPlayedParam === 'asc' ? 'Menos jogados' : 'Mais jogados',
      value: timesPlayedParam,
    },
  });
  const [isOpenSelect, setIsOpenSelect] = useState(false);
  const { isLoading, enableLoading, disableLoading } = useLoading();
  const { findQuizzes } = useFaunaClient();
  const router = useRouter();

  const handleFetchQuizzesByParams = async () => {
    enableLoading();

    const quizzes = await findQuizzes({
      filters: {
        category: filters.category ?? undefined,
      },
      orderBy: {
        timesPlayed: orderBy.timesPlayed?.value ?? undefined,
      },
    });

    setQuizzes(quizzes);

    disableLoading();
  };

  const handleRemoveURLParam = (param: URLParam) => {
    let url = window.location.href;

    if (param === 'category') {
      setFilters({ category: null });
      url = queryString.exclude(url, ['category']);
    } else if (param === 'timesPlayed') {
      setOrderBy({ timesPlayed: null });
      url = queryString.exclude(url, ['times_played']);
    }

    router.replace(url, {
      scroll: false,
    });
  };

  const handleAddURLParam = (param: URLParam, value: string) => {
    let url = window.location.href;

    if (param === 'category') {
      url = queryString.stringifyUrl({ url, query: { category: value } });
    } else if (param === 'timesPlayed') {
      url = queryString.stringifyUrl({ url, query: { times_played: value } });
    }

    router.replace(url, {
      scroll: false,
    });
  };

  useEffect(() => {
    if (filters.category !== categoryParam || orderBy.timesPlayed?.value !== timesPlayedParam) {
      handleFetchQuizzesByParams();
    }
  }, [filters, orderBy]);

  return (
    <main className="pt-[100px] pb-10 max-w-[1110px] mx-auto max-[1300px]:px-4 max-[1070px]:max-w-[840px] max-[790px]:max-w-[540px]">
      <h2 className="font-lexend text-gray-700 text-2xl font-semibold max-[790px]:text-xl">
        🤩 O que você quer <span className="font-black text-indigo-500">jogar?</span>
      </h2>

      {serverProps.mostPlayedQuizzes.length >= 2 && (
        <section className="w-full rounded-[12px] bg-[linear-gradient(180deg,#fee4e2,hsla(4,93%,94%,0.2))] px-4 py-6 mt-6 mb-4">
          <h3 className="font-lexend font-black text-red-500 text-xl">🔥 Os mais jogados</h3>
          <div className="w-full overflow-x-auto mt-4 flex items-center gap-3 pb-3 px-2 scrollbar-thumb-gray-500 scrollbar-track-white scrollbar-thin scrollbar-thumb-rounded-full">
            {serverProps.mostPlayedQuizzes.map((quiz) => {
              const urlForQuizPage = '/quiz/'.concat(
                createSlug(quiz.title).concat('--').concat(quiz.id),
              );

              return (
                <Link href={isOpenSelect ? '' : urlForQuizPage} key={quiz.id}>
                  <QuizCard.Root className="w-[260px] max-[480px]:w-[220px] max-[520px]:h-[220px]">
                    <QuizCard.ThumbnailWrap>
                      <QuizCard.Thumbnail src={quiz.thumbnailURL} fill={true} alt={quiz.title} />
                      <QuizCard.Flag>{QuizCategory[quiz.category]}</QuizCard.Flag>
                    </QuizCard.ThumbnailWrap>
                    <QuizCard.Title>{quiz.title}</QuizCard.Title>
                  </QuizCard.Root>
                </Link>
              );
            })}
          </div>
        </section>
      )}

      <section>
        <div className="flex items-center gap-8 max-[790px]:flex-col max-[790px]:items-start max-[790px]:gap-0">
          <div className="flex items-center gap-2 mt-4">
            <p className="font-lexend font-medium text-base text-gray-700 max-[790px]:min-w-[100.95px]">
              Filtrar por:
            </p>
            <Select
              value={filters.category ?? ''}
              onOpenChange={() => setIsOpenSelect((state) => !state)}
              onValueChange={(value) => {
                setFilters({ category: value as keyof typeof QuizCategory });
                handleAddURLParam('category', value);
              }}>
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
              onOpenChange={() => setIsOpenSelect((state) => !state)}
              onValueChange={(input) => {
                const { key, label, value } = JSON.parse(input);
                setOrderBy({
                  [key]: { key, label, value },
                } as OrderBy);
                handleAddURLParam('timesPlayed', value);
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
                onClick={() => !isOpenSelect && handleRemoveURLParam('category')}
                className="bg-indigo-500 font-lexend font-normal text-white text-base w-fit py-1 px-2 rounded-md flex items-center gap-2 hover:bg-indigo-400 transition-all duration-300">
                {QuizCategory[filters.category as keyof typeof QuizCategory]}
                <XIcon />
              </button>
            )}
            {!!orderBy.timesPlayed && (
              <button
                onClick={() => !isOpenSelect && handleRemoveURLParam('timesPlayed')}
                className="bg-indigo-500 font-lexend font-normal text-white text-base w-fit py-1 px-2 rounded-md flex items-center gap-2 hover:bg-indigo-400 transition-all duration-300">
                {orderBy.timesPlayed.label}
                <XIcon />
              </button>
            )}
          </div>
        )}

        <div className="grid grid-cols-4 gap-6 mt-6 max-[1070px]:grid-cols-3 max-[790px]:grid-cols-2 max-[520px]:gap-3">
          {isLoading && (
            <>
              {Array.from({ length: 8 }).map((_, index) => (
                <QuizCard.Skeleton key={index} />
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
                  <Link href={isOpenSelect ? '' : urlForQuizPage} key={quiz.id}>
                    <QuizCard.Root>
                      <QuizCard.ThumbnailWrap>
                        <QuizCard.Thumbnail src={quiz.thumbnailURL} fill={true} alt={quiz.title} />
                        <QuizCard.Flag>{QuizCategory[quiz.category]}</QuizCard.Flag>
                      </QuizCard.ThumbnailWrap>
                      <QuizCard.Title>{quiz.title}</QuizCard.Title>
                    </QuizCard.Root>
                  </Link>
                );
              })}
            </>
          )}
        </div>
      </section>
    </main>
  );
};
