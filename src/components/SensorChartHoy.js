// components/SensorChartHoy.js
import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
import "chartjs-adapter-date-fns";
import { startOfDay, isAfter } from "date-fns";
import { database, ref, onValue } from "../config/firebaseConfig";
import "../styles/App.css";

Chart.register(...registerables);

const SensorChartHoy = ({ user }) => {
  const [sensorData, setSensorData] = useState([]);

  useEffect(() => {
    if (!user) return;

    const sensorRef = ref(database, `/users/${user.user}/sensors/sensor_1/measurement`);
    onValue(sensorRef, (snapshot) => {
      const data = snapshot.val();
      const todayStart = startOfDay(new Date());
      const todayData = [];

      if (data) {
        Object.keys(data).forEach((key) => {
          const ts = new Date(key);
          if (isAfter(ts, todayStart)) {
            todayData.push({ timestamp: ts, value: data[key].value });
          }
        });
        setSensorData(todayData);
      }
    });
  }, [user]);

  return (
    <div className="sensor-chart-container">
      <h3>Consumo de Hoy</h3>
      <div className="sensor-chart">
        <Line
          data={{
            labels: sensorData.map((d) => d.timestamp),
            datasets: [
              {
                label: "Litros",
                data: sensorData.map((d) => d.value),
                borderColor: "#0066FF",
                fill: false,
                tension: 0.2,
              },
            ],
          }}
          options={{
            responsive: true,
            scales: {
              x: {
                type: "time",
                time: { unit: "hour" },
                title: {
                  display: true,
                  text: "Hora del día",
                },
              },
              y: {
                beginAtZero: true,
                title: {
                  display: true,
                  text: "Litros de agua",
                },
              },
            },
          }}
        />
      </div>
    </div>
  );
};

export default SensorChartHoy;