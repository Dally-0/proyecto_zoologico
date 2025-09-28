import { supabase } from '../../supabaseClient'

/**
 * Crear ticket
 * ticket = { date, type, price }
 * user_id se obtiene automáticamente del usuario logeado
 */
export const createTicket = async (ticket) => {
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('Usuario no autenticado')

  const { data, error } = await supabase
    .from('tickets')
    .insert([{ ...ticket, user_id: user.id }])
    .select()

  if (error) throw error
  return data[0]
}

/**
 * Obtener tickets del usuario actual
 */
export const getMyTickets = async () => {
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('No autenticado')

  const { data, error } = await supabase
    .from('tickets')
    .select('*')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false })

  if (error) throw error
  return data
}

/**
 * Obtener todos los tickets (solo para administradores)
 */
export const getAllTickets = async () => {
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('No autenticado')

  // Verificamos el rol desde profiles
  const { data: profile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single()

  if (profile?.role !== 'admin') throw new Error('Acceso denegado')

  const { data, error } = await supabase
    .from('tickets')
    .select('*, profiles(full_name, email)')
    .order('created_at', { ascending: false })

  if (error) throw error
  return data
}

/**
 * Actualizar ticket (solo admin)
 */
export const updateTicket = async (id, updates) => {
  const { data, error } = await supabase
    .from('tickets')
    .update(updates)
    .eq('id', id)
    .select()

  if (error) throw error
  return data[0]
}

/**
 * Eliminar ticket (solo admin)
 */
export const deleteTicket = async (id) => {
  const { data, error } = await supabase
    .from('tickets')
    .delete()
    .eq('id', id)

  if (error) throw error
  return data
}
