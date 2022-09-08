import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { useMoralis } from 'react-moralis';
import { useWalletConnect } from '../WalletConnect';

import Header from '../Components/Header';
import RewardsScreen from '../Screens/Rewards/RewardsScreen';

const Stack = createStackNavigator();

function RewardsNavigation(): JSX.Element {
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
    <Stack.Navigator initialRouteName="RewardsScreen">
      <Stack.Screen
        name="Rewards"
        component={RewardsScreen}
        options={{ headerTitle: props => <Header /> }}
      />
    </Stack.Navigator>
  );
}

export default RewardsNavigation;
