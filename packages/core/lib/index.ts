import * as types from "./types";
import { properties as cssProperties } from "./properties";

export * from "./types";

/**
 * Expand all macros, variants, and shorthand props.
 */
export function explode(
  props: types.SvbstrateStyleObject,
  theme: types.ThemeConfig
): types.SvbstrateStyleObject {
  let styles: types.SvbstrateStyleObject = {};

  for (const [prop, value] of Object.entries(props)) {
    if (
      theme.macros[prop as keyof types.Macros] &&
      typeof value === "boolean"
    ) {
      /*
       * Macro exists and is true, merge it in. If false, just drop it, hence
       * the typeof check above.
       */
      if (value)
        Object.assign(
          styles,
          theme.macros[prop as keyof types.Macros] as types.SvbstrateStyleObject
        );
    } else if (theme.variants[prop as keyof types.Variants]) {
      /*
       * Variant exists, merge it in.
       */
      Object.assign(
        styles,
        theme.variants[prop as keyof types.Variants][value as string]
      );
    } else if (theme.customProperties[prop as keyof types.CustomProperties]) {
      /*
       * Custom property exists, merge it in.
       */
      Object.assign(
        styles,
        // @ts-expect-error
        theme.customProperties[prop as keyof types.CustomProperties](
          value,
          theme.tokens
        )
      );
    } else if (typeof value === "object" && !Array.isArray(value)) {
      /*
       * If we have some other object here, we need to recurse.
       */
      styles[prop] = explode(value, theme);
    } else {
      /*
       * We otherwise have a simple value
       */
      styles[prop] = value as types.SvbstrateValue;
    }
  }

  /*
   * If any keys are shorthand props, expand them and overwrite their previous
   * values
   */
  for (const [prop, value] of Object.entries(styles)) {
    const cssProperties = theme.shorthands[prop as keyof types.Shorthands] as
      | string[]
      | undefined;

    if (cssProperties && cssProperties.length) {
      for (const property of cssProperties) {
        styles[property] = value;
      }

      delete styles[prop]; // remove original shorthand key
    }
  }

  return styles;
}

/**
 * Accepts a svbstrate object and converts it to a CSS object intelligible by
 * any CSS-in-JS library that supports objects.
 */
export function style(
  props: types.SvbstrateStyleObject,
  theme: types.ThemeConfig
): types.StyleObject {
  const exploded = explode(props, theme);
  let styles: types.StyleObject = {};
  const responsive: {
    [breakpoint: string]: types.StyleObject;
  } = {};

  for (const [prop, propertyValue] of Object.entries(exploded)) {
    /*
     * Handle nested SvbstrateStyleObject. Pass it back through `style()`
     * and merge the result. Then, exit from the loop, since the rest of the
     * handling is for primitive values.
     */
    if (typeof propertyValue === "object" && !Array.isArray(propertyValue)) {
      Object.assign(styles, {
        // overwrite prop with nested styles
        [prop]: style(propertyValue, theme),
      });
      continue; // continue, nested style object
    }

    /*
     * At this point, nested objects have been processed, and we're left with
     * either a primitive, or array of primitives.
     */

    /**
     * CSS property config, if it exists.
     */
    const config = theme.properties[prop as keyof types.CSSProperties] || {};

    /**
     * Theme tokens, if they exist for this CSS property
     */
    const tokens = config.token ? theme.tokens[config.token] : undefined;

    /**
     * An array of property values. We normalize this because values can be
     * singular or a `ResponsiveValue` array.
     */
    const values = ([] as types.Value[]).concat(
      propertyValue as types.ResponsiveValue<types.Value>
    );

    for (let i = 0; i < values.length; i++) {
      const rawValue = values[i];

      // E.g. a responsive array with no values at some breakpoints
      if (rawValue === undefined) continue;

      // This block "unitizes" and signs the value
      const signer = rawValue < 0 ? -1 : 1;
      const unsignedValue =
        typeof rawValue === "number" ? Math.abs(rawValue) : rawValue;
      const tokenized = tokens
        ? // @ts-expect-error tokens can be an object or array
          tokens[unsignedValue] || unsignedValue
        : unsignedValue; // tokenized rawValue
      const signedTokenized =
        typeof tokenized === "number" ? tokenized * signer : tokenized;
      const computedValue = config.toValue
        ? config.toValue(signedTokenized)
        : signedTokenized; // unitized value

      // drop undefined values, all others pass through
      if (computedValue === undefined) continue;

      // For initial mobile styles, this will eval to undefined
      const breakpoint = theme.breakpoints[i - 1];

      if (breakpoint) {
        // Create if not exists yet, and assign property value
        responsive[breakpoint] = responsive[breakpoint] || {};
        responsive[breakpoint][prop] = computedValue;
      } else if (!breakpoint && i > 0) {
        // User must have provided a value for a breakpoint that doesn't exist
        continue;
      } else {
        // Initial mobile styles
        styles[prop] = computedValue;
      }
    }
  }

  /**
   * Responsive styles are still separate from the full style object. Before we
   * merge, we need to sort them by breakpoint.
   */
  const sortedBreakpointStyles = Object.keys(responsive)
    .sort((a, b) => parseInt(a) - parseInt(b))
    .reduce((res, breakpoint) => {
      res[`@media (min-width: ${breakpoint})`] = responsive[breakpoint];
      return res;
    }, {} as typeof responsive);

  /**
   * Now that we're sorted, merge in responsive styles with any existing
   * breakpoints the user has defined, if any.
   */
  for (const [breakpoint, responsiveStyles] of Object.entries(
    sortedBreakpointStyles
  )) {
    const existingBreakpointStyles = styles[breakpoint] || {};

    styles[breakpoint] = {
      ...existingBreakpointStyles,
      ...responsiveStyles, // new breakpoint styles
    };
  }

  return styles;
}

/**
 * Separates known style props from everything else.
 */
export function pick<T = types.UnknownKeyValue>(
  props: types.UnknownKeyValue,
  theme: types.ThemeConfig
): { styles: types.SvbstrateStyleObject; props: T } {
  const styles: types.SvbstrateStyleObject = {};
  const extra: types.UnknownKeyValue = {};

  for (const prop of Object.keys(props)) {
    if (
      theme.macros[prop as keyof types.Macros] ||
      theme.variants[prop as keyof types.Variants] ||
      theme.shorthands[prop as keyof types.Shorthands] ||
      theme.properties[prop as keyof types.CSSProperties] ||
      theme.customProperties[prop as keyof types.CustomProperties]
    ) {
      styles[prop] = props[prop] as types.SvbstrateStyleObject;
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
 * Creates a fully defined `ThemeConfig` object from a partial definition.
 */
export function createTheme(
  theme: Partial<types.ThemeConfig> = {}
): types.ThemeConfig {
  return {
    breakpoints: theme.breakpoints || [],
    tokens: Object.assign({}, theme.tokens || {}),
    shorthands: Object.assign({}, theme.shorthands || {}),
    macros: Object.assign({}, theme.macros || {}),
    variants: Object.assign({}, theme.variants || {}),
    customProperties: Object.assign({}, theme.customProperties || {}),
    properties: Object.assign({}, cssProperties, theme.properties),
  };
}
