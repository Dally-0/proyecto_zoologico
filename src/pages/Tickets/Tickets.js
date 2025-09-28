import React, { useEffect, useState } from 'react'
import { createTicket, getMyTickets } from './Tickets.api'

export default function Tickets() {
  const [tickets, setTickets] = useState([])
  const [form, setForm] = useState({
    date: '',
    type: '',
    quantity: 1,
    price: 0, // precio total
  })

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const data = await getMyTickets()
        setTickets(data)
      } catch (err) {
        console.error(err)
      }
    }
    fetchTickets()
  }, [])

  // Actualiza el tipo y recalcula precio total
  const handleTypeChange = (e) => {
    const type = e.target.value
    const unitPrice = type === 'VIP' ? 80 : type === 'Normal' ? 50 : 0
    const total = unitPrice * form.quantity
    setForm({ ...form, type, price: total })
  }

  // Actualiza cantidad y recalcula precio total
  const handleQuantityChange = (e) => {
    const quantity = parseInt(e.target.value) || 1
    const unitPrice = form.type === 'VIP' ? 80 : form.type === 'Normal' ? 50 : 0
    const total = unitPrice * quantity
    setForm({ ...form, quantity, price: total })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      if (!form.type || !form.date) {
        alert('Completa todos los campos')
        return
      }
      const newTicket = await createTicket(form)
      setTickets([newTicket, ...tickets])
      setForm({ date: '', type: '', quantity: 1, price: 0 })
    } catch (err) {
      alert(err.message)
    }
  }

  return (
    <div>
      <h2>Mis Tickets</h2>

      <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
        <input
          type="date"
          value={form.date}
          onChange={e => setForm({ ...form, date: e.target.value })}
          required
        />

        <select value={form.type} onChange={handleTypeChange} required>
          <option value="">Selecciona tipo</option>
          <option value="Normal">Normal</option>
          <option value="VIP">VIP</option>
        </select>
        <label>cantidad</label>
        <input
          type="number"
          min="1"
          placeholder="Cantidad"
          value={form.quantity}
          onChange={handleQuantityChange}
          required
        />

        <input
          type="number"
          value={form.price}
          readOnly
          placeholder="Precio total"
        />

        <button type="submit">Crear Ticket</button>
      </form>

      <ul>
        {tickets.map(t => (
          <li key={t.id}>
            📅 {t.date} — 🎟 {t.type} × {t.quantity} — 💲{t.price}
          </li>
        ))}
      </ul>
    </div>
  )
}
