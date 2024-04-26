import { createBrowserClient } from '@supabase/ssr';
import { createClient } from '@supabase/supabase-js'
import { User } from '@supabase/supabase-js';

const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_KEY!)

export default supabase;
