import { Fonts } from "@/theme/theme";
import { StyleSheet } from "react-native";

export const appStyles = {
  light: StyleSheet.create({
    container: { flex: 1 },
    navbar: {},
    footer: {},
    table: {},
    text: {
      color: 'white',
      fontSize: 16,
      lineHeight: 24,
      fontFamily: Fonts.sans,
    }
  }),
  dark: StyleSheet.create({
    container: { flex: 1 },
    navbar: {},
    footer: {},
    table: {},
    text: {
      color: 'white',
      fontSize: 16,
      lineHeight: 24,
      fontFamily: Fonts.sans,
    }
  })
}

