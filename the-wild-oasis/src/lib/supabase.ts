import { Database } from "@/types/database.types";
import { createClient } from "@supabase/supabase-js";
const supabaseUrl = "https://ivedkwyvkbcrelizkkua.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml2ZWRrd3l2a2JjcmVsaXpra3VhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTkzMDk2NjgsImV4cCI6MjA3NDg4NTY2OH0.vqPaz_SD4W2x_JGIZ5UP0LHnYxsANbYLVAUWVQLr1vQ";
export const supabase = createClient<Database>(supabaseUrl, supabaseKey);
