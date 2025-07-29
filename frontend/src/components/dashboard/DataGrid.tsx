"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchMetrics, TimeSeriesData } from "../../api/mock-data";
import { useSearch } from "./SearchFilter";

export default function DataGrid() {
  const { searchTerm } = useSearch();
  const { data, isLoading, error, refetch } = useQuery<TimeSeriesData[], Error>(
    {
      queryKey: ["metrics", "day"],
      queryFn: () => fetchMetrics("day"),
      retry: 2,
      staleTime: 5 * 60 * 1000,
    }
  );

  if (isLoading) return <div className="p-4 text-center">Loading data...</div>;
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

  const filteredData = data?.filter((item) =>
    item.timestamp.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-gray-800 p-4 rounded-lg shadow overflow-x-auto">
      <h2 className="text-xl font-semibold mb-4">Data Table</h2>
      <table className="min-w-full divide-y divide-gray-700">
        <thead>
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
              Timestamp
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
              Value
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-700">
          {filteredData?.map((item, index) => (
            <tr key={index}>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                {item.timestamp}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                {item.value}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
