import React from 'react';
import AppNavigator from './navigation/AppNavigator';
import { MenuProvider } from './context/MenuContext';

/**
 * The main App component.
 * This is the root of the React Native application.
 * It sets up the global context providers and the main navigator.
 */
const App = () => {
  return (
    // The MenuProvider wraps the entire application, making the menu and order state
    // available to all components and screens via the MenuContext.
    <MenuProvider>
      {/* AppNavigator handles all the screen navigation for the application. */}
      <AppNavigator />
    </MenuProvider>
  );
};

export default App;
