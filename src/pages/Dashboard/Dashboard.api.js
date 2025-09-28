// src/pages/Dashboard/Dashboard.api.js

import { supabase } from '../../supabaseClient'; // 👈 Se corrige la ruta para acceder a src/supabaseClient.js

// ------------------------------------------------------------------
// FUNCIONES CRUD GENÉRICAS
// Estas funciones manejan las operaciones básicas para Contactos, FAQs,
// Tickets (solo read), Voluntarios (read/update), y Profiles (read/update/delete).
// ------------------------------------------------------------------

/**
 * Lee todos los registros de una tabla específica.
 * @param {string} tableName - El nombre de la tabla de Supabase.
 */
export const readAll = async (tableName) => {
  const { data, error } = await supabase
    .from(tableName)
    .select('*');
  
  if (error) throw error;
  return data;
};

/**
 * Inserta un nuevo registro en una tabla.
 * @param {string} tableName - El nombre de la tabla de Supabase.
 * @param {object} item - El objeto de datos a insertar.
 */
export const insertItem = async (tableName, item) => {
  const { data, error } = await supabase
    .from(tableName)
    .insert([item])
    .select(); // Retorna los datos insertados
  
  if (error) throw error;
  return data[0];
};

/**
 * Actualiza un registro por su 'id' en una tabla.
 * @param {string} tableName - El nombre de la tabla de Supabase.
 * @param {string} id - El ID del registro a actualizar.
 * @param {object} updates - El objeto de datos con las actualizaciones.
 */
export const updateItem = async (tableName, id, updates) => {
  const { data, error } = await supabase
    .from(tableName)
    .update(updates)
    .eq('id', id)
    .select(); // Retorna los datos actualizados
  
  if (error) throw error;
  return data[0];
};

/**
 * Borra un registro por su 'id' en una tabla.
 * @param {string} tableName - El nombre de la tabla de Supabase.
 * @param {string} id - El ID del registro a borrar.
 */
export const deleteItem = async (tableName, id) => {
  const { error } = await supabase
    .from(tableName)
    .delete()
    .eq('id', id);
  
  if (error) throw error;
  return true;
};


// src/pages/Dashboard/Dashboard.api.js

// ... (Todas tus funciones CRUD genéricas: readAll, insertItem, updateItem, deleteItem)

// ------------------------------------------------------------------
// FUNCIONES ESPECÍFICAS DE STORAGE (Para Animales)
// ------------------------------------------------------------------

/**
 * Sube un archivo al Supabase Storage y devuelve la URL pública.
 * @param {string} bucketName - El nombre del bucket de Storage (e.g., 'animal-images').
 * @param {string} folderPath - La carpeta dentro del bucket (e.g., 'public').
 * @param {File} file - El objeto de archivo a subir.
 * @returns {string} La URL pública del archivo subido.
 */
export const uploadImageAndGetUrl = async (bucketName, folderPath, file) => {
    
    // 💥 PASO 1: Normalizar el nombre del archivo para eliminar acentos y espacios
    const safeFileName = slugify(file.name); 

    // Crea una ruta única y segura para evitar colisiones y caracteres inválidos
    // El formato será: folderPath/timestamp-nombre-limpio.jpg
    const filePath = `${folderPath}/${Date.now()}-${safeFileName}`;
    
    // 1. Subir la imagen
    const { error: uploadError } = await supabase.storage
        .from(bucketName)
        .upload(filePath, file);
        
    if (uploadError) {
        // Mejorar el manejo de errores para el front-end
        console.error("Supabase Upload Error:", uploadError);
        throw new Error(`Error al subir imagen: ${uploadError.message}. Intenta renombrar el archivo.`);
    }

    // 2. Obtener la URL pública
    const { data: { publicUrl } } = supabase.storage
        .from(bucketName)
        .getPublicUrl(filePath);

    return publicUrl;
};

/**
 * Limpia la cadena: elimina acentos, convierte a minúsculas y reemplaza espacios con guiones.
 * Ejemplo: "Elefante Asiático.jpg" -> "elefante-asiatico.jpg"
 */
const slugify = (str) => {
  return str
    .toLowerCase()
    .normalize("NFD") // Normaliza (separa el acento del carácter base)
    .replace(/[\u0300-\u036f]/g, "") // Elimina los diacríticos (acentos)
    .replace(/[^a-z0-9.]+/g, "-") // Reemplaza todo lo que no sea alfanumérico o punto con guión
    .replace(/^-+|-+$/g, ""); // Elimina guiones al inicio o al final
};