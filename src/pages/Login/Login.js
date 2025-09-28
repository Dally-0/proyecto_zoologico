import React, { useState } from 'react'; // 👈 Corregido
import { Link } from 'react-router-dom';
import "./Login.css";
import SignInForm from "./SignIn";
import SignUpForm from "./SignUp";


// 🏆 Componente principal con el nombre "Login"
export default function Login() { // 👈 Renombrado y exportado correctamente
  const [type, setType] = useState("signIn");

  const handleOnClick = text => {
    if (text !== type) {
      setType(text);
      return;
    }
  };

  const containerClass =
    "container " + (type === "signUp" ? "right-panel-active" : "");

  return (
    <div className="App">
      
      <div className={containerClass} id="container">
        <SignUpForm />
        <SignInForm /> 
        <div className="overlay-container">
          <div className="overlay">
            <div className="overlay-panel overlay-left">
              <h1>¡Bienvenido de Nuevo!</h1>
              <p>
                Para mantenerte conectado con nosotros, por favor registrate con tu información personal
              </p>
              <button
                className="ghost"
                id="signIn"
                onClick={() => handleOnClick("signIn")}
              >
                Iniciar Sesión
              </button>
            </div>
            <div className="overlay-panel overlay-right">
              <h1>¡Hola!</h1>
              <p>Ingresa tus detalles personales y comienza tu viaje con nosotros</p>
              <button
                className="ghost "
                id="signUp"
                onClick={() => handleOnClick("signUp")}
              >
                Registrarse
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}; 