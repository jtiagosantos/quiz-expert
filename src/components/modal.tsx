import type { FC, ComponentProps, PropsWithChildren } from 'react';
import { twMerge } from 'tailwind-merge';

const ModalRoot: FC<ComponentProps<'div'>> = ({ className, children, ...props }) => {
  return (
    <div
      className={twMerge(
        'w-full h-screen fixed inset-0 bg-gray-600 bg-opacity-60 flex items-center justify-center z-[9999]',
        className,
      )}
      {...props}>
      {children}
    </div>
  );
};

const ModalContent: FC<PropsWithChildren<unknown>> = ({ children }) => {
  return <>{children}</>;
};

export const Modal = {
  Root: ModalRoot,
  Content: ModalContent,
};
