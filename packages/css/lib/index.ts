import { create as nano } from "nano-css";
import { addon as cache } from "nano-css/addon/cache";
// @ts-expect-error
import { addon as nesting } from "nano-css/addon/nesting";
import { addon as keyframes } from "nano-css/addon/keyframes";
import { addon as rule } from "nano-css/addon/rule";
import { addon as globalAddon } from "nano-css/addon/global";
import { addon as hydrate } from "nano-css/addon/hydrate";
import * as svbstrate from "@svbstrate/core";

function createCss() {
  const n = nano();

  cache(n);
  nesting(n);
  keyframes(n);
  rule(n);
  globalAddon(n);
  hydrate(n);

  return n;
}

export function create(theme?: Partial<svbstrate.ThemeConfig>) {
  const t = theme ? svbstrate.createTheme(theme) : svbstrate.createTheme();
  let css = createCss();

  return {
    explode(styles: svbstrate.SvbstrateStyleObject) {
      return svbstrate.explode(styles, t);
    },
    style(styles: svbstrate.SvbstrateStyleObject) {
      return svbstrate.style(styles, t);
    },
    pick<T>(props: Parameters<typeof svbstrate.pick<T>>[0]) {
      return svbstrate.pick(props, t);
    },
    css(styles: svbstrate.SvbstrateStyleObject) {
      const s = svbstrate.style(styles, t);
      return Object.keys(s).length && css.rule ? css.rule(s) : "";
    },
    createGlobal(styles: svbstrate.SvbstrateStyleObject) {
      const css = createCss();
      css.global && css.global(svbstrate.style(styles, t));
      return css.raw;
    },
    injectGlobal(styles: svbstrate.SvbstrateStyleObject) {
      css.global && css.global(svbstrate.style(styles, t));
    },
    keyframes: css.keyframes,
    flush() {
      const raw = css.raw;
      css = createCss();
      console.log({ raw });
      return raw;
    },
    get theme() {
      return t;
    },
  };
}
