import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_PROJECT_URL;
const supabaseKey = process.env.SUPABASE_PROJECT_KEY;

export const supabaseClient = () =>
  supabaseUrl && supabaseKey && createClient(supabaseUrl, supabaseKey);
