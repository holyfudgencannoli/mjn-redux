import { useColorScheme } from '@theme/hooks/use-color-scheme';
import { useShades } from './shades';

export type SemanticColors = {
  textPrimary: string;
  textSecondary: string;
  textTertiary: string;
  textInverse: string;
  headerTint: string;
  drawerActiveTint: string;
  drawerInactiveTint: string;
  drawerBackground: string;
  buttonPrimary: string;
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

export function getLightColors(shades: ReturnType<typeof useShades>): SemanticColors {
  return {
    textPrimary: shades.neutral[900],
    textSecondary: shades.neutral[700],
    textTertiary: shades.neutral[500],
    textInverse: shades.neutral[100],

    
    headerTint: 'white',
    drawerActiveTint: shades.secondary[700],
    drawerInactiveTint: shades.secondary[100],
    drawerBackground: shades.secondary[200],
    buttonPrimary: shades.secondary[700],

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

export function getDarkColors(shades: ReturnType<typeof useShades>): SemanticColors {
  return {
    textPrimary: shades.neutral[100],
    textSecondary: shades.neutral[300],
    textTertiary: shades.neutral[500],
    textInverse: shades.neutral[900],

    headerTint: 'white',
    drawerActiveTint: '#77a',
    drawerInactiveTint: '#ccc',
    drawerBackground: 'rgba(18, 203, 163, 0.9)',
    buttonPrimary: '#f74a63cc',

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
const mockShades: ReturnType<typeof useShades> = {
  primary: {
    100: '#f3e8ff',
    200: '#e9d5ff',
    300: '#d8b4fe',
    400: '#c084fc',
    500: '#a855f7',
    600: '#9333ea',
    700: '#7c3aed',
    800: '#6b21a8',
    900: '#581c87',
  },
  secondary: {
    100: '#e0e7ff',
    200: '#c7d2fe',
    300: '#a5b4fc',
    400: '#818cf8',
    500: '#6366f1',
    600: '#4f46e5',
    700: '#4338ca',
    800: '#3730a3',
    900: '#312e81',
  },
  accent: {
    100: '#ecfdf5',
    200: '#d1fae5',
    300: '#a7f3d0',
    400: '#6ee7b7',
    500: '#34d399',
    600: '#10b981',
    700: '#059669',
    800: '#047857',
    900: '#065f46',
  },
  neutral: {
    100: '#f5f5f4',
    200: '#e7e5e4',
    300: '#d6d3d1',
    400: '#a8a29e',
    500: '#78716c',
    600: '#57534e',
    700: '#44403c',
    800: '#292524',
    900: '#1c1917',
  },
};

export const Colors = {
  light: getLightColors(mockShades),
  dark: getDarkColors(mockShades),
};

export { Gradients } from './gradients';

