import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

// Importar imágenes (asegúrate de tener estas imágenes en assets/images/)
import heroImage from '../../assets/images/hero-zoo.jpg';
import lionImage from '../../assets/images/lion.jpg';
import elephantImage from '../../assets/images/elephant.jpg';
import pandaImage from '../../assets/images/panda.jpg';

const Home = () => {
  const featuredAnimals = [
    {
      id: 1,
      name: 'León Africano',
      image: lionImage,
      description: 'El rey de la sabana en su hábitat natural'
    },
    {
      id: 2,
      name: 'Elefante Asiático',
      image: elephantImage,
      description: 'Uno de los animales más inteligentes del planeta'
    },
    {
      id: 3,
      name: 'Panda Gigante',
      image: pandaImage,
      description: 'Nuestro adorable embajador de la conservación'
    }
  ];

  const zooInfo = [
    { icon: '🐾', number: '150+', text: 'Especies diferentes' },
    { icon: '🌿', number: '50+', text: 'Hábitats naturales' },
    { icon: '⭐', number: '4.8', text: 'Rating de visitantes' },
    { icon: '👥', number: '100K+', text: 'Visitantes anuales' }
  ];

  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1>Bienvenido al Zoológico Naturalia</h1>
          <p>Descubre la magia de la vida salvaje en un entorno seguro y educativo</p>
          <div className="hero-buttons">
            <Link to="/tickets" className="btn btn-primary">Comprar Entradas</Link>
            <Link to="/animals" className="btn btn-secondary">Ver Animales</Link>
          </div>
        </div>
        <div className="hero-image">
          <img src={heroImage} alt="Vista del zoológico" />
        </div>
      </section>

      {/* Statistics Section */}
      <section className="stats-section">
        <div className="container">
          <div className="stats-grid">
            {zooInfo.map((item, index) => (
              <div key={index} className="stat-item">
                <span className="stat-icon">{item.icon}</span>
                <h3>{item.number}</h3>
                <p>{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Animals */}
      <section className="animals-section">
        <div className="container">
          <h2>Animales Destacados</h2>
          <div className="animals-grid">
            {featuredAnimals.map(animal => (
              <div key={animal.id} className="animal-card">
                <img src={animal.image} alt={animal.name} />
                <div className="animal-info">
                  <h3>{animal.name}</h3>
                  <p>{animal.description}</p>
                  <Link to="/animals" className="btn-link">Ver más</Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="cta-section">
        <div className="container">
          <h2>¿Te gustaría ser parte de nuestra familia?</h2>
          <p>Únete a nuestro programa de voluntarios y ayuda a conservar la vida salvaje</p>
          <Link to="/volunteers" className="btn btn-primary">Ser Voluntario</Link>
        </div>
      </section>

      {/* Quick Links */}
      <section className="links-section">
        <div className="container">
          <div className="links-grid">
            <div className="link-card">
              <h3>📅 Horarios</h3>
              <p>Lunes a Domingo: 9:00 AM - 6:00 PM</p>
            </div>
            <div className="link-card">
              <h3>📍 Ubicación</h3>
              <p>Av. Naturalia 123, Parque Central</p>
            </div>
            <div className="link-card">
              <h3>📞 Contacto</h3>
              <p>+1 234 567 8900</p>
              <Link to="/contact" className="btn-link">Contactarnos</Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;