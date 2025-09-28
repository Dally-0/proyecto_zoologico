import { createClient } from '@supabase/supabase-js'

// Accede a las variables desde process.env
const supabaseUrl = process.env.REACT_APP_SUPABASE_URL
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY

// Asegúrate de que las claves existan antes de crear el cliente
if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Las claves de entorno de Supabase no están definidas.')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)