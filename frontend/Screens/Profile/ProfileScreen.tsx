import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { useMoralis } from 'react-moralis';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

import Address from '../../Components/Address';
import { ProfileController } from '../../Components/Profile/ProfileController';
import ProfileHeader from '../../Components/Profile/ProfileHeader';

type Props = {

  user?: any;
  wallet?: string | boolean;
  isCurrentUser: boolean;
  isAuthenticating?: boolean;
}

function ProfileScreen(props:Props) {
  const navigation = useNavigation();
const {user} = useMoralis();
  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.title}>Player Profile</Text>
        <ProfileController isCurrentUser={props.isCurrentUser} user={props.user} />
      </View>
    </ScrollView>
  );
}

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  profile: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  profileHeader: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    flexDirection: 'column',
  },
  profileHeading: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileImage: {
    flex: 1,
    marginLeft: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileAccountInfo: {
    flex: 2,
    alignItems: 'flex-start',
    justifyContent: 'center',
    marginLeft: 10,
  },
  image: {
    width: 100,
    height: 100,
    marginBottom: 10,
  },
  profileName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  profileText: {
    fontSize: 16,
    marginBottom: 10,
  },
  profileNotifications: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-around',
    flexDirection: 'row',
  },
  profileNotificationsBox: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileTextTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    paddingHorizontal: 10,
  },
  button: {
    backgroundColor: '#315399',
    padding: 5,
    borderRadius: 5,
    width: 75,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  profileStats: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    marginTop: 20,
    flexDirection: 'column',
  },
  profileStatsSection: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileStatsCard: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 10,
  },
});
