export interface RawUser {
  id: string;
  clerk_id: string;
  first_name: string;
  last_name: string;
  email: string;
  avatar_url: string;
  ts: {
    isoString: string;
  };
}
