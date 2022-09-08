// new screen

import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

function TeamScreen({ route }) {
  const navigation = useNavigation();

  const { name } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Team {name}</Text>
      <View style={styles.team}>
        <Image
          style={styles.image}
          source={require('../assets/images/team_placeholder.png')}
        />
        <Text style={styles.teamName}>Team Name {name}</Text>
        <Text style={styles.teamPOS}>POS {name} %</Text>
        <Text style={styles.teamRecord}>
          Record (W-T-L) {name}-{name}-{name}
        </Text>
        <Text style={styles.teamSports}>Sports List: {name}</Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => alert(`Challenge Team ${name}`)}>
          <Text style={styles.buttonText}>Challenge</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default TeamScreen;

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
