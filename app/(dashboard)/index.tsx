import MainDashboard from "@features/dashboard/screens/main-dashboard";
import { SQLiteDatabase } from "expo-sqlite";
import { View } from "react-native";

export default function Dashboard(db: SQLiteDatabase) {
  

  return (
    <View style={{ flex: 1, backgroundColor: 'transparent' }}>
      <MainDashboard />
    </View>
  )
}