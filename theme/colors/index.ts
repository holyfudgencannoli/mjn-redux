import { useColorScheme } from 'react-native';
import { useShades } from './shades';

export type SemanticColors = {
  textPrimary: string;
  textSecondary: string;
  textTertiary: string;
  textInverse: string;
  background: string;
  backgroundSecondary: string;
  surface: string;
  surfaceSecondary: string;
  card: string;
  primary: string;
  primaryHover: string;
  primaryPressed: string;
  secondary: string;
  secondaryHover: string;
  secondaryPressed: string;
  accent: string;
  accentHover: string;
  accentPressed: string;
  success: string;
  warning: string;
  error: string;
  info: string;
  border: string;
  borderSecondary: string;
  tint: string;
  icon: string;
  tabIconDefault: string;
  tabIconSelected: string;
};

function getLightColors(shades: ReturnType<typeof useShades>): SemanticColors {
  return {
    textPrimary: shades.neutral[900],
    textSecondary: shades.neutral[700],
    textTertiary: shades.neutral[500],
    textInverse: shades.neutral[100],

    background: shades.neutral[100],
    backgroundSecondary: shades.neutral[200],
    surface: shades.neutral[100],
    surfaceSecondary: shades.neutral[200],
    card: shades.neutral[100],

    primary: shades.primary[500],
    primaryHover: shades.primary[400],
    primaryPressed: shades.primary[600],

    secondary: shades.secondary[500],
    secondaryHover: shades.secondary[400],
    secondaryPressed: shades.secondary[600],

    accent: shades.accent[500],
    accentHover: shades.accent[400],
    accentPressed: shades.accent[600],

    success: shades.accent[500], // Assuming green accent
    warning: shades.secondary[500], // Assuming orange secondary
    error: shades.primary[500], // Assuming red primary
    info: shades.secondary[500],

    border: shades.neutral[300],
    borderSecondary: shades.neutral[200],

    tint: shades.primary[500],
    icon: shades.neutral[600],
    tabIconDefault: shades.neutral[600],
    tabIconSelected: shades.primary[500],
  };
}

function getDarkColors(shades: ReturnType<typeof useShades>): SemanticColors {
  return {
    textPrimary: shades.neutral[100],
    textSecondary: shades.neutral[300],
    textTertiary: shades.neutral[500],
    textInverse: shades.neutral[900],

    background: shades.neutral[900],
    backgroundSecondary: shades.neutral[800],
    surface: shades.neutral[900],
    surfaceSecondary: shades.neutral[800],
    card: shades.neutral[800],

    primary: shades.primary[500],
    primaryHover: shades.primary[400],
    primaryPressed: shades.primary[600],

    secondary: shades.secondary[500],
    secondaryHover: shades.secondary[400],
    secondaryPressed: shades.secondary[600],

    accent: shades.accent[500],
    accentHover: shades.accent[400],
    accentPressed: shades.accent[600],

    success: shades.accent[500],
    warning: shades.secondary[500],
    error: shades.primary[500],
    info: shades.secondary[500],

    border: shades.neutral[700],
    borderSecondary: shades.neutral[600],

    tint: shades.primary[500],
    icon: shades.neutral[400],
    tabIconDefault: shades.neutral[400],
    tabIconSelected: shades.primary[500],
  };
}

export function useColors(): SemanticColors {
  const colorScheme = useColorScheme();
  const shades = useShades();

  return colorScheme === 'dark' ? getDarkColors(shades) : getLightColors(shades);
}

// Legacy Colors object for backward compatibility
export const Colors = {
  light: getLightColors({} as any), // Placeholder, but in practice use the hook
  dark: getDarkColors({} as any),
};
