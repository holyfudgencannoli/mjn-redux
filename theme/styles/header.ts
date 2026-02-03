// import { primary, secondary } from "@/constants/theme";
import { primary100, secondary400 } from "@theme/colors/shades";
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
      fontSize: 24,
      padding: 8,
      paddingLeft: 16,
      textAlign: 'center',    
      width: '100%',
      color: secondary400,
      textShadowColor: primary100,
      textShadowRadius: 32,
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
      fontSize: 24,
      padding: 8,
      paddingLeft: 16,
      textAlign: 'center',    
      width: '100%',
      color: primary100,
      textShadowColor: secondary400,
      textShadowRadius: 32,
      fontWeight: 'bold',
      marginTop: '6%'
    } as TextStyle
  })
};