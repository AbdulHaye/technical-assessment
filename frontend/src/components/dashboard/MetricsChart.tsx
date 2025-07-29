"use client";

import { useQuery } from "@tanstack/react-query";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { fetchMetrics, TimeSeriesData } from "../../api/mock-data";

export default function MetricsChart() {
  const { data, isLoading, error, refetch } = useQuery<TimeSeriesData[], Error>(
    {
      queryKey: ["metrics", "day"],
      queryFn: () => fetchMetrics("day"),
      retry: 2,
      staleTime: 5 * 60 * 1000,
    }
  );

  if (isLoading) return <div className="p-4 text-center">Loading chart...</div>;
  if (error)
    return (
      <div className="p-4 text-center text-red-500">
        Error: {error.message}{" "}
        <button
          onClick={() => refetch()}
          className="ml-2 text-blue-500 underline"
        >
          Retry
        </button>
      </div>
    );

  return (
    <div className="bg-gray-800 p-4 rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-4">Performance Metrics</h2>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#4B5563" />
          <XAxis dataKey="timestamp" stroke="#D1D5DB" />
          <YAxis stroke="#D1D5DB" />
          <Tooltip
            contentStyle={{
              backgroundColor: "#1F2937",
              border: "none",
              color: "#fff",
            }}
          />
          <Legend />
          <Line type="monotone" dataKey="value" stroke="#8884d8" name="Value" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
