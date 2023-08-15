import { User } from '@supabase/supabase-js';

export type ProfileFormProps = {
  user: User | undefined;
  getUserData: () => Promise<void>;
};
