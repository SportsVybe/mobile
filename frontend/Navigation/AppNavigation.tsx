import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { useMoralis } from "react-moralis";
import { useWalletConnect } from "../WalletConnect";

import LoginAuth from "../Components/LoginAuth";
import HomeNavigation from "./HomeNavigation";

const Stack = createStackNavigator();

function AppNavigation(): JSX.Element {
  const connector = useWalletConnect();
  const {
    authenticate,
    authError,
    isAuthenticating,
    isAuthenticated,
    logout,
    Moralis,
  } = useMoralis();

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Auth">
        {/* Auth Navigator: Include Login and Signup */}
        <Stack.Screen
          name="Auth"
          component={LoginAuth}
          options={{ headerShown: false }}
        />
        {/* Navigation Drawer as a landing page */}
        <Stack.Screen
          name="Home"
          component={HomeNavigation}
          // Hiding header for Navigation Drawer
          options={{ headerShown: false }}
          // options={{ headerTitle: props => <Header /> }}
          // options={({ route }) => ({
          //   headerTitle: getHeaderTitle(route),
          // })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default AppNavigation;
