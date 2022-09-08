import React from 'react';
import { useMoralis } from 'react-moralis';
import { Button, StyleSheet, Text, View } from 'react-native';

const ProfileSettingsScreen = ({ navigation }) => {
  const {
    authenticate,
    authError,
    isAuthenticating,
    isAuthenticated,
    logout,
    Moralis,
  } = useMoralis();

  const logoutUser = () => {
    if (isAuthenticated) {
      logout();
      navigation.replace('Auth');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profile Settings</Text>
      <View style={styles.button}>
        <Button
          onPress={() => navigation.push('Transactions')}
          color="white"
          title="View Transactions">
        </Button>
      </View>
      <View style={styles.logoutButton}>
        <Button title="Logout" color="white" onPress={logoutUser}>
          Logout
        </Button>
      </View>
    </View>
  );
};

export default ProfileSettingsScreen;

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
  image: {
    width: 300,
    height: 200,
    marginBottom: 10,
  },
  profileName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  profileAddress: {
    fontSize: 16,
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#315399',
    borderRadius: 5,
    width: 200,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  logoutButton: {
    width: 200,
    backgroundColor: 'red',
    elevation: 10,
    borderRadius: 15,
    shadowColor: 'grey',
    shadowOffset: { width: 1, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 1,
  },
});
