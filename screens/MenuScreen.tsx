// References 

// Docs.expo.dev,2025.Expo vector icons [online] Available at: https://docs.expo.dev/guides/icons/ [Accessed on the 21 Oct 2025]. 

// reactnative,2025.Animated[online] Available at: https://reactnative.dev/docs/animated [Accessed on the 19 Oct 2025].

// reactnative,2025.Core Components and APIs[online] Available at: <https://reactnative.dev/docs/components-and-apis > [Accessed on the 17 Oct 2025].

// reactnative,2025.ImageBackground[online] Available at: <https://reactnative.dev/docs/imagebackground > [Accessed on the 24 Oct 2025].

// reactnavigation,2025.NavigationContainer [online] Available at: <https://reactnavigation.org/docs/navigation-container/ > [Accessed on the 21 Oct 2025].

// reactnavigation,2025.Native Stack Navigator [online] Available at: < https://reactnavigation.org/docs/native-stack-navigator/ >[Accessed on the 20 Oct 2025].

// reactnative,2025.Style[online] Available at: <https://reactnative.dev/docs/style > [Accessed on the 22 Oct 2025].

// reactnative,2025.TouchableOpacity[online] Available at: <https://reactnative.dev/docs/touchableopacity > [Accessed on the 20 Oct 2025].

// w3schools,2025.HTML Color Names[online] Available at: <https://www.w3schools.com/colors/colors_names.asp >[Accessed on the 23 Oct 2025].

import React, { useState, useContext, useRef } from "react";
import {
  View,
  Text,
  ImageBackground,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  Alert,
  Animated,
} from "react-native";

import { MenuContext, MenuItem } from "../context/MenuContext";
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import Ionicons from '@expo/vector-icons/Ionicons';

/**
 * MenuScreen displays the full restaurant menu, categorized by course.
 * It allows users to view dishes, see their details, and add them to an order.
 * Each course section has an interactive image that updates when a dish is tapped.
 */
const MenuScreen: React.FC<{ navigation?: any }> = ({ navigation }) => { 
  // Access menu data and order functions from the global context.
  const ctx = useContext(MenuContext);

  // State to manage which image is displayed for each course section.
  const [selectedImages, setSelectedImages] = useState({
    starters: require("../assets/images/starters.jpg"),
    mains: require("../assets/images/main.jpg"),
    desserts: require("../assets/images/desserts.jpg"),
    drinks: require("../assets/images/drinks.jpg"),
  });

  // A ref to store animation values for each menu item's 'add' icon.
  // This allows each icon to have its own independent animation state.
  const scaleAnims = useRef<{ [key: string]: Animated.Value }>({}).current;

  /**
   * Updates the displayed image for a given menu section when a user taps on a dish.
   * @param section The course section (e.g., 'starters', 'mains').
   * @param image The image URL of the tapped dish.
   */
  const handleDishPress = (section: keyof typeof selectedImages, image: any) => {
    setSelectedImages((prev) => ({ ...prev, [section]: image }));
  };

  /**
   * Adds a menu item to the order and triggers a brief scaling animation on the 'add' icon.
   * @param item The MenuItem object to add to the order.
   */
  const handleAddToOrder = (item: MenuItem) => {
    // Ensure an Animated.Value exists for this item
    if (!scaleAnims[item.id]) {
      scaleAnims[item.id] = new Animated.Value(1);
    }
    const scaleAnim = scaleAnims[item.id];

    // Trigger a 'pop' animation on the icon to give user feedback.
    Animated.sequence([
      Animated.timing(scaleAnim, { toValue: 1.4, duration: 100, useNativeDriver: true }),
      Animated.timing(scaleAnim, { toValue: 1, duration: 100, useNativeDriver: true }),
    ]).start(() => {
      // Reset scale to 1 after animation completes
      scaleAnim.setValue(1);
    });

    ctx?.addToOrder(item);
  };

  // Gracefully handle case where context might be undefined
  if (!ctx) {
    return <View style={styles.container}><Text>Loading menu...</Text></View>;
  }

  // Get the current number of items in the order for the badge.
  const orderCount = ctx.order.length;

  return (
    // Main background for the screen.
    <ImageBackground
      source={require("../assets/images/main_Background.jpg")}
      style={styles.bg}
      resizeMode="cover"
    >
      {/* SafeAreaView ensures content is not obscured by device notches or status bars. */}
      <SafeAreaView style={styles.container}>
       <ScrollView style={{ flex: 1 }} contentContainerStyle={styles.scrollContainer}>
        {/* Floating icon to navigate to the Filter screen. */}
        <TouchableOpacity
          style={styles.filterIcon}
          onPress={() => navigation?.navigate?.("Filter")}
        >
          <FontAwesome5 name="filter" size={35} color="#DC143C" />
        </TouchableOpacity>

        {/* Header image for the menu screen. */}
        <Image
          source={require("../assets/images/menu_background.jpg")}
          style={styles.headerImage}
          width={400}
        />

        {/* Informational text showing the current menu number and total dishes. */}
        <Text style={styles.menuInfo}>
         Currently Viewing: Menu {ctx.currentMenu} | Total Dishes: {ctx.menu.length}
        </Text>
 
          {/* Dynamically render a section for each course type. */}
          {["Starter", "Main", "Dessert", "Drink"].map((type) => {
            const items = ctx.menu.filter((m) => m.course === type);
            const key = type.toLowerCase() + "s" as keyof typeof selectedImages;
            return (
              <View key={type} style={styles.section}>
                <Text style={styles.sectionTitle}>{type.toUpperCase()}S</Text>
                <View style={styles.sectionContent}>
                  {/* Left column: List of dishes for the current course. */}
                  <View style={styles.leftColumn}>
                    {items.length > 0 ? (
                      items.map((item) => (
                        <View key={item.id} style={styles.dishBlock}>
                          {/* Tappable area for dish info, which updates the section image. */}
                          <TouchableOpacity
                            style={styles.dishInfo}
                            onPress={() =>
                              handleDishPress(key, item.imageUrl)
                            }
                          >
                            <View style={styles.rowBetween}>
                              <Text style={styles.dishName}>
                                {item.name} - R{item.price}
                              </Text>
                            </View>
                            <Text style={styles.dishDesc}>{item.description}</Text>
                          </TouchableOpacity>
                          {/* Tappable icon to add the item to the order. */}
                          <View>
                            <TouchableOpacity onPress={() => handleAddToOrder(item)}>
                              <Animated.View style={{ transform: [{ scale: scaleAnims[item.id] || 1 }] }}>
                                <Ionicons name="add-circle-sharp" size={22} color="crimson" />
                              </Animated.View>
                            </TouchableOpacity>
                          </View>
                        </View>
                      ))
                    ) : (
                      <Text style={{ color: "#666", fontStyle: "italic" }}>
                        No items available.
                      </Text>
                    )}
                  </View>

                  {/* Right column: Displays the image of the selected dish. */}
                  <Image
                    source={selectedImages[key] || require("../assets/icon.png")}
                    style={styles.sectionImage}
                    resizeMode="cover"
                  />
                </View>
              </View>
            );
          })}
        </ScrollView>

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
        <TouchableOpacity
          style={styles.helpBtn}
          onPress={() => navigation?.navigate?.("Help")}
        >
          <Ionicons name="help-circle" size={28} color="#ffffffff" />
        </TouchableOpacity>
      </SafeAreaView>
    </ImageBackground>
  );
};


const styles = StyleSheet.create({
  bg: { flex: 1, width: '100%', height: '100%' },
  container: { flex: 1 },
  scrollContainer: { paddingBottom: 120, paddingHorizontal: 10 },
  filterIcon: { position: 'absolute', top: 160, left: 20, zIndex: 10 },
  headerImage: {
    width: "100%",
    height: 200,
    alignSelf: "center",
    marginBottom: 10,
  },
  menuInfo: {
  textAlign: "center",
  color: "#fff",
  backgroundColor: "rgba(0,0,0,0.5)",
  fontWeight: "600",
  fontSize: 16,
  paddingVertical: 6,
  marginBottom: 8,
  borderRadius: 10,
  alignSelf: "center",
  width: "90%",
},

  section: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 10,
    
    marginBottom: 16,
  },
  sectionTitle: {
    textAlign: 'center',
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 10,
  },
  sectionContent: { flexDirection: 'row', justifyContent: 'space-between' },
  leftColumn: { flex: 1.3, paddingRight: 10 },
  dishBlock: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  dishInfo: { flex: 1, marginRight: 8 },
  rowBetween: { flexDirection: 'row', justifyContent: 'space-between' },
  dishName: { fontSize: 15, fontWeight: '700', color: '#000' },
  dishDesc: { fontSize: 13, color: '#828181ff', marginTop: 3 },
  sectionImage: {
    flex: 1,
    height: 150,
    borderRadius: 3,
    alignSelf: 'center',
   resizeMode:'contain',
  },
  viewOrderBtn: {
    position: 'absolute',
    bottom: 20,
    alignSelf: 'center',
    backgroundColor: '#008080',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 80,
    elevation: 4,
  
  },
  viewOrderText: { color: '#000', fontWeight: '700', fontSize: 16 },
  badge: {
    position: 'absolute',
    top: -10,
    right: -10,
    backgroundColor: 'red',
    borderRadius: 12,
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
    fontWeight: 'bold',
  },
  badgeText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  helpBtn: {
    position: 'absolute',
    bottom: 20,
    right: 5,
    backgroundColor: '#DC143C',
    width: 34,
    height: 34,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default MenuScreen;
