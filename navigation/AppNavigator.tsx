// src/navigation/navigation.tsx
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { MenuProvider } from "../context/MenuContext";

// import your existing screens (adjust paths as needed)
import WelcomeScreen from "../screens/WelcomeScreen";
import MenuScreen from "../screens/MenuScreen";
import MenuDetailsUpdateScreen from "../screens/MenuDetailsUpdateScreen";

// newly provided screens
import AddToMenuScreen from "../screens/AddToMenuScreen";
import RemoveFromMenuScreen from "../screens/RemoveFromMenuScreen";
import ResetConfirmationScreen from "../screens/ResetConfirmationScreen";
import FilterScreen from "../screens/FilterScreen";
import OrderDetailsScreen from "../screens/OrderDetailsScreen";
import HelpScreen from "../screens/HelpScreen";

export type RootStackParamList = {
  Welcome: undefined;
  Menu: undefined;
  MenuDetailsUpdate: undefined;
  AddToMenu: undefined;
  RemoveFromMenu: undefined;
  ResetConfirmation: undefined;
  Filter: undefined;
  OrderDetails: undefined;
  Help: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigator() {
  return (
    <MenuProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Welcome">
          <Stack.Screen name="Welcome" component={WelcomeScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Menu" component={MenuScreen} options={{ title: "Menu" }} />
          <Stack.Screen name="MenuDetailsUpdate" component={MenuDetailsUpdateScreen} options={{ title: "Menu (Owner)" }} />

          <Stack.Screen name="AddToMenu" component={AddToMenuScreen} options={{ title: "Add to Menu" }} />
          <Stack.Screen name="RemoveFromMenu" component={RemoveFromMenuScreen} options={{ title: "Remove from Menu" }} />
          <Stack.Screen name="ResetConfirmation" component={ResetConfirmationScreen} options={{ title: "Reset Menu" }} />

          <Stack.Screen name="Filter" component={FilterScreen} options={{ title: "Filter" }} />
          <Stack.Screen name="OrderDetails" component={OrderDetailsScreen} options={{ title: "Order Details" }} />
          <Stack.Screen name="Help" component={HelpScreen} options={{ title: "Help" }} />
        </Stack.Navigator>
      </NavigationContainer>
    </MenuProvider>
  );
}
