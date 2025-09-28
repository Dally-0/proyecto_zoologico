import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://vptbdopfaauilhuozyku.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZwdGJkb3BmYWF1aWxodW96eWt1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTg2NTU1ODQsImV4cCI6MjA3NDIzMTU4NH0.asjonn4JYC1fDJmQjuNgA7hhfcGHwXiAODjD1KLZdwA'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
