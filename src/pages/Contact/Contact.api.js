import { supabase } from "../../supabaseClient"

/**
 * Inserta un nuevo mensaje de contacto en Supabase
 */
export async function insertContact({ name, email, message }) {
  // Si el usuario está autenticado, puedes agregar su user_id
  const { data: { user } } = await supabase.auth.getUser()

  const newContact = {
    name,
    email,
    message,
    user_id: user ? user.id : null,
  }

  const { data, error } = await supabase.from("contacts").insert([newContact])
  if (error) throw error
  return data
}

/**
 * Obtiene todas las preguntas frecuentes
 */
export async function getFaqs() {
  const { data, error } = await supabase
    .from("faqs")
    .select("*")
    .order("created_at", { ascending: false })
  if (error) throw error
  return data
}
