import { Stack } from "expo-router";
import { useWindowDimensions } from "react-native";

export default function NewItemLayout() {
  const window = useWindowDimensions();
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          headerTitle: 'New Item',
          headerShown: false,
          headerTitleAlign: 'center',
        }}
      />
    </Stack>  
  ); 
} 