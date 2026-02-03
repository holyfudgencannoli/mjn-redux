import { useColors } from "@/theme/colors";
import { useShades } from "@/theme/colors/shades";
import { DrawerActions } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "expo-router";
import React from "react";
import { FlexStyle, StyleSheet, TextStyle, useColorScheme, useWindowDimensions, View, ViewStyle } from "react-native";
import { Text, TouchableRipple } from "react-native-paper";

export default function Header({ title, style, textStyle, nav }: {
    title: string,
    style: FlexStyle & ViewStyle,
    textStyle: TextStyle,
    nav?: any
}) {
    const window = useWindowDimensions();
    const navigation = useNavigation();
    const scheme = useColorScheme();
    const { primary, neutral, secondary } = useShades();
    const colors = useColors();
    
    


    return(
        <LinearGradient
            start={{ x: 1, y: 1 }}
            end={{ x: 1, y: 0 }}
            colors={scheme === 'dark' ? [primary[700], primary[600], primary[500]] : [neutral[300], primary[200], primary[300]]}
            locations={[0, 0.5, 1]}
        >
            <TouchableRipple underlayColor="white" rippleColor='rgba(0,0,0,0.3)' onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}>
                <View style={{...style, display: 'flex', flexDirection: 'row', height: window.height/10 }}>
                    <Text style={textStyle}>
                        {title}
                    </Text>
                </View>
            </TouchableRipple>
        </LinearGradient>
    )
    
}

const styles = StyleSheet.create({
    headerStyle: {
        height: 'auto',         // ← Change header height
        // backgroundColor: '#6600ff55',
        width: '100%',
    },
    headerTitleStyle: {
        fontSize: 24,
        padding: 8,
        paddingLeft: 16,
        textAlign: 'center',    
        width: '100%',
        color: 'white',
        textShadowColor: 'black',
        textShadowRadius: 8,
        fontWeight: 'bold',
        marginTop: '6%'
    },
    // headerTintColor: 'white',
    // drawerActiveTintColor: '#77a',
    // // drawerInactiveBackgroundColor:'#fff',
    // drawerInactiveTintColor: '#ccc',
    // drawerHideStatusBarOnOpen: true,
    // drawerStyle: {
    //     backgroundColor: 'rgba(18, 203, 163, 0.9)'
    // }
})