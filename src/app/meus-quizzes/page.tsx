import { useFaunaServer } from '@/lib/fauna/helpers/use-fauna-server';
import { MyQuizzesClientComponent } from './component';

export default async function MyQuizzesServerComponent() {
  const { getFaunaUser } = await useFaunaServer();

  const user = await getFaunaUser();

  return <MyQuizzesClientComponent user={user} />;
}
