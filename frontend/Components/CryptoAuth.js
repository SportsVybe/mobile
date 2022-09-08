import React, { createRef, useEffect, useState } from 'react';
import {
  Dimensions,
  Image,
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  ActivityIndicator,
  Button,
  Dialog,
  Paragraph,
  Portal,
  Provider,
} from 'react-native-paper';

import { useMoralis } from 'react-moralis';
import { useWalletConnect } from '../WalletConnect';

// import Loader from './Components/Loader';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const LoginScreen = ({ navigation }) => {
  const connector = useWalletConnect();
  const {
    authenticate,
    authError,
    isAuthenticating,
    isAuthenticated,
    logout,
    Moralis,
  } = useMoralis();

  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errortext, setErrortext] = useState('');
  const [visible, setVisible] = React.useState(false);

  const showDialog = () => setVisible(true);

  const hideDialog = () => setVisible(false);

  const passwordInputRef = createRef();

  const handleCryptoLogin = () => {
    authenticate({ connector })
      .then(() => {
        if (authError) {
          setErrortext(authError.message);
          setVisible(true);
        } else {
          if (isAuthenticated) {
            navigation.replace('HomeRoutes');
          }
        }
      })
      .catch(() => {});
  };

  useEffect(() => {
    isAuthenticated && navigation.replace('HomeRoutes');
  }, [isAuthenticated]);

  return (
    <Provider>
      <View style={styles.mainBody}>
        <ScrollView
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{
            flex: 1,
            justifyContent: 'center',
            alignContent: 'center',
          }}>
          <Image
            style={{
              flex: 1,
              maxWidth: '100%',
              alignSelf: 'center',
              resizeMode: 'contain',
            }}
            source={require('../assets/images/logos/sportsvybe_header_logo.png')}
          />
          <View style={{ flex: 1 }}>
            <KeyboardAvoidingView enabled>
              <View
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                {authError && (
                  <Portal>
                    <Dialog visible={visible} onDismiss={hideDialog}>
                      <Dialog.Title>Authentication error:</Dialog.Title>
                      <Dialog.Content>
                        <Paragraph>
                          {authError ? authError.message : ''}
                        </Paragraph>
                      </Dialog.Content>
                      <Dialog.Actions>
                        <Button onPress={hideDialog}>Done</Button>
                      </Dialog.Actions>
                    </Dialog>
                  </Portal>
                )}
                {isAuthenticating && (
                  <ActivityIndicator animating={true} color={'blue'} />
                )}
              </View>

              <TouchableOpacity
                style={styles.buttonStyle}
                activeOpacity={0.5}
                onPress={handleCryptoLogin}>
                <Text style={styles.buttonTextStyle}>Wallet Login</Text>
              </TouchableOpacity>
            </KeyboardAvoidingView>
          </View>
        </ScrollView>
      </View>
    </Provider>
  );
};
export default LoginScreen;

const styles = StyleSheet.create({
  mainBody: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'white',
    alignContent: 'center',
  },
  buttonStyle: {
    backgroundColor: '#999',
    borderWidth: 0,
    color: '#FFFFFF',
    borderColor: '#7DE24E',
    height: 40,
    alignItems: 'center',
    borderRadius: 30,
    marginLeft: 35,
    marginRight: 35,
    marginTop: 20,
    marginBottom: 25,
  },
  buttonTextStyle: {
    color: '#FFFFFF',
    paddingVertical: 10,
    fontSize: 16,
    fontWeight: '600',
  },
  inputStyle: {
    flex: 1,
    color: 'white',
    paddingLeft: 15,
    paddingRight: 15,
    borderWidth: 1,
    borderRadius: 30,
    borderColor: '#dadae8',
  },
  registerTextStyle: {
    color: 'black',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 14,
    alignSelf: 'center',
    padding: 10,
  },
  errorTextStyle: {
    color: 'red',
    textAlign: 'center',
    fontSize: 14,
  },
});
