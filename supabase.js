import { createClient } from "@supabase/supabase-js"; 

const supabaseUrl = 'https://dqrneezufgaxmiesadai.supabase.co' ;
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRxcm5lZXp1ZmdheG1pZXNhZGFpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDM2ODU4NjYsImV4cCI6MjA1OTI2MTg2Nn0.H4yDL3uZ_kMaMWhvNkOGvbIbh4nwOT8MyFBiAZu3pdQ';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);