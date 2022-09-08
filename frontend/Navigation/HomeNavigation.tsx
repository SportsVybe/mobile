import React from 'react';

import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import NFTAssets from '../Components/NFT/NFTAssets';
import Profile from '../Components/Profile/Profile';
import RecentTransactions from '../Components/RecentTransactions/RecentTransactions';
import Transfer from '../Components/Transfer/Transfer';
import Venues from '../Components/Venues/Venues';

import {
  faCreditCard,
  faMapMarkerAlt,
  faMoneyBill,
  faMoneyCheck,
  faPaperPlane,
  faRocket,
  faStar,
  faUser,
  faUsers,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import VenuesNavigation from './VenuesNavigation';
import TeamsNavigation from './TeamsNavigation';

const Tab = createMaterialBottomTabNavigator();

// const Activecolor =
function HomeNavigation(): JSX.Element {
  return (
    <Tab.Navigator
      shifting={false}
      activeColor="#315399"
      // inactiveColor="#3e2465"
      barStyle={{ backgroundColor: 'white' }}>
      <Tab.Screen
        name="Venues"
        options={{
          tabBarLabel: 'Venues',
          tabBarIcon: ({ color, focused }) => {
            return (
              <FontAwesomeIcon icon={faMapMarkerAlt} color={color} size={20} />
            );
          },
        }}
        component={VenuesNavigation}
      />
      <Tab.Screen
        name="Teams"
        options={{
          tabBarLabel: 'Teams',
          tabBarIcon: ({ color }) => (
            <FontAwesomeIcon icon={faUsers} color={color} size={20} />
          ),
        }}
        component={TeamsNavigation}
      />
      <Tab.Screen
        name="Rewards"
        options={{
          tabBarLabel: 'Rewards',
          tabBarIcon: ({ color, focused }) => {
            return <FontAwesomeIcon icon={faStar} color={color} size={20} />;
          },
        }}
        component={NFTAssets}
      />
      
      <Tab.Screen
        name="Profile"
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({ color }) => (
            <FontAwesomeIcon icon={faUser} color={color} size={20} />
          ),
        }}
        component={Profile}
      />
    </Tab.Navigator>
  );
}

export default HomeNavigation;
