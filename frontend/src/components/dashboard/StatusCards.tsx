"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchStatus, StatusUpdate } from "../../api/mock-data";

export default function StatusCards() {
  const { data, isLoading, error, refetch } = useQuery<StatusUpdate[], Error>({
    queryKey: ["status"],
    queryFn: fetchStatus,
    retry: 2,
    staleTime: 5 * 60 * 1000,
  });

  if (isLoading)
    return <div className="p-4 text-center">Loading statuses...</div>;
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
      <h2 className="text-xl font-semibold mb-4">System Status</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {data?.map((status) => (
          <div
            key={status.id}
            className={`p-4 rounded-lg shadow ${
              status.status === "healthy"
                ? "bg-green-600"
                : status.status === "warning"
                ? "bg-yellow-600"
                : "bg-red-600"
            }`}
          >
            <h3 className="text-lg font-semibold capitalize">
              {status.status}
            </h3>
            <p className="text-sm">{status.message}</p>
            <p className="text-xs mt-2">
              {new Date(status.timestamp).toLocaleString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
