import React, { useState, useEffect } from 'react';
import { readAll, insertItem, updateItem, deleteItem, uploadImageAndGetUrl } from './Dashboard.api';
import { useAuth } from '../../useAuth';

function AnimalsManagement() {
    // ... (Definición de estados y funciones, se mantienen igual) ...
    const { user } = useAuth(); 
    const [animales, setAnimales] = useState([]);
    const [editingAnimal, setEditingAnimal] = useState(null);
    const [formData, setFormData] = useState({ name: '', species: '', age: '', description: '', image_url: '' });
    const [imageFile, setImageFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchAnimales = async () => {
        setLoading(true);
        try {
            const data = await readAll('animals'); 
            setAnimales(data);
        } catch (err) {
            setError('Error al cargar animales: ' + err.message);
        } finally {
            setLoading(false);
        }
    };
    
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };
    
    const handleImageChange = (e) => {
        setImageFile(e.target.files[0]);
    };
    
    const handleEdit = (animal) => {
        setEditingAnimal(animal);
        setFormData({ name: animal.name, species: animal.species, age: animal.age, description: animal.description, image_url: animal.image_url });
        setImageFile(null);
    };

    const handleDelete = async (id) => {
        if (!window.confirm('¿Estás seguro de que quieres eliminar este animal?')) return;
        setLoading(true);
        try {
            await deleteItem('animals', id);
            alert('Animal eliminado!');
            fetchAnimales();
        } catch (err) {
            setError('Error al eliminar animal: ' + err.message);
        } finally {
            setLoading(false);
        }
    };
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        
        if (!user || !user.id) {
            setError("Error de autenticación: ID de usuario no disponible.");
            setLoading(false);
            return;
        }

        try {
            let imageUrl = formData.image_url;

            if (imageFile) {
                imageUrl = await uploadImageAndGetUrl('animal-images', 'public', imageFile);
            }

            const animalToSave = { 
                ...formData, 
                image_url: imageUrl,
                created_by: user.id 
            };

            if (editingAnimal) {
                await updateItem('animals', editingAnimal.id, animalToSave);
                alert('Animal actualizado!');
            } else {
                await insertItem('animals', animalToSave);
                alert('Animal insertado!');
            }
            
            setFormData({ name: '', species: '', age: '', description: '', image_url: '' });
            setImageFile(null);
            setEditingAnimal(null);
            fetchAnimales();
        } catch (err) {
            setError('Error al guardar animal: ' + err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAnimales();
    }, []);

    return (
        <div className="animals-container">
            <h2>Gestión de Animales</h2>
            {error && <p className="error">{error}</p>}
            
            {/* 💥 Se usa dashboard-grid para el layout responsive de formulario y tabla */}
            <div className="dashboard-grid">

                {/* Formulario (form-card asegura que ocupe todo el ancho en móvil) */}
                <form onSubmit={handleSubmit} className="form-card">
                    <h3>{editingAnimal ? 'Editar Animal' : 'Añadir Nuevo Animal'}</h3>
                    <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Nombre" required />
                    <input type="text" name="species" value={formData.species} onChange={handleChange} placeholder="Especie" required />
                    <input type="text" name="age" value={formData.age} onChange={handleChange} placeholder="Edad" />
                    <textarea name="description" value={formData.description} onChange={handleChange} placeholder="Descripción" required></textarea>
                    <input type="file" accept="image/*" onChange={handleImageChange} />
                    {formData.image_url && !imageFile && (
                        <p>Imagen actual: <a href={formData.image_url} target="_blank" rel="noopener noreferrer">Ver</a></p>
                    )}
                    <button type="submit" disabled={loading}>{loading ? 'Guardando...' : (editingAnimal ? 'Actualizar' : 'Añadir')}</button>
                    {editingAnimal && <button type="button" onClick={() => {setEditingAnimal(null); setFormData({name:'',species:'',age:'',description:'',image_url:''}); setImageFile(null);}}>Cancelar</button>}
                </form>

                {/* Lista de animales */}
                <div className="table-card">
                    <h3>Lista de Animales</h3>
                    {loading && <p>Cargando animales...</p>}
                    {!loading && animales.length === 0 && <p>No hay animales.</p>}
                    
                    {/* 💥 table-wrapper permite el scroll horizontal en la tabla en móvil */}
                    <div className="table-wrapper">
                        {/* 💥 responsive-table garantiza un ancho mínimo y estilos */}
                        <table className="responsive-table">
                            <thead>
                                <tr>
                                    <th>Imagen</th>
                                    <th>Nombre</th>
                                    <th>Especie</th>
                                    <th>Edad</th>
                                    <th>Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {animales.map((animal) => (
                                    <tr key={animal.id}>
                                        <td>{animal.image_url && <img src={animal.image_url} alt={animal.name} style={{ width: '50px', height: '50px', objectFit: 'cover' }} />}</td>
                                        <td>{animal.name}</td>
                                        <td>{animal.species}</td>
                                        <td>{animal.age}</td>
                                        <td>
                                            <button onClick={() => handleEdit(animal)}>Editar</button>
                                            <button onClick={() => handleDelete(animal.id)}>Eliminar</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div> {/* Fin de dashboard-grid */}
        </div>
    );
}

export default AnimalsManagement;