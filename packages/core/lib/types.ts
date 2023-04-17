import * as CSS from "csstype";

export type Value = string | number | undefined;
export type SvbstrateValue = Value | boolean;
export type ResponsiveValue<T> = T | Array<T>;

export type KeyValue = Record<string, Value>;
export type UnknownKeyValue = Record<string, unknown>;

export interface CSSProperties
  extends CSS.StandardProperties<(string & {}) | number>,
    CSS.SvgProperties<(string & {}) | number>,
    CSS.VendorProperties<(string & {}) | number> {}

export type BaseTokens = {
  space?: Value[] | KeyValue;
} & {
  [Property in keyof Omit<CSSProperties, OverriddenProperties>]:
    | Value[]
    | KeyValue;
};

export interface PresetTokens extends BaseTokens {
  space: number[];
  fontSize: string[];
  fontWeight: string[];
  lineHeight: number[];
}
export interface Tokens extends BaseTokens {}

export interface PresetAliases {
  d: MapPropertyToToken<"display", "display">;
  w: MapPropertyToToken<"width", "width">;
  h: MapPropertyToToken<"height", "height">;
  c: MapPropertyToToken<"color", "color">;
  bg: MapPropertyToToken<"backgroundColor", "color">;
  ma: MapPropertyToToken<"margin", "space">;
  mt: MapPropertyToToken<"marginTop", "space">;
  mb: MapPropertyToToken<"marginBottom", "space">;
  ml: MapPropertyToToken<"marginLeft", "space">;
  mr: MapPropertyToToken<"marginRight", "space">;
  my: MapPropertyToToken<"marginTop", "space">;
  mx: MapPropertyToToken<"marginLeft", "space">;
  pa: MapPropertyToToken<"padding", "space">;
  pt: MapPropertyToToken<"paddingTop", "space">;
  pb: MapPropertyToToken<"paddingBottom", "space">;
  pl: MapPropertyToToken<"paddingLeft", "space">;
  pr: MapPropertyToToken<"paddingRight", "space">;
  py: MapPropertyToToken<"paddingTop", "space">;
  px: MapPropertyToToken<"paddingLeft", "space">;
  z: MapPropertyToToken<"zIndex", "zIndex">;
  fs: MapPropertyToToken<"fontSize", "fontSize">;
  ff: MapPropertyToToken<"fontFamily", "fontFamily">;
  fw: MapPropertyToToken<"fontWeight", "fontWeight">;
  lh: MapPropertyToToken<"lineHeight", "lineHeight">;
  ta: MapPropertyToToken<"textAlign", "textAlign">;
}
export interface Aliases {}

export interface PresetMacros {
  db: boolean;
  dib: boolean;
  di: boolean;
  f: boolean;
  fw: boolean;
  ais: boolean;
  aic: boolean;
  aie: boolean;
  jcs: boolean;
  jcc: boolean;
  jce: boolean;
  jca: boolean;
  jcb: boolean;
  rel: boolean;
  abs: boolean;
  fix: boolean;
  cover: boolean;
  tac: boolean;
  tar: boolean;
  taj: boolean;
  mxa: boolean;
  mya: boolean;
}
export interface Macros {}

export interface PresetVariants {} // unused
export interface Variants {}

export interface CustomProperties {}

export type MapPropertyToToken<
  Prop extends keyof CSSProperties,
  Token extends keyof Tokens
> = ResponsiveValue<keyof Tokens[Token] | CSSProperties[Prop]>;

type OverriddenProperties =
  | "top"
  | "bottom"
  | "left"
  | "right"
  | "padding"
  | "paddingLeft"
  | "paddingRight"
  | "paddingTop"
  | "paddingBottom"
  | "margin"
  | "marginLeft"
  | "marginRight"
  | "marginTop"
  | "marginBottom";

export type SvbstrateCSSStyleObject = {
  [Property in keyof Omit<
    CSSProperties,
    OverriddenProperties
  >]?: MapPropertyToToken<Property, Property>;
} & {
  top?: MapPropertyToToken<"top", "space">;
  bottom?: MapPropertyToToken<"bottom", "space">;
  left?: MapPropertyToToken<"left", "space">;
  right?: MapPropertyToToken<"right", "space">;
  margin?: MapPropertyToToken<"margin", "space">;
  marginTop?: MapPropertyToToken<"marginTop", "space">;
  marginBottom?: MapPropertyToToken<"marginBottom", "space">;
  marginLeft?: MapPropertyToToken<"marginLeft", "space">;
  marginRight?: MapPropertyToToken<"marginRight", "space">;
  padding?: MapPropertyToToken<"padding", "space">;
  paddingTop?: MapPropertyToToken<"paddingTop", "space">;
  paddingBottom?: MapPropertyToToken<"paddingBottom", "space">;
  paddingLeft?: MapPropertyToToken<"paddingLeft", "space">;
  paddingRight?: MapPropertyToToken<"paddingRight", "space">;
} & Partial<Aliases> &
  Partial<CustomProperties> &
  Partial<Macros> &
  Partial<Variants>;

export type SvbstratePsuedoStyleObject = {
  // psuedo selector blocks
  [pseudo in CSS.Pseudos]?: SvbstrateStyleObject;
};

export type SvbstrateHTMLStyleObject = {
  [tag in keyof HTMLElementTagNameMap]?: SvbstrateStyleObject;
};

export type SvbstrateMiscStyleObject = {
  // any other selector, like wacky `& > * + *` stuff
  [selector: string]: SvbstrateStyleObject | ResponsiveValue<SvbstrateValue>;
};

export type SvbstrateStyleObject = SvbstrateCSSStyleObject &
  SvbstratePsuedoStyleObject &
  SvbstrateHTMLStyleObject &
  SvbstrateMiscStyleObject;

export interface ThemeConfig {
  breakpoints: Value[];
  tokens: {
    [Property in keyof Tokens]: Tokens[Property];
  };
  aliases: {
    [Alias in keyof Aliases]: (keyof CSSProperties)[];
  };
  macros: {
    [Macro in keyof Macros]: SvbstrateCSSStyleObject;
  };
  variants: {
    [Variant in keyof Variants]: {
      [Value in Variants[Variant]]: SvbstrateStyleObject;
    };
  };
  customProperties: {
    [Property in keyof CustomProperties]: (
      value: SvbstrateValue,
      theme: Tokens
    ) => SvbstrateStyleObject;
  };
  properties: {
    [Property in keyof CSSProperties]?: {
      token?: keyof ThemeConfig["tokens"];
      toValue?(value: Value): SvbstrateValue;
    };
  };
}

export type StyleObject = {
  [propertyOrSelector: string]: any | StyleObject;
};
