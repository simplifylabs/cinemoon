import { ScrollView, View } from 'react-native';
import AppText from '../text/AppText';
import { Type } from '../../types/general';
import Backdrop from '../images/Backdrop';
import { LinearGradient } from 'expo-linear-gradient';
import colors from 'tailwindcss/colors';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import MediaItem from '../media/MediaItem';

type Props = {
  type: Type | null;
  results: any[];
};

export default function FinderResults({ type, results }: Props) {
  return (
    <View className="flex flex-col items-center justify-center flex-1 mt-8 bg-background">
      <AppText className="text-3xl text-center text-white" weight="extra-bold">
        That's what we've found for you!
      </AppText>
      <ScrollView className="flex-1 w-full mt-4">
        <View className="flex flex-row flex-wrap items-center justify-center w-full">
          {results.map((result) => (
            <MediaItem media={result} key={result.id} type={type!} />
          ))}
        </View>
      </ScrollView>
    </View>
  );
}
