import MainDashboard from "@features/dashboard/screens/main-dashboard";
import { View } from "react-native";

export default function Dashboard() {
  return (
    <View style={{ flex: 1, backgroundColor: 'transparent' }}>
      <MainDashboard />
    </View>
  )
}