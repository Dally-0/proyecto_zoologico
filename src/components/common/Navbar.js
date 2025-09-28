import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';
import { NavItems } from "./NavItems"; // 👈 Asumo que NavItems incluye el elemento Dashboard

import { signOut } from '../../pages/Login/Login.api'; 
import { useAuth } from '../../useAuth'; 

export const Navbar = () => {
  const [open, setOpen] = useState(false);
  const { user } = useAuth(); // CLAVE: user DEBE contener el rol (ej: user.role === 'admin')
  const navigate = useNavigate();

  const handleClick = () => {
    setOpen(!open);
  };

  const handleLogout = async () => {
    try {
      await signOut(); 
      navigate('/'); 
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };

  // Lógica para construir la lista final de elementos de navegación
  const finalNavItems = NavItems
    // 1. FILTRAR: Excluir el Dashboard si el usuario NO es admin
    .filter(item => {
      // Si el elemento requiere ser admin y el usuario no está logueado o no es admin, lo oculta.
      if (item.requiresAdmin && (!user || user.role !== 'admin')) {
        return false;
      }
      return true; // Mostrar todos los demás
    })
    // 2. MAPEAR: Cambiar el botón de Login/Logout
    .map(item => {
      // Si el elemento es el botón de 'Login'
      if (item.title === 'Login') {
        if (user) {
          // Si hay usuario, devolver el botón de Logout
          return {
            title: "Cerrar Sesión",
            url: "#", 
            cName: "nav-button logout-button", 
            action: handleLogout 
          };
        } else {
          // Si no hay usuario, mantener el botón de Login
          return {
            ...item,
            url: "/login", 
            action: null
          };
        }
      }
      return item; // Devolver los otros elementos (incluyendo Dashboard si no fue filtrado)
    });

  return (
    <nav className="NavbarItems">
      <h3 className="logo">
        <Link to="/"> 
          <i className="fab fa-react"></i>Dally
        </Link>
      </h3>
      <div className="Hamburger-Cross-Icons" onClick={handleClick}>
        <i className={open ? "fas fa-times" : "fas fa-bars"}></i>
      </div>
      <ul className={open ? "MenuItems active" : "MenuItems"}>
        {finalNavItems.map((Item, index) => {
          const isLogoutButton = Item.title === "Cerrar Sesión";
          
          return (
            <li key={index}>
              {/* Renderizado condicional */}
              {isLogoutButton ? (
                <button onClick={Item.action} className={Item.cName}>
                  {Item.title}
                </button>
              ) : (
                <Link to={Item.url} className={Item.cName}>
                  {Item.icon && <i className={Item.icon}></i>}
                  {Item.title}
                </Link>
              )}
            </li>
          );
        })}
      </ul>
    </nav>
  );
};