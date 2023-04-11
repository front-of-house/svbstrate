import { test, expect } from "vitest";

import { createTheme, explode, style, pick } from "../";
import * as types from "../types";
import { properties as defaultCssProps } from "../properties";
import * as defaults from "../presets";

const { tokens, shorthands, macros } = defaults;

const theme = createTheme(defaults);

test("explode", () => {
  const styles = {
    ...explode({ c: "blue" }, theme),
    ...explode({ color: "red" }, theme),
    ...explode(
      {
        div: {
          a: {
            c: "tomato",
          },
        },
      },
      theme
    ),
    ...explode(
      {
        m: [0, 1, 2],
        d: ["none", "block"],
      },
      theme
    ),
  };

  expect(styles.color).toEqual("red");
  // @ts-expect-error can be array or not
  expect(styles.marginTop[1]).toEqual(1);
  expect(typeof styles.display).toEqual("object");
  expect(styles?.div?.a?.color).toEqual("tomato");
});

test("explode with no values", () => {
  const styles = explode({}, theme);
  expect(styles).toEqual({});
});

test("style", () => {
  const custom = createTheme({
    breakpoints: ["400px", "800px", "1200px"],
    tokens: {
      space: [0, 4, 8, 12],
    },
    shorthands: {
      c: ["color"],
      m: ["marginTop", "marginBottom", "marginLeft", "marginRight"],
    },
  });

  const styles = {
    ...style({ c: "blue" }, custom),
    ...style({ m: [0, 1, 2] }, custom),
  };

  expect(styles.color).toEqual("blue");
  expect(styles.marginTop).toEqual("0px");
});

for (const key of Object.keys(defaultCssProps)) {
  // @ts-expect-error yes yes can't index CSSProperties
  const property = defaultCssProps[key];

  if (!property) continue;

  test(`props - ${key}`, () => {
    const { toValue, token } = property;
    const rawValue = 0;
    // @ts-expect-error
    const themeScale = token ? tokens[token] : undefined;
    const themeValue = themeScale ? themeScale[rawValue] : rawValue;
    const parsedValue = toValue ? toValue(themeValue) : themeValue;

    const styles = style({ [key]: rawValue }, theme);

    expect(styles[key]).toEqual(parsedValue);
  });
}

for (const key of Object.keys(shorthands)) {
  const properties = ([] as string[]).concat(
    shorthands[key as keyof types.Shorthands]
  );

  for (const prop of properties) {
    // @ts-expect-error
    const property = defaultCssProps[prop];

    if (!property) continue;

    test(`shorthands - ${key}`, () => {
      const { toValue, token } = property;
      const rawValue = 0;
      // @ts-expect-error
      const themeScale = token ? tokens[token] : undefined;
      const themeValue = themeScale ? themeScale[rawValue] : rawValue;
      const parsedValue = toValue ? toValue(themeValue) : themeValue;

      const styles = style({ [prop]: rawValue }, theme);

      expect(styles[prop]).toEqual(parsedValue);
    });
  }
}

for (const key of Object.keys(macros)) {
  test(`macro - ${key}`, () => {
    // @ts-expect-error
    const rawStyles = style(macros[key], theme);
    const styles = style({ [key]: true }, theme);

    expect(rawStyles).toEqual(styles);
  });
}

test("macros", () => {
  const custom = createTheme({
    macros: {
      b: {
        color: "blue",
      },
    },
  });

  // falsy macro
  // @ts-expect-error un-typed macro
  const a = style({ color: "tomato", b: false }, custom);

  expect(a).toEqual({ color: "tomato" });
});

test("no styles, empty", () => {
  const styles = style({}, theme);
  expect(styles).toEqual({});
});

test("works on arbitrary props", () => {
  const styles = style(
    {
      borderBottomRightRadius: "4px",
    },
    theme
  );

  expect(styles.borderBottomRightRadius).toEqual("4px");
});

test("non-theme matched", () => {
  const styles = style(
    {
      c: "other",
    },
    theme
  );

  expect(styles.color).toEqual("other");
});

test("prop with scale and provided value", () => {
  const styles = style(
    {
      w: "50%",
    },
    theme
  );

  expect(styles.width).toEqual("50%");
});

test("percentOrPixel heuristic", () => {
  const styles = style(
    {
      w: 5,
      h: 1 / 2,
    },
    theme
  );

  expect(styles.width).toEqual("5px");
  expect(styles.height).toEqual("50%");
});

test("px heuristic", () => {
  const styles = style(
    {
      pt: "4px",
    },
    theme
  );

  expect(styles.paddingTop).toEqual("4px");
});

test("negative values", () => {
  const styles = style(
    {
      mt: -2,
    },
    theme
  );

  expect(styles.marginTop).toEqual("-8px");
});

test("variants", () => {
  const custom = createTheme({
    shorthands,
    variants: {
      appearance: {
        primary: {
          c: "blue",
          bg: "whitesmoke",
        },
      },
      card: {
        large: {
          background: "white",
          // testing nested object
          ".button": {
            c: "red",
          },
        },
      },
    },
  });
  const styles = style(
    {
      // @ts-expect-error un-typed variant
      appearance: "primary",
      card: "large",
    },
    custom
  );

  expect(styles.color).toEqual("blue");
  expect(styles.background).toEqual("whitesmoke");
});

test("breakpoints", () => {
  const custom = createTheme({
    breakpoints: ["400px", "800px"],
    shorthands,
  });
  const styles = style(
    {
      c: ["blue", "red", "green"],
    },
    custom
  );

  expect(styles.color).toEqual("blue");
  expect(styles["@media (min-width: 400px)"].color).toEqual("red");
  expect(styles["@media (min-width: 800px)"].color).toEqual("green");
});

test("breakpoints in correct cascading order", () => {
  const custom = createTheme({
    ...theme,
    breakpoints: ["400px", "800px"],
    shorthands,
  });

  const styles = style(
    {
      pt: [undefined, undefined, 6],
      pb: [2, 4, 6],
    },
    custom
  );

  expect(styles).toEqual({
    paddingBottom: "8px",
    "@media (min-width: 400px)": {
      paddingBottom: "16px",
    },
    "@media (min-width: 800px)": {
      paddingTop: "24px",
      paddingBottom: "24px",
    },
  });
});

test("breakpoints in other units", () => {
  const custom = createTheme({
    breakpoints: ["20em", "40em"],
    shorthands,
  });
  const styles = style(
    {
      c: ["blue", "red", "green"],
    },
    custom
  );

  expect(styles.color).toEqual("blue");
  expect(styles["@media (min-width: 20em)"].color).toEqual("red");
  expect(styles["@media (min-width: 40em)"].color).toEqual("green");
});

test("too many breakpoints", () => {
  const custom = createTheme({
    breakpoints: ["400px", "800px"],
    shorthands,
  });
  const styles = style(
    {
      c: ["blue", "red", "green", "tomato"],
    },
    custom
  );

  expect(styles.color).toEqual("blue"); // could otherwise be tomato
});

test("pseudo and other selectors", () => {
  const styles = style(
    {
      ":hover": {
        c: "blue",
        pa: 2,
      },
      div: {
        c: "blue",
      },
      "div > foo": {
        c: "blue",
      },
    },
    theme
  );

  expect(styles[":hover"].color).toEqual("blue");
  expect(styles[":hover"].paddingTop).toEqual("8px");
  expect(styles.div.color).toEqual("blue");
  expect(styles["div > foo"].color).toEqual("blue");
});

test("pseudo elements", () => {
  const styles = style(
    {
      "&::after": {
        content: '"a"',
      },
      "&::before": {
        content: '"b"',
      },
    },
    theme
  );

  expect(styles["&::after"].content).toEqual('"a"');
  expect(styles["&::before"].content).toEqual('"b"');
});

test("pick", () => {
  const theme = createTheme({
    tokens,
    shorthands,
    macros,
    variants: {
      appearance: {
        primary: {
          c: "blue",
        },
      },
    },
  });
  const { props, styles } = pick(
    {
      c: "blue",
      f: true,
      appearance: "primary",
      className: "cx",
    },
    theme
  );

  expect(!!styles.c).toBeTruthy();
  expect(!!styles.f).toBeTruthy();
  expect(!!styles.appearance).toBeTruthy();
  expect(!!props.className).toBeTruthy();
});

/**
 * @see https://github.com/sure-thing/hypostyle/issues/7
 */
test("issue #7", async () => {
  const styles = style(
    {
      color: ["blue", "red"],
      [`@media (min-width: ${defaults.breakpoints[0]})`]: {
        background: "tomato",
      },
    },
    theme
  );

  expect(styles).toEqual({
    color: "blue",
    "@media (min-width: 400px)": { color: "red", background: "tomato" },
  });
});

test("customProperties", () => {
  const custom = createTheme({
    tokens: {
      color: {
        primary: "blue",
      },
    },
    customProperties: {
      // @ts-expect-error un-typed custom property
      shadow(value, theme) {
        return {
          boxShadow: `0 0 0 1px ${theme.color[value]}`,
        };
      },
    },
  });
  const styles = style(
    {
      shadow: "primary",
    },
    custom
  );

  expect(styles.boxShadow).toEqual(`0 0 0 1px blue`);
});
