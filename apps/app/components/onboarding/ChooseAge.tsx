import { TextInput, View } from 'react-native';
import AppText from '../text/AppText';
import HeadlineGradient from '../text/HeadlineGradient';
import { useState } from 'react';

export default function ChooseAge() {
  const [age, setAge] = useState<number | null>(null);

  return (
    <View className="flex-[1] flex flex-col justify-center items-center space-y-3">
      <View>
        <AppText>
          <View>
            <AppText
              className="text-3xl text-center text-white"
              weight="extra-bold"
            >
              How{' '}
            </AppText>
          </View>
          <View className="h-10">
            <HeadlineGradient>old</HeadlineGradient>
          </View>
          <View>
            <AppText
              className="text-3xl text-center text-white"
              weight="extra-bold"
            >
              {' '}
              are you?
            </AppText>
          </View>
        </AppText>
      </View>
      <View className="pt-8">
        <TextInput
          className="w-20 h-20 text-4xl text-white bg-gray-800 border border-gray-700 rounded-md"
          keyboardType="numeric"
          value={age?.toString()}
          onChangeText={(text) => {
            if (text.length > 2) return;

            if (text === '') {
              setAge(null);
              return;
            }

            if (isNaN(parseInt(text))) return;

            setAge(parseInt(text));
          }}
          textAlign="center"
        />
      </View>
    </View>
  );
}
