
// Size token system for components, using dp and breakpoints
import { useWindowDimensions } from "react-native";

export type SizeBreakpoint = "phone" | "largePhone" | "tablet" | "largeTablet";

export const SIZE_BREAKPOINTS: Record<SizeBreakpoint, number> = {
  phone: 0,         // up to 359
  largePhone: 360,  // 360–599
  tablet: 600,      // 600–899
  largeTablet: 900, // 900+
};

export type SizeScale = {
  xs: number; // e.g. icon, small button
  sm: number; // e.g. button, input
  md: number; // e.g. card, modal
  lg: number; // e.g. drawer, large modal
  xl: number; // e.g. full screen, hero
};

const SIZES: Record<SizeBreakpoint, SizeScale> = {
  phone:      { xs: 16,  sm: 24,  md: 40,  lg: 56,  xl: 80 },
  largePhone: { xs: 20,  sm: 32,  md: 48,  lg: 64,  xl: 96 },
  tablet:     { xs: 24,  sm: 40,  md: 64,  lg: 96,  xl: 128 },
  largeTablet:{ xs: 32,  sm: 56,  md: 96,  lg: 128, xl: 160 },
};

export function useSizeBreakpoint(): SizeBreakpoint {
  const { width } = useWindowDimensions();
  if (width >= SIZE_BREAKPOINTS.largeTablet) return "largeTablet";
  if (width >= SIZE_BREAKPOINTS.tablet) return "tablet";
  if (width >= SIZE_BREAKPOINTS.largePhone) return "largePhone";
  return "phone";
}

export function useSizes(): SizeScale {
  const bp = useSizeBreakpoint();
  return SIZES[bp];
}

export default {
  SIZE_BREAKPOINTS,
  SIZES,
  useSizeBreakpoint,
  useSizes,
};