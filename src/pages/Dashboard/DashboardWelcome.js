import React from 'react';

function DashboardWelcome() {
  return (
    <div className="dashboard-welcome-page">
      <header>
        <h1>👋 ¡Bienvenido/a al Panel de Administración de Zoo Naturalia!</h1>
        <p>
          Esta es tu consola de gestión centralizada. Utiliza el menú lateral (sidebar) para navegar y administrar todos los contenidos y datos de la aplicación.
        </p>
      </header>
      
      <section className="dashboard-overview-cards">
        <h2>Tareas Clave de Gestión</h2>
        
        <div className="card-list">
          <div className="card">
            <h3>Gestión de Contenido</h3>
            <ul>
              <li>Administra la lista de **Animales** y sube nuevas imágenes.</li>
              <li>Actualiza las **FAQs** (Preguntas Frecuentes) del sitio.</li>
            </ul>
          </div>
          
          <div className="card">
            <h3>Atención al Usuario</h3>
            <ul>
              <li>Revisa y responde los mensajes de **Contactos**.</li>
              <li>Analiza las aplicaciones de **Voluntarios** y actualiza su estado.</li>
              <li>Visualiza el historial de compra de **Tickets**.</li>
            </ul>
          </div>

          <div className="card">
            <h3>Seguridad y Usuarios</h3>
            <ul>
              <li>Gestiona los **Perfiles** de los usuarios y actualiza sus roles.</li>
              <li>Recuerda **Cerrar Sesión** de forma segura al finalizar.</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Opcional: Puedes añadir aquí un resumen de estadísticas si tienes APIs para ello */}
      {/* <section>
        <h2>Resumen Rápido</h2>
        <p>Tickets vendidos hoy: 15</p>
        <p>Nuevos mensajes de contacto: 3</p>
      </section> */}
    </div>
  );
}

export default DashboardWelcome;

// Nota: Asegúrate de añadir estilos en Dashboard.css para .dashboard-welcome-page y .card-list para un mejor layout.