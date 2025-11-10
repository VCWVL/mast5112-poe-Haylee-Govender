import React, { useContext, useState } from "react";
import { View, Text, Button, Alert, StyleSheet,ImageBackground, TouchableOpacity} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { MenuContext, CourseType } from "../context/MenuContext";
import Entypo from '@expo/vector-icons/Entypo';


export default function RemoveFromMenuScreen({ navigation }: any) {
  const ctx = useContext(MenuContext);
  const [course, setCourse] = useState<CourseType>("Starter");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  
  // Gracefully handle case where context might be undefined
  if (!ctx) {
    return <View style={styles.container}><Text>Loading...</Text></View>;
  }
  
  const items = ctx.menu.filter((m) => m.course === course);
  
  const handleCourseChange = (newCourse: CourseType) => {
    setCourse(newCourse);
    // Reset selected item when course changes
    setSelectedId(null);
  };
  
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
    <ImageBackground
      source={require('../assets/images/main_Background.jpg')}
      style={styles.bg}
      resizeMode="cover"
    >
      <View style={styles.container}>
        <Text style={styles.title}>Select item to remove</Text>

        <Text style={styles.label}>Course</Text>
        <View style={styles.pickerWrap}>
          <Picker selectedValue={course} onValueChange={(v) => handleCourseChange(v)}>
            <Picker.Item label="Starter" value="Starter" />
            <Picker.Item label="Main" value="Main" />
            <Picker.Item label="Dessert" value="Dessert" />
            <Picker.Item label="Drink" value="Drink" />
          </Picker>
        </View>

        <Text style={styles.label}>Item</Text>
        <View style={styles.pickerWrap}>
          <Picker selectedValue={selectedId} onValueChange={(v) => setSelectedId(v)}>
            <Picker.Item label="-- Select an item --" value={null} />
            {items.map((i) => (
              <Picker.Item key={i.id} label={`${i.name} (R${i.price})`} value={i.id} />
            ))}
          </Picker>
        </View>

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
