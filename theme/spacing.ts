import { useWindowDimensions } from "react-native";

export type Breakpoint = "phone" | "largePhone" | "tablet" | "largeTablet";

export const BREAKPOINTS = {
  phone: 0,
  largePhone: 360,
  tablet: 768,
  largeTablet: 1024,
};


export type SpacingScale = {
  xs: number;
  sm: number;
  md: number;
  lg: number;
  xl: number;
};

const SPACING: Record<Breakpoint, SpacingScale> = {
  phone:      { xs: 4,  sm: 8,  md: 12, lg: 16, xl: 24 },
  largePhone: { xs: 6,  sm: 12, md: 16, lg: 24, xl: 32 },
  tablet:     { xs: 8,  sm: 16, md: 24, lg: 32, xl: 40 },
  largeTablet:{ xs: 12, sm: 20, md: 32, lg: 40, xl: 56 },
};

export function useBreakpoint(): Breakpoint {
  const { width } = useWindowDimensions();
  if (width >= BREAKPOINTS.largeTablet) return "largeTablet";
  if (width >= BREAKPOINTS.tablet) return "tablet";
  if (width >= BREAKPOINTS.largePhone) return "largePhone";
  return "phone";
}

export function useSpacing(): SpacingScale {
  const bp = useBreakpoint();
  return SPACING[bp];
}