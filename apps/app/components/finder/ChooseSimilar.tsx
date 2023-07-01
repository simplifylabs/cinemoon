import {
  FlatList,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from 'react-native';
import AppText from '../text/AppText';
import { Type } from '../../types/general';
import { TextInput } from 'react-native-gesture-handler';
import { MagnifyingGlassIcon } from 'react-native-heroicons/solid';
import { useEffect, useState } from 'react';
import { API } from '../../util/api';
import Poster from '../images/Poster';

type Props = {
  onChoose: (similar: number[]) => void;
  type: Type | null;
};

type Item = {
  id: number;
  name: string;
  title: string;
  poster_path: string;
};

export default function ChooseSimilar({ onChoose, type }: Props) {
  const [search, setSearch] = useState<string>('');
  const [results, setResults] = useState<Item[]>([]);
  const [selected, setSelected] = useState<number[]>([]);

  useEffect(() => {
    onChoose(selected);
  }, [onChoose, selected]);

  useEffect(() => {
    const timeout = setTimeout(async () => {
      if (search.length < 3) return;
      const res = await API.get(
        '/v1/search?type=' + type + '&query=' + encodeURIComponent(search)
      );
      setResults(res.data.results);
    }, 500);
    return () => clearTimeout(timeout);
  }, [search, type]);

  return (
    <View className="flex flex-col items-center justify-start flex-1 my-10 bg-background">
      <AppText className="text-3xl text-center text-white" weight="extra-bold">
        {type === 'MOVIE'
          ? 'Are you interested in watching movies similar to specific films?'
          : 'Are you interested in watching series similar to specific series?'}
      </AppText>
      <View className="flex flex-col flex-1 w-full mt-6">
        {selected.length > 0 && (
          <View className="flex flex-row items-center mb-2 space-x-2">
            <View>
              <AppText className="text-white">
                {selected.length} {type === 'MOVIE' ? 'movies' : 'tv shows'}{' '}
                selected
              </AppText>
            </View>
            <View>
              <TouchableOpacity
                onPress={() => {
                  setSelected([]);
                }}
              >
                <AppText className="text-blue-500">Reset</AppText>
              </TouchableOpacity>
            </View>
          </View>
        )}
        <View className="relative w-full mb-4">
          <TextInput
            className="h-12 pl-12 pr-3 text-white bg-gray-800 border border-gray-700 rounded-md"
            placeholder="Search..."
            placeholderTextColor={'#9CA3AF'}
            keyboardType="default"
            returnKeyType="search"
            value={search}
            onChangeText={(text) => {
              setSearch(text);
            }}
          />
          <View className="absolute top-0 flex items-center justify-center w-10 h-full left-2">
            <View className="w-6 h-6">
              <MagnifyingGlassIcon width={22} height={22} fill="#9CA3AF" />
            </View>
          </View>
        </View>
        <View className="flex-1">
          <FlatList
            className="flex-1"
            data={results}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() => {
                  if (selected.includes(item.id)) {
                    setSelected(selected.filter((id) => id !== item.id));
                  } else {
                    setSelected([...selected, item.id]);
                  }
                }}
              >
                <View
                  className={`flex flex-row items-center h-12 px-2 my-1 space-x-4 ${
                    selected.includes(item.id) ? 'bg-blue-500' : 'bg-gray-800'
                  } border border-gray-700 rounded-md`}
                >
                  <View>
                    <Poster
                      path={item.poster_path}
                      size="w92"
                      className="rounded-md w-9 h-9"
                    />
                  </View>
                  <View className="flex-1">
                    <AppText
                      className="text-white"
                      weight="bold"
                      ellipsizeMode="tail"
                    >
                      {type === 'MOVIE' ? item.title : item.name}
                    </AppText>
                  </View>
                </View>
              </TouchableOpacity>
            )}
            keyExtractor={(item) => item.id.toString()}
          />
        </View>
      </View>
    </View>
  );
}
