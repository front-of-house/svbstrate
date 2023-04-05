import { CSSPropertyMapping } from "./";

export function string(v: string | number) {
  return v + "";
}

export function pixels(v: string | number) {
  return typeof v === "number" ? v + "px" : v;
}

export function percentOrPixels(v: string | number) {
  return typeof v === "number" ? (v <= 1 ? v * 100 + "%" : v + "px") : v;
}

export const properties: CSSPropertyMapping = {
  display: {},
  position: {},
  top: {
    token: "space",
    unit: pixels,
  },
  bottom: {
    token: "space",
    unit: pixels,
  },
  left: {
    token: "space",
    unit: pixels,
  },
  right: {
    token: "space",
    unit: pixels,
  },
  width: {
    token: "width",
    unit: percentOrPixels,
  },
  minWidth: {
    token: "width",
    unit: percentOrPixels,
  },
  maxWidth: {
    token: "width",
    unit: percentOrPixels,
  },
  height: {
    token: "height",
    unit: percentOrPixels,
  },
  minHeight: {
    token: "height",
    unit: percentOrPixels,
  },
  maxHeight: {
    token: "height",
    unit: percentOrPixels,
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
    unit: string,
  },
  margin: {
    token: "space",
    unit: pixels,
  },
  marginTop: {
    token: "space",
    unit: pixels,
  },
  marginBottom: {
    token: "space",
    unit: pixels,
  },
  marginLeft: {
    token: "space",
    unit: pixels,
  },
  marginRight: {
    token: "space",
    unit: pixels,
  },
  padding: {
    token: "space",
    unit: pixels,
  },
  paddingTop: {
    token: "space",
    unit: pixels,
  },
  paddingBottom: {
    token: "space",
    unit: pixels,
  },
  paddingLeft: {
    token: "space",
    unit: pixels,
  },
  paddingRight: {
    token: "space",
    unit: pixels,
  },
  zIndex: {
    token: "zIndex",
    unit: string,
  },
  fontSize: {
    token: "fontSize",
  },
  fontFamily: {
    token: "fontFamily",
  },
  fontWeight: {
    token: "fontWeight",
    unit: string,
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
