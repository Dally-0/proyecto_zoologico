import React, { useEffect, useState } from 'react'
import { registerVolunteer, getMyVolunteer } from './Volunteers.api'
import './Volunteers.css'

const Volunteers = () => {
  const [form, setForm] = useState({
    full_name: '',
    email: '',
    phone: '',
    message: ''
  })
  const [volunteer, setVolunteer] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchVolunteer = async () => {
      try {
        const data = await getMyVolunteer()
        setVolunteer(data)
      } catch (err) {
        console.log(err.message)
      } finally {
        setLoading(false)
      }
    }
    fetchVolunteer()
  }, [])

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)
    try {
      const data = await registerVolunteer(form)
      setVolunteer(data)
    } catch (err) {
      setError(err.message)
    }
  }

  if (loading) return <p>Cargando...</p>

  if (volunteer) {
    return (
      <div className="volunteer-info">
        <h2>Tu registro de voluntario</h2>
        <p><strong>Nombre:</strong> {volunteer.full_name}</p>
        <p><strong>Email:</strong> {volunteer.email}</p>
        <p><strong>Teléfono:</strong> {volunteer.phone}</p>
        <p><strong>Motivacion:</strong> {volunteer.message}</p>
        <p><strong>Estado:</strong> {volunteer.status}</p>
      </div>
    )
  }

  return (
    <div className="volunteer-form">
      <h2>Regístrate como voluntario</h2>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="full_name"
          placeholder="Nombre completo"
          value={form.full_name}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Correo electrónico"
          value={form.email}
          onChange={handleChange}
          required
        />
        <input
          type="tel"
          name="phone"
          placeholder="Teléfono (opcional)"
          value={form.phone}
          onChange={handleChange}
        />
        <label>¿Por que desea ser voluntario?</label>
        <textarea
          name="message"
          placeholder="Mensaje opcional"
          value={form.message}
          onChange={handleChange}
        />
        <button type="submit">Registrarme</button>
      </form>
    </div>
  )
}

export default Volunteers
