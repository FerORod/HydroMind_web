// components/Dashboard.js
import React, { useState } from "react";
import DashboardHeader from "./DashboardHeader";
import SensorChart from "./SensorChart";
import SensorChartHoy from "./SensorChartHoy";

const Dashboard = ({ user, onLogout }) => {
  const [view, setView] = useState("hoy"); // vista inicial = hoy

  return (
    <div>
      <DashboardHeader
        user={user}
        onLogout={onLogout}
        onViewChange={setView}
      />

      <main style={{ padding: "2rem" }}>
        {view === "hoy" && <SensorChartHoy user={user} />}
        {view === "historial" && <SensorChart user={user} />}
      </main>
    </div>
  );
};

export default Dashboard;
