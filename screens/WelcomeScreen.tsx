import React, { useState, useContext, useMemo } from 'react';
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
  ScrollView,
  Alert,
} from 'react-native';
import Entypo from '@expo/vector-icons/Entypo';
import { MenuContext } from '../context/MenuContext';


// Hardcoded credentials for the owner/admin login.
const OWNER_USERNAME = 'owner';
const OWNER_PASSWORD = 'pass123';

/**
 * WelcomeScreen serves as the landing page of the application.
 * It displays the restaurant's logo, an image, average menu prices,
 * and a login form for users and the owner.
 */
const WelcomeScreen: React.FC<{ navigation?: any }> = ({ navigation }) => {
  // Access menu data from the global context.
  const ctx = useContext(MenuContext);

  // Calculate the average price for each course type using useMemo for optimization.
  // This recalculates only when the menu data changes.
  const averagePrices = useMemo(() => {
    if (!ctx?.menu) {
      return { starter: 0, main: 0, dessert: 0, drink: 0 };
    }

    const courses = ['Starter', 'Main', 'Dessert', 'Drink'];
    const averages: { [key: string]: number } = {};

    for (const course of courses) {
      const items = ctx.menu.filter(item => item.course === course);
      if (items.length > 0) {
        const total = items.reduce((sum, item) => sum + item.price, 0);
        averages[course.toLowerCase()] = total / items.length;
      } else {
        averages[course.toLowerCase()] = 0;
      }
    }

    return averages;
  }, [ctx?.menu]);

  // State for handling username and password inputs.
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  /**
   * Handles the login process.
   * Navigates to the owner's menu update screen on successful owner login,
   * or to the regular menu screen for any other login attempt.
   */
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

  /**
   * Navigates to the Help screen.
   */
  const onHelp = () => {
    navigation?.navigate?.('Help');
  };

  return (
    // Main background for the screen.
    <ImageBackground
      source={require('../assets/images/main_Background.jpg')}
      style={styles.bg}
      resizeMode="cover"
    >
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView contentContainerStyle={styles.scrollContentContainer} showsVerticalScrollIndicator={false}>
          {/* Restaurant Logo */}
          <Image source={require('../assets/images/logo.png')} style={styles.logo} resizeMode="stretch" />

          {/* A featured image, e.g., a steak. */}
          <Image source={require('../assets/images/steak_home.jpg')} style={styles.steak} resizeMode="cover" />

          {/* Display container for average menu prices. */}
          <View style={styles.averagePricesContainer}>
            <Text style={styles.averagePricesTitle}>Average Menu Prices</Text>
            <View style={styles.priceRow}>
              <Text style={styles.priceText}>Starters: R{averagePrices.starter.toFixed(2)}</Text>
              <Text style={styles.priceText}>Mains: R{averagePrices.main.toFixed(2)}</Text>
            </View>
            <View style={styles.priceRow}>
              <Text style={styles.priceText}>Desserts: R{averagePrices.dessert.toFixed(2)}</Text>
              <Text style={styles.priceText}>Drinks: R{averagePrices.drink.toFixed(2)}</Text>
            </View>
          </View>



          {/* Login form container. */}
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
            
          {/* Floating help button. */}
          <TouchableOpacity style={styles.helpBtn} onPress={onHelp}>
         <Entypo name="help-with-circle" size={22} color="white" />
          </TouchableOpacity>
          </View>
        </ScrollView>
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
  },
  scrollContentContainer: {
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingHorizontal: 20,
    paddingTop: 0,
    paddingBottom: 20,
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
  averagePricesContainer: {
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 10,
    width: '90%',
    alignItems: 'center',
    marginBottom: 10,
  },
  averagePricesTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
  },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  priceText: {
    color: '#fff',
    fontSize: 15,
    flex: 1,
    textAlign: 'center',
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
