import { SignIn } from '@clerk/nextjs';
import type { FC } from 'react';
import { Modal } from '@/components/modal';

type AuthModalProps = {
  redirectURL: string;
};

export const AuthModal: FC<AuthModalProps> = ({ redirectURL }) => {
  return (
    <Modal.Root>
      <Modal.Content>
        <SignIn afterSignInUrl={redirectURL} />
      </Modal.Content>
    </Modal.Root>
  );
};
