import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { View } from 'react-native';
import { Provider } from 'react-redux';
import {
  useFonts,
  Inter_900Black,
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold,
  Inter_800ExtraBold,
} from '@expo-google-fonts/inter';
import {
  // Import `SplashScreen` from `expo-router` instead of `expo-splash-screen`
  SplashScreen,

  // This example uses a basic Layout component, but you can use any Layout.
  Slot,
} from 'expo-router';

import React, { useCallback } from 'react';
import { store } from '../store';

export const unstable_settings = {
  initialRouteName: 'index',
};

export default function Layout() {
  const [fontsLoaded] = useFonts({
    Inter_900Black,
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
    Inter_800ExtraBold,
  });

  if (!fontsLoaded) {
    return <SplashScreen />;
  }

  return (
    <Provider store={store}>
      <StatusBar style="light" translucent />
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="finder" />
      </Stack>
    </Provider>
  );
}
