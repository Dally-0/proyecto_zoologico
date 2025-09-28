import React, { useState, useEffect } from 'react';
import { readAll, updateItem } from './Dashboard.api';

function VolunteersManagement() {
  const [voluntarios, setVoluntarios] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  // Estado para rastrear los estados seleccionados localmente (sin guardar)
  const [selectedStatuses, setSelectedStatuses] = useState({}); 

  useEffect(() => {
    fetchVoluntarios();
  }, []);

  const fetchVoluntarios = async () => {
    setLoading(true);
    try {
      const data = await readAll('volunteers'); // Nombre de la tabla
      setVoluntarios(data);
      
      // Inicializar selectedStatuses con los estados actuales de la DB
      const initialStatuses = data.reduce((acc, voluntario) => {
        acc[voluntario.id] = voluntario.status;
        return acc;
      }, {});
      setSelectedStatuses(initialStatuses);
      
    } catch (err) {
      console.error("Error al cargar voluntarios:", err);
      setError('Error al cargar voluntarios: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  // 1. Función para manejar la selección en el <select> (SOLO actualiza el estado local)
  const handleSelectChange = (id, newStatus) => {
    setSelectedStatuses(prev => ({
      ...prev,
      [id]: newStatus
    }));
  };

  // 2. Función que se llama al hacer click en el botón (ACTUALIZA la BD)
  const handleUpdateClick = async (id) => {
    const newStatus = selectedStatuses[id];
    const voluntarioToUpdate = voluntarios.find(v => v.id === id);
    const currentStatus = voluntarioToUpdate?.status;

    // Verificación: No actualizar si el estado no ha cambiado
    if (!newStatus || newStatus === currentStatus) {
        alert('El estado es el mismo o inválido. No se realizó ninguna actualización.');
        return;
    }

    setLoading(true);
    
    // 💥 Diagnóstico crucial: Imprime el ID antes de la llamada 💥
    console.log(`Intentando actualizar ID: ${id} a estado: ${newStatus}`);
    
    try {
      // Llamada a la API para actualizar en Supabase
      const updatedData = await updateItem('volunteers', id, { status: newStatus });
      
      // Validación: Si la función updateItem no devuelve la fila (array vacío)
      if (!updatedData) { 
          // ⚠️ Lanzamos un error más claro para capturar el fallo del ID/RLS ⚠️
          throw new Error(`Fallo en la BD: No se encontró la fila con ID: ${id}. (Revisa el ID o la RLS)`);
      }
      
      alert('Estado de voluntario actualizado con éxito!');
      
      // Actualizar la lista de voluntarios en el componente
      setVoluntarios(prevVoluntarios =>
        prevVoluntarios.map(v =>
          v.id === id ? { ...v, status: newStatus } : v
        )
      );

    } catch (err) {
      // Si falla, mostramos el error y hacemos rollback del selector
      console.error('Error de Supabase (handleUpdateClick):', err.message);
      setError('Error al actualizar estado: ' + err.message);
      
      // Restablecer el selector local al estado anterior de la base de datos
      setSelectedStatuses(prev => ({
          ...prev,
          [id]: currentStatus 
      }));

    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div>
      <h2>Gestión de Voluntarios</h2>
      {error && <p className="error">{error}</p>}
      
      <div className="table-card">
        <h3>Lista de Aplicaciones de Voluntarios</h3>
        {loading && <p>Cargando voluntarios...</p>}
        {!loading && voluntarios.length === 0 && <p>No hay aplicaciones de voluntarios.</p>}
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Email</th>
              <th>Teléfono</th>
              <th>Mensaje</th>
              <th>Status Actual</th>
              <th>Seleccionar</th>
              <th>Guardar</th> 
            </tr>
          </thead>
          <tbody>
            {voluntarios.map((voluntario) => (
              <tr key={voluntario.id}>
                <td>{voluntario.id.substring(0, 8)}...</td>
                <td>{voluntario.full_name}</td>
                <td>{voluntario.email}</td>
                <td>{voluntario.phone}</td>
                <td>{voluntario.message}</td>
                {/* Mostramos el estado actual de la BD */}
                <td>{voluntario.status}</td> 
                <td>
                  <select 
                    // El valor ahora viene de selectedStatuses o del valor inicial de la BD
                    value={selectedStatuses[voluntario.id] || voluntario.status} 
                    // Llama a la función local handleSelectChange
                    onChange={(e) => handleSelectChange(voluntario.id, e.target.value)} 
                    disabled={loading}
                  >
                    <option value="pendiente">Pendiente</option>
                    <option value="aceptado">Aceptado</option>
                    <option value="rechazado">Rechazado</option>
                  </select>
                </td>
                {/* Columna para el botón de acción */}
                <td>
                    <button 
                        onClick={() => handleUpdateClick(voluntario.id)} 
                        disabled={loading}
                        style={{ marginLeft: '10px' }}
                    >
                        Guardar
                    </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default VolunteersManagement;