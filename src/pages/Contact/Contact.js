import { useState, useEffect } from "react"
import { insertContact, getFaqs } from "./Contact.api"
import "./Contact.css"

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" })
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState("")
  const [faqs, setFaqs] = useState([])

  useEffect(() => {
    // Cargar FAQs desde Supabase
    const loadFaqs = async () => {
      try {
        const data = await getFaqs()
        setFaqs(data)
      } catch (err) {
        console.error("Error cargando FAQs", err)
      }
    }
    loadFaqs()
  }, [])

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm({ ...form, [name]: value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setSuccess(false)
    setError("")
    try {
      await insertContact(form)
      setForm({ name: "", email: "", message: "" })
      setSuccess(true)
    } catch (err) {
      setError("❌ Ocurrió un error al enviar el mensaje.")
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="contact-container">
      <h1>📨 Contáctanos</h1>
      <p>¿Tienes alguna duda o sugerencia? Envíanos tu mensaje.</p>

      {/* 📋 FORMULARIO */}
      <form onSubmit={handleSubmit} className="contact-form">
        <input
          type="text"
          name="name"
          placeholder="Tu nombre"
          value={form.name}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Tu correo electrónico"
          value={form.email}
          onChange={handleChange}
          required
        />
        <textarea
          name="message"
          placeholder="Tu mensaje..."
          value={form.message}
          onChange={handleChange}
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? "Enviando..." : "Enviar mensaje"}
        </button>
      </form>

      {success && <p className="success-msg">✅ Mensaje enviado correctamente.</p>}
      {error && <p className="error-msg">{error}</p>}

      {/* 📍 MAPA */}
      <section className="map-section">
        <h2>📍 Nuestra ubicación</h2>
        <iframe
          title="Ubicación"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3816.0634445599526!2d-65.41376442382533!3d-16.97142928384656!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x93e443bbe8fe6b5b%3A0xdae6c76fc121988c!2sParque%20Mach%C3%ADa!5e0!3m2!1ses!2sbo!4v1759089081965!5m2!1ses!2sbo" 
          width="100%"
          height="300"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
        ></iframe>
      </section>

      {/* ❓ FAQS */}
      <section className="faq-section">
        <h2>❓ Preguntas Frecuentes</h2>
        {faqs.length === 0 ? (
          <p>No hay preguntas frecuentes disponibles.</p>
        ) : (
          <ul className="faq-list">
            {faqs.map((faq) => (
              <li key={faq.id} className="faq-item">
                <strong>{faq.question}</strong>
                <p>{faq.answer}</p>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  )
}
