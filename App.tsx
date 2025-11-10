import React from 'react';
import AppNavigator from './navigation/AppNavigator';
import { MenuProvider } from './context/MenuContext';

const App = () => {
  return (
    <MenuProvider>
      <AppNavigator />
    </MenuProvider>
  );
};

export default App;
