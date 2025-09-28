import React, { useEffect, useState } from 'react'
import { getAnimals } from './Animals.api'  // Importamos la función del API
import './Animals.css';


const Animales = () => {
  const [animals, setAnimals] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchAnimals = async () => {
      try {
        setLoading(true)
        const data = await getAnimals()
        setAnimals(data)
      } catch (err) {
        console.error(err)
        setError('Error al cargar los animales.')
      } finally {
        setLoading(false)
      }
    }

    fetchAnimals()
  }, [])

  if (loading) return <p className="loading">Cargando animales...</p>
  if (error) return <p className="error">{error}</p>

  return (
    <div className="animals-container">
      <h1>Animales del Zoológico 🐾</h1>
      <div className="grid-wrapper"> 
      <div className="animal-grid">
        {animals.map(animal => (
          <div key={animal.id} className="animal-card">
            {animal.image_url && (
              <img src={animal.image_url} alt={animal.name} className="animal-image" />
            )}
            <h2>{animal.name}</h2>
            <p><strong>Especie:</strong> {animal.species}</p>
            <p><strong>Edad:</strong> {animal.age} años</p>
            <p>{animal.description}</p>
          </div>
        ))}
      </div>
      </div>
    </div>
  )
}

export default Animales
