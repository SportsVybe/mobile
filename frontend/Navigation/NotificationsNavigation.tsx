import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { useMoralis } from 'react-moralis';
import { useWalletConnect } from '../WalletConnect';

import Header from '../Components/Header';
import RewardsScreen from '../Screens/Rewards/RewardsScreen';

const Stack = createStackNavigator();

function NotificationsNavigation(): JSX.Element {
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
    <Stack.Navigator initialRouteName="Notifications">
      <Stack.Screen
        name="AllNotifications"
        component={RewardsScreen}
        options={{ headerTitle: props => <Header /> }}
      />
      <Stack.Screen
        name="Rewards"
        component={RewardsScreen}
        options={{ headerTitle: props => <Header /> }}
      />
      <Stack.Screen
        name="Invites"
        component={RewardsScreen}
        options={{ headerTitle: props => <Header /> }}
      />
      <Stack.Screen
        name="Challenges"
        component={RewardsScreen}
        options={{ headerTitle: props => <Header /> }}
      />
    </Stack.Navigator>
  );
}

export default NotificationsNavigation;
