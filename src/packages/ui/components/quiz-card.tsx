import Image, { ImageProps } from 'next/image';
import type { FC, ComponentProps } from 'react';
import { twMerge } from 'tailwind-merge';

const QuizCardRoot: FC<ComponentProps<'div'>> = ({ className, children, ...props }) => {
  return (
    <div
      className={twMerge(
        'max-w-[260px] h-[270px] bg-white rounded-[12px] overflow-hidden border border-gray-200 shadow-md shadow-gray-200 max-[520px]:h-[240px]',
        className,
      )}
      {...props}>
      {children}
    </div>
  );
};

const QuizCardThumbnailWrap: FC<ComponentProps<'div'>> = ({ className, children, ...props }) => {
  return (
    <div className={twMerge('relative h-[170px] max-[520px]:h-[140px]', className)} {...props}>
      {children}
    </div>
  );
};

const QuizCardThumbnail: FC<ImageProps> = ({ ...props }) => {
  return <Image {...props} />;
};

const QuizCardFlag: FC<ComponentProps<'span'>> = ({ className, children, ...props }) => {
  return (
    <span
      className={twMerge(
        'absolute bg-indigo-200 text-indigo-700 p-1 rounded-md text-sm font-medium left-2 bottom-2',
        className,
      )}
      {...props}>
      {children}
    </span>
  );
};

const QuizCardTitle: FC<ComponentProps<'p'>> = ({ className, children, ...props }) => {
  return (
    <p
      className={twMerge(
        'font-lexend font-semibold text-gray-700 text-[18px] p-4 leading-6 max-[520px]:text-base max-[520px]:p-2 max-[520px]:leading-5 max-[520px]:font-medium',
        className,
      )}
      {...props}>
      {children}
    </p>
  );
};

const QuizCardSkeleton: FC = () => {
  return (
    <div className="max-w-[260px] w-full h-[270px] bg-gray-300 rounded-[12px] overflow-hidden border border-gray-200 shadow-md shadow-gray-200 animate-pulse max-[520px]:h-[240px]">
      <div className="w-full h-[170px] bg-gray-500 animate-pulse relative">
        <div className="w-[75px] h-[28px] rounded-md bg-gray-300 absolute left-2 bottom-2 animate-pulse" />
      </div>
      <div className="h-[50px] rounded-b-[12px] bg-gray-500 m-4 animate-pulse max-[520px]:h-[30px]" />
    </div>
  );
};

export const QuizCard = {
  Root: QuizCardRoot,
  ThumbnailWrap: QuizCardThumbnailWrap,
  Thumbnail: QuizCardThumbnail,
  Flag: QuizCardFlag,
  Title: QuizCardTitle,
  Skeleton: QuizCardSkeleton,
};
