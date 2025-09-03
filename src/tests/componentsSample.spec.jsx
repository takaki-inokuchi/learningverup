import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import App from "../App";

describe("Title Test", () => {
  it("タイトルがHello Jestであること", () => {
    render(<App />);
    const title = screen.getByTestId("title");
    expect(title).toHaveTextContent("Hello Jest");
  });
});