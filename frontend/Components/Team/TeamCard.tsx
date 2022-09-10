import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { useNavigation } from '@react-navigation/native';

type Props = {
  team: {
    name: string;
    pos: string;
    record: string;
    sports: string[];
    id: string;
  };
};

export default function TeamCard({ team }: Props) {
  const navigation = useNavigation();

  return (
    <View style={styles.teamCard}>
      <View style={styles.teamCardRow}>
        <Image
          style={styles.teamImage}
          source={require('../../assets/images/team_placeholder.png')}
        />
        <View style={styles.teamCardText}>
          <Text style={styles.teamName}>{team.name}</Text>
          <Text style={styles.teamCardTitle}>POS:</Text>
          <Text> {team.pos}%</Text>
        </View>
      </View>
      <View style={styles.teamCardRow}>
        <View style={styles.teamCardText}>
          <Text style={styles.teamCardTitle}>Record (W-T-L):</Text>
          <Text> {team.record}</Text>
        </View>
        <View style={styles.teamCardText}>
          <Text style={styles.teamCardTitle}>Sports Preferences:</Text>
          <Text>
            {team.sports.map(sport => {
              return <Text>{`${sport} `}</Text>;
            })}
          </Text>
        </View>
      </View>
      <View style={styles.buttonRow}>
        <TouchableOpacity style={styles.button} onPress={() => alert('Manage')}>
          <Text style={styles.buttonText}>Manage</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Team', { name: '1' })}>
          <Text style={styles.buttonText}>View Team</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

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
  teamCard: {
    width: '90%',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 10,
  },
  teamCardRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  teamImage: {
    width: 100,
    height: 100,
    marginRight: 30,
    padding: 10,
  },
  teamCardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  teamCardText: {
    alignItems: 'center',
    justifyContent: 'center',
    margin: 10,
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
  buttonRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    backgroundColor: '#315399',
    padding: 10,
    borderRadius: 5,
    width: 100,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});
