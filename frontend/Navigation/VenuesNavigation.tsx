import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { useMoralis } from 'react-moralis';
import { useWalletConnect } from '../WalletConnect';

import CryptoAuth from '../Components/CryptoAuth';
import Header from '../Components/Header';
import HomeNavigation from './HomeNavigation';
import VenuesScreen from '../Screens/Venues/VenuesScreen';
import VenueScreen from '../Screens/Venues/VenueScreen';

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
    <Stack.Navigator
      initialRouteName="VenuesScreen">
      {/* Auth Navigator: Include Login and Signup */}
      <Stack.Screen
        name="Venues"
        component={VenuesScreen}
        options={{ headerTitle: props => <Header /> }}
      />
      {/* Navigation Drawer as a landing page */}
      <Stack.Screen
        name="Venue"
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
