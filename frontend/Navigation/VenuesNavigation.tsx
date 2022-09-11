import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { useMoralis } from "react-moralis";
import { useWalletConnect } from "../WalletConnect";

import Header from "../Components/Header";
import VenueScreen from "../Screens/Venues/VenueScreen";
import VenuesScreen from "../Screens/Venues/VenuesScreen";

const Stack = createStackNavigator();

function VenuesNavigation(): JSX.Element {
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
    <Stack.Navigator initialRouteName="VenuesScreen">
      {/* Auth Navigator: Include Login and Signup */}
      <Stack.Screen
        name="VenuesScreen"
        component={VenuesScreen}
        options={{ headerTitle: props => <Header /> }}
      />
      {/* Navigation Drawer as a landing page */}
      <Stack.Screen
        name="VenueScreen"
        component={VenueScreen}
        // Hiding header for Navigation Drawer

        // options={{ headerTitle: props => <Header /> }}
        // options={({ route }) => ({
        //   headerTitle: getHeaderTitle(route),
        // })}
      />
    </Stack.Navigator>
  );
}

export default VenuesNavigation;
