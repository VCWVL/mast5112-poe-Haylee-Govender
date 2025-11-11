CHRISTOFFEL PREMIER PLATES APP

Overview

The Restaurant Menu Management Application is a mobile application developed using React Native and TypeScript.
The purpose of the application is to allow a restaurant owner or chef to create, manage, and view dynamic menus efficiently.

The application enables the addition and removal of menu items, real-time interface updates, and seamless navigation between multiple screens.
It was developed in accordance with the specified wireframes and component guidelines, and it fulfills the requirements of Learning Units 1–3 as well as the Part 2 functional specifications of the coursework.

Project Objectives


• The primary objectives of this project are as follows:

• To design and implement a functional and responsive mobile application interface.

•	To enable dynamic management of menu items through user input rather than hardcoded data.

•	To demonstrate effective handling of user interaction through event-driven programming and TypeScript logic.

•	To apply React Native layout systems, images, and colour schemes to produce an appealing user interface.

•	To implement a logical navigation structure between multiple screens.

•	To demonstrate the use of data management and context-based state handling in a React Native environment.

Learning Unit Outcomes


•	This application demonstrates the following learning outcomes:

•	Core React Native components (View, Text, Image, ScrollView, Button, TouchableOpacity, etc.) have been used to create a functional user interface.

•	Layout management has been achieved using Flexbox and nested views to ensure responsive design across different devices.

•	A consistent colour scheme and image assets have been applied to enhance the visual presentation.

•	Text input components have been used to capture user input, such as dish names, descriptions, and prices.

•	TypeScript variables and interfaces are used throughout the project to store and manage data safely.

•	Button components have been implemented to execute actions such as adding, removing, and switching menu items.

•	Animated transitions and interactive icons enhance user engagement and provide visual feedback.

•	Conditional logic and TypeScript functions are used to validate input, handle errors, and perform calculations based on user actions.

Navigation between screens has been implemented using the React Navigation library.

Conditional statements (if structures) have been used to solve various programming problems and to control logic flow within the application.


Application Features

Dynamic Menu Management

The application includes three predefined menus (Menu 1, Menu 2, and Menu 3). Each menu contains several items grouped under Starters, Mains, Desserts, and Drinks.
Users can switch between menus using the Reset Menu screen, and the data updates dynamically throughout the application.

Add Menu Items

The chef can add new dishes by entering a dish name, description, course type, price, and an image URL.
All inputs are validated to ensure data completeness and accuracy. Newly added dishes are immediately reflected in the displayed menu.

Remove Menu Items

The chef can remove dishes by selecting the course and specific item to be deleted. The menu updates instantly upon confirmation of the removal.

View and Count Menu Items

The Menu screen displays all current dishes, including their names, descriptions, and prices.
A dynamic counter displays the total number of dishes available. The counter updates automatically when dishes are added, removed, or when the active menu changes.

Switch Menus

The Reset Menu feature allows the chef to switch between Menu 1, Menu 2, and Menu 3.
Once a selection is made, the interface refreshes automatically to display the selected menu.

Filtering and Navigation

Navigation between screens is implemented using the React Navigation library, ensuring a structured and intuitive user experience.
Filtering options allow users to view dishes based on their course category.

Navigation Structure

The application contains the following screens:

Welcome Screen – Displays introductory content and the option to start the application.

Menu Screen – Displays the current active menu dynamically.

Add to Menu Screen – Allows the chef to add a new menu item.

Remove from Menu Screen – Enables the chef to delete existing menu items.

Menu Details Update Screen – Acts as the central control hub for adding, removing, or resetting menus.

Reset Menu Screen – Allows switching between Menu 1, 2, and 3.

Filter Screen – Filters menu items by course type.

Order Details Screen – Displays the selected dishes in the order list.

Help Screen – Provides user assistance and guidance.

Functional Requirements and Implementation

The application allows the chef to enter a dish name, description, course type, price, and image URL.

The application provides a predefined list of courses (Starters, Mains, Desserts, and Drinks).

The home screen displays the current menu dynamically.

The total number of dishes is displayed and automatically updated.

The data is managed dynamically through state; no data is hardcoded in the user interface.

Conditional statements and TypeScript logic ensure all inputs are validated before processing.

Dynamic Context System

The application uses a Menu Context to store and manage data across screens.
This system provides global state management and ensures that all screens display consistent information.

The context performs the following functions:

Adds new dishes to the current menu.

Removes dishes from the menu.

Switches between predefined menus.

Stores the current order and allows clearing it.

All updates are reflected in real time across the user interface.

Example User Interactions

Adding a Dish: Enter the dish details, select the course, and press “Add”. The new dish immediately appears in the menu.

Removing a Dish: Select the course and dish name, then press “Remove”. The dish is removed instantly.

Switching Menus: Choose Menu 1, 2, or 3 in the Reset screen. The interface automatically updates to display the selected menu.

Viewing Total Dishes: The total number of available dishes is displayed at the top of the Menu Screen and updates dynamically.

Future Enhancements

Potential improvements to this project may include:

Implementing local or remote data persistence using AsyncStorage or Firebase.

Allowing user authentication for chefs and staff.

Displaying image previews for custom dish URLs.

Adding sorting and filtering by price or popularity.

Providing an export option to generate printable menus.

Developer Notes

This application demonstrates:

Proficiency in React Native and TypeScript.

Competence in designing modular and maintainable code structures.

Effective application of component-based architecture and state management.

The ability to integrate user interface design principles with programming logic.

Clear alignment with the expected academic and technical outcomes of the module.

Conclusion

The Restaurant Menu Management Application is a complete and fully functional solution for managing restaurant menus.
It meets all academic, functional, and user experience requirements for this module.
Through the use of React Native, TypeScript, and context-based data management, the application delivers a practical and professional demonstration of modern mobile application development practices.

Changelog: 

21 Oct 2025 - first commit - all the screens pushed to github.

21 Oct 2025 - second commit - Changed colors,fixed icons,fixed layout.

22 Oct 2025 - Edited styles - Homescreen,MenuScreen,HelpScreen,MenuDetailsUpdateScreen was edited regarding colors,layouts. 

22 Oct 2025 - Edited background and styles - FilterScreen,MenuDetailsUpadteScreen,MenuScreen,OrderDetails,WelcomeScreen was edited.

22 Oct 2025 - Changes to styles,colors - Edited OrderDetailsScreen,RemoveFromMenuScreen,ResetConfirmationScreen,AddToMenuScreen was edited.

Changelog Poe : 

10 Nov 2025 - Edited due to feedback to include references.

10 Nov 2025 -

10 Nov 2035 - 

11 Nov 2025 - Added comments throughout code. 

11 Nov 2025 - Edited styles for welcome screen.

11 Nov 2025 - Added all references to sites which was used.

Developed by: Haylee Govender

Year: 2025

Module: MAST5112

Institution: VC College

References: 

Developer,2025.Regular expressions [online] Available at: <https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_expressions > [Accessed on the 22 Oct 2025].

Docs.expo.dev,2025.Expo vector icons [online] Available at: <https://docs.expo.dev/guides/icons/> [Accessed on the 21 Oct 2025].

reactnative,2025.Animated[online] Available at: <https://reactnative.dev/docs/animated> [Accessed on the 19 Oct 2025]. 

reactnative,2025.Alert [online] Available at: < https://reactnative.dev/docs/alert >[Accessed on the 23 Oct 2025].

react.dev,2025.createContext [online] Available at: <https://react.dev/reference/react/createContext > [Accessed on the 25 Oct 2025].

reactnative,2025.Core Components and APIs[online] Available at: <https://reactnative.dev/docs/components-and-apis > [Accessed on the 17 Oct 2025]. 

reactnative,2025.FlatList[online] Available at: <https://reactnative.dev/docs/flatlist > [Accessed on the 25 Oct 2025].

// reactnative,2025.ImageBackground[online] Available at: <https://reactnative.dev/docs/imagebackground > [Accessed on the 24 Oct 2025].

// reactnavigation,2025.NavigationContainer [online] Available at: <https://reactnavigation.org/docs/navigation-container/ > [Accessed on the 21 Oct 2025].

reactnavigation,2025.Native Stack Navigator [online] Available at: < https://reactnavigation.org/docs/native-stack-navigator/ >[Accessed on the 20 Oct 2025].

reactnative,2025.Style[online] Available at: <https://reactnative.dev/docs/style > [Accessed on the 22 Oct 2025]. 

reactnative,2025.Text Input[online] Available at: <https://reactnative.dev/docs/textinput> [Accessed on the 25 Oct 2025]. 

// reactnative,2025.TouchableOpacity[online] Available at: <https://reactnative.dev/docs/touchableopacity > [Accessed on the 20 Oct 2025].

react.dev,2025.useContext [online] Available at: <https://react.dev/reference/react/useContext > [Accessed on the 22 Oct 2025].

react.dev,2025.useState [online] Available at: <https://react.dev/reference/react/useState > [Accessed on the 22 Oct 2025].

react.dev,2025.Using List View [online] Available at: <https://reactnative.dev/docs/using-a-listview > [Accessed on the 26 Oct 2025].

// w3schools,2025.HTML Color Names[online] Available at: <https://www.w3schools.com/colors/colors_names.asp >[Accessed on the 23 Oct 2025].
