import React, { useState, useEffect } from 'react';
import { readAll } from './Dashboard.api';

function TicketsView() {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchTickets();
  }, []);

  const fetchTickets = async () => {
    setLoading(true);
    try {
      const data = await readAll('tickets'); // Nombre de la tabla
      setTickets(data);
    } catch (err) {
      setError('Error al cargar tickets: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Tickets Vendidos</h2>
      {error && <p className="error">{error}</p>}
      
      <div className="table-card">
        <h3>Lista de Compras</h3>
        {loading && <p>Cargando tickets...</p>}
        {!loading && tickets.length === 0 && <p>No hay tickets registrados.</p>}
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Usuario ID</th>
              <th>Fecha Visita</th>
              <th>Tipo</th>
              <th>Cantidad</th>
              <th>Precio Total</th>
              <th>Fecha Compra</th>
            </tr>
          </thead>
          <tbody>
            {tickets.map((ticket) => (
              <tr key={ticket.id}>
                <td>{ticket.id.substring(0, 8)}...</td>
                <td>{ticket.user_id.substring(0, 8)}...</td>
                <td>{new Date(ticket.date).toLocaleDateString()}</td>
                <td>{ticket.type}</td>
                <td>{ticket.quantity}</td>
                <td>${ticket.price ? ticket.price.toFixed(2) : 'N/A'}</td>
                <td>{new Date(ticket.created_at).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default TicketsView;