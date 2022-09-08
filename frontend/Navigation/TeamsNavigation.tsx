import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { useMoralis } from 'react-moralis';
import { useWalletConnect } from '../WalletConnect';

import CryptoAuth from '../Components/CryptoAuth';
import Header from '../Components/Header';
import HomeNavigation from './HomeNavigation';
import TeamsScreen from '../Screens/Teams/TeamsScreen';
import TeamScreen from '../Screens/Teams/TeamScreen';

const Stack = createStackNavigator();

function TeamsNavigation(): JSX.Element {
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
    <Stack.Navigator initialRouteName="TeamsScreen">
      {/* Auth Navigator: Include Login and Signup */}
      <Stack.Screen
        name="Teams"
        component={TeamsScreen}
        options={{ headerTitle: props => <Header /> }}
      />
      {/* Navigation Drawer as a landing page */}
      <Stack.Screen
        name="Team"
        component={TeamScreen}
        // Hiding header for Navigation Drawer
        options={{ headerTitle: props => <Header /> }}
        // options={({ route }) => ({
        //   headerTitle: getHeaderTitle(route),
        // })}
      />
    </Stack.Navigator>
  );
}

export default TeamsNavigation;
