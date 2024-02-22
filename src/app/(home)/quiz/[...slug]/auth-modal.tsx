import { SignIn } from '@clerk/nextjs';
import type { FC } from 'react';

type AuthModalProps = {
  redirectURL: string;
};

export const AuthModal: FC<AuthModalProps> = ({ redirectURL }) => {
  return (
    <div className="w-full h-screen fixed inset-0 bg-gray-600 bg-opacity-60 flex items-center justify-center z-[9999]">
      <SignIn afterSignInUrl={redirectURL} />
    </div>
  );
};
