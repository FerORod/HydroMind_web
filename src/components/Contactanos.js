// components/Contactanos.js
import React from "react";
import "../styles/App.css";

const Contactanos = () => {
  return (
    <div className="home-background">
      <div className="sobre-nosotros-box">
        <h2>Contáctanos</h2>
        <p>
          ¿Tienes preguntas, sugerencias o deseas colaborar con nosotros?
          Puedes comunicarte a través de los siguientes medios:
        </p>
        <ul>
          <li><strong>Correo electrónico:</strong> contacto@hydromind.app</li>
          <li><strong>Teléfono:</strong> +52 55 1234 5678</li>
          <li><strong>Dirección:</strong> Av. del Agua 123, Ciudad Sustentable, MX</li>
        </ul>
        <p>
          Nuestro equipo estará encantado de ayudarte lo antes posible.
        </p>
        <p className="nota-contacto">
          * Esta información de contacto es simulada y no corresponde a datos reales. *
        </p>
      </div>
    </div>
  );
};

export default Contactanos;
