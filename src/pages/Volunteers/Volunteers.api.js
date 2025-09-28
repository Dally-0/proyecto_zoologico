import { supabase } from '../../supabaseClient'

// Registrar voluntario
export const registerVolunteer = async (formData) => {
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('No autenticado')

  // Evitar duplicados
  const { data: existing } = await supabase
    .from('volunteers')
    .select('id')
    .eq('user_id', user.id)
    .single()

  if (existing) throw new Error('Ya estás registrado como voluntario')

  const { data, error } = await supabase
    .from('volunteers')
    .insert([{ ...formData, user_id: user.id }])
    .select()

  if (error) throw error
  return data[0]
}

// Obtener registro del usuario actual
export const getMyVolunteer = async () => {
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('No autenticado')

  const { data, error } = await supabase
    .from('volunteers')
    .select('*')
    .eq('user_id', user.id)
    .single()

  if (error) return null
  return data
}
