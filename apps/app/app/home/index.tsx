import AppText from '../../components/text/AppText';
import { Tabs, useRouter } from 'expo-router';
import { Touchable, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Layout() {
  const router = useRouter();

  return (
    <View className="flex-1 bg-background">
      <SafeAreaView className="flex-1 p-5">
        <AppText className="text-3xl text-white" weight="extra-bold">
          Welcome back!
        </AppText>
        <View></View>
      </SafeAreaView>
    </View>
  );
}
