import React from "react";

import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";

import {
  faBell,
  faMapMarkerAlt,
  faUser,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { useMoralis } from "react-moralis";
import useNotifications from "../api/Moralis/useNotifications";
import NotificationsNavigation from "./NotificationsNavigation";
import ProfileNavigation from "./ProfileNavigation";
import TeamsNavigation from "./TeamsNavigation";
import VenuesNavigation from "./VenuesNavigation";

const Tab = createMaterialBottomTabNavigator();

function HomeNavigation(): JSX.Element {
  const { user } = useMoralis();
  const {
    availableRewards,
    pendingInvites,
    activeChallenges,
  } = useNotifications({ username: user && user.get("username") });

  const totalNotifications =
    availableRewards + pendingInvites + activeChallenges;

  return (
    <Tab.Navigator
      shifting={false}
      activeColor="#315399"
      barStyle={{ backgroundColor: "white" }}>
      <Tab.Screen
        name="VenuesNavigation"
        options={{
          tabBarLabel: "Venues",
          tabBarIcon: ({ color, focused }) => {
            return (
              <FontAwesomeIcon icon={faMapMarkerAlt} color={color} size={20} />
            );
          },
        }}
        component={VenuesNavigation}
      />
      <Tab.Screen
        name="TeamsNavigation"
        options={{
          tabBarLabel: "Teams",
          tabBarIcon: ({ color }) => (
            <FontAwesomeIcon icon={faUsers} color={color} size={20} />
          ),
        }}
        component={TeamsNavigation}
      />
      <Tab.Screen
        name="NotificationsNavigation"
        options={{
          tabBarLabel: "Notifications",
          tabBarIcon: ({ color, focused }) => {
            return <FontAwesomeIcon icon={faBell} color={color} size={20} />;
          },
          tabBarBadge: totalNotifications,
        }}
        component={NotificationsNavigation}
      />

      <Tab.Screen
        name="ProfileNavigation"
        options={{
          tabBarLabel: "Profile",
          tabBarIcon: ({ color }) => (
            <FontAwesomeIcon icon={faUser} color={color} size={20} />
          ),
        }}
        component={ProfileNavigation}
      />
    </Tab.Navigator>
  );
}

export default HomeNavigation;
