import { View } from 'react-native';
import AppText from '../text/AppText';
import TMDBSvg from '../svgs/TMDB';

export default function TMDBAttribution() {
  return (
    <View className="flex flex-row items-center justify-center space-x-2">
      <View>
        <AppText className="text-[11px] text-gray-700">Powered by</AppText>
      </View>
      <View className="opacity-40">
        <TMDBSvg width={60} height={20} />
      </View>
    </View>
  );
}
