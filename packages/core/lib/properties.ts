import { ThemeConfig } from "./types";

export function string(v: string | number) {
  return v + "";
}

export function pixels(v: string | number) {
  return typeof v === "number" ? v + "px" : v;
}

export function percentOrPixels(v: string | number) {
  return typeof v === "number" ? (v <= 1 ? v * 100 + "%" : v + "px") : v;
}

export const properties: ThemeConfig["properties"] = {
  display: {},
  position: {},
  top: {
    token: "space",
    toValue: pixels,
  },
  bottom: {
    token: "space",
    toValue: pixels,
  },
  left: {
    token: "space",
    toValue: pixels,
  },
  right: {
    token: "space",
    toValue: pixels,
  },
  width: {
    token: "width",
    toValue: percentOrPixels,
  },
  minWidth: {
    token: "width",
    toValue: percentOrPixels,
  },
  maxWidth: {
    token: "width",
    toValue: percentOrPixels,
  },
  height: {
    token: "height",
    toValue: percentOrPixels,
  },
  minHeight: {
    token: "height",
    toValue: percentOrPixels,
  },
  maxHeight: {
    token: "height",
    toValue: percentOrPixels,
  },
  color: {
    token: "color",
  },
  background: {
    token: "color",
  },
  backgroundColor: {
    token: "color",
  },
  backgroundImage: {},
  backgroundRepeat: {},
  backgroundSize: {},
  opacity: {},
  flex: {},
  flexWrap: {},
  alignItems: {},
  alignContent: {},
  justifyItems: {},
  justifyContent: {},
  flexDirection: {},
  flexGrow: {},
  flexShrink: {},
  flexBasis: {},
  justifySelf: {},
  alignSelf: {},
  order: {
    toValue: string,
  },
  margin: {
    token: "space",
    toValue: pixels,
  },
  marginTop: {
    token: "space",
    toValue: pixels,
  },
  marginBottom: {
    token: "space",
    toValue: pixels,
  },
  marginLeft: {
    token: "space",
    toValue: pixels,
  },
  marginRight: {
    token: "space",
    toValue: pixels,
  },
  padding: {
    token: "space",
    toValue: pixels,
  },
  paddingTop: {
    token: "space",
    toValue: pixels,
  },
  paddingBottom: {
    token: "space",
    toValue: pixels,
  },
  paddingLeft: {
    token: "space",
    toValue: pixels,
  },
  paddingRight: {
    token: "space",
    toValue: pixels,
  },
  zIndex: {
    token: "zIndex",
    toValue: string,
  },
  fontSize: {
    token: "fontSize",
  },
  fontFamily: {
    token: "fontFamily",
  },
  fontWeight: {
    token: "fontWeight",
    toValue: string,
  },
  lineHeight: {
    token: "lineHeight",
  },
  letterSpacing: {
    token: "letterSpacing",
  },
  textAlign: {},
  overflow: {},
  boxShadow: {
    token: "boxShadow",
  },
  border: {
    token: "border",
  },
  borderColor: {
    token: "color",
  },
  borderWidth: {
    token: "borderWidth",
  },
  borderStyle: {
    token: "borderStyle",
  },
  borderRadius: {
    token: "borderRadius",
  },
  fill: {
    token: "color",
  },
  stroke: {
    token: "color",
  },
  transition: {
    token: "transition",
  },
  transitionProperty: {},
  transitionDuration: {
    token: "transitionDuration",
  },
  transitionTimingFunction: {
    token: "transitionTimingFunction",
  },
  transform: {},
};
