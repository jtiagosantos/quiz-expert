import BubbleLoading from '@/assets/animations/bubble-loading.svg';

export const Loading = () => {
  return (
    <div className="w-screen h-screen fixed inset-0 bg-gray-600 bg-opacity-60 flex items-center justify-center z-[9999]">
      <div className="bg-white rounded-lg flex flex-col items-center justify-center gap-7 p-8">
        <BubbleLoading />
        <p className="font-lexend font-semibold text-gray-700 text-[18px]">
          Calculando Respostas Corretas...
        </p>
      </div>
    </div>
  );
};
