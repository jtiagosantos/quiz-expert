import { SignIn, currentUser } from '@clerk/nextjs';
import { redirect } from 'next/navigation';

export default async function SignInPage() {
  const user = await currentUser();

  if (user) return redirect('/quiz');

  return (
    <main className="w-full h-screen flex justify-center items-center">
      <SignIn redirectUrl="/quiz" />
    </main>
  );
}
