import React, { useState } from "react";
import { signUp } from "./Login.api";

function SignUpForm() {
  const [state, setState] = useState({ name: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (evt) => {
    setState({ ...state, [evt.target.name]: evt.target.value });
  };

  const handleOnSubmit = async (evt) => {
    evt.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const { name, email, password } = state;
      await signUp(email, password, name);
      setSuccess("✅ Registro exitoso. Verifica tu correo.");
      setState({ name: "", email: "", password: "" });
    } catch (err) {
      console.error(err);
      setError("❌ Error al registrarse: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-container sign-up-container">
      <form onSubmit={handleOnSubmit}>
        <h1>Crear Cuenta</h1>
        <span>o usa tus datos para registrarte</span>
        <input
          type="text"
          name="name"
          value={state.name}
          onChange={handleChange}
          placeholder="Nombre"
          required
        />
        <input
          type="email"
          name="email"
          value={state.email}
          onChange={handleChange}
          placeholder="Email"
          required
        />
        <input
          type="password"
          name="password"
          value={state.password}
          onChange={handleChange}
          placeholder="Contraseña"
          required
        />
        {error && <p className="error">{error}</p>}
        {success && <p className="success">{success}</p>}
        <button type="submit" disabled={loading}>
          {loading ? "Cargando..." : "Registrarse"}
        </button>
      </form>
    </div>
  );
}

export default SignUpForm;
