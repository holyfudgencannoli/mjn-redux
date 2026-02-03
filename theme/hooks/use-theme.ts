/**
 * Learn more about light and dark modes:
 * https://docs.expo.dev/guides/color-schemes/
 */

// import { app, form, header } from "@/styles";
import { useMemo } from 'react';
import { getDarkColors, getLightColors } from '../colors';
import { useShades } from '../colors/shades';
import { Fonts } from '../fonts';
import { useColorScheme } from './use-color-scheme';
import { useStyles } from './use-styles';

/**
 * Returns themed values based on the current color scheme.
 * Example:
 *   const { scheme, colors, styles, fonts } = useTheme();
 */
export function useTheme() {
  const scheme = useColorScheme() ?? 'light';
  const styles = useStyles();
  const shades = useShades();

  return useMemo(() => ({
    scheme,
    colors: scheme === 'dark' ? getDarkColors(shades) : getLightColors(shades),
    styles: styles,
    fonts: Fonts,
    shades: shades
  } as const), [scheme, styles]);
}

export type Theme = ReturnType<typeof useTheme>;

