import AppText from '../../components/text/AppText';
import { Tabs } from 'expo-router';
import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Layout() {
  return (
    <View className="flex-1 bg-background">
      <SafeAreaView className="flex-1 p-5">
        <AppText className="text-3xl text-white" weight="extra-bold">
          Hello World
        </AppText>
      </SafeAreaView>
    </View>
  );
}
