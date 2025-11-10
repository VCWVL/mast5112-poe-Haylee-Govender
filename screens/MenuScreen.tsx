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

const MenuScreen: React.FC<{ navigation?: any }> = ({ navigation }) => { 
  const ctx = useContext(MenuContext);
  const [selectedImages, setSelectedImages] = useState({
    starters: require("../assets/images/starters.jpg"),
    mains: require("../assets/images/main.jpg"),
    desserts: require("../assets/images/desserts.jpg"),
    drinks: require("../assets/images/drinks.jpg"),
  });

  // Use a ref to store multiple animation values, one for each item
  const scaleAnims = useRef<{ [key: string]: Animated.Value }>({}).current;

  const handleDishPress = (section: keyof typeof selectedImages, image: any) => {
    setSelectedImages((prev) => ({ ...prev, [section]: image }));
  };

  const handleAddToOrder = (item: MenuItem) => {
    // Ensure an Animated.Value exists for this item
    if (!scaleAnims[item.id]) {
      scaleAnims[item.id] = new Animated.Value(1);
    }
    const scaleAnim = scaleAnims[item.id];

    // animate icon
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

  const orderCount = ctx.order.length;

  return (
    
    <ImageBackground
      source={require("../assets/images/main_Background.jpg")}
      style={styles.bg}
      resizeMode="cover"
    >
      
      <SafeAreaView style={styles.container}>
       <ScrollView style={{ flex: 1 }} contentContainerStyle={styles.scrollContainer}>
        {/* Filter Icon */}
        <TouchableOpacity
          style={styles.filterIcon}
          onPress={() => navigation?.navigate?.("Filter")}
        >
          <FontAwesome5 name="filter" size={35} color="#DC143C" />
        </TouchableOpacity>

        <Image
          source={require("../assets/images/menu_background.jpg")}
          style={styles.headerImage}
          width={400}
        />

        <Text style={styles.menuInfo}>
         Currently Viewing: Menu {ctx.currentMenu} | Total Dishes: {ctx.menu.length}
        </Text>
 
          {/* Helper render function */}
          {["Starter", "Main", "Dessert", "Drink"].map((type) => {
            const items = ctx.menu.filter((m) => m.course === type);
            const key = type.toLowerCase() + "s" as keyof typeof selectedImages;
            return (
              <View key={type} style={styles.section}>
                <Text style={styles.sectionTitle}>{type.toUpperCase()}S</Text>
                <View style={styles.sectionContent}>
                  <View style={styles.leftColumn}>
                    {items.length > 0 ? (
                      items.map((item) => (
                        <View key={item.id} style={styles.dishBlock}>
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
                          {/* Separate TouchableOpacity for the add icon to prevent nesting issues */}
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

        {/* VIEW ORDER BUTTON WITH BADGE */}
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

        {/* HELP ICON */}
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
