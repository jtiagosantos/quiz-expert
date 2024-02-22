'use client';

import { useClerk } from '@clerk/nextjs';
import SignOutIcon from '@/assets/icons/sign-out.svg';

export const SignOutButton = () => {
  const { signOut } = useClerk();

  return (
    <button
      className="font-lexend text-gray-700 flex items-center gap-2"
      onClick={() =>
        signOut(() => {
          window.location.reload();
        })
      }>
      <SignOutIcon />
      Sair da Conta
    </button>
  );
};
