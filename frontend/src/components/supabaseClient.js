import { createClient } from '@supabase/supabase-js';

const supabaseUrl = "https://wlmwvxtvnidgwarqwifc.supabase.co"; 
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndsbXd2eHR2bmlkZ3dhcnF3aWZjIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTk5OTY1OTIsImV4cCI6MjAxNTU3MjU5Mn0.A2M8ILuGavOag3TH7zMeRVtpFaAHuNJWTmPP59HiTtI"; // Replace with your Supabase Anonymous Key
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export { supabase };
