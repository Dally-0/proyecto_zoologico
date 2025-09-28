import React, { useState, useEffect } from 'react';
import { readAll, updateItem, deleteItem } from './Dashboard.api';
// ⚠️ IMPORTANTE: Necesitas importar tu hook de autenticación aquí para obtener el ID del usuario actual.
// import { useUser } from '../hooks/useUser'; 

function ProfilesManagement() {
  const [profiles, setProfiles] = useState([]);
  const [editingProfile, setEditingProfile] = useState(null);
  const [formData, setFormData] = useState({ full_name: '', email: '', role: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // ⚠️ Reemplaza esta línea para obtener el ID real del usuario logueado
  // (Ejemplo: const { user } = useUser(); const currentUserId = user?.id;)
  const currentUserId = 'REEMPLAZAR_CON_EL_ID_DEL_USUARIO_LOGUEADO'; 
  
  useEffect(() => {
    fetchProfiles();
  }, []);

  const fetchProfiles = async () => {
    setLoading(true);
    try {
      // Intenta obtener TODOS los perfiles (esto requiere la política RLS de administrador)
      const data = await readAll('profiles'); 
      setProfiles(data);
    } catch (err) {
      setError('Error al cargar perfiles: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  // ... (Las funciones handleChange, handleEdit, handleSubmit, handleDelete se mantienen igual) ...

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleEdit = (profile) => {
    setEditingProfile(profile);
    setFormData({ full_name: profile.full_name, email: profile.email, role: profile.role });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      if (editingProfile) {
        await updateItem('profiles', editingProfile.id, formData);
        alert('Perfil actualizado!');
      }
      setFormData({ full_name: '', email: '', role: '' });
      setEditingProfile(null);
      fetchProfiles();
    } catch (err) {
      setError('Error al actualizar perfil: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('¿Estás seguro de que quieres eliminar este perfil? Esto también borrará al usuario de Supabase Auth.')) return;
    setLoading(true);
    try {
      await deleteItem('profiles', id);
      alert('Perfil eliminado!');
      fetchProfiles();
    } catch (err) {
      setError('Error al eliminar perfil: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  // Separar el perfil propio del resto
  const myProfile = profiles.find(p => p.id === currentUserId);
  const otherProfiles = profiles.filter(p => p.id !== currentUserId);


  return (
    <div>
      <h2>Gestión de Perfiles de Usuarios</h2>
      {error && <p className="error">{error}</p>}
      
      {/* -------------------------------------- */}
      {/* 1. VISTA DE MI PROPIO PERFIL */}
      {/* -------------------------------------- */}
      {myProfile && (
        <div className="card my-profile-card">
          <h3>Tu Perfil Actual (ID: {myProfile.id.substring(0, 8)}...)</h3>
          <p><strong>Nombre:</strong> {myProfile.full_name}</p>
          <p><strong>Email:</strong> {myProfile.email}</p>
          <p><strong>Rol:</strong> 
            <span style={{fontWeight: 'bold', color: myProfile.role === 'admin' ? 'red' : 'green'}}>
              {myProfile.role.toUpperCase()}
            </span>
          </p>
          <button onClick={() => handleEdit(myProfile)} disabled={loading}>
            Editar Mi Perfil
          </button>
        </div>
      )}
      
      {/* -------------------------------------- */}
      {/* 2. FORMULARIO DE EDICIÓN (para mi o para otros) */}
      {/* -------------------------------------- */}
      {editingProfile && (
        <form onSubmit={handleSubmit} className="form-card">
          <h3>{editingProfile.id === currentUserId ? 'Editar Mi Perfil' : `Editar Perfil de ${editingProfile.full_name}`}</h3>
          <input type="text" name="full_name" value={formData.full_name} onChange={handleChange} placeholder="Nombre Completo" required />
          {/* Email suele ser ineditable */}
          <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" disabled /> 
          
          {/* Solo permitir cambiar el rol si no está editando su propio perfil (opcional, pero buena práctica) */}
          <label>Rol:</label>
          <select name="role" value={formData.role} onChange={handleChange} disabled={editingProfile.id === currentUserId && !myProfile.role === 'admin'}>
            <option value="user">Usuario</option>
            <option value="admin">Administrador</option>
            <option value="volunteer">Voluntario</option>
          </select>
          
          <button type="submit" disabled={loading}>{loading ? 'Actualizando...' : 'Actualizar Perfil'}</button>
          <button type="button" onClick={() => {setEditingProfile(null); setFormData({full_name:'',email:'',role:''})}}>Cancelar</button>
        </form>
      )}

      {/* -------------------------------------- */}
      {/* 3. TABLA DE GESTIÓN DE OTROS PERFILES */}
      {/* -------------------------------------- */}
      <div className="table-card" style={{ marginTop: '20px' }}>
        <h3>Lista de Otros Perfiles para Gestión</h3>
        {loading && <p>Cargando perfiles...</p>}
        {!loading && otherProfiles.length === 0 && <p>No hay otros perfiles.</p>}
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre Completo</th>
              <th>Email</th>
              <th>Rol</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {otherProfiles.map((profile) => (
              <tr key={profile.id}>
                <td>{profile.id.substring(0, 8)}...</td>
                <td>{profile.full_name}</td>
                <td>{profile.email}</td>
                <td>{profile.role}</td>
                <td>
                  <button onClick={() => handleEdit(profile)} disabled={loading}>Editar</button>
                  <button onClick={() => handleDelete(profile.id)} disabled={loading}>Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ProfilesManagement;