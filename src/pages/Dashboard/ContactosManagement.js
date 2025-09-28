import React, { useState, useEffect } from 'react';
import { readAll, insertItem, updateItem, deleteItem } from './Dashboard.api';

function ContactosManagement() {
  const [contactos, setContactos] = useState([]);
  const [editingContacto, setEditingContacto] = useState(null); // Para editar
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchContactos();
  }, []);

  const fetchContactos = async () => {
    setLoading(true);
    try {
      const data = await readAll('contacts'); // Nombre de la tabla
      setContactos(data);
    } catch (err) {
      setError('Error al cargar contactos: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      if (editingContacto) {
        await updateItem('contacts', editingContacto.id, formData);
        alert('Contacto actualizado!');
      } else {
        await insertItem('contacts', formData);
        alert('Contacto insertado!');
      }
      setFormData({ name: '', email: '', message: '' }); // Limpiar formulario
      setEditingContacto(null); // Resetear edición
      fetchContactos(); // Recargar datos
    } catch (err) {
      setError('Error al guardar contacto: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (contacto) => {
    setEditingContacto(contacto);
    setFormData({ name: contacto.name, email: contacto.email, message: contacto.message });
  };

  const handleDelete = async (id) => {
    if (!window.confirm('¿Estás seguro de que quieres eliminar este contacto?')) return;
    setLoading(true);
    try {
      await deleteItem('contacts', id);
      alert('Contacto eliminado!');
      fetchContactos();
    } catch (err) {
      setError('Error al eliminar contacto: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Gestión de Contactos</h2>
      {error && <p className="error">{error}</p>}
      
      {/* Formulario de Crear/Editar */}
      <form onSubmit={handleSubmit} className="form-card">
        <h3>{editingContacto ? 'Editar Contacto' : 'Añadir Nuevo Contacto'}</h3>
        <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Nombre" required />
        <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" required />
        <textarea name="message" value={formData.message} onChange={handleChange} placeholder="Mensaje" required></textarea>
        <button type="submit" disabled={loading}>{loading ? 'Guardando...' : (editingContacto ? 'Actualizar' : 'Añadir')}</button>
        {editingContacto && <button type="button" onClick={() => {setEditingContacto(null); setFormData({name:'',email:'',message:''})}}>Cancelar</button>}
      </form>

      {/* Lista de Contactos */}
      <div className="table-card">
        <h3>Lista de Contactos</h3>
        {loading && <p>Cargando contactos...</p>}
        {!loading && contactos.length === 0 && <p>No hay contactos.</p>}
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Email</th>
              <th>Mensaje</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {contactos.map((contacto) => (
              <tr key={contacto.id}>
                <td>{contacto.id.substring(0, 8)}...</td>
                <td>{contacto.name}</td>
                <td>{contacto.email}</td>
                <td>{contacto.message}</td>
                <td>
                  <button onClick={() => handleEdit(contacto)}>Editar</button>
                  <button onClick={() => handleDelete(contacto.id)}>Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ContactosManagement;