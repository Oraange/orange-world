import { createClient } from "@supabase/supabase-js";

const isDev = import.meta.env.VITE_DEV || "true";
const supabaseUrl =
  isDev === "true"
    ? import.meta.env.VITE_SUPABASE_DEV_URL
    : import.meta.env.VITE_SUPABASE_PROD_URL;
const supabaseAnonKey =
  isDev === "true"
    ? import.meta.env.VITE_SUPABASE_DEV_ANON_KEY
    : import.meta.env.VITE_SUPABASE_PROD_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error("Missing Supabase environment variables");
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
