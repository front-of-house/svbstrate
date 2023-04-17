import * as svbstrate from "@svbstrate/core";
import React from "react";
import { View, ViewProps, Text as BaseText } from "react-native";
import * as Polymorphic from "@radix-ui/react-polymorphic";

const defaultProperties: svbstrate.ThemeConfig["properties"] = {
  width: {
    token: "width",
  },
  height: {
    token: "width",
  },
  top: {
    token: "space",
  },
  bottom: {
    token: "space",
  },
  left: {
    token: "space",
  },
  right: {
    token: "space",
  },
  margin: {
    token: "space",
  },
  marginTop: {
    token: "space",
  },
  marginBottom: {
    token: "space",
  },
  marginLeft: {
    token: "space",
  },
  marginRight: {
    token: "space",
  },
  padding: {
    token: "space",
  },
  paddingTop: {
    token: "space",
  },
  paddingBottom: {
    token: "space",
  },
  paddingLeft: {
    token: "space",
  },
  paddingRight: {
    token: "space",
  },
};

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
type PolymorphicText = Polymorphic.ForwardRefComponent<
  typeof BaseText,
  BoxProps
>;

const context = React.createContext<SvbstrateContext>({
  theme: svbstrate.createTheme({
    properties: defaultProperties,
  }),
});

export function useTheme() {
  const svbstrate = React.useContext(context);
  return svbstrate.theme;
}

export function useTokens() {
  const svbstrate = useTheme();
  return svbstrate.tokens;
}

export function ThemeProvider(
  props: React.PropsWithChildren<{ theme: Partial<svbstrate.ThemeConfig> }>
): React.FunctionComponentElement<React.ProviderProps<SvbstrateContext>> {
  return React.createElement(context.Provider, {
    value: {
      theme: svbstrate.createTheme({
        ...props.theme,
        properties: {
          ...defaultProperties,
          ...(props.theme?.properties || {}),
        },
      }),
    },
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
      JSON.stringify({ styles: mergedStyles, props }, null, 2)
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

export const Text = React.forwardRef((props, ref) => {
  return <Box ref={ref} as={BaseText} {...props} />;
}) as PolymorphicText;
