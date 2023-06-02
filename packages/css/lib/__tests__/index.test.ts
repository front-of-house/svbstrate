import { test, expect } from "vitest";

import { create } from "../";

test("works", () => {
  const sv = create({
    breakpoints: ["400px", "800px"],
  });
  const cn = sv.css({
    color: "red",
    padding: [0, 1, 2],
  });
  const sheet = sv.flush();

  expect(sheet).toContain("color:red");
  expect(sheet).toContain("padding:0px");
  expect(sheet).toContain("padding:1px");
  expect(sheet).toContain("padding:2px");
  expect(cn).toBeTruthy();
});
