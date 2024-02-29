import Image from 'next/image';
import Link from 'next/link';
import { currentUser } from '@clerk/nextjs';
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
  MenubarSeparator,
} from '@/components/ui/menubar';
import { SignOutButton } from './sign-out-button';
import BooksIcon from '@/assets/icons/books.svg';

export const Header = async () => {
  const user = await currentUser();

  return (
    <header className="w-screen bg-white py-4 fixed shadow-md shadow-gray-200 z-[99]">
      <div className="max-w-[1280px] w-full mx-auto flex items-center justify-between max-[1300px]:px-4">
        <h1 className="text-indigo-500 text-3xl font-normal font-russoOne max-[790px]:text-2xl hover:opacity-80">
          <Link href="/">🧠 Quiz Master</Link>
        </h1>
        {!!user && (
          <Menubar className="border-none">
            <MenubarMenu>
              <MenubarTrigger className="data-[state=open]:bg-transparent focus:bg-transparent cursor-pointer hover:opacity-80">
                <Image
                  src={user?.imageUrl ?? ''}
                  alt="Foto de perfil"
                  width={36}
                  height={36}
                  className="rounded-full"
                />
              </MenubarTrigger>
              <MenubarContent className="mr-4">
                <MenubarItem className="focus:bg-indigo-200 hover:bg-indigo-200">
                  <Link
                    href="/meus-quizzes"
                    className="font-lexend text-gray-700 flex items-center gap-2">
                    <BooksIcon />
                    Meus Quizzes
                  </Link>
                </MenubarItem>
                <MenubarSeparator />
                <MenubarItem className="focus:bg-indigo-200 hover:bg-indigo-200">
                  <SignOutButton />
                </MenubarItem>
              </MenubarContent>
            </MenubarMenu>
          </Menubar>
        )}
      </div>
    </header>
  );
};
