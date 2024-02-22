import { User } from '@/interfaces/user';
import { RawUser } from '@/lib/fauna/config';

export class FaunaUserMapper {
  public static toDomain(raw: RawUser): User {
    return {
      id: raw.id,
      clerkId: raw.clerk_id,
      firstName: raw.first_name,
      lastName: raw.last_name,
      email: raw.email,
      avatarURL: raw.avatar_url,
      createdAt: raw.ts.isoString,
    };
  }
}
