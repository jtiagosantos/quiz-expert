import { Client } from 'fauna';

export const fauna = new Client({
  secret: process.env.NEXT_PUBLIC_FAUNA_SECRET,
});
