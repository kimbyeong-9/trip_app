import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://ffgpymvyywpjfqdpjaba.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZmZ3B5bXZ5eXdwamZxZHBqYWJhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTkyMDM5NDEsImV4cCI6MjA3NDc3OTk0MX0.3wdF-U7uDPSrGSyyWZUgKALWt8JIj310aBa42fTl3RU';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);