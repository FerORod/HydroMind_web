// components/SobreNosotros.js
import React from "react";
import "../styles/App.css";

const SobreNosotros = () => {
  return (
    <div className="home-background">
      <div className="sobre-nosotros-box">
        <h2>Sobre Nosotros</h2>
        <p>
          <strong>HydroMind</strong> es una solución digital enfocada en el monitoreo
          inteligente del consumo de agua. Nuestro objetivo es empoderar a las personas
          y organizaciones a través de datos claros y accesibles para promover el uso
          responsable y sostenible del recurso más vital del planeta: el agua.
        </p>
        <p>
          Con una interfaz sencilla y visualmente atractiva, HydroMind permite:
        </p>
        <ul>
          <li>Visualizar en tiempo real el consumo de agua.</li>
          <li>Acceder a un historial detallado de registros.</li>
          <li>Identificar patrones y oportunidades de ahorro.</li>
          <li>Fomentar la conciencia ambiental en el hogar, la industria o la comunidad.</li>
        </ul>
        <p>
          Somos un equipo comprometido con la innovación, la tecnología y el cuidado del
          medio ambiente. Creemos que el primer paso para cambiar el mundo es entender
          cómo lo estamos utilizando.
        </p>
        <p><em>💧 Hidratamos tu conciencia, gota a gota.</em></p>
      </div>
    </div>
  );
};

export default SobreNosotros;
