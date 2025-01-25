import { createClient } from '@supabase/supabase-js'

// Create a single supabase client for interacting with your database
const supabase = createClient('https://nsmgfuwgjvlxxujibgzq.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5zbWdmdXdnanZseHh1amliZ3pxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzc3MjczMzksImV4cCI6MjA1MzMwMzMzOX0.oKPB_KnknKjibVROd0nZ7S7IcTUhQk64NOovbSfmJJU')
export default supabase

