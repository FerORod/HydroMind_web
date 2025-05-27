// components/SensorChart.js
import React, { useEffect, useState } from "react";
import { database, ref, onValue } from "../config/firebaseConfig";
import { Line } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
import "chartjs-adapter-date-fns";
import {
  subWeeks,
  subMonths,
  subYears,
  isAfter,
  startOfDay,
} from "date-fns";
import "../styles/App.css";

Chart.register(...registerables);

const SensorChart = ({ user }) => {
  const [sensorData, setSensorData] = useState([]);
  const [range, setRange] = useState("today");

  useEffect(() => {
    if (!user) return;

    const sensorRef = ref(database, `/users/${user.user}/sensors/sensor_1/measurement`);
    onValue(sensorRef, (snapshot) => {
      const data = snapshot.val();

      if (data) {
        const formattedData = Object.keys(data).map((timestamp) => ({
          timestamp: new Date(timestamp),
          value: data[timestamp].value,
        }));
        setSensorData(formattedData);
      }
    });
  }, [user]);

  const filterDataByRange = (data, range) => {
    const now = new Date();
    let startDate;

    switch (range) {
      case "today":
        startDate = startOfDay(now);
        break;
      case "week":
        startDate = subWeeks(now, 1);
        break;
      case "month":
        startDate = subMonths(now, 1);
        break;
      case "year":
        startDate = subYears(now, 1);
        break;
      default:
        return data;
    }

    return data.filter((d) => isAfter(d.timestamp, startDate));
  };

  const getTimeUnit = (range) => {
    switch (range) {
      case "today":
        return "hour";
      case "week":
        return "day";
      case "month":
        return "day";
      case "year":
        return "month";
      default:
        return "hour";
    }
  };

  const filteredData = filterDataByRange(sensorData, range);
  const timeUnit = getTimeUnit(range);

  return (
    <div className="sensor-chart-container">
      <h3>Historial de Consumo</h3>
      <div style={{ marginBottom: "10px", textAlign: "center" }}>
        <label>Filtrar por: </label>
        <select value={range} onChange={(e) => setRange(e.target.value)}>
          <option value="today">Hoy</option>
          <option value="week">Esta semana</option>
          <option value="month">Este mes</option>
          <option value="year">Este año</option>
        </select>
      </div>
      <div className="sensor-chart">
        <Line
          data={{
            labels: filteredData.map((d) => d.timestamp),
            datasets: [
              {
                label: "Flujo de agua",
                data: filteredData.map((d) => d.value),
                fill: false,
                borderColor: "#0066FF",
                tension: 0.2,
              },
            ],
          }}
          options={{
            responsive: true,
            plugins: {
              legend: { position: "top" },
              title: {
                display: true,
                text: "Sensor 1 - Consumo de agua",
              },
            },
            scales: {
              x: {
                type: "time",
                time: { unit: timeUnit, stepSize: 1 },
                title: {
                  display: true,
                  text: "Tiempo",
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

export default SensorChart;