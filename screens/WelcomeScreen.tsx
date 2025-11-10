import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ImageBackground,
  Image,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
import Entypo from '@expo/vector-icons/Entypo';


const OWNER_USERNAME = 'owner';
const OWNER_PASSWORD = 'pass123';

const WelcomeScreen: React.FC<{ navigation?: any }> = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const onLogin = () => {
    if (!username.trim() || !password.trim()) {
      Alert.alert('Login Failed', 'Please enter both username and password.');
      return;
    }
    if (username === OWNER_USERNAME && password === OWNER_PASSWORD) {
      navigation?.navigate?.('MenuDetailsUpdate');
    } else {
      navigation?.navigate?.('Menu');
    }
  };

  const onHelp = () => {
    navigation?.navigate?.('Help');
  };

  return (
    <ImageBackground
      source={require('../assets/images/main_Background.jpg')}
      style={styles.bg}
      resizeMode="cover"
    >
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        {/* Logo */}
        <Image source={require('../assets/images/logo.png')} style={styles.logo} resizeMode="stretch" />

        {/* Steak image */}
        <Image source={require('../assets/images/steak_home.jpg')} style={styles.steak} resizeMode="cover" />

        {/* Login form */}
        <View style={styles.formContainer}>
          <View style={styles.inputRow}>
            <Text style={styles.label}>Username:</Text>
            <TextInput
              placeholder="Enter username"
              value={username}
              onChangeText={setUsername}
              style={styles.input}
              autoCapitalize="none"
            />
          </View>

          <View style={styles.inputRow}>
            <Text style={styles.label}>Password:</Text>
            <TextInput
              placeholder="Enter password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              style={styles.input}
            />
          </View>

          <TouchableOpacity style={styles.loginBtn} onPress={onLogin}>
            <Text style={styles.loginText}>Confirm</Text>
          </TouchableOpacity>
          
        {/* Help icon bottom-right */}
        <TouchableOpacity style={styles.helpBtn} onPress={onHelp}>
       <Entypo name="help-with-circle" size={22} color="white" />
        </TouchableOpacity>
        </View>

       
      </KeyboardAvoidingView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  bg: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingHorizontal: 20,
    paddingTop: 0,
  },
  logo: {
    width: 400,
    height: 180,
    marginBottom: 0,
  },
  steak: {
    width: 400,
    height: 250,
    marginBottom: 10,
  },
  formContainer: {
    backgroundColor: 'rgba(135, 135, 135, 0.95)',
    paddingVertical: 20,
    paddingHorizontal: 16,
    borderRadius: 10,
    width: '90%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  label: {
    width: 90,
    fontSize: 16,
    fontWeight: '600',
    color: '#000000ff',
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#000000ff',
    backgroundColor: '#fff',
    borderRadius: 6,
    paddingVertical: 6,
    paddingHorizontal: 10,
    
  },
  loginBtn: {
    backgroundColor: '#008080',
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 50,
    marginTop: 10,
    elevation: 2,
    left: 44,
  },
  loginText: {
    color: '#000000ff',
    fontSize: 18,
    fontWeight: '700',
    textAlign: 'center',
  },
  helpBtn: {
    position: 'absolute',
    bottom: 25,
    left:30,
    backgroundColor: '#DC143C',
    width: 30,
    height: 30,
    borderRadius: 27.5,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    
  },
});

export default WelcomeScreen;
