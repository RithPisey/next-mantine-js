"use client";
import { Button, Input, Loader, createTheme, rem } from "@mantine/core";

export const theme = createTheme({
  scale: 1,
  primaryColor: "primary",
  colors: {
    error: [
      "#ffe9e9",
      "#ffd1d1",
      "#fba0a1",
      "#f76d6d",
      "#f34141",
      "#f22625",
      "#f21616",
      "#d8070b",
      "#c10008",
      "#a90003",
    ],
    success: [
      "#e5feee",
      "#d2f9e0",
      "#a8f1c0",
      "#7aea9f",
      "#53e383",
      "#3bdf70",
      "#2bdd66",
      "#1ac455",
      "#0caf49",
      "#00963c",
    ],
    warning: [
      "#fff8e1",
      "#ffefcc",
      "#ffdd9b",
      "#ffca64",
      "#ffba38",
      "#ffb01b",
      "#ffab09",
      "#e39500",
      "#ca8500",
      "#af7100",
    ],
    info: [
      "#e5f4ff",
      "#cde2ff",
      "#9bc2ff",
      "#64a0ff",
      "#3984fe",
      "#1d72fe",
      "#0969ff",
      "#0058e4",
      "#004ecc",
      "#0043b5",
    ],
    primary: [
      "#fff8e3",
      "#f9efd1",
      "#f0dda9",
      "#e6cb7d",
      "#debb56",
      "#d9b13e",
      "#d7ac2f",
      "#be9621",
      "#aa8518",
      "#937307",
    ],
    secondary: [
      "#e1f9ff",
      "#ccedff",
      "#9ad7ff",
      "#64c1ff",
      "#3baefe",
      "#20a2fe",
      "#099cff",
      "#0088e4",
      "#0078cd",
      "#0069b6",
    ],
  },
  components: {
    Button: Button.extend({
      defaultProps: {
        color: "primary",
        variant: "filled",
      },
    }),
    Loader: Loader.extend({
      defaultProps: {
        loaders: { ...Loader.defaultLoaders },
      },
    }),
  },
  shadows: {
    md: "1px 1px 3px rgba(0, 0, 0, .25)",
    xl: "5px 5px 3px rgba(0, 0, 0, .25)",
  },

  lineHeights: {
    xs: "1.4",
    sm: "1.45",
    md: "1.55",
    lg: "1.6",
    xl: "1.65",
  },
  headings: {
    fontFamily: "Roboto, sans-serif",
  },
});
