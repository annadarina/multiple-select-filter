import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { MultipleSelectFilter } from "../index";

describe("MultipleSelectFilter", () => {
  test("renders the component with initial state", () => {
    // Mock props
    const listItems = ["Option 1", "Option 2", "Option 3"];
    const selectedItems = ["Option 2"];

    // Render the component
    render(
      <MultipleSelectFilter
        title="Test Filter"
        listItems={listItems}
        selectedItems={selectedItems}
        onSelect={() => {}}
        onApply={() => {}}
        buttonLabel="Apply"
        placeholder="Search..."
      />,
    );

    // Check if the title is rendered
    const titleElement = screen.getByText("Test Filter");
    expect(titleElement).toBeInTheDocument();

    // Check if the selected option is rendered
    const selectedOption1 = screen.getByRole("checkbox", { name: "Option 1" });
    expect(selectedOption1).toBeInTheDocument();

    // Check if the search input is rendered
    const searchInput = screen.getByPlaceholderText("Search...");
    expect(searchInput).toBeInTheDocument();

    // Check if the apply button is rendered
    const applyButton = screen.getByRole("button", { name: "Apply" });
    expect(applyButton).toBeInTheDocument();
  });

  test("allows selecting and applying multiple items", () => {
    // Mock props
    const listItems = ["Option 1", "Option 2", "Option 3"];
    const selectedItems: string[] = [];

    // Mock event handlers
    const onSelect = jest.fn();
    const onApply = jest.fn();

    // Render the component
    render(
      <MultipleSelectFilter
        title="Test Filter"
        listItems={listItems}
        selectedItems={selectedItems}
        onSelect={onSelect}
        onApply={onApply}
        buttonLabel="Apply"
        placeholder="Search..."
      />,
    );

    // Select two options
    const option1Checkbox = screen.getByRole("checkbox", { name: "Option 1" });
    fireEvent.click(option1Checkbox);
    const option3Checkbox = screen.getByRole("checkbox", { name: "Option 3" });
    fireEvent.click(option3Checkbox);

    // Verify that the selected options are updated
    expect(onSelect).toHaveBeenCalledTimes(2);
    expect(onSelect).toHaveBeenCalledWith(["Option 1"]);
    expect(onSelect).toHaveBeenCalledWith(["Option 1", "Option 3"]);

    // Click the apply button
    const applyButton = screen.getByRole("button", { name: "Apply" });
    fireEvent.click(applyButton);

    // Verify that the apply button click is handled
    expect(onApply).toHaveBeenCalled();
  });

  test("filters the list based on search input", () => {
    // Mock props
    const listItems = ["Option 1", "Option 2", "Option 3"];
    const selectedItems: string[] = [];

    // Render the component

    // Render the component
    render(
      <MultipleSelectFilter
        title="Test Filter"
        listItems={listItems}
        selectedItems={selectedItems}
        onSelect={() => {}}
        onApply={() => {}}
        buttonLabel="Apply"
        placeholder="Search..."
      />,
    );

    // Type '1' in the search input
    const searchInput = screen.getByPlaceholderText("Search...");
    fireEvent.change(searchInput, { target: { value: "1" } });

    // Verify that only 'Option 1' is displayed in the filtered list
    const filteredOption1 = screen.getByText("Option 1");
    expect(filteredOption1).toBeInTheDocument();
    const filteredOption2 = screen.queryByText("Option 2");
    expect(filteredOption2).toBeNull();
    const filteredOption3 = screen.queryByText("Option 3");
    expect(filteredOption3).toBeNull();
  });
});
