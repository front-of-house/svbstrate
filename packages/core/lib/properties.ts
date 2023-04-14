import { ThemeConfig } from "./types";
import { toString, toPixels, toPercent } from "./utils";

export const properties: ThemeConfig["properties"] = {
  display: {},
  position: {},
  top: {
    token: "space",
    toValue: toPixels,
  },
  bottom: {
    token: "space",
    toValue: toPixels,
  },
  left: {
    token: "space",
    toValue: toPixels,
  },
  right: {
    token: "space",
    toValue: toPixels,
  },
  width: {
    token: "width",
    toValue: (v) => toPixels(toPercent(v)),
  },
  minWidth: {
    token: "width",
    toValue: (v) => toPixels(toPercent(v)),
  },
  maxWidth: {
    token: "width",
    toValue: (v) => toPixels(toPercent(v)),
  },
  height: {
    token: "height",
    toValue: (v) => toPixels(toPercent(v)),
  },
  minHeight: {
    token: "height",
    toValue: (v) => toPixels(toPercent(v)),
  },
  maxHeight: {
    token: "height",
    toValue: (v) => toPixels(toPercent(v)),
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
    toValue: toString,
  },
  margin: {
    token: "space",
    toValue: toPixels,
  },
  marginTop: {
    token: "space",
    toValue: toPixels,
  },
  marginBottom: {
    token: "space",
    toValue: toPixels,
  },
  marginLeft: {
    token: "space",
    toValue: toPixels,
  },
  marginRight: {
    token: "space",
    toValue: toPixels,
  },
  padding: {
    token: "space",
    toValue: toPixels,
  },
  paddingTop: {
    token: "space",
    toValue: toPixels,
  },
  paddingBottom: {
    token: "space",
    toValue: toPixels,
  },
  paddingLeft: {
    token: "space",
    toValue: toPixels,
  },
  paddingRight: {
    token: "space",
    toValue: toPixels,
  },
  zIndex: {
    token: "zIndex",
    toValue: toString,
  },
  fontSize: {
    token: "fontSize",
  },
  fontFamily: {
    token: "fontFamily",
  },
  fontWeight: {
    token: "fontWeight",
    toValue: toString,
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
