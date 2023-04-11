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
  d: PropertyToTokenMapping<"display", "display">;
  w: PropertyToTokenMapping<"width", "width">;
  h: PropertyToTokenMapping<"height", "height">;
  c: PropertyToTokenMapping<"color", "color">;
  bg: PropertyToTokenMapping<"backgroundColor", "color">;
  m: PropertyToTokenMapping<"margin", "space">;
  mt: PropertyToTokenMapping<"marginTop", "space">;
  mb: PropertyToTokenMapping<"marginBottom", "space">;
  ml: PropertyToTokenMapping<"marginLeft", "space">;
  mr: PropertyToTokenMapping<"marginRight", "space">;
  my: PropertyToTokenMapping<"marginTop", "space">;
  mx: PropertyToTokenMapping<"marginLeft", "space">;
  pa: PropertyToTokenMapping<"padding", "space">;
  pt: PropertyToTokenMapping<"paddingTop", "space">;
  pb: PropertyToTokenMapping<"paddingBottom", "space">;
  pl: PropertyToTokenMapping<"paddingLeft", "space">;
  pr: PropertyToTokenMapping<"paddingRight", "space">;
  py: PropertyToTokenMapping<"paddingTop", "space">;
  px: PropertyToTokenMapping<"paddingLeft", "space">;
  z: PropertyToTokenMapping<"zIndex", "zIndex">;
  fs: PropertyToTokenMapping<"fontSize", "fontSize">;
  ff: PropertyToTokenMapping<"fontFamily", "fontFamily">;
  fw: PropertyToTokenMapping<"fontWeight", "fontWeight">;
  lh: PropertyToTokenMapping<"lineHeight", "lineHeight">;
  ta: PropertyToTokenMapping<"textAlign", "textAlign">;
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

export type PropertyToTokenMapping<
  Prop extends keyof CSSProperties,
  Token extends keyof BaseTokens
> = ResponsiveValue<keyof BaseTokens[Token] | CSSProperties[Prop]>;

export type SvbstrateCSSStyleObject = {
  [Property in keyof CSSProperties]?: ResponsiveValue<
    BaseTokens[Property] | CSSProperties[Property]
  >;
} & {
  top?: PropertyToTokenMapping<"top", "space">;
  bottom?: PropertyToTokenMapping<"bottom", "space">;
  left?: PropertyToTokenMapping<"left", "space">;
  right?: PropertyToTokenMapping<"right", "space">;
  margin?: PropertyToTokenMapping<"margin", "space">;
  marginTop?: PropertyToTokenMapping<"marginTop", "space">;
  marginBottom?: PropertyToTokenMapping<"marginBottom", "space">;
  marginLeft?: PropertyToTokenMapping<"marginLeft", "space">;
  marginRight?: PropertyToTokenMapping<"marginRight", "space">;
  padding?: PropertyToTokenMapping<"padding", "space">;
  paddingTop?: PropertyToTokenMapping<"paddingTop", "space">;
  paddingBottom?: PropertyToTokenMapping<"paddingBottom", "space">;
  paddingLeft?: PropertyToTokenMapping<"paddingLeft", "space">;
  paddingRight?: PropertyToTokenMapping<"paddingRight", "space">;
} & Partial<Shorthands>;

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
    [shorthand: string]: (keyof CSSProperties)[];
  };
  macros: {
    [macro: string]: SvbstrateCSSStyleObject;
  };
  variants: {
    [variation: string]: {
      [name: string]: SvbstrateStyleObject;
    };
  };
  properties: {
    [Property in keyof CSSProperties]?: {
      token?: keyof ThemeConfig["tokens"];
      unit?(value: Value): string;
    };
  };
}

export type StyleObject = {
  [propertyOrSelector: string]: any | StyleObject;
};
