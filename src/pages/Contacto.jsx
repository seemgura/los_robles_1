import React, { useState } from 'react';

function Contacto() {
  const [formData, setFormData] = useState({ nombre: '', correo: '', mensaje: '' });
  const [error, setError] = useState('');
  const [enviado, setEnviado] = useState(false);

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (!formData.nombre || !formData.correo || !formData.mensaje) {
      setError('Todos los campos son obligatorios.');
      return;
    }
    setError('');
    setEnviado(true);
    setTimeout(() => setEnviado(false), 4000);
    setFormData({ nombre: '', correo: '', mensaje: '' });
  };

  return (
    <main>
      <h2>Contacto</h2>
      <form onSubmit={handleSubmit}>
        <label>Nombre:</label>
        <input name="nombre" value={formData.nombre} onChange={handleChange} required />
        <label>Correo:</label>
        <input name="correo" type="email" value={formData.correo} onChange={handleChange} required />
        <label>Mensaje:</label>
        <textarea name="mensaje" value={formData.mensaje} onChange={handleChange} required />
        {error && <p style={{ color: 'red' }}>{error}</p>}
        {enviado && <p style={{ color: 'green' }}>Mensaje enviado con éxito.</p>}
        <button type="submit">Enviar</button>
      </form>
    </main>
  );
}

export default Contacto;
