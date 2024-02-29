'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { QuizDone } from '@/interfaces/quiz-done';
import { createSlug } from '@/helpers/create-slug';
import { QuizCard } from '@/components/quiz-card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import BookRemoveIcon from '@/assets/icons/book-remove.svg';
import { QuizCategory } from '@/enums/quiz-category';
import { useFaunaClient } from '@/lib/fauna/helpers/use-fauna-client';
import { useLoading } from '@/helpers/use-loading';
import { Filters } from '@/interfaces/filters';
import { OrderBy } from '@/interfaces/order-by';
import { User } from '@/interfaces/user';
import XIcon from '@/assets/icons/x.svg';

const orderByContent = [
  {
    key: 'timestamp',
    label: 'Mais recentes',
    value: 'desc',
  },
  {
    key: 'timestamp',
    label: 'Mais antigos',
    value: 'asc',
  },
];

export default function MyQuizzesPage() {
  const [quizzesDone, setQuizzesDone] = useState<Array<QuizDone>>([]);
  const [filters, setFilters] = useState<Filters>({
    category: undefined,
  });
  const [orderBy, setOrderBy] = useState<OrderBy>({
    timestamp: undefined,
  });
  const [user, setUser] = useState<User | undefined>(undefined);
  const { isLoading, enableLoading, disableLoading } = useLoading(true);
  const { getFaunaUser, findQuizzesDone } = useFaunaClient();

  const handleFetchQuizzesDoneByParams = async () => {
    enableLoading();

    const quizzes = await findQuizzesDone({
      userId: user!.id,
      filters: {
        category: filters.category ?? undefined,
      },
      orderBy: {
        timestamp: orderBy.timestamp?.value ?? undefined,
      },
    });

    setQuizzesDone(quizzes);

    disableLoading();
  };

  useEffect(() => {
    getFaunaUser().then((data) => {
      setUser(data);
    });
  }, []);

  useEffect(() => {
    if (user) {
      handleFetchQuizzesDoneByParams();
    }
  }, [filters, orderBy, user]);

  return (
    <main className="pt-[100px] pb-10 max-w-[1110px] mx-auto max-[1300px]:px-4 max-[1070px]:max-w-[840px] max-[790px]:max-w-[540px]">
      <h1 className="font-lexend text-gray-700 text-2xl font-semibold max-[790px]:text-xl">
        🎯 Quizzes que você já fez
      </h1>

      <div className="flex items-center gap-8 max-[790px]:flex-col max-[790px]:items-start max-[790px]:gap-0">
        <div className="flex items-center gap-2 mt-4">
          <p className="font-lexend font-medium text-base text-gray-700 max-[790px]:min-w-[100.95px]">
            Filtrar por:
          </p>
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
            value={!orderBy.timestamp ? '' : JSON.stringify(orderBy.timestamp)}
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

      {(!!filters.category || !!orderBy.timestamp) && (
        <div className="mt-4 flex items-center gap-3">
          {!!filters.category && (
            <button
              onClick={() => setFilters({ category: null })}
              className="bg-indigo-500 font-lexend font-normal text-white text-base w-fit py-1 px-2 rounded-md flex items-center gap-2 hover:bg-indigo-400 transition-all duration-300">
              {QuizCategory[filters.category as keyof typeof QuizCategory]}
              <XIcon />
            </button>
          )}
          {!!orderBy.timestamp && (
            <button
              onClick={() => setOrderBy({ timestamp: null })}
              className="bg-indigo-500 font-lexend font-normal text-white text-base w-fit py-1 px-2 rounded-md flex items-center gap-2 hover:bg-indigo-400 transition-all duration-300">
              {orderBy.timestamp.label}
              <XIcon />
            </button>
          )}
        </div>
      )}

      {isLoading && (
        <div className="grid grid-cols-4 gap-6 mt-6 max-[1070px]:grid-cols-3 max-[790px]:grid-cols-2 max-[520px]:gap-3">
          {Array.from({ length: 8 }).map((_, index) => (
            <QuizCard.Skeleton key={index} />
          ))}
        </div>
      )}
      {!isLoading && (
        <>
          {quizzesDone.length === 0 && (
            <div className="w-full mt-[80px] flex flex-col items-center justify-center gap-2">
              <BookRemoveIcon />
              <p className="font-lexend text-gray-500 font-normal text-[18px]">
                Sem quizzes feitos até o momento!
              </p>
            </div>
          )}
          {quizzesDone.length !== 0 && (
            <div className="grid grid-cols-4 gap-6 mt-6 max-[1070px]:grid-cols-3 max-[790px]:grid-cols-2 max-[520px]:gap-3">
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
        </>
      )}
    </main>
  );
}
