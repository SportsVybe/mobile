// new screen

import { faCheckDouble, faMoneyBillWave } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

import Header from '../../Components/Header';
function RewardsScreen() {
  const navigation = useNavigation();
  navigation.setOptions({
    headerTitle: props => <Header />,
  });

  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.title}>Rewards</Text>

        <View style={styles.rewardCard}>
          <View style={styles.rewardIcon}>
            <FontAwesomeIcon icon={faMoneyBillWave} color={'black'} size={30} />
          </View>
          <View>
            <Text style={styles.rewardName}>Reward Name 1</Text>
            <Text style={styles.rewardTitle}>1.0 VYBE</Text>
            <Text style={styles.rewardStatus}>Status: Pending</Text>
          </View>
          <View>
            <TouchableOpacity
              style={styles.button}
              onPress={() => alert('Claim')}>
              <Text style={styles.buttonText}>Claim</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.rewardCard}>
          <View style={styles.rewardIcon}>
            <FontAwesomeIcon icon={faMoneyBillWave} color={'black'} size={30} />
          </View>
          <View>
            <Text style={styles.rewardName}>Reward Name 2</Text>
            <Text style={styles.rewardTitle}>2.0 VYBE</Text>
            <Text style={styles.rewardStatus}>Status: Claimed</Text>
          </View>
          <View style={styles.claimedIcon}>
            <FontAwesomeIcon icon={faCheckDouble} color={'black'} size={30} />
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

export default RewardsScreen;

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
  rewardCard: {
    width: '90%',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    flexDirection: 'row',
    marginBottom: 20,
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
  },
  rewardIcon: {
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 30,
  },
  rewardName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  rewardTitle: {
    fontSize: 16,
    marginBottom: 10,
  },
  rewardStatus: {
    fontSize: 16,
    marginBottom: 10,
  },
  claimedIcon: {
    padding: 10,
    width: 75,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    marginLeft: 10,
  },
  button: {
    backgroundColor: '#315399',
    borderRadius: 5,
    padding: 10,
    width: 75,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    marginLeft: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});
