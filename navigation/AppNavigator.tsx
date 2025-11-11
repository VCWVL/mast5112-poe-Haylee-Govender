// src/navigation/navigation.tsx
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { MenuProvider } from "../context/MenuContext";

// Import all the screens used in the navigator.
import WelcomeScreen from "../screens/WelcomeScreen";
import MenuScreen from "../screens/MenuScreen";
import MenuDetailsUpdateScreen from "../screens/MenuDetailsUpdateScreen";
import AddToMenuScreen from "../screens/AddToMenuScreen";
import RemoveFromMenuScreen from "../screens/RemoveFromMenuScreen";
import ResetConfirmationScreen from "../screens/ResetConfirmationScreen";
import FilterScreen from "../screens/FilterScreen";
import OrderDetailsScreen from "../screens/OrderDetailsScreen";
import HelpScreen from "../screens/HelpScreen";

/**
 * Defines the type mapping for the navigation stack's routes and their parameters.
 * This provides type safety for screen names and their parameters when navigating.
 * `undefined` means the route takes no parameters.
 */
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

// Create a stack navigator instance with the defined type parameters.
const Stack = createNativeStackNavigator<RootStackParamList>();

/**
 * AppNavigator is the root component for the application's navigation.
 * It sets up a native stack navigator and wraps the entire app in a MenuProvider
 * to make menu and order state available globally.
 */
export default function AppNavigator() {
  return (
    // The MenuProvider makes the menu context available to all screens in the navigator.
    <MenuProvider>
      {/* NavigationContainer is a component which manages our navigation tree and contains the navigation state. */}
      <NavigationContainer>
        {/* Stack.Navigator defines the navigation stack with its screens. */}
        <Stack.Navigator initialRouteName="Welcome">
          {/* Welcome screen is the initial route and has its header hidden. */}
          <Stack.Screen name="Welcome" component={WelcomeScreen} options={{ headerShown: false }} />
          
          {/* Public-facing menu screen. */}
          <Stack.Screen name="Menu" component={MenuScreen} options={{ title: "Menu" }} />
          
          {/* Owner's dashboard for managing the menu. */}
          <Stack.Screen name="MenuDetailsUpdate" component={MenuDetailsUpdateScreen} options={{ title: "Menu (Owner)" }} />

          {/* Screens for owner's menu management actions. */}
          <Stack.Screen name="AddToMenu" component={AddToMenuScreen} options={{ title: "Add to Menu" }} />
          <Stack.Screen name="RemoveFromMenu" component={RemoveFromMenuScreen} options={{ title: "Remove from Menu" }} />
          <Stack.Screen name="ResetConfirmation" component={ResetConfirmationScreen} options={{ title: "Reset Menu" }} />

          {/* Screens for customer actions. */}
          <Stack.Screen name="Filter" component={FilterScreen} options={{ title: "Filter" }} />
          <Stack.Screen name="OrderDetails" component={OrderDetailsScreen} options={{ title: "Order Details" }} />
          <Stack.Screen name="Help" component={HelpScreen} options={{ title: "Help" }} />

        </Stack.Navigator>
      </NavigationContainer>
    </MenuProvider>
  );
}
