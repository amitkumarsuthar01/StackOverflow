import { render } from "@testing-library/react";
import { test, expect } from "vitest";
import App from "./App";
import AppProviders from "./AppProviders";

test("app renders without crashing", () => {
  render(
    <AppProviders>
      <App />
    </AppProviders>
  );

  expect(true).toBe(true);
});
