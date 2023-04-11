import * as CSS from "csstype";

export type Value = string | number | undefined;
export type SvbstrateValue = Value | boolean;
export type ResponsiveValue<T> = T | Array<T>;

export type KeyValue = Record<string, Value>;
export type UnknownKeyValue = Record<string, unknown>;

export interface CSSProperties
  extends CSS.StandardProperties<number | string>,
    CSS.SvgProperties<number | string>,
    CSS.VendorProperties<number | string> {}

export type BaseTokens = {
  space?: Value[] | KeyValue;
} & {
  [Property in keyof CSSProperties]?: Value[] | KeyValue;
};

export interface PresetTokens {
  space: number[];
  fontSize: string[];
  fontWeight: string[];
  lineHeight: number[];
}
export interface Tokens {}

export interface PresetShorthands {
  d: MapShorthandToToken<"display", "display">;
  w: MapShorthandToToken<"width", "width">;
  h: MapShorthandToToken<"height", "height">;
  c: MapShorthandToToken<"color", "color">;
  bg: MapShorthandToToken<"backgroundColor", "color">;
  m: MapShorthandToToken<"margin", "space">;
  mt: MapShorthandToToken<"marginTop", "space">;
  mb: MapShorthandToToken<"marginBottom", "space">;
  ml: MapShorthandToToken<"marginLeft", "space">;
  mr: MapShorthandToToken<"marginRight", "space">;
  my: MapShorthandToToken<"marginTop", "space">;
  mx: MapShorthandToToken<"marginLeft", "space">;
  pa: MapShorthandToToken<"padding", "space">;
  pt: MapShorthandToToken<"paddingTop", "space">;
  pb: MapShorthandToToken<"paddingBottom", "space">;
  pl: MapShorthandToToken<"paddingLeft", "space">;
  pr: MapShorthandToToken<"paddingRight", "space">;
  py: MapShorthandToToken<"paddingTop", "space">;
  px: MapShorthandToToken<"paddingLeft", "space">;
  z: MapShorthandToToken<"zIndex", "zIndex">;
  fs: MapShorthandToToken<"fontSize", "fontSize">;
  ff: MapShorthandToToken<"fontFamily", "fontFamily">;
  fw: MapShorthandToToken<"fontWeight", "fontWeight">;
  lh: MapShorthandToToken<"lineHeight", "lineHeight">;
  ta: MapShorthandToToken<"textAlign", "textAlign">;
}
export interface Shorthands {}

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
  top: boolean;
  bottom: boolean;
  left: boolean;
  right: boolean;
  cover: boolean;
  tac: boolean;
  tar: boolean;
  taj: boolean;
  ma: boolean;
  mxa: boolean;
  mya: boolean;
}
export interface Macros {}

export interface PresetVariants {} // unused
export interface Variants {}

export interface CustomProperties {}

export type MapShorthandToToken<
  Prop extends keyof CSSProperties,
  Token extends keyof BaseTokens
> = ResponsiveValue<keyof BaseTokens[Token] | CSSProperties[Prop]>;

export type SvbstrateCSSStyleObject = {
  [Property in keyof CSSProperties]?: ResponsiveValue<
    BaseTokens[Property] | CSSProperties[Property]
  >;
} & {
  top?: MapShorthandToToken<"top", "space">;
  bottom?: MapShorthandToToken<"bottom", "space">;
  left?: MapShorthandToToken<"left", "space">;
  right?: MapShorthandToToken<"right", "space">;
  margin?: MapShorthandToToken<"margin", "space">;
  marginTop?: MapShorthandToToken<"marginTop", "space">;
  marginBottom?: MapShorthandToToken<"marginBottom", "space">;
  marginLeft?: MapShorthandToToken<"marginLeft", "space">;
  marginRight?: MapShorthandToToken<"marginRight", "space">;
  padding?: MapShorthandToToken<"padding", "space">;
  paddingTop?: MapShorthandToToken<"paddingTop", "space">;
  paddingBottom?: MapShorthandToToken<"paddingBottom", "space">;
  paddingLeft?: MapShorthandToToken<"paddingLeft", "space">;
  paddingRight?: MapShorthandToToken<"paddingRight", "space">;
} & Partial<Shorthands> &
  Partial<CustomProperties>;

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
  Partial<Macros> &
  Partial<Variants> &
  SvbstrateMiscStyleObject;

export interface ThemeConfig {
  breakpoints: Value[];
  tokens: {
    space?: Value[] | KeyValue;
  } & {
    [Property in keyof BaseTokens]?: Value[] | KeyValue;
  } & {
    [Property in keyof Tokens]: Tokens[Property][] | Tokens[Property];
  };
  shorthands: {
    [Shorthand in keyof Shorthands]: (keyof CSSProperties)[];
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
      value: Value,
      theme: Tokens
    ) => SvbstrateStyleObject;
  };
  properties: {
    [Property in keyof CSSProperties]?: {
      token?: keyof ThemeConfig["tokens"];
      toValue?(value: Value): string;
    };
  };
}

export type StyleObject = {
  [propertyOrSelector: string]: any | StyleObject;
};
