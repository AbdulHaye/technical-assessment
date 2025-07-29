import { render, screen } from "@testing-library/react";
// Update the import path if the file is actually named 'SearchFilter.tsx' and exists in 'src/components/dashboard/'
// For example, if the correct path is 'src/components/dashboard/SearchFilter.tsx':
import SearchFilter, { SearchProvider } from "../components/dashboard/SearchFilter";

describe("SearchFilter", () => {
  it("renders input field", () => {
    render(
      <SearchProvider>
        <SearchFilter />
      </SearchProvider>
    );
    expect(
      screen.getByPlaceholderText("Search by timestamp...")
    ).toBeInTheDocument();
  });
});
