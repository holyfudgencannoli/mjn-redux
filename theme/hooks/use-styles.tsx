/**
 * Learn more about light and dark modes:
 * https://docs.expo.dev/guides/color-schemes/
 */

import {
  appStyles,
  formStyles,
  headerStyles
} from "../styles";
import { useColorScheme } from './use-color-scheme';

export function useStyles(
  // scheme: ColorSchemeName
) {
  const scheme = useColorScheme() ?? 'light';

  const app = appStyles[scheme];
  const form =  formStyles[scheme];
  const header = headerStyles[scheme];

  return { app, form, header };
}
