import { migrateDbIfNeeded } from "@/db/migrations";
import DrizzleProvider from "@/hooks/use-drizzle";
import { Theme, useTheme } from "@theme/hooks/use-theme";
import Drawer from 'expo-router/drawer';
import { SQLiteDatabase, SQLiteProvider } from "expo-sqlite";
import { StatusBar } from "expo-status-bar";
import { useCallback } from "react";
import { Provider as PaperProvider } from 'react-native-paper';

const { scheme } : Theme = useTheme();

export const unstable_settings = {
  anchor: '(drawers)',
};

export default function RootLayout() {
	const { scheme }: Theme = useTheme()
//   const { app, form, header } = useStyles()

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
          <Drawer>
            <Drawer.Screen name="(dashboard)" options={{ title: 'Dashboard' }}  />
          </Drawer>
        </DrizzleProvider>
      </PaperProvider>
		</SQLiteProvider>
  )
}
