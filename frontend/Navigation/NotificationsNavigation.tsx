import { createStackNavigator } from "@react-navigation/stack";
import React from "react";

import Header from "../Components/Header";
import {
  ActiveChallengesStack,
  CompleteChallengesStack,
  CreatedChallengesStack,
} from "../Screens/Notifications/ChallengesScreen";
import NotificationsScreen from "../Screens/Notifications/NotificationsScreen";
import {
  AvailableRewardsStack,
  ClaimedRewardsStack,
} from "../Screens/Notifications/RewardsScreen";

const Stack = createStackNavigator();

function NotificationsNavigation(): JSX.Element {
  return (
    <Stack.Navigator
      initialRouteName="NotificationsScreen"
      screenOptions={{
        presentation: "modal",
        gestureEnabled: true,
      }}>
      <Stack.Screen
        name="NotificationsScreen"
        component={NotificationsScreen}
        options={{ headerTitle: props => <Header />, title: "Notifications" }}
      />
      <Stack.Screen
        name="AvailableRewards"
        component={AvailableRewardsStack}
        options={{ title: "Available Rewards" }}
      />
      <Stack.Screen
        name="ClaimedRewards"
        component={ClaimedRewardsStack}
        options={{ title: "Claimed Rewards" }}
      />
      {/* <Stack.Screen
        name="InvitesScreen"
        component={RewardsScreen}
        options={{ headerShown: false }}
      /> */}
      <Stack.Screen
        name="ActiveChallenges"
        component={ActiveChallengesStack}
        options={{ title: "Active Challenges" }}
      />
      <Stack.Screen
        name="CompleteChallenges"
        component={CompleteChallengesStack}
        options={{ title: "Complete Challenges" }}
      />
      <Stack.Screen
        name="CreatedChallenges"
        component={CreatedChallengesStack}
        options={{ title: "Created Challenges" }}
      />
    </Stack.Navigator>
  );
}

export default NotificationsNavigation;
