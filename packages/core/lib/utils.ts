import { Value } from "./types";

export function toString(v: Value) {
  return v + "";
}

export function toPixels(v: Value) {
  return typeof v === "number" ? v + "px" : v;
}

export function toPercent(v: Value) {
  return typeof v === "number" ? (v <= 1 ? v * 100 + "%" : v + "px") : v;
}
