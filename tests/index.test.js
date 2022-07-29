import IndexPage from "../pages/index";
import DashBoard from "../pages/dashboard"
import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";

describe("Customer", () => {
  it("Check Elements Render", () => {
    render(<IndexPage/>);
    // check if all components are rendered
    expect(screen.getByTestId("name")).toBeInTheDocument();
    expect(screen.getByTestId("class")).toBeInTheDocument();
    expect(screen.getByTestId("model")).toBeInTheDocument();
    expect(screen.getByTestId("type")).toBeInTheDocument();
    expect(screen.getByTestId("submit")).toBeInTheDocument();
    expect(screen.getByTestId("tbody")).toBeInTheDocument();
  });
})


describe("Dashboard", () => {
  it("Check Elements Render", () => {
    render(<DashBoard/>);
    // check if all components are rendered
    expect(screen.getByTestId("tbody")).toBeInTheDocument();
  });

})