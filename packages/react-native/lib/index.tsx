import * as svbstrate from "@svbstrate/core";
import React from "react";
import { View, ViewProps } from "react-native";
import * as Polymorphic from "@radix-ui/react-polymorphic";

export * as presets from "@svbstrate/core/presets";

export type Theme = Partial<svbstrate.ThemeConfig>;

export type BoxPropsBase = {
  cx?:
    | svbstrate.SvbstrateStyleObject
    | ((theme: svbstrate.Tokens) => svbstrate.SvbstrateStyleObject);
  debug?: boolean;
};
export type BoxProps = React.PropsWithChildren<
  BoxPropsBase & svbstrate.SvbstrateCSSStyleObject
>;

export type SvbstrateContext = {
  theme: svbstrate.ThemeConfig;
};

type PolymorphicBox = Polymorphic.ForwardRefComponent<typeof View, BoxProps>;

const context = React.createContext<SvbstrateContext>({
  theme: svbstrate.createTheme({}),
});

export function useSvbstrate(): SvbstrateContext {
  return React.useContext(context);
}

export function useTheme() {
  const svbstrate = useSvbstrate();
  return svbstrate.theme;
}

export function ThemeProvider(
  props: React.PropsWithChildren<{ theme: Partial<svbstrate.ThemeConfig> }>
): React.FunctionComponentElement<React.ProviderProps<SvbstrateContext>> {
  return React.createElement(context.Provider, {
    value: { theme: svbstrate.createTheme(props.theme) },
    children: props.children,
  });
}

export const Box = React.forwardRef(({ children, as, ...rest }, ref) => {
  const theme = useTheme();
  const {
    styles,
    props: { cx, debug, ...props },
  } = svbstrate.pick<ViewProps & BoxPropsBase>(rest, theme);

  const mergedStyles = {
    ...svbstrate.style(styles, theme), // custom attr
    ...svbstrate.style(
      (typeof cx === "function" ? cx(theme.tokens as svbstrate.Tokens) : cx) ||
        {},
      theme
    ), // custom cx
  };

  if (debug) {
    console.log(
      `@svbstrate/react-native [debug] `,
      JSON.stringify(styles, null, 2)
    );
  }

  const Component = as || View;

  return (
    // @ts-ignore
    <Component
      ref={ref}
      {...props}
      style={{
        ...mergedStyles,
        // override with user-defined styles
        ...(typeof props.style === "object" ? props.style : {}),
      }}
    >
      {children}
    </Component>
  );
}) as PolymorphicBox;
