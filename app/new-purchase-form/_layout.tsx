import { Stack } from "expo-router";
import { useWindowDimensions } from "react-native";

export default function NewPurchaseLogLayout() {
  const window = useWindowDimensions();
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          headerTitle: 'New Purchase Log',
          headerShown: false,
          headerTitleAlign: 'center',
        }}
      />
    </Stack>  
  );
} 