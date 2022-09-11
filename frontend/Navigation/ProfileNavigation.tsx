import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { useMoralis } from "react-moralis";
import { useWalletConnect } from "../WalletConnect";

import Header from "../Components/Header";

import RecentTransactions from "../Components/RecentTransactions/RecentTransactions";
import EditProfileScreen from "../Screens/Profile/EditProfileScreen";
import ProfileScreen from "../Screens/Profile/ProfileScreen";
import ProfileSettingsScreen from "../Screens/Profile/ProfileSettingsScreen";

const Stack = createStackNavigator();

function ProfileNavigation(): JSX.Element {

  return (
    <Stack.Navigator initialRouteName="ProfileScreen">
      <Stack.Screen
        name="ProfileScreen"
        component={ProfileScreen}
        options={{ headerTitle: props => <Header /> }}
      />
      <Stack.Screen
        name="EditProfile"
        component={EditProfileScreen}
        options={{
          title: "Edit Profile",
        }}
      />
      <Stack.Screen
        name="ProfileSettings"
        component={ProfileSettingsScreen}
        options={{
          title: "Settings",
        }}
      />
      <Stack.Screen name="Transactions" component={RecentTransactions} />
    </Stack.Navigator>
  );
}

export default ProfileNavigation;
