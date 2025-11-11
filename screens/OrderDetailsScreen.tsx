// src/screens/OrderDetailsScreen.tsx
import React, { useContext, useMemo } from "react";
import { View, Text, FlatList, StyleSheet, ImageBackground, TouchableOpacity } from "react-native";
import { MenuContext } from "../context/MenuContext";
import { StackScreenProps } from "@react-navigation/stack";

type Props = StackScreenProps<any, "OrderDetails">;

/**
 * OrderDetailsScreen displays the items the user has added to their order.
 * It shows a list of items with their prices, the total cost, and a button
 * to finalize and close the order.
 */
export default function OrderDetailsScreen({ navigation }: Props) {
  // Access the menu context to get the current order and related functions.
  const ctx = useContext(MenuContext);
  // Early return or error if the context is not available.
  if (!ctx) throw new Error("MenuContext missing");

  // Calculate the total price of the order.
  // useMemo ensures this calculation only runs when the order array changes.
  const total = useMemo(() => ctx.order.reduce((s, it) => s + it.price, 0), [ctx.order]);

  return (
    // Main background for the screen.
    <ImageBackground
      source={require('../assets/images/main_Background.jpg')}
      style={styles.bg}
      resizeMode="cover"
    >
      {/* Semi-transparent overlay for content readability. */}
      <View style={styles.container}>
        <Text style={styles.title}>Order Details</Text>

        {/* List of items in the order. */}
        <FlatList
          data={ctx.order}
          keyExtractor={(it, idx) => `${it.id}-${idx}`}
          ListEmptyComponent={<Text style={{ padding: 12, color: '#fff' }}>Your order is empty.</Text>}
          renderItem={({ item, index }) => (
            <View style={styles.row}>
              <Text style={styles.itemText}>{item.name}</Text>
              <Text style={styles.itemText}>R{item.price.toFixed(2)}</Text>
            </View>
          )}
        />

        {/* Section to display the total cost of the order. */}
        <View style={styles.totalRow}>
          <Text style={styles.totalText}>Total:</Text>
          <Text style={styles.totalText}>R{total.toFixed(2)}</Text>
        </View>

        {/* Button to close the order.
            This clears the order from the context and navigates the user
            back to the Welcome screen.
        */}
        <TouchableOpacity
          style={styles.closeButton}
          onPress={() => { ctx.clearOrder(); navigation.navigate("Welcome"); }}
        >
          <Text style={styles.closeButtonText}>Close (Thank you for ordering!)</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  bg: { flex: 1, width: '100%', height: '100%' },
  container: { padding: 16, flex: 1, backgroundColor: "rgba(0,0,0,0.5)" },
  title: { fontSize: 24, fontWeight: "700", color: "#fff", textAlign: 'center', marginBottom: 16 },
  row: { flexDirection: "row", justifyContent: "space-between", paddingVertical: 10, borderBottomWidth: 1, borderColor: "rgba(255,255,255,0.2)" },
  itemText: { color: '#fff', fontSize: 16 },
  totalRow: { flexDirection: "row", justifyContent: "space-between", paddingVertical: 16, borderTopWidth: 2, borderColor: "#fff", marginTop: 12 },
  totalText: { fontWeight: "700", color: '#fff', fontSize: 18 },
  closeButton: {
    marginTop: 24,
    backgroundColor: "#DC143C",
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  closeButtonText: {
    color: '#000',
    fontSize: 16,
    fontWeight: '700',
  },
});
