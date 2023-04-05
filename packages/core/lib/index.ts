import merge from "deepmerge";
import * as CSS from "csstype";

import { properties as cssPropertyMapping } from "./properties";

type CSSPropertyNames = keyof CSS.Properties | string;

type Value = string | number;
type KeyValue = Record<string, Value>;
type UnknownKeyValue = Record<string, unknown>;

export type StyleObject = {
  [propertyOrSelector: string]: any | StyleObject;
};

export type SvbstrateValue =
  | { [k: number]: Value }
  | Value[]
  | Value
  | boolean
  | undefined;

export type SvbstrateStyleObject =
  | ({
      // normal css
      [property in CSSPropertyNames]?: SvbstrateValue;
    } & {
      // psuedo selector blocks
      [pseudo in CSS.Pseudos]?: SvbstrateStyleObject;
    } & {
      // nested selector blocks
      [tag in keyof HTMLElementTagNameMap]?: SvbstrateStyleObject;
    } & {
      // any other selector, like wacky `& > * + *` stuff
      [selector: string]: SvbstrateStyleObject;
    })
  | {
      // any svbstrate properties, like shorthands
      [prop: string]: SvbstrateValue | any;
    };

export type Tokens = {
  [token: string]: Value[] | KeyValue;
};

export type Shorthands = {
  [shorthand: string]: CSSPropertyNames | CSSPropertyNames[];
};

export type Macros = {
  [macro: string]: SvbstrateStyleObject;
};

export type Variants = {
  [variation: string]: {
    [name: string]: SvbstrateStyleObject;
  };
};

export type CSSPropertyMapping = {
  [property in CSSPropertyNames]?: {
    token?: keyof Tokens;
    unit?(value: any): string;
  };
};

export interface UserTheme {}

export type Theme = {
  breakpoints: Value[];
  tokens: Tokens;
  shorthands: Shorthands;
  macros: Macros;
  variants: Variants;
  properties: CSSPropertyMapping;
} & UserTheme;

/**
 * Expand all macros, variants, and shorthand props.
 */
export function explode(
  props: SvbstrateStyleObject,
  theme: Theme
): SvbstrateStyleObject {
  let styles: SvbstrateStyleObject = {};

  // expand macros and variants, copy other props
  for (const prop of Object.keys(props)) {
    // macro exists AND prop is true
    if (theme.macros[prop] && (props[prop] === true || props[prop] === false)) {
      if (props[prop] === true) styles = merge(styles, theme.macros[prop]);
    } else if (theme.variants[prop]) {
      styles = merge(styles, theme.variants[prop][props[prop] as string]);
    } else {
      styles[prop] = props[prop];
    }
  }

  // recursively expand all shorthands
  for (const prop of Object.keys(styles)) {
    const value = styles[prop];

    // Could be nested object, ignore responsive array/object syntax
    if (
      typeof value === "object" &&
      !Array.isArray(value) &&
      !/^\d/.test(Object.keys(value)[0])
    ) {
      styles[prop] = explode(value, theme);
      continue;
    }

    if (theme.shorthands[prop]) {
      const shorthands = ([] as string[]).concat(theme.shorthands[prop]);

      for (let i = 0; i < shorthands.length; i++) {
        styles[shorthands[i]] = value;
      }

      delete styles[prop]; // remove shorthand key
    } else {
      styles[prop] = value;
    }
  }

  return styles;
}

/**
 * Accepts a svbstrate object and converts it to a CSS object intelligible by
 * any CSS-in-JS library that supports objects.
 */
export function style(props: SvbstrateStyleObject, theme: Theme): StyleObject {
  props = explode(props, theme);

  let styles: StyleObject = {};
  const responsive: {
    [breakpoint: string]: StyleObject;
  } = {};

  for (const prop of Object.keys(props)) {
    const mixedObject: SvbstrateStyleObject | SvbstrateValue = props[prop];

    // must have a style object or responsive object
    if (typeof mixedObject === "object" && !Array.isArray(mixedObject)) {
      const keyIndicies = Object.keys(mixedObject);

      // convert responsive object to array syntax
      if (/^\d/.test(keyIndicies[0])) {
        const arr: SvbstrateStyleObject[] = [];

        keyIndicies.forEach((i) => {
          // @ts-ignore
          arr[i] = mixedObject[i];
        });

        props[prop] = arr;
      } else {
        /*
         * Safely merge in nested prop — there may be duplicate keys, like
         * after shorthand expansion or a custom media query block
         */
        const nested: StyleObject = {};
        nested[prop] = style(mixedObject, theme);
        styles = merge(styles, nested);
        continue; // continue, nested style object
      }
    }

    const config = theme.properties[prop] || {};
    const tokens = config.token ? theme.tokens[config.token] : undefined;
    const values = ([] as Value[]).concat(props[prop]);

    for (let o = 0; o < values.length; o++) {
      const rawValue = values[o];
      const signer = rawValue < 0 ? -1 : 1;
      const unsignedValue =
        typeof rawValue === "number" ? Math.abs(rawValue) : rawValue;
      const tokenized = tokens
        ? // @ts-expect-error tokens can be an object or array
          tokens[unsignedValue] || unsignedValue
        : unsignedValue; // tokenized rawValue
      const signedTokenized =
        typeof tokenized === "number" ? tokenized * signer : tokenized;
      const computedValue = config.unit
        ? config.unit(signedTokenized)
        : signedTokenized; // unitized value

      // drop undefined values, all others pass through
      if (computedValue === undefined) continue;

      const breakpoint = theme.breakpoints[o - 1];

      if (breakpoint) {
        // drop down a level (into breakpoint)
        responsive[breakpoint] = responsive[breakpoint] || {};
        responsive[breakpoint][prop] = computedValue;
      } else if (!breakpoint && o > 0) {
        continue;
      } else {
        styles[prop] = computedValue;
      }
    }
  }

  const sortedBreakpointStyles = Object.keys(responsive)
    .sort((a, b) => parseInt(a) - parseInt(b))
    .reduce((res, breakpoint) => {
      res[`@media (min-width: ${breakpoint})`] = responsive[breakpoint];
      return res;
    }, {} as typeof responsive);

  for (const key of Object.keys(sortedBreakpointStyles)) {
    const existingBreakpointStyles = styles[key] || {};

    styles[key] = {
      ...(typeof existingBreakpointStyles === "object"
        ? existingBreakpointStyles
        : {}), // existing breakpoint styles, if any
      ...sortedBreakpointStyles[key], // new breakpoint styles
    };
  }

  return styles;
}

/**
 * Separates style props from everything else
 */
export function pick<T = UnknownKeyValue>(
  props: SvbstrateStyleObject,
  theme: Theme
): { styles: SvbstrateStyleObject; props: T } {
  const styles: SvbstrateStyleObject = {};
  const extra: UnknownKeyValue = {};

  for (const prop of Object.keys(props)) {
    if (
      theme.macros[prop] ||
      theme.variants[prop] ||
      theme.shorthands[prop] ||
      theme.properties[prop]
    ) {
      styles[prop] = props[prop];
    } else {
      extra[prop] = props[prop];
    }
  }

  return {
    styles,
    props: extra as T,
  };
}

/**
 * Creates a fully defined `Theme` object from a partial definition.
 */
export function createTheme(theme: Partial<Theme>): Theme {
  return {
    breakpoints: [],
    tokens: theme.tokens || {},
    shorthands: theme.shorthands || {},
    macros: theme.macros || {},
    variants: theme.variants || {},
    properties: {
      ...cssPropertyMapping,
      ...theme.properties,
    },
    ...theme,
  };
}
