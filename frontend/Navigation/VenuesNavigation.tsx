import { createStackNavigator } from "@react-navigation/stack";
import React from "react";

import Header from "../Components/Header";
import VenuesFilterView from "../Components/Venues/VenuesFilterView";
import VenueScreen from "../Screens/Venues/VenueScreen";
import VenuesScreen from "../Screens/Venues/VenuesScreen";

const Stack = createStackNavigator();

function MainVenuesNavigation(): JSX.Element {
  return (
    <Stack.Navigator initialRouteName="VenuesNavigation">
      <Stack.Screen
        name="VenuesNavigation"
        component={VenuesNavigation}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="VenueScreen" component={VenueScreen} />
    </Stack.Navigator>
  );
}

function VenuesNavigation(): JSX.Element {
  return (
    <Stack.Navigator
      initialRouteName="VenuesScreen"
      screenOptions={{
        presentation: "modal",
        gestureEnabled: true,
      }}>
      <Stack.Screen
        name="VenuesScreen"
        component={VenuesScreen}
        options={{ headerTitle: props => <Header />, title: "Venues" }}
      />
      <Stack.Screen
        name="VenuesFilter"
        component={VenuesFilterView}
        options={{ title: "Venues Filter" }}
      />
    </Stack.Navigator>
  );
}

export default MainVenuesNavigation;
