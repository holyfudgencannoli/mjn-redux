import { Ionicons } from "@expo/vector-icons";
import { BottomTabHeaderProps } from "@react-navigation/bottom-tabs";
import { Tabs } from "expo-router";
import { useWindowDimensions, View } from "react-native";

export default function RecipesLayout() {
  const window = useWindowDimensions();

  return (
    <Tabs>
      <Tabs.Screen
        name="index"
        options={{
          tabBarIcon: ({focused, color, size}) => {
            return(
              <Ionicons name={focused ? 'list-circle-sharp' : 'list-circle-outline'} size={size} color={color} />
            )
          },
          headerTitle: 'Recipe List',
          tabBarLabel: 'Recipe List',
          headerShown: false,
          tabBarLabelStyle: { fontSize: 12 },
          tabBarStyle: { height: window.width / 5,  },
          tabBarItemStyle: { height: 150 },
          header: ((props: BottomTabHeaderProps) => {
            return(
              <View></View>
            )
          })
        }}
      />
      <Tabs.Screen
        name="new-recipe"
        options={{
          tabBarIcon: ({focused, color, size}) => {
            return(
              <Ionicons name={focused ? 'add-circle' : 'add-circle-outline'} size={size} color={color} />
            )
          },
          tabBarLabel: 'New Recipe',
          headerShown: false,
          tabBarLabelStyle: { fontSize: 12 },
          tabBarStyle: { height: window.width / 5,  },
          tabBarItemStyle: { height: 150 },
          header: ((props: BottomTabHeaderProps) => {
            return(
              <View></View>
            )
          })
        }}
      />
      <Tabs.Screen
        name="batches"
        options={{
          tabBarIcon: ({focused, color, size}) => {
            return(
              <Ionicons name={focused ? 'layers-sharp' : 'layers-outline'} size={size} color={color} />
            )
          },
          headerTitle: 'Batches',
          tabBarLabel: 'Batches',
          headerShown: false,
          tabBarLabelStyle: { fontSize: 12 },
          tabBarStyle: { height: window.width / 5,  },
          tabBarItemStyle: { height: 150 },
          header: ((props: BottomTabHeaderProps) => {
            return(
              <View></View>
            )
          })
        }}
      />
      <Tabs.Screen
        name="new-recipe-batch"
        options={{
          tabBarLabel: 'New Batch',
          headerShown: false,
          tabBarLabelStyle: { fontSize: 12 },
          tabBarStyle: { height: window.width / 5,  },
          tabBarItemStyle: { height: 150 },
          header: ((props: BottomTabHeaderProps) => {
            return(
              <View></View>
            )
          })
        }}
      />
    </Tabs>
  )
}