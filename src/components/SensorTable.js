import React, { useEffect, useState } from "react";
import { database, ref, onValue } from "../config/firebaseConfig";

const SensorTable = () => {
  const [sensorData, setSensorData] = useState([]);

  useEffect(() => {
    const sensorRef = ref(database, "/user_1/sensor/sensor_1/measurement");
    onValue(sensorRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const formattedData = Object.keys(data).map((key) => ({
          timestamp: key,
          value: data[key].value,
          unit: data[key].unit
        }));
        setSensorData(formattedData);
      }
    });
  }, []);

  return (
    <div style={{ width: "80%", margin: "auto" }}>
      <h2>Historial de Consumo de Agua</h2>
      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>Fecha y Hora</th>
            <th>Valor</th>
            <th>Unidad</th>
          </tr>
        </thead>
        <tbody>
          {sensorData.map((entry, index) => (
            <tr key={index}>
              <td>{entry.timestamp}</td>
              <td>{entry.value}</td>
              <td>{entry.unit}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SensorTable;