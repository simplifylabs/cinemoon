import { TouchableOpacity, View } from 'react-native';
import AppText from '../text/AppText';
import { useEffect, useState } from 'react';
import { Type } from '../../types/general';

type Props = {
  onChoose: (type: Type | null) => void;
};

export default function ChooseType({ onChoose }: Props) {
  const [selected, setSelected] = useState<Type | null>(null);

  useEffect(() => {
    onChoose(selected);
  }, [onChoose, selected]);

  return (
    <View className="flex flex-col items-center justify-center flex-1 bg-background">
      <AppText className="text-3xl text-center text-white" weight="extra-bold">
        Would you like to watch a move or a serie?
      </AppText>
      <View className="flex flex-row mt-10 space-x-2">
        <TouchableOpacity
          onPress={() => {
            setSelected('MOVIE');
          }}
          className="flex-1 h-24"
        >
          <View
            className={`flex flex-col items-center justify-center flex-1 h-24 ${
              selected === 'MOVIE' ? 'bg-blue-500' : 'bg-gray-800'
            } border border-gray-700 rounded-md`}
          >
            <AppText className="text-xl text-white">Movie</AppText>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setSelected('TV');
          }}
          className="flex-1 h-24"
        >
          <View
            className={`flex flex-col items-center justify-center flex-1 h-24 ${
              selected === 'TV' ? 'bg-blue-500' : 'bg-gray-800'
            } border border-gray-700 rounded-md`}
          >
            <AppText className="text-xl text-white">TV Show</AppText>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}
