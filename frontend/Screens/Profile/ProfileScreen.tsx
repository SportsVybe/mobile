import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

import Address from '../../Components/Address';

function ProfileScreen() {
  const navigation = useNavigation();

  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.title}>Player Profile</Text>
        <View style={styles.profile}>
          <View style={styles.profileHeader}>
            <View style={styles.profileHeading}>
              <View style={styles.profileImage}>
                <Image
                  style={styles.image}
                  source={require('../assets/images/profile_placeholder.png')}
                />
              </View>
              <View style={styles.profileAccountInfo}>
                <Text style={styles.profileName}>Username: Profile 1</Text>
                <Text style={styles.profileText}>Display Name: Profile 1</Text>
                <Text style={styles.profileText}>Member Since: 2022</Text>
              </View>
            </View>

            <View style={styles.buttonRow}>
              <Address />
              <TouchableOpacity
                style={styles.button}
                onPress={() =>
                  navigation.navigate('EditProfile', { name: 'My Name' })
                }>
                <Text style={styles.buttonText}>Edit</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.navigate('ProfileSettings')}>
                <Text style={styles.buttonText}>Settings</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.profileNotifications}>
            <View style={styles.profileNotificationsBox}>
              <Text style={styles.profileTextTitle}>Balance:</Text>
              <Text>1 VYBE(s)</Text>
            </View>
            <View style={styles.profileNotificationsBox}>
              <Text style={styles.profileTextTitle}>Rewards:</Text>
              <Text>0</Text>
            </View>
            <View style={styles.profileNotificationsBox}>
              <Text style={styles.profileTextTitle}>Challenges:</Text>
              <Text>0</Text>
            </View>
            <View style={styles.profileNotificationsBox}>
              <Text style={styles.profileTextTitle}>Invites:</Text>
              <Text>0</Text>
            </View>
          </View>
          <View style={styles.profileStats}>
            <View style={styles.profileStatsSection}>
              <View style={styles.profileStatsCard}>
                <Text style={styles.profileTextTitle}>Record (W-T-L):</Text>
                <Text>0-0-0</Text>
              </View>
              <View style={styles.profileStatsCard}>
                <Text style={styles.profileTextTitle}>Winnings:</Text>
                <Text>0 VYBE(s)</Text>
              </View>
            </View>
            <View style={styles.profileStatsSection}>
              <View style={styles.profileStatsCard}>
                <Text style={styles.profileTextTitle}>Sportsmanship:</Text>
                <Text>100%</Text>
              </View>
              <View style={styles.profileStatsCard}>
                <Text style={styles.profileTextTitle}>Sport Preferences:</Text>
                <Text>Basketball</Text>
              </View>
            </View>
          </View>
        </View>
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
