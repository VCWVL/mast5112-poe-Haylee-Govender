//context/MenuContext.tsx
import React, { createContext, useState, ReactNode } from "react";

// Defines the possible course categories for a menu item.
export type CourseType = "Starter" | "Main" | "Dessert" | "Drink";

// Defines the structure of a single menu item.
export type MenuItem = {
  id: string;
  name: string;
  description: string;
  price: number;
  course: CourseType;
  imageUrl?: any; // Allows for both `require()` and `{ uri: ... }` formats for images.
};

// Defines the shape of the context's value, including state and action functions.
type MenuContextType = {
  menu: MenuItem[]; // The current array of menu items being displayed.
  currentMenu: number; // The identifier for the currently active menu (e.g., 1, 2, or 3).
  switchMenu: (menuNumber: number) => void; // Function to switch between predefined menus.
  addMenuItem: (item: Omit<MenuItem, "id">) => void; // Function to add a new item to the current menu.
  removeMenuItem: (id: string) => void; // Function to remove an item from the menu by its ID.
  order: MenuItem[]; // The array of menu items currently in the user's order.
  addToOrder: (item: MenuItem) => void; // Function to add an item to the order.
  clearOrder: () => void; // Function to clear all items from the order.
  removeFromOrder: (id: string) => void; // Function to remove a single item from the order.
};

// Creates the React Context for the menu. This will be used by consumers to access the context value.
export const MenuContext = createContext<MenuContextType | undefined>(undefined);

// --------------------------- MENU 1 DATA ---------------------------
// Predefined data for the first menu option.
const menu1: MenuItem[] = [
  // Starters
  { id: "1", name: "Marrow Bones", description: "Oven-roasted with croutes.", price: 110, course: "Starter", imageUrl: require("../assets/images/marrow.jpg") },
  { id: "2", name: "Italian Tomato Soup", description: "Served with Parmesan croutons.", price: 110, course: "Starter", imageUrl: require("../assets/images/Italian.jpg") },
  { id: "3", name: "Pork Belly Bites", description: "Served on a bed of Dijon mustard.", price: 100, course: "Starter", imageUrl: require("../assets/images/Pork_bites.jpg") },
  // Mains
  { id: "4", name: "Bone Marrow Steak", description: "200g rump or sirloin topped with bone marrow butter.", price: 180, course: "Main", imageUrl: require("../assets/images/steak_rump.jpg") },
  { id: "5", name: "Deboned Half Chicken", description: "Brushed with lemon & herb, peri-peri or BBQ basting.", price: 150, course: "Main", imageUrl: require("../assets/images/chicken_deboned.jpg") },
  { id: "6", name: "Pork Belly 300g", description: "Served with a side of your choice.", price: 160, course: "Main", imageUrl: require("../assets/images/pork_belly.jpg") },
  // Desserts
  { id: "7", name: "Crème Brûlée", description: "Caramelised sugar encasing silky custard.", price: 80, course: "Dessert", imageUrl: require("../assets/images/creme.jpg") },
  { id: "8", name: "Malva Pudding", description: "Sticky sponge with warm custard drizzle.", price: 90, course: "Dessert", imageUrl: require("../assets/images/malva.jpg") },
  // Drinks
  { id: "9", name: "Mocktail Mojito", description: "Mint, lime and soda.", price: 50, course: "Drink", imageUrl: require("../assets/images/mocktail_mojito.jpg") },
  { id: "10", name: "Pineapple / Cranberry Juice", description: "Sweet and tropical.", price: 35, course: "Drink", imageUrl: require("../assets/images/Juice.jpg") },
];

// --------------------------- MENU 2 DATA ---------------------------
// Predefined data for the second menu option.
const menu2: MenuItem[] = [
  // Starters
  { id: "11", name: "Garlic Bread", description: "Toasted baguette with garlic butter.", price: 65, course: "Starter", imageUrl: require("../assets/images/garlic_bread.jpg") },
  { id: "12", name: "Stuffed Mushrooms", description: "Filled with herbs and cream cheese.", price: 90, course: "Starter", imageUrl: require("../assets/images/stuffed_mushrooms.jpg") },
  { id: "13", name: "Chicken Livers", description: "Spicy peri-peri chicken livers with toast.", price: 95, course: "Starter", imageUrl: require("../assets/images/chicken_livers.jpg") },
  // Mains
  { id: "14", name: "Grilled Ribeye 300g", description: "Juicy ribeye grilled to perfection.", price: 220, course: "Main", imageUrl: require("../assets/images/ribeye.jpg") },
  { id: "15", name: "Seafood Pasta", description: "Creamy pasta with prawns and calamari.", price: 180, course: "Main", imageUrl: require("../assets/images/seafood_pasta.jpg") },
  { id: "16", name: "Lamb Curry", description: "Slow-cooked lamb in aromatic curry sauce.", price: 170, course: "Main", imageUrl: require("../assets/images/lamb_curry.jpg") },
  // Desserts
  { id: "17", name: "Chocolate Brownie", description: "Rich chocolate brownie with ice cream.", price: 85, course: "Dessert", imageUrl: require("../assets/images/brownie.jpg") },
  { id: "18", name: "Apple Pie", description: "Classic pie served warm with cream.", price: 80, course: "Dessert", imageUrl: require("../assets/images/apple_pie.jpg") },
  // Drinks
  { id: "19", name: "Berry Smoothie", description: "Mixed berry and yoghurt smoothie.", price: 55, course: "Drink", imageUrl: require("../assets/images/smoothie.jpg") },
  { id: "20", name: "Iced Tea", description: "Chilled lemon iced tea.", price: 40, course: "Drink", imageUrl: require("../assets/images/iced_tea.jpg") },
];

// --------------------------- MENU 3 DATA ---------------------------
// Predefined data for the third menu option.
const menu3: MenuItem[] = [
  // Starters
  { id: "21", name: "Caprese Salad", description: "Mozzarella, tomato & basil with olive oil.", price: 95, course: "Starter", imageUrl: require("../assets/images/caprese.jpg") },
  { id: "22", name: "Spring Rolls", description: "Crispy rolls filled with veggies.", price: 85, course: "Starter", imageUrl: require("../assets/images/spring_rolls.jpg") },
  { id: "23", name: "Butternut Soup", description: "Creamy roasted butternut soup.", price: 90, course: "Starter", imageUrl: require("../assets/images/butternut_soup.jpg") },
  // Mains
  { id: "24", name: "Lamb Chops", description: "Grilled chops with rosemary and mint jelly.", price: 220, course: "Main", imageUrl: require("../assets/images/lamb.jpg") },
  { id: "25", name: "Beef Burger Deluxe", description: "200g patty with cheese, bacon & fries.", price: 160, course: "Main", imageUrl: require("../assets/images/burger.jpg") },
  { id: "26", name: "Chicken Alfredo", description: "Creamy pasta with grilled chicken.", price: 155, course: "Main", imageUrl: require("../assets/images/alfredo.jpg") },
  // Desserts
  { id: "27", name: "Cheesecake Slice", description: "Smooth vanilla cheesecake slice.", price: 90, course: "Dessert", imageUrl: require("../assets/images/cheesecake.jpg") },
  { id: "28", "name": "Tiramisu", description: "Classic Italian coffee dessert.", price: 95, course: "Dessert", imageUrl: require("../assets/images/tiramisu.jpg") },
  // Drinks
  { id: "29", name: "Iced Coffee", description: "Chilled espresso with milk and ice.", price: 45, course: "Drink", imageUrl: require("../assets/images/iced_coffee.jpg") },
  { id: "30", name: "Lemonade", description: "Freshly squeezed homemade lemonade.", price: 35, course: "Drink", imageUrl: require("../assets/images/lemonade.jpg") },
];

/**
 * MenuProvider is a component that wraps parts of the app that need access to menu and order state.
 * It manages the state for the menu, the current order, and provides functions to modify them.
 */
export const MenuProvider = ({ children }: { children: ReactNode }) => {
  // State for the active menu items. Defaults to menu1.
  const [menu, setMenu] = useState<MenuItem[]>(menu1);
  // State to track which menu (1, 2, or 3) is currently active.
  const [currentMenu, setCurrentMenu] = useState<number>(1);
  // State for the user's current order.
  const [order, setOrder] = useState<MenuItem[]>([]);

  /**
   * Switches the active menu to the selected menu number and clears the current order.
   * @param menuNumber The number of the menu to switch to (1, 2, or 3).
   */
  const switchMenu = (menuNumber: number) => {
    if (menuNumber === 1) setMenu(menu1);
    if (menuNumber === 2) setMenu(menu2);
    if (menuNumber === 3) setMenu(menu3);
    setCurrentMenu(menuNumber);
    setOrder([]); // Clear order when switching menus to avoid confusion.
  };

  /**
   * Adds a new item to the currently active menu.
   * @param item The menu item data to add, without an ID.
   */
  const addMenuItem = (item: Omit<MenuItem, "id">) => {
    // Generate a unique ID based on the current timestamp.
    const newItem = { ...item, id: Date.now().toString() };
    setMenu((prev) => [...prev, newItem]);
  };

  /**
   * Removes an item from the menu and also from the current order if it exists there.
   * @param id The ID of the menu item to remove.
   */
  const removeMenuItem = (id: string) => {
    setMenu((prev) => prev.filter((m) => m.id !== id));
    setOrder((prev) => prev.filter((m) => m.id !== id));
  };

  // Adds a specified item to the order.
  const addToOrder = (item: MenuItem) => setOrder((prev) => [...prev, item]);
  // Removes a specified item from the order. Note: This will remove all instances of an item if added multiple times.
  const removeFromOrder = (id: string) => setOrder((prev) => prev.filter((m) => m.id !== id));
  // Clears all items from the current order.
  const clearOrder = () => setOrder([]);

  // Provides the state and action functions to all children components.
  return (
    <MenuContext.Provider
      value={{
        menu,
        currentMenu,
        switchMenu,
        addMenuItem,
        removeMenuItem,
        order,
        addToOrder,
        clearOrder,
        removeFromOrder,
      }}
    >
      {children}
    </MenuContext.Provider>
  );
};
