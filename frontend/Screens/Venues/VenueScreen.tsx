// new screen

import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

function VenueScreen({ route }) {

  const navigation = useNavigation();

    const { name } = route.params;
    
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Venue {name}</Text>
      <View style={styles.venue}>
        <Image
          style={styles.image}
          source={require('../assets/images/venue1.jpg')}
        />
        <Text style={styles.venueAddress}>Address {name}</Text>
        <Text style={styles.venueAddress}>
          City {name}, State {name}
        </Text>
        <Text style={styles.venueAddress}>Zip {name}</Text>

        <TouchableOpacity
          style={styles.button}
          onPress={() => alert('check-in')}>
          <Text style={styles.buttonText}>Check in</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default VenueScreen;

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
  venue: {
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
  venueName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  venueAddress: {
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
