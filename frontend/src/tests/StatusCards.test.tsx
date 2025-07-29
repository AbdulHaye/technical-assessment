import { render, screen, waitFor } from "@testing-library/react";
import StatusCards from "../components/dashboard/StatusCards";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

describe("StatusCards", () => {
  it("renders loading state initially", () => {
    render(
      <QueryClientProvider client={queryClient}>
        <StatusCards />
      </QueryClientProvider>
    );
    expect(screen.getByText("Loading statuses...")).toBeInTheDocument();
  });

  it("renders status cards after data fetch", async () => {
    render(
      <QueryClientProvider client={queryClient}>
        <StatusCards />
      </QueryClientProvider>
    );
    await waitFor(() => {
      expect(screen.getByText("System Status")).toBeInTheDocument();
    });
  });
});
