import { Slot } from 'expo-router';
import React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { PaperProvider } from 'react-native-paper';

const RootLayout = () => {


  return (

    <PaperProvider>

      <GestureHandlerRootView style={{ flex: 1 }}>
        <Slot />
      </GestureHandlerRootView>
    </PaperProvider>

  );
};

export default RootLayout;

