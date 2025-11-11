// References 

// Docs.expo.dev,2025.Expo vector icons [online] Available at: https://docs.expo.dev/guides/icons/ [Accessed on the 21 Oct 2025].

// reactnative,2025.Alert [online] Available at: < https://reactnative.dev/docs/alert >[Accessed on the 23 Oct 2025].

// reactnative,2025.Core Components and APIs[online] Available at: <https://reactnative.dev/docs/components-and-apis > [Accessed on the 17 Oct 2025].

// reactnative,2025.ImageBackground[online] Available at: <https://reactnative.dev/docs/imagebackground > [Accessed on the 24 Oct 2025].

// reactnavigation,2025.NavigationContainer [online] Available at: <https://reactnavigation.org/docs/navigation-container/ > [Accessed on the 21 Oct 2025].

// reactnavigation,2025.Native Stack Navigator [online] Available at: < https://reactnavigation.org/docs/native-stack-navigator/ >[Accessed on the 20 Oct 2025].

// reactnative,2025.Style[online] Available at: <https://reactnative.dev/docs/style > [Accessed on the 22 Oct 2025].

// reactnative,2025.TouchableOpacity[online] Available at: <https://reactnative.dev/docs/touchableopacity > [Accessed on the 20 Oct 2025].

// w3schools,2025.HTML Color Names[online] Available at: <https://www.w3schools.com/colors/colors_names.asp >[Accessed on the 23 Oct 2025].

import React, { useContext, useState } from "react";
import { View, Text, Button, Alert, StyleSheet,ImageBackground, TouchableOpacity} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { MenuContext, CourseType } from "../context/MenuContext";
import Entypo from '@expo/vector-icons/Entypo';

/**
 * RemoveFromMenuScreen provides an interface for the owner to remove an item from the menu.
 * It uses two pickers: one to select the course (e.g., Starter, Main) and another
 * to select the specific item from that course to be removed.
 */
export default function RemoveFromMenuScreen({ navigation }: any) {
  // Access the menu context to get the menu list and the remove function.
  const ctx = useContext(MenuContext);
  // State to manage the currently selected course type.
  const [course, setCourse] = useState<CourseType>("Starter");
  // State to hold the ID of the menu item selected for removal.
  const [selectedId, setSelectedId] = useState<string | null>(null);
  
  // Gracefully handle case where context might be undefined
  if (!ctx) {
    return <View style={styles.container}><Text>Loading...</Text></View>;
  }
  
  // Filter the menu items based on the currently selected course.
  const items = ctx.menu.filter((m) => m.course === course);
  
  /**
   * Updates the course state and resets the selected item ID
   * whenever the user chooses a new course from the picker.
   * @param newCourse The new course type selected by the user.
   */
  const handleCourseChange = (newCourse: CourseType) => {
    setCourse(newCourse);
    // Reset selected item when course changes
    setSelectedId(null);
  };
  
  /**
   * Handles the removal of the selected menu item.
   * It validates that an item is selected, calls the context's remove function,
   * shows a confirmation alert, and navigates back.
   */
  const handleRemove = () => {
    if (!selectedId) {
      Alert.alert("No Selection", "Please choose an item to remove.");
      return;
    }
  
    const item = ctx.menu.find((m) => m.id === selectedId);
    if (!item) return; // Should not happen, but good practice
    ctx.removeMenuItem(selectedId);
    Alert.alert("Removed", `${item?.name ?? "Item"} has been removed.`);
    navigation.navigate("MenuDetailsUpdate");
  };

  return (
    // Main background for the screen.
    <ImageBackground
      source={require('../assets/images/main_Background.jpg')}
      style={styles.bg}
      resizeMode="cover"
    >
      <View style={styles.container}>
        <Text style={styles.title}>Select item to remove</Text>

        <Text style={styles.label}>Course</Text>
        {/* Picker for selecting the course category. */}
        <View style={styles.pickerWrap}>
          <Picker selectedValue={course} onValueChange={(v) => handleCourseChange(v)}>
            <Picker.Item label="Starter" value="Starter" />
            <Picker.Item label="Main" value="Main" />
            <Picker.Item label="Dessert" value="Dessert" />
            <Picker.Item label="Drink" value="Drink" />
          </Picker>
        </View>

        <Text style={styles.label}>Item</Text>
        {/* Picker for selecting the specific item to remove from the chosen course. */}
        <View style={styles.pickerWrap}>
          <Picker selectedValue={selectedId} onValueChange={(v) => setSelectedId(v)}>
            <Picker.Item label="-- Select an item --" value={null} />
            {items.map((i) => (
              <Picker.Item key={i.id} label={`${i.name} (R${i.price})`} value={i.id} />
            ))}
          </Picker>
        </View>

        {/* Container for action buttons. */}
        <View style={styles.buttonRow}>
          <TouchableOpacity style={styles.removeButton} onPress={handleRemove}>
            <Text style={styles.removeButtonText}>Remove</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
            <Entypo name="arrow-with-circle-left" size={20} color="#ffffffff" />
          </TouchableOpacity>
        </View>
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
    padding: 16,
    backgroundColor: 'rgba(0,0,0,0.6)', // Semi-transparent overlay for readability
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: '#fff',
    textAlign: 'center',
  },
  label: {
    marginTop: 12,
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  pickerWrap: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 6,
    backgroundColor: '#fff', // White background for picker for visibility
    marginTop: 5,
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: 'center',
    marginTop: 24,
  },
  removeButton: {
    backgroundColor: '#008080', // Crimson red for remove action
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 5,
    elevation: 3,
  },
  removeButtonText: {
    color: '#000000ff', // White text for contrast
    fontSize: 16,
    fontWeight: 'bold',
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#DC143C',
    borderRadius: 25,
    paddingHorizontal: 16,
    paddingVertical: 8,
    elevation: 3,
  },
});
