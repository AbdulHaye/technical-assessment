"use client";

import MetricsChart from "../../components/dashboard/MetricsChart";
import DataGrid from "../../components/dashboard/DataGrid";
import StatusCards from "../../components/dashboard/StatusCards";
import { useState, useEffect } from "react";
import { fetchMetrics, fetchStatus } from "@/api/mock-data";

export default function Dashboard() {
  const [darkMode, setDarkMode] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const { data: metrics, refetch: refetchMetrics } = useQuery(
    ["metrics"],
    fetchMetrics
  );
  const { data: status, refetch: refetchStatus } = useQuery(
    ["status"],
    fetchStatus
  );

  useEffect(() => {
    const interval = setInterval(() => {
      refetchMetrics();
      refetchStatus();
    }, 10000);
    return () => clearInterval(interval);
  }, [refetchMetrics, refetchStatus]);

  return (
    <div
      className={`min-h-screen ${
        darkMode ? "dark bg-gray-900" : "bg-gray-100"
      }`}
    >
      <header className="p-4">
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="p-2 bg-blue-500 text-white rounded"
        >
          Toggle {darkMode ? "Light" : "Dark"} Mode
        </button>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search tasks..."
          className="ml-4 p-2 rounded"
        />
      </header>
      <main className="container mx-auto p-4">
        <MetricsChart />
        <DataGrid data={metrics || []} searchTerm={searchTerm} />
        <StatusCards data={status || []} />
      </main>
    </div>
  );
}
