import { createStackNavigator } from "@react-navigation/stack";
import React from "react";

import Header from "../Components/Header";
import TeamsFilterView from "../Components/Teams/TeamsFilterView";
import TeamScreen from "../Screens/Teams/TeamScreen";
import TeamsScreen from "../Screens/Teams/TeamsScreen";

const Stack = createStackNavigator();

function MainTeamsNavigation(): JSX.Element {
  return (
    <Stack.Navigator initialRouteName="TeamsNavigation">
      <Stack.Screen
        name="TeamsNavigation"
        component={TeamsNavigation}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="TeamScreen" component={TeamScreen} />
    </Stack.Navigator>
  );
}

function TeamsNavigation(): JSX.Element {
  return (
    <Stack.Navigator
      initialRouteName="TeamsScreen"
      screenOptions={{
        presentation: "modal",
        gestureEnabled: true,
      }}>
      <Stack.Screen
        name="TeamsScreen"
        component={TeamsScreen}
        options={{ headerTitle: props => <Header />, title: "Teams" }}
      />
      <Stack.Screen
        name="TeamsFilter"
        component={TeamsFilterView}
        options={{ title: "Teams Filter" }}
      />
    </Stack.Navigator>
  );
}

export default MainTeamsNavigation;
