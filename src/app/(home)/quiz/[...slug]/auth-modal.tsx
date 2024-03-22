import { SignIn } from '@/packages/auth';
import type { FC } from 'react';
import { Modal } from '@/packages/ui';

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
