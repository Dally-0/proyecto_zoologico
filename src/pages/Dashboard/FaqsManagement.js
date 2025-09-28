import React, { useState, useEffect } from 'react';
import { readAll, insertItem, updateItem, deleteItem } from './Dashboard.api';

function FaqsManagement() {
  const [faqs, setFaqs] = useState([]);
  const [editingFaq, setEditingFaq] = useState(null);
  const [formData, setFormData] = useState({ question: '', answer: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchFaqs();
  }, []);

  const fetchFaqs = async () => {
    setLoading(true);
    try {
      const data = await readAll('faqs'); // Nombre de la tabla
      setFaqs(data);
    } catch (err) {
      setError('Error al cargar FAQs: ' + err.message);
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
      if (editingFaq) {
        await updateItem('faqs', editingFaq.id, formData);
        alert('FAQ actualizada!');
      } else {
        await insertItem('faqs', formData);
        alert('FAQ insertada!');
      }
      setFormData({ question: '', answer: '' });
      setEditingFaq(null);
      fetchFaqs();
    } catch (err) {
      setError('Error al guardar FAQ: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (faq) => {
    setEditingFaq(faq);
    setFormData({ question: faq.question, answer: faq.answer });
  };

  const handleDelete = async (id) => {
    if (!window.confirm('¿Estás seguro de que quieres eliminar esta FAQ?')) return;
    setLoading(true);
    try {
      await deleteItem('faqs', id);
      alert('FAQ eliminada!');
      fetchFaqs();
    } catch (err) {
      setError('Error al eliminar FAQ: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Gestión de Preguntas Frecuentes (FAQs)</h2>
      {error && <p className="error">{error}</p>}
      
      {/* Formulario de Crear/Editar */}
      <form onSubmit={handleSubmit} className="form-card">
        <h3>{editingFaq ? 'Editar FAQ' : 'Añadir Nueva FAQ'}</h3>
        <input type="text" name="question" value={formData.question} onChange={handleChange} placeholder="Pregunta" required />
        <textarea name="answer" value={formData.answer} onChange={handleChange} placeholder="Respuesta" required></textarea>
        <button type="submit" disabled={loading}>{loading ? 'Guardando...' : (editingFaq ? 'Actualizar' : 'Añadir')}</button>
        {editingFaq && <button type="button" onClick={() => {setEditingFaq(null); setFormData({question:'',answer:''})}}>Cancelar</button>}
      </form>

      {/* Lista de FAQs */}
      <div className="table-card">
        <h3>Lista de FAQs</h3>
        {loading && <p>Cargando FAQs...</p>}
        {!loading && faqs.length === 0 && <p>No hay FAQs.</p>}
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Pregunta</th>
              <th>Respuesta</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {faqs.map((faq) => (
              <tr key={faq.id}>
                <td>{faq.id.substring(0, 8)}...</td>
                <td>{faq.question}</td>
                <td>{faq.answer}</td>
                <td>
                  <button onClick={() => handleEdit(faq)}>Editar</button>
                  <button onClick={() => handleDelete(faq.id)}>Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default FaqsManagement;