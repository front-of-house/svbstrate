import { test, expect } from "vitest";

import { createTheme, explode, style, pick } from "../";
import { properties as defaultCssProps } from "../properties";
import * as defaults from "../presets";

const { tokens, shorthands, macros } = defaults;

const defaultTheme = createTheme(defaults);

test("explode", () => {
  const theme = createTheme({
    shorthands: {
      c: "color",
      m: ["marginTop", "marginBottom", "marginLeft", "marginRight"],
      d: "display",
    },
  });

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
        d: { 0: "none", 1: "block" },
      },
      theme
    ),
  };

  expect(styles.color).toEqual("red");
  expect(styles.marginTop[1]).toEqual(1);
  expect(typeof styles.display).toEqual("object");
  expect(styles.div.a.color).toEqual("tomato");
});

test("explode with no values", () => {
  const styles = explode({}, defaultTheme);
  expect(styles).toEqual({});
});

test("style", () => {
  const theme = createTheme({
    breakpoints: ["400px", "800px", "1200px"],
    tokens: {
      space: [0, 4, 8, 12],
    },
    shorthands: {
      c: "color",
      m: ["marginTop", "marginBottom", "marginLeft", "marginRight"],
    },
  });

  const styles = {
    ...style({ c: "blue" }, theme),
    ...style({ m: [0, 1, 2] }, theme),
  };

  expect(styles.color).toEqual("blue");
  expect(styles.marginTop).toEqual("0px");
});

for (const key of Object.keys(defaultCssProps)) {
  const property = defaultCssProps[key];

  if (!property) continue;

  test(`props - ${key}`, () => {
    const { unit, token } = property;
    const rawValue = 0;
    const themeScale = token ? tokens[token] : undefined;
    // @ts-ignore
    const themeValue = themeScale ? themeScale[rawValue] : rawValue;
    const parsedValue = unit ? unit(themeValue) : themeValue;

    const styles = style({ [key]: rawValue }, defaultTheme);

    expect(styles[key]).toEqual(parsedValue);
  });
}

for (const key of Object.keys(shorthands)) {
  const properties = ([] as string[]).concat(shorthands[key]);

  for (const prop of properties) {
    const property = defaultCssProps[prop];

    if (!property) continue;

    test(`shorthands - ${key}`, () => {
      const { unit, token } = property;
      const rawValue = 0;
      const themeScale = token ? tokens[token] : undefined;
      // @ts-ignore
      const themeValue = themeScale ? themeScale[rawValue] : rawValue;
      const parsedValue = unit ? unit(themeValue) : themeValue;

      const styles = style({ [prop]: rawValue }, defaultTheme);

      expect(styles[prop]).toEqual(parsedValue);
    });
  }
}

for (const key of Object.keys(macros)) {
  test(`macro - ${key}`, () => {
    const rawStyles = style(macros[key], defaultTheme);
    const styles = style({ [key]: true }, defaultTheme);

    expect(rawStyles).toEqual(styles);
  });
}

test("macro - falsy", () => {
  const theme = createTheme({
    macros: {
      b: {
        color: "blue",
      },
    },
  });

  const a = style({ color: "tomato", b: true }, theme);
  expect(a).toEqual({ color: "blue" });
});

test("no styles, empty", () => {
  const styles = style({}, defaultTheme);
  expect(styles).toEqual({});
});

test("works on arbitrary props", () => {
  const styles = style(
    {
      borderBottomRightRadius: "4px",
    },
    defaultTheme
  );

  expect(styles.borderBottomRightRadius).toEqual("4px");
});

test("non-theme matched", () => {
  const styles = style(
    {
      c: "other",
    },
    defaultTheme
  );

  expect(styles.color).toEqual("other");
});

test("prop with scale and provided value", () => {
  const styles = style(
    {
      w: "50%",
    },
    defaultTheme
  );

  expect(styles.width).toEqual("50%");
});

test("percentOrPixel heuristic", () => {
  const styles = style(
    {
      w: 5,
      h: 1 / 2,
    },
    defaultTheme
  );

  expect(styles.width).toEqual("5px");
  expect(styles.height).toEqual("50%");
});

test("px heuristic", () => {
  const styles = style(
    {
      pt: "4px",
    },
    defaultTheme
  );

  expect(styles.paddingTop).toEqual("4px");
});

test("negative values", () => {
  const styles = style(
    {
      mt: -2,
    },
    defaultTheme
  );

  expect(styles.marginTop).toEqual("-8px");
});

test("variants", () => {
  const theme = createTheme({
    shorthands,
    variants: {
      appearance: {
        primary: {
          c: "blue",
          bg: "whitesmoke",
        },
      },
    },
  });
  const styles = style(
    {
      appearance: "primary",
    },
    theme
  );

  expect(styles.color).toEqual("blue");
  expect(styles.background).toEqual("whitesmoke");
});

test("breakpoints", () => {
  const theme = createTheme({
    breakpoints: ["400px", "800px"],
    shorthands,
  });
  const styles = style(
    {
      c: ["blue", "red", "green"],
    },
    theme
  );

  expect(styles.color).toEqual("blue");
  expect(styles["@media (min-width: 400px)"].color).toEqual("red");
  expect(styles["@media (min-width: 800px)"].color).toEqual("green");
});

test("breakpoints in correct cascading order", () => {
  const theme = createTheme({
    ...defaultTheme,
    breakpoints: ["400px", "800px"],
    shorthands,
  });

  const styles = style(
    {
      pt: { 2: 6 },
      pb: [2, 4, 6],
    },
    theme
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
  const theme = createTheme({
    breakpoints: ["20em", "40em"],
    shorthands,
  });
  const styles = style(
    {
      c: ["blue", "red", "green"],
    },
    theme
  );

  expect(styles.color).toEqual("blue");
  expect(styles["@media (min-width: 20em)"].color).toEqual("red");
  expect(styles["@media (min-width: 40em)"].color).toEqual("green");
});

test("too many breakpoints", () => {
  const theme = createTheme({
    breakpoints: ["400px", "800px"],
    shorthands,
  });
  const styles = style(
    {
      c: ["blue", "red", "green", "tomato"],
    },
    theme
  );

  expect(styles.color).toEqual("blue"); // could otherwise be tomato
});

test("named breakpoints", () => {
  const theme = createTheme({
    breakpoints: ["400px", "800px", "1200px"],
    shorthands,
  });
  const styles = style(
    {
      c: { 0: "blue", 2: "red" },
    },
    theme
  );

  expect(styles.color).toEqual("blue");
  expect(styles["@media (min-width: 800px)"].color).toEqual("red");
});

test("pseudo and other selectors", () => {
  const styles = style(
    {
      ":hover": {
        c: "blue",
        p: 2,
      },
      div: {
        c: "blue",
      },
      "div > foo": {
        c: "blue",
      },
    },
    defaultTheme
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
    defaultTheme
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
    defaultTheme
  );

  expect(styles).toEqual({
    color: "blue",
    "@media (min-width: 400px)": { color: "red", background: "tomato" },
  });
});
