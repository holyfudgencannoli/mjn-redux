// Typography token system for React Native with breakpoints (dp-based)
import { useWindowDimensions } from "react-native";

export type TypographyBreakpoint = "phone" | "largePhone" | "tablet" | "largeTablet";

export const TYPOGRAPHY_BREAKPOINTS: Record<TypographyBreakpoint, number> = {
  phone: 0,         // up to 359
  largePhone: 360,  // 360–599
  tablet: 600,      // 600–899
  largeTablet: 900, // 900+
};

export type TypographyScale = {
  xs: { fontSize: number; lineHeight: number };
  sm: { fontSize: number; lineHeight: number };
  md: { fontSize: number; lineHeight: number };
  lg: { fontSize: number; lineHeight: number };
  xl: { fontSize: number; lineHeight: number };
  heading: { fontSize: number; lineHeight: number; fontWeight: "bold" | "600" | "700" };
  display: { fontSize: number; lineHeight: number; fontWeight: "bold" | "700" };
};

const TYPOGRAPHY: Record<TypographyBreakpoint, TypographyScale> = {
  phone: {
    xs:      { fontSize: 12, lineHeight: 16 },
    sm:      { fontSize: 14, lineHeight: 20 },
    md:      { fontSize: 16, lineHeight: 24 },
    lg:      { fontSize: 20, lineHeight: 28 },
    xl:      { fontSize: 24, lineHeight: 32 },
    heading: { fontSize: 28, lineHeight: 36, fontWeight: "bold" },
    display: { fontSize: 36, lineHeight: 44, fontWeight: "bold" },
  },
  largePhone: {
    xs:      { fontSize: 13, lineHeight: 18 },
    sm:      { fontSize: 15, lineHeight: 22 },
    md:      { fontSize: 18, lineHeight: 26 },
    lg:      { fontSize: 22, lineHeight: 30 },
    xl:      { fontSize: 26, lineHeight: 34 },
    heading: { fontSize: 32, lineHeight: 40, fontWeight: "bold" },
    display: { fontSize: 40, lineHeight: 48, fontWeight: "bold" },
  },
  tablet: {
    xs:      { fontSize: 14, lineHeight: 20 },
    sm:      { fontSize: 16, lineHeight: 24 },
    md:      { fontSize: 20, lineHeight: 28 },
    lg:      { fontSize: 24, lineHeight: 32 },
    xl:      { fontSize: 32, lineHeight: 40 },
    heading: { fontSize: 40, lineHeight: 48, fontWeight: "bold" },
    display: { fontSize: 48, lineHeight: 56, fontWeight: "bold" },
  },
  largeTablet: {
    xs:      { fontSize: 16, lineHeight: 22 },
    sm:      { fontSize: 18, lineHeight: 26 },
    md:      { fontSize: 24, lineHeight: 32 },
    lg:      { fontSize: 32, lineHeight: 40 },
    xl:      { fontSize: 40, lineHeight: 48 },
    heading: { fontSize: 48, lineHeight: 56, fontWeight: "bold" },
    display: { fontSize: 56, lineHeight: 64, fontWeight: "bold" },
  },
};

export function useTypographyBreakpoint(): TypographyBreakpoint {
  const { width } = useWindowDimensions();
  if (width >= TYPOGRAPHY_BREAKPOINTS.largeTablet) return "largeTablet";
  if (width >= TYPOGRAPHY_BREAKPOINTS.tablet) return "tablet";
  if (width >= TYPOGRAPHY_BREAKPOINTS.largePhone) return "largePhone";
  return "phone";
}

export function useTypography(): TypographyScale {
  const bp = useTypographyBreakpoint();
  return TYPOGRAPHY[bp];
}

export default {
  TYPOGRAPHY_BREAKPOINTS,
  TYPOGRAPHY,
  useTypographyBreakpoint,
  useTypography,
};
