import React from 'react';
import { useNavigate, Outlet, Link } from 'react-router-dom';
import { useAuth } from '../../useAuth'; // Tu hook de autenticación
import { signOut } from '../Login/Login.api'; // Tu función de cierre de sesión
import './Dashboard.css'; // Para estilos del dashboard

function Dashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();

  // Protección: Redirige si no hay usuario
  if (!user) {
    navigate('/login');
    return null; 
  }

  // Opcional: Redirigir si el usuario no tiene rol de admin
  // if (user && user.user_metadata?.role !== 'admin') {
  //   navigate('/'); // Redirigir a home o una página de acceso denegado
  //   return null;
  // }

  const handleLogout = async () => {
    try {
      await signOut();
      navigate('/login');
    } catch (error) {
      console.error("Error al cerrar sesión desde el dashboard:", error);
    }
  };

  return (
    <div className="dashboard-layout">
      <aside className="dashboard-sidebar">
        <h2 className="dashboard-logo">Admin Zoo</h2>
        <nav className="dashboard-nav">
          <ul>
            
            <li><Link to="/dashboard/contactos">Contactos</Link></li>
            <li><Link to="/dashboard/animales">Animales</Link></li>
            <li><Link to="/dashboard/faqs">FAQs</Link></li>
            <li><Link to="/dashboard/tickets">Tickets</Link></li>
            <li><Link to="/dashboard/voluntarios">Voluntarios</Link></li>
            <li><Link to="/dashboard/profiles">Perfiles</Link></li>
            
          </ul>
        </nav>
      </aside>
      <main className="dashboard-content">
        {/* Aquí se renderizarán los componentes anidados (ContactosManagement, etc.) */}
        <Outlet /> 
      </main>
    </div>
  );
}

export default Dashboard;