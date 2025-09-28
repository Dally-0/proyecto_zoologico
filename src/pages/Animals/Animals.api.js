import { supabase } from "../../supabaseClient"

// Obtener todos los animales
export async function getAnimals() {
  const { data, error } = await supabase.from("animals").select("*")
  if (error) {
    console.error("Error fetching animals:", error)
    return []
  }
  return data
}

// Crear un nuevo animal (solo admin)
export async function createAnimal(animal) {
  const { data, error } = await supabase.from("animals").insert(animal)
  if (error) {
    console.error("Error creating animal:", error)
    return null
  }
  return data
}
