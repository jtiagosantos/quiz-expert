'use client';

import { useRouter } from 'next/navigation';
import { useClerk } from '@clerk/nextjs';
import SignOutIcon from '@/assets/icons/sign-out.svg';

export const SignOutButton = () => {
  const { signOut } = useClerk();
  const router = useRouter();

  return (
    <button
      className="font-lexend text-gray-700 flex items-center gap-2"
      onClick={() => signOut(() => router.push('/'))}>
      <SignOutIcon />
      Sair da Conta
    </button>
  );
};
