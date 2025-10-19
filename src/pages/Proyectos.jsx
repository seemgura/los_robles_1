import React from 'react';
import CardProyecto from '../components/CardProyecto';
import data from '../data/proyectos.json';

function Proyectos() {
  return (
    <main>
      <h2>Proyectos</h2>
      <div className="lista-proyectos">
        {data.map((item, i) => (
          <CardProyecto key={i} nombre={item.nombre} descripcion={item.descripcion} imagen={item.imagen} />
        ))}
      </div>
    </main>
  );
}

export default Proyectos;
