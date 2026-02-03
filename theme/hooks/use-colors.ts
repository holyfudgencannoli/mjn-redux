/**
 * Learn more about light and dark modes:
 * https://docs.expo.dev/guides/color-schemes/
 */

import { Colors } from '../colors';
import { useColorScheme } from './use-color-scheme';

export function useColors() {
  const theme = useColorScheme() ?? 'light';
  const colorTheme = Colors[theme];

  return colorTheme;
}
