// new screen

import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

function VenuesScreen() {
  const navigation = useNavigation();

  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.title}>Venues</Text>
        <View style={styles.venue}>
          <Image
            style={styles.image}
            source={require('../../assets/images/venue1.jpg')}
          />
          <Text style={styles.venueName}>Venue 1</Text>
          <Text style={styles.venueAddress}>Address 1</Text>
          <Text style={styles.venueAddress}>City 1, State 1</Text>
          <Text style={styles.venueAddress}>Zip 1</Text>
          <TouchableOpacity
            style={styles.button}
              onPress={() => navigation.navigate('VenueScreen', { name: '1' })}
          >
            <Text style={styles.buttonText}>View Venue</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.venue}>
          <Image
            style={styles.image}
            source={require('../../assets/images/venue2.jpg')}
          />
          <Text style={styles.venueName}>Venue 2</Text>
          <Text style={styles.venueAddress}>Address 2</Text>
          <Text style={styles.venueAddress}>City 2, State 2</Text>
          <Text style={styles.venueAddress}>Zip 2</Text>
          <TouchableOpacity
            style={styles.button}
              onPress={() => navigation.navigate('VenueScreen', { name: '2' })}
          >
            <Text style={styles.buttonText}>View Venue</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

export default VenuesScreen;

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
