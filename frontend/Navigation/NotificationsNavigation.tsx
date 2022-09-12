import { createStackNavigator } from "@react-navigation/stack";
import React from "react";

import Header from "../Components/Header";
import ChallengesScreen from "../Screens/Notifications/ChallengesScreen";
import NotificationsScreen from "../Screens/Notifications/NotificationsScreen";
import RewardsScreen from "../Screens/Notifications/RewardsScreen";

const Stack = createStackNavigator();

function NotificationsNavigation(): JSX.Element {
  return (
    <Stack.Navigator initialRouteName="NotificationsScreen">
      <Stack.Screen
        name="NotificationsScreen"
        component={NotificationsScreen}
        options={{ headerTitle: props => <Header />, title: "Notifications" }}
      />
      <Stack.Screen
        name="RewardsScreen"
        component={RewardsScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="InvitesScreen"
        component={RewardsScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ChallengesScreen"
        component={ChallengesScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

export default NotificationsNavigation;
