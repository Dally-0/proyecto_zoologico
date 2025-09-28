import React from "react";
import { useNavigate } from "react-router-dom"; // 👈 para redirigir
import { signInWithEmail, signInWithGoogle } from "./Login.api"; // 👈 importamos funciones

function SignInForm() {
  const navigate = useNavigate(); // 👈 hook para redirección

  const [state, setState] = React.useState({
    email: "",
    password: "",
  });

  const [error, setError] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  const handleChange = (evt) => {
    const value = evt.target.value;
    setState({
      ...state,
      [evt.target.name]: value,
    });
  };

  const handleOnSubmit = async (evt) => {
    evt.preventDefault();
    setLoading(true);
    setError("");

    try {
      const { email, password } = state;
      await signInWithEmail(email, password); // 👈 inicia sesión en Supabase
      navigate("/"); // 👈 redirige a Home si es exitoso
    } catch (err) {
      console.error(err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await signInWithGoogle();
      // Supabase maneja la redirección automáticamente en OAuth
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="form-container sign-in-container">
      <form onSubmit={handleOnSubmit}>
        <h1>Iniciar Sesión</h1>

        <div className="social-container">
          <button type="button" className="social" onClick={handleGoogleSignIn}>
            <i className="fab fa-google-plus-g" /> Iniciar con Google
          </button>
        </div>

        <span>o usa tu cuenta</span>

        <input
          type="email"
          placeholder="Email"
          name="email"
          value={state.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Contraseña"
          value={state.password}
          onChange={handleChange}
          required
        />

        {error && <p style={{ color: "red" }}>{error}</p>}
        <button type="submit" disabled={loading}>
          {loading ? "Cargando..." : "Entrar"}
        </button>
      </form>
    </div>
  );
}

export default SignInForm;
