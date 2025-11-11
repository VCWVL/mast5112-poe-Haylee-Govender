// References

// Docs.expo.dev,2025.Expo vector icons [online] Available at: https://docs.expo.dev/guides/icons/ [Accessed on the 21 Oct 2025].

// reactnative,2025.Core Components and APIs[online] Available at: <https://reactnative.dev/docs/components-and-apis > [Accessed on the 17 Oct 2025].

// reactnative,2025.ImageBackground[online] Available at: <https://reactnative.dev/docs/imagebackground > [Accessed on the 24 Oct 2025].

// reactnavigation,2025.NavigationContainer [online] Available at: <https://reactnavigation.org/docs/navigation-container/ > [Accessed on the 21 Oct 2025].

// reactnavigation,2025.Native Stack Navigator [online] Available at: < https://reactnavigation.org/docs/native-stack-navigator/ >[Accessed on the 20 Oct 2025].

// reactnative,2025.Style[online] Available at: <https://reactnative.dev/docs/style > [Accessed on the 22 Oct 2025].

// reactnative,2025.TouchableOpacity[online] Available at: <https://reactnative.dev/docs/touchableopacity > [Accessed on the 20 Oct 2025].

// w3schools,2025.HTML Color Names[online] Available at: <https://www.w3schools.com/colors/colors_names.asp >[Accessed on the 23 Oct 2025].
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView ,ImageBackground} from 'react-native';
import Entypo from '@expo/vector-icons/Entypo';

/**
 * MenuDetailsUpdateScreen serves as the main dashboard for the owner/admin.
 * It provides navigation to various menu management functionalities like
 * viewing, adding, removing, and resetting the menu.
 */
const MenuDetailsUpdateScreen: React.FC<{ navigation?: any }> = ({ navigation }) => {
  return (
        // Main background for the screen.
        <ImageBackground
          source={require("../assets/images/main_Background.jpg")}
          style={styles.bg}
          resizeMode="cover"
        >

      {/* Screen Title */}
      <Text style={styles.title}>Menu Details & Update</Text>

      {/* Container for the main action buttons. */}
      <View style={styles.btnContainer}>
        {/* Button to navigate to the public-facing Menu screen. */}
        <TouchableOpacity
          style={styles.actionBtn}
          onPress={() => navigation?.navigate?.('Menu')}
        >
          <Text style={styles.btnText}>View Menu</Text>
        </TouchableOpacity>

        {/* Button to navigate to the Add to Menu screen. */}
        <TouchableOpacity
          style={styles.actionBtn}
          onPress={() => navigation?.navigate?.('AddToMenu')}
        >
          <Text style={styles.btnText}>Add to Menu</Text>
        </TouchableOpacity>

        {/* Button to navigate to the Remove from Menu screen. */}
        <TouchableOpacity
          style={styles.actionBtn}
          onPress={() => navigation?.navigate?.('RemoveFromMenu')}
        >
          <Text style={styles.btnText}>Remove from Menu</Text>
        </TouchableOpacity>

        {/* Button to navigate to the Reset Menu screen. */}
        <TouchableOpacity
          style={styles.actionBtn}
          onPress={() => navigation?.navigate?.('ResetConfirmation')}
        >
          <Text style={styles.btnText}>Reset Menu</Text>
        </TouchableOpacity>
      </View>

      {/* Floating back button to return to the previous screen (Welcome screen). */}
      <TouchableOpacity style={styles.backBtn} onPress={() => navigation?.goBack?.()}>
        <Entypo name="arrow-with-circle-left" size={20} color="white" />
       
      </TouchableOpacity>

  
        </ImageBackground>
  );
};

const styles = StyleSheet.create({

    bg: {
    flex: 1,
    width: '100%',
    height: '100%',
    padding: 0,
    resizeMode: 'stretch',
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#ffffffff',
    marginBottom: 50,
    justifyContent:'center',
    textAlign:"center",
    padding:20,
  },
  btnContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '80%',
  },
  actionBtn: {
    backgroundColor: '#008080',
    borderRadius: 5,
    paddingVertical: 14,
    paddingHorizontal: 50,
    width: '90%',
    alignItems: 'center',
    marginBottom: 25,
    elevation: 3,
    justifyContent: 'center',
    left:35,
  },
  btnText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
  backBtn: {
    position: 'absolute',
    bottom: 30,
    left: 25,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#DC143C',
    borderRadius: 25,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },

});

export default MenuDetailsUpdateScreen;
