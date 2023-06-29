import { View, Text, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFonts, Inter_900Black } from '@expo-google-fonts/inter';
import * as SplashScreen from 'expo-splash-screen';
import { useCallback, useEffect } from 'react';
import AppText from '../components/text/AppText';
import { Redirect, useRouter } from 'expo-router';

export default function Entry() {
  return (
    <View className="bg-background flex-[1]">
      <SafeAreaView className="flex-[1] flex flex-col items-center justify-center">
        <ActivityIndicator size="large" color="#ffffff" />
        <Redirect href="/onboarding" />
      </SafeAreaView>
    </View>
  );
}
