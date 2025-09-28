import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

// Componentes
import { Navbar } from './components/common/Navbar'; 
import Footer from './components/common/Footer';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import Tickets from './pages/Tickets/Tickets';
import Volunteers from './pages/Volunteers/Volunteers';
import Dashboard from './pages/Dashboard/Dashboard';
import DashboardWelcome from './pages/Dashboard/DashboardWelcome';
import AnimalsManagement from './pages/Dashboard/AnimalsManagement';
import ContactosManagement from './pages/Dashboard/ContactosManagement'; // 👈 FIX: Estaba faltando
import FaqsManagement from './pages/Dashboard/FaqsManagement';         // 👈 FIX: Estaba faltando
import ProfilesManagement from './pages/Dashboard/ProfilesManagement';   // 👈 FIX: Estaba faltando
import TicketsView from './pages/Dashboard/TicketsView';                 // 👈 FIX: Estaba faltando
import VolunteersManagement from './pages/Dashboard/VolunteersManagement';
import Animals from './pages/Animals/Animals';
//import Contact from './pages/Contact/Contact';
//import FAQ from './pages/FAQ/FAQ';
//import NotFound from './pages/NotFound/NotFound';
 
// Componentes anidados del Dashboard (basados en tu estructura)



function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/Login" element={<Login />} />
            <Route path="/Tickets" element={<Tickets/>} />
            <Route path="/Volunteers" element={<Volunteers/>} />
            <Route path="/Animals" element={<Animals/>} />
            
            
            <Route path="/dashboard" element={<Dashboard />}>
              
              {/* index: Es el componente que se carga por defecto en /dashboard */}
              <Route index element={<DashboardWelcome />} />
              <Route path="Animales" element={<AnimalsManagement />} />
              <Route path="contactos" element={<ContactosManagement />} />
              <Route path="faqs" element={<FaqsManagement />} />
              <Route path="profiles" element={<ProfilesManagement />} />
              <Route path="tickets" element={<TicketsView />} />
              <Route path="voluntarios" element={<VolunteersManagement />} />
            </Route>
            
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;