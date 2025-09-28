import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';
import { NavItems } from "./NavItems";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h4>🐾 Zoo Dally</h4>
          <p>Dedicados a la conservación y educación de la vida salvaje desde 1985.</p>
        </div>

        <div className="footer-section">
          <h4>Dirección</h4>
          <p>📍 Av. Naturalia 123, Parque Central</p>
        </div>
        
        <div className="footer-section">
          <h4>Horarios</h4>
          <p>Lunes - Domingo: 9:00 AM - 6:00 PM</p>
          <p>Última entrada: 5:00 PM</p>
        </div>
      </div>
      
      <div className="footer-bottom">
        <p>&copy; 2024 Zoo Naturalia. Todos los derechos reservados.</p>
      </div>
    </footer>
  );
};

export default Footer;