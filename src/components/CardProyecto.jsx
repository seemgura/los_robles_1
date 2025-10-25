import React from 'react';
import './CardProyecto.css';

function CardProyecto({ nombre, descripcion, imagen }) {
  return (
    <div className="card-proyecto">
      <img src={imagen} alt={nombre} loading="lazy" className="card-imagen" />
      <div className="card-contenido">
        <h3>{nombre}</h3>
        <p>{descripcion}</p>
      </div>
    </div>
  );
}

export default React.memo(CardProyecto);
