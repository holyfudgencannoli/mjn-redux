import { StyleSheet } from "react-native";
import { primary500, secondary100, secondary400 } from "../colors/shades";

export const formStyles = {
  light: StyleSheet.create({
    label: {
      fontSize: 18,
      textAlign:  'center',
      fontWeight: 'bold',
      color: primary500,
      textShadowColor: secondary100,
      textShadowRadius: 16,
      // marginVertical: 16,
      // paddingVertical: 8
    },
    title: {
      fontSize: 24,
      textAlign:  'center',
      fontWeight: 'bold',
      color: 'white',
      textShadowColor: 'red',
      textShadowRadius: 16,
    },
    input: {
      width: '100%', 
      backgroundColor: 'transparent', 
      fontSize: 18,
      color: secondary400, 
      textShadowColor: secondary100  , 
      textShadowRadius: 16, 
      textAlign: 'center', 
      borderBottomColor: 'white', 
      borderBottomWidth: 1, 
      borderRadius: 8, 
      minHeight: 50
    },
    surface: {
      padding: 8,
      backgroundColor: 'white',
      // margin: 8
    },
    surfaceContainer: {
      padding: 16,
      backgroundColor: 'rgba(56,185,255,0.3)'
    },
    surfaceMetaContainer: {
      backgroundColor: 'rgba(55,255,55,0.4)',
      width:350,
      margin: 'auto',
      marginTop: 16,
    },
    title_secondary: {
      fontSize: 24,
      textAlign:  'center',
      fontWeight: 'bold',
      color: 'red',
      textShadowColor: 'blue',
      textShadowRadius: 16,
    },
    subtitle: {
      fontSize: 18,
      textAlign:  'center',
      fontWeight: 'bold',
      color: 'red',
      textShadowColor: 'blue',
      textShadowRadius: 16,
    },
    measurementBox: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: 8, // space between inputs (RN 0.71+)
      paddingHorizontal: 8,
    },
    measurementInput: {
      flex: 1,          // take equal space
      minWidth: 120,    // never smaller than 120px
      maxWidth: 180,    // optional: never bigger than 180px
    },
    measurementContainer: {
      display: 'flex',
      flexDirection: "row",
      flexWrap: "wrap",
      justifyContent: "space-between",
      padding: 10,
    },
    item: {
      width: "30%",        // 3 items per row
      aspectRatio: 1,      // makes it square
      marginBottom: 10,
      backgroundColor: "#4682B4",
      justifyContent: "center",
      alignItems: "center",
      borderRadius: 8,
    },
    measurementText: {
      color: "white",
      fontWeight: "bold",
    },
    measurementFloatInput: {
      width: 144
    },
    container: { flex: 1 },
    label_secondary: {
      fontSize: 18,
      textAlign:  'center',
      fontWeight: 'bold',
      color: 'red',
      textShadowColor: 'blue',
      textShadowRadius: 16,
    },
    text: { fontSize: 20, marginBottom: 20 },
    form: {
      backgroundColor: 'rgba(0, 17, 255, 0.3)',
      width:66    
    },
    backgroundImage:{
      paddingBottom: 300
    },
    surfaceBottom: {
      padding: 16,
      backgroundColor: 'rgba(0,0,0,0.5)',
      marginBottom: 24
    },
  }),
  dark: StyleSheet.create({
    label: {
      fontSize: 18,
      textAlign:  'center',
      fontWeight: 'bold',
      color: 'white',
      textShadowColor: 'red',
      textShadowRadius: 16,
      // marginVertical: 16,
      // paddingVertical: 8
    },
    title: {
      fontSize: 24,
      textAlign:  'center',
      fontWeight: 'bold',
      color: 'white',
      textShadowColor: 'red',
      textShadowRadius: 16,
    },
    input: {
      backgroundColor:'transparent', 
      width: '85%', 
      color: 'white', 
      fontSize: 16, 
      marginBottom: 12, 
      borderBottomColor: 'white', 
      borderBottomWidth: 1,
      textAlign: 'center',
      margin: 'auto',
      // fontFamily: Fonts.serif,
    },
    surface: {
      padding: 8,
      backgroundColor: 'white',
      // margin: 8
    },
    surfaceContainer: {
      padding: 16,
      backgroundColor: 'rgba(56,185,255,0.3)'
    },
    surfaceMetaContainer: {
      backgroundColor: 'rgba(55,255,55,0.4)',
      width:350,
      margin: 'auto',
      marginTop: 16,
    },
    title_secondary: {
      fontSize: 24,
      textAlign:  'center',
      fontWeight: 'bold',
      color: 'red',
      textShadowColor: 'blue',
      textShadowRadius: 16,
    },
    subtitle: {
      fontSize: 18,
      textAlign:  'center',
      fontWeight: 'bold',
      color: 'red',
      textShadowColor: 'blue',
      textShadowRadius: 16,
    },
    measurementBox: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: 8, // space between inputs (RN 0.71+)
      paddingHorizontal: 8,
    },
    measurementInput: {
      flex: 1,          // take equal space
      minWidth: 120,    // never smaller than 120px
      maxWidth: 180,    // optional: never bigger than 180px
    },
    measurementContainer: {
      display: 'flex',
      flexDirection: "row",
      flexWrap: "wrap",
      justifyContent: "space-between",
      padding: 10,
    },
    item: {
      width: "30%",        // 3 items per row
      aspectRatio: 1,      // makes it square
      marginBottom: 10,
      backgroundColor: "#4682B4",
      justifyContent: "center",
      alignItems: "center",
      borderRadius: 8,
    },
    measurementText: {
      color: "white",
      fontWeight: "bold",
    },
    measurementFloatInput: {
      width: 144
    },
    container: { flex: 1 },
    label_secondary: {
      fontSize: 18,
      textAlign:  'center',
      fontWeight: 'bold',
      color: 'red',
      textShadowColor: 'blue',
      textShadowRadius: 16,
    },
    text: { fontSize: 20, marginBottom: 20 },
    form: {
      backgroundColor: 'rgba(0, 17, 255, 0.3)',
      width:66    
    },
    backgroundImage:{
      paddingBottom: 300
    },
    surfaceBottom: {
      padding: 16,
      backgroundColor: 'rgba(0,0,0,0.5)',
      marginBottom: 24
    },
  })
}

  