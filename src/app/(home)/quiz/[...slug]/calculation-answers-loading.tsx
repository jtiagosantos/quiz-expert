import BubbleLoading from '@/assets/animations/bubble-loading.svg';
import { Modal } from '@/components/modal';

export const CalculationAnswersLoading = () => {
  return (
    <Modal.Root>
      <Modal.Content>
        <div className="bg-white rounded-lg flex flex-col items-center justify-center gap-7 p-8">
          <BubbleLoading />
          <p className="font-lexend font-semibold text-gray-700 text-[18px]">
            Calculando Respostas Corretas...
          </p>
        </div>
      </Modal.Content>
    </Modal.Root>
  );
};
