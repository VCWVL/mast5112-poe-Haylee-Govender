// src/screens/FilterScreen.tsx
import React, { useState, useContext, useMemo } from "react";
import { View, Text, FlatList, Image, TouchableOpacity, Button, StyleSheet,ImageBackground } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { MenuContext, CourseType, MenuItem } from "../context/MenuContext";
import Ionicons from '@expo/vector-icons/Ionicons';
import Entypo from '@expo/vector-icons/Entypo';
import { StackScreenProps } from "@react-navigation/stack";

type Props = StackScreenProps<any, "Filter">;

/**
 * FilterScreen allows users to view menu items filtered by a specific course.
 * It displays a list of items for the selected course (e.g., Starters, Mains)
 * and allows users to add items directly to their order from this screen.
 */
export default function FilterScreen({ navigation }: Props) {
  // Access menu and order data from the global context.
  const ctx = useContext(MenuContext);
  if (!ctx) throw new Error("MenuContext missing");

  // Get the current number of items in the order to display on the badge.
  const orderCount = ctx.order.length;
  // State to manage the currently selected course for filtering.
  const [course, setCourse] = useState<CourseType>("Starter");

  // Memoized list of menu items that updates only when the menu or selected course changes.
  const filtered = useMemo(() => ctx.menu.filter((m) => m.course === course), [ctx.menu, course]);

  /**
   * Renders a single menu item in the FlatList.
   * @param {object} { item } - The menu item to render.
   */
  const renderItem = ({ item }: { item: MenuItem }) => (
    <View style={styles.item}>
      {/* Display the item's image or a placeholder if no image is available. */}
      {item.imageUrl ? (
        <Image source={item.imageUrl} style={styles.image} resizeMode="cover" />
      ) : (
        <View style={[styles.image, styles.placeholder]}><Text>Image</Text></View>
      )}
      {/* Container for the item's details. */}
      <View style={styles.info}>
        <Text style={styles.name}>{item.name}</Text>
        <Text numberOfLines={2}>{item.description}</Text>
        <Text style={styles.price}>R{item.price.toFixed(2)}</Text>
      </View>
      {/* Button to add the item to the order. */}
      <TouchableOpacity onPress={() => ctx.addToOrder(item)}>
        <Ionicons name="add-circle-sharp" size={22} color="crimson" />
      </TouchableOpacity>
    </View>
  );

  return (
      // Main background for the screen.
      <ImageBackground
          source={require('../assets/images/main_Background.jpg')}
          style={styles.bg}
          resizeMode="cover"
        >

      {/* Screen Title */}
      <Text style={styles.title}>Filter Menu</Text>

      {/* Picker for selecting the course to filter by. */}
      <View style={styles.pickerWrap}>
        <Picker selectedValue={course} onValueChange={(v) => setCourse(v as CourseType)}>
          <Picker.Item label="Starters" value="Starter" />
          <Picker.Item label="Mains" value="Main" />
          <Picker.Item label="Desserts" value="Dessert" />
          <Picker.Item label="Drinks" value="Drink" />
        </Picker>
      </View>

      {/* List of filtered menu items. */}
      <FlatList
        style={{ marginTop: 12 }}
        data={filtered}
        keyExtractor={(i) => i.id}
        renderItem={renderItem}
        ListEmptyComponent={<Text style={{ padding: 12 }}>No items in this category.</Text>}
      />

      {/* Container for floating action buttons at the bottom. */}
      <View style={styles.buttonRow}>
        {/* Floating button to navigate to the Order Details screen, with a badge for item count. */}
        <TouchableOpacity
          style={styles.viewOrderBtn}
          onPress={() => navigation?.navigate?.("OrderDetails")}
        >
          <Text style={styles.viewOrderText}>VIEW ORDER</Text>
          {orderCount > 0 && (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{orderCount}</Text>
            </View>
          )}
        </TouchableOpacity>
        {/* Floating button to navigate to the Help screen. */}
        <TouchableOpacity style={styles.helpBtn} onPress={() => navigation.navigate("Help")}>
          <Entypo name="help-with-circle" size={22} color="white" />
        </TouchableOpacity>
        {/* Floating button to navigate back to the previous screen. */}
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
          <Entypo name="arrow-with-circle-left" size={20} color="white" />
        </TouchableOpacity>
      </View>
  
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
    bg: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  
  title: { fontSize: 24, fontWeight: "700",color:"white" ,textAlign:'center',padding:10,alignSelf:"center"},
  pickerWrap: { borderWidth: 2, borderColor: "#00a3a3ff", borderRadius: 5, marginTop: 8,backgroundColor:"#fff",width:"90%",alignSelf:"center" },
  item: { flexDirection: "row", alignItems: "center", marginVertical: 8, borderWidth: 1, borderColor: "#eee", padding: 8, borderRadius: 8 ,backgroundColor:"#fff",width:"95%",alignSelf:"center"},
  image: { width: 70, height: 70, borderRadius: 8, backgroundColor: "#f0f0f0" },
  placeholder: { alignItems: "center", justifyContent: "center" },
  info: { flex: 1, marginLeft: 8 },
  name: { fontWeight: "700" },
  price: { marginTop: 6 },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    marginTop: 12,
    paddingBottom: 80, // Add padding to avoid overlap with floating buttons
  },
  helpBtn: {
     position: 'absolute',
    bottom: 25,
    right: 20,
    backgroundColor: '#DC143C',
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
  },
  backBtn: {
     position: 'absolute',
    bottom: 20,
    left: 20,
    backgroundColor: '#DC143C',
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
  },
  viewOrderBtn: {
    position: 'absolute',
    bottom: 20,
    alignSelf: 'center',
    backgroundColor: '#008080',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 50,
    elevation: 4,
  },
  viewOrderText: { color: '#000', fontWeight: '700', fontSize: 16 },
  badge: {
    position: 'absolute', top: -10, right: -10,
    backgroundColor: 'red', borderRadius: 12,
    width: 24, height: 24,
    justifyContent: 'center', alignItems: 'center',
  },
  badgeText: { color: '#fff', fontSize: 12, fontWeight: 'bold' },
});
