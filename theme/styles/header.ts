// import { primary, secondary } from "@/constants/theme";
import { neutral100, neutral900, secondary600 } from "@theme/colors/shades";
import { StyleSheet, TextStyle, ViewStyle } from "react-native";


export const headerStyles = {

  light: StyleSheet.create({

    container: {
      height: 'auto',         // ← Change header height
      // backgroundColor: '#6600ff55',
      width: '100%',
      justifyContent: 'center',
      alignItems: 'center'
    } as ViewStyle,

    title: {
      fontSize: 28,
      padding: 8,
      paddingLeft: 16,
      textAlign: 'center',    
      width: '100%',
      color: secondary600,
      textShadowColor: neutral100,
      textShadowRadius: 8,
      fontWeight: 'bold',
      marginTop: '6%'
    } as TextStyle
  }),

  dark: StyleSheet.create({

    container: {
      height: 'auto',         // ← Change header height
      // backgroundColor: '#6600ff55',
      width: '100%',
      justifyContent: 'center',
      alignItems: 'center'
    } as ViewStyle,

    title: {
      fontSize: 32,
      padding: 8,
      paddingLeft: 16,
      textAlign: 'center',    
      width: '100%',
      color: neutral100,
      textShadowColor: neutral900,
      textShadowRadius: 4,
      fontWeight: 'bold',
      marginTop: '6%'
    } as TextStyle
  })
};