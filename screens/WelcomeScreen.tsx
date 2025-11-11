//References

// Docs.expo.dev,2025.Expo vector icons [online] Available at: <https://docs.expo.dev/guides/icons/> [Accessed on the 21 Oct 2025].

// reactnative,2025.Animated[online] Available at: <https://reactnative.dev/docs/animated> [Accessed on the 19 Oct 2025]. 

// reactnative,2025.Core Components and APIs[online] Available at: <https://reactnative.dev/docs/components-and-apis > [Accessed on the 17 Oct 2025]. 

// reactnative,2025.ImageBackground[online] Available at: <https://reactnative.dev/docs/imagebackground > [Accessed on the 24 Oct 2025].

// reactnavigation,2025.NavigationContainer [online] Available at: <https://reactnavigation.org/docs/navigation-container/ > [Accessed on the 21 Oct 2025].

// reactnavigation,2025.Native Stack Navigator [online] Available at: < https://reactnavigation.org/docs/native-stack-navigator/ >[Accessed on the 20 Oct 2025]. 

// reactnative,2025.Style[online] Available at: <https://reactnative.dev/docs/style > [Accessed on the 22 Oct 2025]. 

// reactnative,2025.Text Input[online] Available at: <https://reactnative.dev/docs/textinput> [Accessed on the 25 Oct 2025]. 

// reactnative,2025.TouchableOpacity[online] Available at: <https://reactnative.dev/docs/touchableopacity > [Accessed on the 20 Oct 2025].

// w3schools,2025.HTML Color Names[online] Available at: <https://www.w3schools.com/colors/colors_names.asp >[Accessed on the 23 Oct 2025].

import React, { useState, useContext, useMemo, useRef, useEffect } from 'react';
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
  Animated,
  Easing,
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

  // State and animation for the scroll-down indicator
  const [showScrollIndicator, setShowScrollIndicator] = useState(true);
  const fadeAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    // Create a looping fade in/out animation for the indicator
    const animation = Animated.loop(
      Animated.sequence([
        Animated.timing(fadeAnim, {
          toValue: 0.2,
          duration: 1000,
          useNativeDriver: true,
          easing: Easing.inOut(Easing.ease),
        }),
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
          easing: Easing.inOut(Easing.ease),
        }),
      ])
    );
    animation.start();
    return () => animation.stop();
  }, [fadeAnim]);

  const handleScroll = (event: any) => {
    if (showScrollIndicator && event.nativeEvent.contentOffset.y > 50) {
      setShowScrollIndicator(false);
    }
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
        <ScrollView
          contentContainerStyle={styles.scrollContentContainer}
          showsVerticalScrollIndicator={false}
          onScroll={handleScroll}
          scrollEventThrottle={16}>
          {/* Restaurant Logo */}
          <Image source={require('../assets/images/logo.png')} style={styles.logo} resizeMode="stretch" />

          {/* A featured image, e.g., a steak. */}
          <Image source={require('../assets/images/steak_home.jpg')} style={styles.steak} resizeMode="cover" />

          {/* Display container for average menu prices. */}
          <View style={styles.averagePricesContainer}>
            <Text style={styles.averagePricesTitle}>Average Menu Prices</Text>
            <Text style={styles.priceText}>Starters: R{averagePrices.starter.toFixed(2)}</Text>
            <Text style={styles.priceText}>Mains: R{averagePrices.main.toFixed(2)}</Text>
            <Text style={styles.priceText}>Desserts: R{averagePrices.dessert.toFixed(2)}</Text>
            <Text style={styles.priceText}>Drinks: R{averagePrices.drink.toFixed(2)}</Text>
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
        {showScrollIndicator && (
          <Animated.View style={[styles.scrollIndicator, { opacity: fadeAnim }]}>
            <Text style={styles.scrollIndicatorText}>Scroll Down</Text>
            <Entypo name="chevron-down" size={24} color="#fff" />
          </Animated.View>
        )}



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
    height: 200,
    marginBottom: 0,
  },
  steak: {
    width: 370,
    height: 270,
    marginBottom: 10,
    paddingVertical: 5,
  },
  averagePricesContainer: {
    backgroundColor: 'rgba(1, 132, 106, 0.6)',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
    width: '90%',
    alignItems: 'center',
    marginBottom: 10,
  },
  averagePricesTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000000ff',
    marginBottom: 8,
  },
  priceText: {
    color: '#000000ff',
    fontSize: 16,
    textAlign: 'center',
    paddingVertical: 2,
    fontWeight: 'medium',
  },
  formContainer: {
    backgroundColor: 'rgba(135, 135, 135, 0.95)',
    paddingVertical: 10,
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
  scrollIndicator: {
    position: 'absolute',
    bottom: 20,
    alignSelf: 'center',
    alignItems: 'center',
    padding: 10,
    borderRadius: 20,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  scrollIndicatorText: {
    color: '#fff',
    fontSize: 12,
    marginBottom: -5,
  },
});

export default WelcomeScreen;
