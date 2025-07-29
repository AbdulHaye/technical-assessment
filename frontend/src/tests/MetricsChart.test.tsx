import { render, screen, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import MetricsChart from "../components/dashboard/MetricsChart";
import { fetchMetrics } from "../api/mock-data";

// Mock ResizeObserver
global.ResizeObserver = class ResizeObserver {
  constructor(callback) {
    this.callback = callback;
    this.observations = [];
  }

  observe(target) {
    this.observations.push(target);
    if (this.callback) {
      this.callback(
        [
          {
            target,
            contentRect: {
              x: 0,
              y: 0,
              width: 800,
              height: 400,
              top: 0,
              bottom: 400,
              left: 0,
              right: 800,
            },
            borderBoxSize: [{ inlineSize: 800, blockSize: 400 }],
            contentBoxSize: [{ inlineSize: 800, blockSize: 400 }],
            devicePixelContentBoxSize: [{ inlineSize: 800, blockSize: 400 }],
          },
        ],
        this
      );
    }
  }

  unobserve(target) {
    this.observations = this.observations.filter((obs) => obs !== target);
  }

  disconnect() {
    this.observations = [];
  }
};

// Mock the fetchMetrics function
jest.mock("../api/mock-data", () => ({
  fetchMetrics: jest.fn().mockResolvedValue([
    { timestamp: "2025-06-27T16:00:00Z", value: 75 },
    { timestamp: "2025-06-27T15:00:00Z", value: 80 },
  ]),
}));

const queryClient = new QueryClient();

describe("MetricsChart", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders loading state initially", () => {
    render(
      <QueryClientProvider client={queryClient}>
        <MetricsChart />
      </QueryClientProvider>
    );
    expect(screen.getByText("Loading chart...")).toBeInTheDocument();
  });

  it("renders chart after data fetch", async () => {
    render(
      <QueryClientProvider client={queryClient}>
        <MetricsChart />
      </QueryClientProvider>
    );
    await waitFor(
      () => {
        expect(screen.getByText("Performance Metrics")).toBeInTheDocument();
      },
      { timeout: 1500 }
    );
  });
});
