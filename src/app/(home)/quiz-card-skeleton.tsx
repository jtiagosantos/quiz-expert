export const QuizCardSkeleton = () => {
  return (
    <div className="max-w-[260px] w-full h-[270px] bg-gray-300 rounded-[12px] overflow-hidden border border-gray-200 shadow-md shadow-gray-200 animate-pulse">
      <div className="w-full h-[170px] bg-gray-500 animate-pulse relative">
        <div className="w-[75px] h-[28px] rounded-md bg-gray-300 absolute left-2 bottom-2 animate-pulse" />
      </div>
      <div className="h-[50px] rounded-b-[12px] bg-gray-500 m-4 animate-pulse" />
    </div>
  );
};
