import { supabase } from '../../supabaseClient';

// Iniciar sesión con correo y contraseña
export const signInWithEmail = async (email, password) => {
  const { data, error } = await supabase.auth.signInWithPassword({ email, password })
  if (error) throw error
  return data
}

// Iniciar sesión con Google
export const signInWithGoogle = async () => {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
  })
  if (error) throw error
  return data
}

// Registrar usuario
export const signUp = async (email, password, full_name) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { full_name }
    }
  })
  if (error) throw error
  return data
}

// Cerrar sesión
export const signOut = async () => {
  const { error } = await supabase.auth.signOut()
  if (error) throw error
}
