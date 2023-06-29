import { View } from 'react-native';
import AppText from '../text/AppText';
import HeadlineGradient from '../text/HeadlineGradient';

export default function ChooseStreamingPlatform() {
  return (
    <View className="flex-[1] flex flex-col justify-center items-center space-y-3">
      <View className="flex flex-col items-center justify-center">
        <View>
          <AppText
            className="text-3xl text-center text-white"
            weight="extra-bold"
          >
            What
          </AppText>
        </View>
        <View className="h-11">
          <HeadlineGradient>streaming platform</HeadlineGradient>
        </View>
        <View>
          <AppText
            className="text-3xl text-center text-white"
            weight="extra-bold"
          >
            do you have?
          </AppText>
        </View>
      </View>
      <View className="flex flex-row flex-wrap items-center justify-center">
        <View className="w-1/3 h-12 m-2 bg-gray-800 border border-gray-700 rounded-md"></View>
        <View className="w-1/3 h-12 m-2 bg-gray-800 border border-gray-700 rounded-md"></View>
        <View className="w-1/3 h-12 m-2 bg-gray-800 border border-gray-700 rounded-md"></View>
        <View className="w-1/3 h-12 m-2 bg-gray-800 border border-gray-700 rounded-md"></View>
      </View>
    </View>
  );
}
