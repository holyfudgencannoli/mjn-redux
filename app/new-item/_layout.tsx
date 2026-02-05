import { Stack } from "expo-router";

export default function NewItemLayout() {
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