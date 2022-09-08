import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { useMoralis } from 'react-moralis';
import { useWalletConnect } from '../WalletConnect';

import Header from '../Components/Header';

import RecentTransactions from '../Components/RecentTransactions/RecentTransactions';
import EditProfileScreen from '../Screens/Profile/EditProfileScreen';
import ProfileScreen from '../Screens/Profile/ProfileScreen';
import ProfileSettingsScreen from '../Screens/Profile/ProfileSettingsScreen';

const Stack = createStackNavigator();

function ProfileNavigation(): JSX.Element {
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
    <Stack.Navigator initialRouteName="ProfileScreen">
      {/* Auth Navigator: Include Login and Signup */}
      <Stack.Screen
        name="Profile"
        component={ProfileScreen}
        options={{ headerTitle: props => <Header /> }}
      />
      {/* Navigation Drawer as a landing page */}
      <Stack.Screen
        name="EditProfile"
        component={EditProfileScreen}
        // Hiding header for Navigation Drawer

        options={{
          // headerTitle: props => <Header />,
          title: 'Edit Profile',
        }}
        // options={({ route }) => ({
        //   headerTitle: getHeaderTitle(route),
        // })}
      />
      {/* Navigation Drawer as a landing page */}
      <Stack.Screen
        name="ProfileSettings"
        component={ProfileSettingsScreen}
        // Hiding header for Navigation Drawer

        options={{
          // headerTitle: props => <Header />,
          title: 'Settings',
        }}
        // options={({ route }) => ({
        //   headerTitle: getHeaderTitle(route),
        // })}
      />
      {/* Navigation Drawer as a landing page */}
      <Stack.Screen
        name="Transactions"
        component={RecentTransactions}
        // Hiding header for Navigation Drawer

        // options={{ headerTitle: props => <Header /> }}
        // options={({ route }) => ({
        //   headerTitle: getHeaderTitle(route),
        // })}
      />
    </Stack.Navigator>
  );
}

export default ProfileNavigation;
