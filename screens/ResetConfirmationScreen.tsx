import React, { useContext, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Alert, ImageBackground } from "react-native";
import { MenuContext } from "../context/MenuContext";
import Entypo from '@expo/vector-icons/Entypo';

export default function ResetConfirmationScreen({ navigation }: any) {
  const ctx = useContext(MenuContext);
  const [selectedMenu, setSelectedMenu] = useState<number | null>(null);

  const confirmReset = () => {
    if (!ctx) {
      Alert.alert("Error", "Menu context is not available.");
      return;
    }

    if (selectedMenu === null) {
      Alert.alert("No Selection", "Please select a menu to load.");
      return;
    }

    ctx?.switchMenu(selectedMenu);
    Alert.alert("Menu Changed", `Now showing Menu ${selectedMenu}.`);
    navigation.navigate("MenuDetailsUpdate");
  };

  return (
    <ImageBackground
      source={require('../assets/images/main_Background.jpg')}
      style={styles.bg}
      resizeMode="cover"
    >
      <View style={styles.container}>
        <Text style={styles.title}>Switch Menu</Text>
        <Text style={styles.subtitle}>Choose which menu to load:</Text>

        <View style={styles.choiceRow}>
          <TouchableOpacity
            style={[styles.menuButton, selectedMenu === 1 && styles.selectedButton]}
            onPress={() => setSelectedMenu(1)}
          >
            <Text style={[styles.menuButtonText, selectedMenu === 1 && styles.selectedButtonText]}>Menu 1</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.menuButton, selectedMenu === 2 && styles.selectedButton]}
            onPress={() => setSelectedMenu(2)}
          >
            <Text style={[styles.menuButtonText, selectedMenu === 2 && styles.selectedButtonText]}>Menu 2</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.menuButton, selectedMenu === 3 && styles.selectedButton]}
            onPress={() => setSelectedMenu(3)}
          >
            <Text style={[styles.menuButtonText, selectedMenu === 3 && styles.selectedButtonText]}>Menu 3</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.buttonRow}>
          <TouchableOpacity style={[styles.actionButton, styles.confirmButton]} onPress={confirmReset}>
            <Text style={styles.actionButtonText}>Confirm</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.backButtonIcon} onPress={() => navigation.goBack()}>
          <Entypo name="arrow-with-circle-left" size={20} color="#ffffffff" />
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  bg: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 16,
    backgroundColor: 'rgba(0,0,0,0.6)', // Semi-transparent overlay
  },
  title: {
    fontSize: 28, // Slightly larger title
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
    color: '#fff', // White text for readability
  },
  subtitle: {
    textAlign: "center",
    marginBottom: 30,
    fontSize: 18, // Slightly larger subtitle
    color: '#eee', // Lighter white for subtitle
  },
  choiceRow: { 
    marginVertical: 20,
    alignItems: 'center', // Center buttons horizontally
  },
  menuButton: {
    borderWidth: 2,
    borderColor: '#008080', // Teal color for border
    borderRadius: 8,
    paddingVertical: 12,
    width: '80%', // Set a consistent width for the buttons
    marginBottom: 15, // Add space between vertical buttons
    backgroundColor: 'rgba(255,255,255,0.1)', // Slightly transparent background
  },
  menuButtonText: {
    color: '#008080', // Teal color for text
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center', // Ensure text is centered within the button
  },
  selectedButton: {
    backgroundColor: '#008080', // Teal color when selected
  },
  selectedButtonText: {
    color: '#fff',
  },
  buttonRow: {
    // Centering the confirm button
    alignItems: 'center',
    marginTop: 10,
  },
  actionButton: {
    borderRadius: 6,
    paddingVertical: 12,
    paddingHorizontal: 60,
  },
  confirmButton: {
    backgroundColor: '#008080', // Consistent teal for confirm
  },
  actionButtonText: {
    color: '#000', // Black text for confirm button
    fontWeight: 'bold',
    fontSize: 16,
  },
  backButtonIcon: {
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
