// Design tokens for the application
// These tokens are used throughout the application for consistency

export const colors = {
  // Neutral colors
  neutral: {
    white: "#ffffff",
    black: "#000000",
  },

  // Emerald scale (Primary)
  emerald: {
    50: "#edfdf5",
    100: "#d4fae5",
    200: "#adf4d1",
    300: "#73e9b6",
    400: "#2dd494",
    500: "#13bc7f",
    600: "#099968",
    700: "#0a7a56",
    800: "#0e6046",
    900: "#114f3b",
    950: "#062c22",
  },

  // Gray cold scale
  grayCold: {
    50: "#f9fafc",
    100: "#f3f4f6",
    200: "#e5e7eb",
    300: "#d1d5dc",
    400: "#9aa1ae",
    500: "#6b7282",
    600: "#4b5565",
    700: "#374152",
    800: "#1f2938",
    900: "#111828",
    950: "#030712",
  },

  // Gray warm scale
  grayWarm: {
    50: "#fafafa",
    100: "#f5f5f5",
    200: "#e7e5e4",
    300: "#d6d3d1",
    400: "#a6a09c",
    500: "#78716c",
    600: "#57534e",
    700: "#44403c",
    800: "#292524",
    900: "#1c1917",
    950: "#0b0a09",
  },

  // Green scale
  green: {
    50: "#f1fdf5",
    100: "#dffce8",
    200: "#bff8d1",
    300: "#8af1aa",
    400: "#47df78",
    500: "#26c858",
    600: "#1aa644",
    700: "#1b823a",
    800: "#1c6633",
    900: "#1b542d",
    950: "#0a2e16",
  },
} as const;

export const spacing = {
  0: "0px",
  1: "4px",
  2: "8px",
  3: "12px",
  4: "16px",
  5: "20px",
  6: "24px",
  8: "32px",
  10: "40px",
  12: "48px",
  16: "64px",
  20: "80px",
  24: "96px",
  32: "128px",
  40: "160px",
  48: "192px",
  56: "224px",
  64: "256px",
} as const;

export const typography = {
  fontFamilies: {
    sans: '"Neulis Sans", ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, "Helvetica Neue", Arial, "Noto Sans", "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
    mono: '"JetBrains Mono", ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
  },

  fontSizes: {
    xs: "12px",
    sm: "14px",
    base: "16px",
    lg: "18px",
    xl: "20px",
    "2xl": "24px",
    "3xl": "30px",
    "4xl": "36px",
    "5xl": "48px",
    "6xl": "60px",
    "7xl": "72px",
  },

  fontWeights: {
    thin: 100,
    extralight: 200,
    light: 300,
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
    extrabold: 800,
    black: 900,
  },

  lineHeights: {
    none: 1,
    tight: 1.25,
    snug: 1.375,
    normal: 1.5,
    relaxed: 1.625,
    loose: 2,
  },
} as const;

export const animations = {
  durations: {
    instant: "0ms",
    fast: "150ms",
    normal: "300ms",
    slow: "500ms",
    slower: "750ms",
    slowest: "1000ms",
  },

  easings: {
    linear: "linear",
    in: "cubic-bezier(0.4, 0, 1, 1)",
    out: "cubic-bezier(0, 0, 0.2, 1)",
    inOut: "cubic-bezier(0.4, 0, 0.2, 1)",
    spring: "cubic-bezier(0.175, 0.885, 0.32, 1.275)",
    bounce: "cubic-bezier(0.68, -0.55, 0.265, 1.55)",
  },
} as const;

export const breakpoints = {
  sm: "640px",
  md: "768px",
  lg: "1188px",
  xl: "1280px",
  "2xl": "1536px",
} as const;

// Semantic color aliases
export const semanticColors = {
  primary: colors.emerald[500],
  primaryForeground: colors.neutral.white,
  secondary: colors.grayCold[700],
  secondaryForeground: colors.neutral.white,
  accent: colors.green[500],
  accentForeground: colors.neutral.white,
  muted: colors.grayCold[100],
  mutedForeground: colors.grayCold[500],
  border: colors.grayCold[200],
  background: colors.neutral.white,
  foreground: colors.neutral.black,
} as const;
