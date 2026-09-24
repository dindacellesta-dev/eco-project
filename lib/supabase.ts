import { createClient } from '@supabase/supabase-js';

// Beri nilai 'cadangan' kosong agar Vercel tidak panik saat proses Build (pencetakan)
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-key';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);