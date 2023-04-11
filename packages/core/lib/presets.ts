import * as types from "./types";

export const breakpoints: types.ThemeConfig["breakpoints"] = [
  "400px",
  "800px",
  "1200px",
];

export const tokens: {
  [Token in keyof types.PresetTokens]: types.PresetTokens[Token];
} = {
  space: [0, 4, 8, 12, 16, 20, 24, 28, 32, 36, 40, 44, 48, 52, 56, 60, 64],
  fontSize: ["3rem", "3rem", "2.2rem", "1.8rem", "1.4rem", "1rem", "0.875rem"],
  fontWeight: [
    "0",
    "100",
    "200",
    "300",
    "400",
    "500",
    "600",
    "700",
    "800",
    "900",
    "1000",
  ],
  lineHeight: [1.1, 1.1, 1.2, 1.3, 1.4, 1.5, 1.6],
};

export const shorthands: {
  [Shorthand in keyof types.PresetShorthands]: (keyof types.CSSProperties)[];
} = {
  d: ["display"],
  w: ["width"],
  h: ["height"],
  c: ["color"],
  bg: ["background"],
  m: ["marginTop", "marginBottom", "marginLeft", "marginRight"],
  mt: ["marginTop"],
  mb: ["marginBottom"],
  ml: ["marginLeft"],
  mr: ["marginRight"],
  my: ["marginTop", "marginBottom"],
  mx: ["marginLeft", "marginRight"],
  pa: ["paddingTop", "paddingBottom", "paddingLeft", "paddingRight"],
  pt: ["paddingTop"],
  pb: ["paddingBottom"],
  pl: ["paddingLeft"],
  pr: ["paddingRight"],
  py: ["paddingTop", "paddingBottom"],
  px: ["paddingLeft", "paddingRight"],
  z: ["zIndex"],
  fs: ["fontSize"],
  ff: ["fontFamily"],
  fw: ["fontWeight"],
  lh: ["lineHeight"],
  ta: ["textAlign"],
};

export const macros: {
  [Macro in keyof types.PresetMacros]: types.SvbstrateCSSStyleObject;
} = {
  db: { display: "block" },
  dib: { display: "inline-block" },
  di: { display: "inline" },
  f: { display: "flex" },
  fw: { flexWrap: "wrap" },
  ais: { alignItems: "flex-start" },
  aic: { alignItems: "center" },
  aie: { alignItems: "flex-end" },
  jcs: { justifyContent: "flex-start" },
  jcc: { justifyContent: "center" },
  jce: { justifyContent: "flex-end" },
  jca: { justifyContent: "space-around" },
  jcb: { justifyContent: "space-between" },
  rel: { position: "relative" },
  abs: { position: "absolute" },
  fix: { position: "fixed" },
  top: { top: 0 },
  bottom: { bottom: 0 },
  left: { left: 0 },
  right: { right: 0 },
  cover: {
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  tac: { textAlign: "center" },
  tar: { textAlign: "right" },
  taj: { textAlign: "justify" },
  ma: { margin: "auto" },
  mxa: { marginLeft: "auto", marginRight: "auto" },
  mya: { marginTop: "auto", marginBottom: "auto" },
};
