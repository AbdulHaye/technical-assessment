import { render, screen, waitFor } from "@testing-library/react";
import DataGrid from "../components/dashboard/DataGrid";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SearchProvider } from "../components/dashboard/SearchFilter";

const queryClient = new QueryClient();

describe("DataGrid", () => {
  it("renders loading state initially", () => {
    render(
      <QueryClientProvider client={queryClient}>
        <SearchProvider>
          <DataGrid />
        </SearchProvider>
      </QueryClientProvider>
    );
    expect(screen.getByText("Loading data...")).toBeInTheDocument();
  });

  it("renders table after data fetch", async () => {
    render(
      <QueryClientProvider client={queryClient}>
        <SearchProvider>
          <DataGrid />
        </SearchProvider>
      </QueryClientProvider>
    );
    await waitFor(() => {
      expect(screen.getByText("Data Table")).toBeInTheDocument();
    });
  });
});
