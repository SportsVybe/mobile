// new screen

import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

function TeamsScreen() {
  const navigation = useNavigation();

  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.title}>Teams</Text>
        <View style={styles.team}>
          <Image
            style={styles.image}
            source={require('../assets/images/team_placeholder.png')}
          />
          <Text style={styles.teamName}>Team Name 1</Text>
          <Text style={styles.teamPOS}>POS 1 %</Text>
          <Text style={styles.teamRecord}>Record (W-L-T) 1-1-1</Text>
          <Text style={styles.teamSports}>Sports List: 1</Text>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('Team', { name: '1' })}>
            <Text style={styles.buttonText}>View Team</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.team}>
          <Image
            style={styles.image}
            source={require('../assets/images/team_placeholder.png')}
          />
          <Text style={styles.teamName}>Team Name 2</Text>
          <Text style={styles.teamPOS}>POS 2 %</Text>
          <Text style={styles.teamRecord}>Record (W-L-T) 2-2-2</Text>
          <Text style={styles.teamSports}>Sports List: 2</Text>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('Team', { name: '2' })}>
            <Text style={styles.buttonText}>View Team</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

export default TeamsScreen;

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
  team: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  image: {
    width: 300,
    height: 200,
    marginBottom: 10,
  },
  teamName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  teamPOS: {
    fontSize: 16,
    marginBottom: 10,
  },
  teamRecord: {
    fontSize: 16,
    marginBottom: 10,
  },
  teamSports: {
    fontSize: 16,
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#315399',
    padding: 10,
    borderRadius: 5,
    width: 200,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});
