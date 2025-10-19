import React, { useState } from 'react';

function Contacto() {
  const [formData, setFormData] = useState({ nombre: '', correo: '', mensaje: '' });

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    alert('Mensaje enviado con éxito.');
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
        <button type="submit">Enviar</button>
      </form>
    </main>
  );
}

export default Contacto;
