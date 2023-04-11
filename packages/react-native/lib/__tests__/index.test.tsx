import { test, expect } from "vitest";
import React from "react";
import { render } from "@testing-library/react-native";

import { ThemeProvider, Box } from "../";

declare module "@svbstrate/core" {
  interface Tokens {
    color: {
      primary: "#ff4567";
      secondary: "#ff4567";
    };
  }
}

test("works", () => {
  const screen = render(
    <ThemeProvider
      theme={{
        tokens: {
          color: {
            primary: "#ff4567",
            secondary: "#ff4567",
          },
        },
      }}
    >
      <Box as={Box} cx={(theme) => ({ color: theme.color.primary })}>
        Hello
      </Box>
    </ThemeProvider>
  );

  expect(screen.getByText("Hello")).toBeTruthy();
});
