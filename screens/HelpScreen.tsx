// src/screens/HelpScreen.tsx
import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet, Alert,ImageBackground, TouchableOpacity } from "react-native";
import Entypo from '@expo/vector-icons/Entypo';
import { StackScreenProps } from "@react-navigation/stack";

type Props = StackScreenProps<any, "Help">;

export default function HelpScreen({ navigation }: Props) {
  const [fullName, setFullName] = useState("");
  const [contact, setContact] = useState("");
  const [message, setMessage] = useState("");

  const isValidEmail = (email: string) => {
    // A simple regex for email validation
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const isValidPhone = (phone: string) => {
    // A simple regex for phone number validation (allows for digits, spaces, and some special chars)
    return /^\+?[\d\s-()]{7,15}$/.test(phone);
  };

  const onSend = () => {
    if (!fullName.trim() || !contact.trim() || !message.trim()) {
      Alert.alert("Please complete all fields");
      return;
    }
    if (!isValidEmail(contact) && !isValidPhone(contact)) {
      Alert.alert("Invalid Contact", "Please enter a valid phone number or email address.");
      return;
    }
    // In a real app you'd send this to backend. Here we show confirmation.
    Alert.alert("Sent", "Your query has been sent to the restaurant.");
    setFullName("");
    setContact("");
    setMessage("");
    navigation.navigate("Welcome");
  };

  return (

      <ImageBackground
          source={require('../assets/images/main_Background.jpg')}
          style={styles.bg}
          resizeMode="cover"
        >

  <View style={styles.container}>
      <Text style={styles.title}>Customer Assistance</Text>

      <Text style={styles.label}>Full Name</Text>
      <TextInput style={styles.input} value={fullName} onChangeText={setFullName} placeholder="Full name" />

      <Text style={styles.label}>Contact Details</Text>
      <TextInput style={styles.input} value={contact} onChangeText={setContact} placeholder="Phone or email" />

      <Text style={styles.label}>Message</Text>
      <TextInput style={[styles.input, styles.multiline]} value={message} onChangeText={setMessage} placeholder="What do you need help with?" multiline numberOfLines={4} />

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.sendButton} onPress={onSend}>
          <Text style={styles.buttonText}>Send</Text>
        </TouchableOpacity>
      </View>
      
      {/* Back Button */}
      <TouchableOpacity style={styles.backBtn} onPress={() => navigation?.goBack?.()}>
        <Entypo name="arrow-with-circle-left" size={20} color="white" />
      </TouchableOpacity>
      </View>
      </ImageBackground>
 
        
  );
}

const styles = StyleSheet.create({
  container: { padding: 16, flex: 1, backgroundColor: "#" },
  title: { fontSize: 24, fontWeight: "700", color: '#fff', textAlign: 'center', marginBottom: 20 },
  label: { marginTop: 10, color: '#fff', fontSize: 16, fontWeight: '600' },
  input: { 
    borderWidth: 1, 
    borderColor: "#ccc", 
    padding: 10, 
    borderRadius: 8, 
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    fontSize: 16,
    marginTop: 5,
    width:"100%"
  },
  multiline: { height: 100, textAlignVertical: "top" },
  bg: {
    flex: 1,
    width: '100%',
    height: '100%',
    padding: 0,
    resizeMode: 'stretch',
  },
  buttonContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  sendButton: {
    backgroundColor: '#008080',
    paddingVertical: 12,
    paddingHorizontal: 80,
    borderRadius: 5,
    elevation: 3,
  },
  buttonText: {
    color: '#000000ff',
    fontSize: 18,
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
  }
});
