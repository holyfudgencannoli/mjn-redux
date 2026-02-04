import Header from "@/components/header";
import { migrateDbIfNeeded } from "@/db/migrations";
import DrizzleProvider from "@/hooks/use-drizzle";
import { useStyles } from "@/theme/hooks/use-styles";
import { getHeaderTitle } from "@react-navigation/elements";
import { Theme, useTheme } from "@theme/hooks/use-theme";
import Drawer from 'expo-router/drawer';
import { SQLiteDatabase, SQLiteProvider } from "expo-sqlite";
import { StatusBar } from "expo-status-bar";
import { useCallback } from "react";
import { FlexStyle, TextStyle, ViewStyle } from "react-native";
import { PaperProvider } from 'react-native-paper';


export const unstable_settings = {
  anchor: '(drawers)',
};

export default function RootLayout() {
	const { scheme }: Theme = useTheme()
  const { colors } = useTheme()
  // const db = useSQLiteContext();
  const { header } = useStyles()

  const handleInit = useCallback(async (db: SQLiteDatabase) => {
      console.log("Initializing...")
		try {
			await migrateDbIfNeeded(db);
			console.log("✅ Migration complete!");
		} catch (err) { 
			console.error("❌ Migration failed:", err);
		} 
  }, []);

    // const [permissionStatus, requestPermission] = usePermissions()

  return(
    <SQLiteProvider 
      databaseName="mycologger.db"
      onInit={async (db: SQLiteDatabase) => {
        console.log('Database initialized');
        await handleInit(db);
      }}
    >
      <PaperProvider>
        <DrizzleProvider>    
          <StatusBar style={scheme === 'dark' ? "light" : "dark"} />
          <Drawer
            // layout={Header}
            // initialRouteName="Dashboard" 
            screenOptions={{
              
              popToTopOnBlur: true,
              freezeOnBlur: true,
              lazy: true,
                header: ({ route, options, navigation }) => {
                    const title = getHeaderTitle(options, route.name);
                    console.log(`Focused?: `, navigation.isFocused())
                    console.log((options.title))

                    return (                        
                        <Header 
                            // navigation={navigation} 
                            title={title} 
                            style={header.container as FlexStyle & ViewStyle} 
                            textStyle={header.title as TextStyle} 
                        />
                    ) 
                },
                headerTintColor: colors.headerTint,
                drawerActiveTintColor: colors.drawerActiveTint,
                drawerInactiveTintColor: colors.drawerInactiveTint,
                drawerHideStatusBarOnOpen: true,
                drawerStyle: {
                    backgroundColor: colors.drawerBackground
                }, 
                drawerType: 'front',
                swipeEnabled: true,
                swipeEdgeWidth: 50,

            }}
          >
            <Drawer.Screen name="(dashboard)" options={{ title: 'Dashboard' }}  />
            <Drawer.Screen name="new-item" options={{ title: 'New Item' }} />
            <Drawer.Screen name="new-purchase-form" options={{ title: 'New Purchase Form' }} />
            <Drawer.Screen name="recipes" options={{ title: 'Recipes' }} />

          </Drawer>
        </DrizzleProvider>
      </PaperProvider>
		</SQLiteProvider>
  )
}
