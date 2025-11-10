import React, { useState, useContext } from "react";
import {
  ImageBackground,
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Alert,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { MenuContext, CourseType } from "../context/MenuContext";
import Entypo from '@expo/vector-icons/Entypo';

export default function AddToMenuScreen({ navigation }: any) {
  const ctx = useContext(MenuContext);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [course, setCourse] = useState<CourseType>("Starter");
  const [imageUrl, setImageUrl] = useState("");

  const isValidUrl = (url: string) => {
    // Simple regex for URL validation
    const pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
    '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
    '((\\d{1,3}\\.){3}\\d{1,3}))(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
    '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
    '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
    return !!pattern.test(url);
  }

  const onAdd = () => {
    if (!ctx) {
      Alert.alert("Error", "Menu context is not available.");
      return;
    }

    if (!name || !description || !price) {
      Alert.alert("Missing Info", "Please fill in all required fields.");
      return;
    }
    const numericPrice = parseFloat(price);
    if (isNaN(numericPrice)) {
      Alert.alert("Invalid Price", "Please enter a number for the price.");
      return;
    }

    if (imageUrl.trim() && !isValidUrl(imageUrl)) {
      Alert.alert("Invalid Image URL", "Please enter a valid URL for the image.");
      return;
    }

    ctx.addMenuItem({
      name,
      description,
      price: numericPrice,
      course,
      imageUrl: imageUrl ? { uri: imageUrl } : undefined,
    });

    Alert.alert("Success", `${name} added to ${course} menu.`);
    navigation.navigate("MenuDetailsUpdate");
  };

  return (
    <ImageBackground
      source={require('../assets/images/main_Background.jpg')}
      style={styles.bg}
      resizeMode="cover"
    >
      <ScrollView contentContainerStyle={styles.container}>
       

        <Text style={styles.label}>Dish Name</Text>
        <TextInput style={styles.input} value={name} onChangeText={setName} placeholder="e.g. Classic Burger" />

        <Text style={styles.label}>Description</Text>
        <TextInput
          style={[styles.input, styles.multiline]}
          value={description}
          onChangeText={setDescription}
          multiline
          placeholder="e.g. A juicy beef patty with fresh lettuce..."
        />

        <Text style={styles.label}>Course Type</Text>
        <View style={styles.pickerWrap}>
          <Picker selectedValue={course} onValueChange={(v) => setCourse(v)}>
            <Picker.Item label="Starter" value="Starter" />
            <Picker.Item label="Main" value="Main" />
            <Picker.Item label="Dessert" value="Dessert" />
            <Picker.Item label="Drink" value="Drink" />
          </Picker>
        </View>

        <Text style={styles.label}>Price (R)</Text>
        <TextInput
          style={styles.input}
          value={price}
          onChangeText={setPrice}
          keyboardType="numeric"
          placeholder="e.g. 120"
        />

        <Text style={styles.label}>Image URL (Optional)</Text>
        <TextInput style={styles.input} value={imageUrl} onChangeText={setImageUrl} placeholder="https://example.com/image.jpg" />

        <View style={styles.buttonRow}>
          <TouchableOpacity style={styles.addButton} onPress={onAdd}>
            <Text style={styles.addButtonText}>Add Item</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
            <Entypo name="arrow-with-circle-left" size={20} color="#ffffffff" />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  bg: {
    flex: 1,
  },
  container: { padding: 16, backgroundColor: 'rgba(0,0,0,0.6)', flexGrow: 1 },
  label: { 
    marginTop: 12, 
    color: '#ffffffff', 
    fontSize: 16, 
    fontWeight: '600' 
  },
  input: { borderWidth: 1, borderColor: "#ccc", borderRadius: 6, padding: 10, backgroundColor: '#fff', marginTop: 5, fontSize: 16 },
  multiline: { height: 80, textAlignVertical: "top" },
  pickerWrap: { borderWidth: 1, borderColor: "#ccc", borderRadius: 6, backgroundColor: '#fff', marginTop: 5 },
  buttonRow: { flexDirection: "row", justifyContent: "space-around", alignItems: 'center', marginTop: 24 },
  addButton: {
    backgroundColor: '#008080',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 5,
    elevation: 3,
  },
  addButtonText: {
    color: '#000',
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
  }
});
