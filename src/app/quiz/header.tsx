import Image from 'next/image';
import { currentUser } from '@clerk/nextjs';
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from '@/components/ui/menubar';
import { SignOutButton } from './sign-out-button';

export const Header = async () => {
  const user = await currentUser();

  return (
    <header className="w-full bg-white py-4 fixed shadow-md shadow-gray-200">
      <div className="max-w-[1280px] w-full mx-auto flex items-center justify-between">
        <h1 className="text-indigo-500 text-3xl font-normal font-russoOne">🧠 Quiz Master</h1>
        <Menubar className="border-none">
          <MenubarMenu>
            <MenubarTrigger className="data-[state=open]:bg-transparent focus:bg-transparent cursor-pointer">
              <Image
                src={user?.imageUrl ?? ''}
                alt="Foto de perfil"
                width={36}
                height={36}
                className="rounded-full"
              />
            </MenubarTrigger>
            <MenubarContent>
              <MenubarItem className="focus:bg-indigo-200">
                <SignOutButton />
              </MenubarItem>
            </MenubarContent>
          </MenubarMenu>
        </Menubar>
      </div>
    </header>
  );
};
