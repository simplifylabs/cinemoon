import { View, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Redirect } from 'expo-router';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { RootDispatch } from '../store';
import { useTypedSelector } from '../hooks/useTypedSelector';

export default function Entry() {
  const dispatch = useDispatch<RootDispatch>();
  const { genres } = useTypedSelector((state) => state.genres);

  useEffect(() => {
    dispatch.genres.fetchGenres(undefined);
  }, [dispatch.genres]);

  if (Object.keys(genres).length > 0) return <Redirect href="/onboarding" />;

  return (
    <View className="bg-background flex-[1]">
      <SafeAreaView className="flex-[1] flex flex-col items-center justify-center">
        <ActivityIndicator size="large" color="#ffffff" />
      </SafeAreaView>
    </View>
  );
}
