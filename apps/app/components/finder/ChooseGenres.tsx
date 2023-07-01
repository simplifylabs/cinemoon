import { TouchableOpacity, View } from 'react-native';
import AppText from '../text/AppText';
import { useEffect, useState } from 'react';
import { API } from '../../util/api';
import { Genre } from '../../types/general';

type Props = {
  type: 'MOVIE' | 'TV';
  onChoose: (genres: number[]) => void;
};

export default function ChooseGenres({ type, onChoose }: Props) {
  const [genres, setGenres] = useState<Genre[]>([]);
  const [selectedGenres, setSelectedGenres] = useState<number[]>([]);

  useEffect(() => {
    onChoose(selectedGenres);
  }, [onChoose, selectedGenres]);

  useEffect(() => {
    API.get('/v1/genres?type=' + type).then((res) => {
      setGenres(res.data.genres);
      setSelectedGenres([]);
    });
  }, [type]);

  return (
    <View className="flex flex-col items-center justify-center flex-1 bg-background">
      <AppText className="text-3xl text-center text-white" weight="extra-bold">
        What genre are you in the mood for?
      </AppText>
      <View className="flex flex-row flex-wrap items-center justify-center mt-10">
        {genres.map((genre) => (
          <View className="h-12 mx-1 my-1" key={genre.id}>
            <TouchableOpacity
              className="h-12"
              onPress={() => {
                if (selectedGenres.includes(genre.id)) {
                  setSelectedGenres(
                    selectedGenres.filter((g) => g !== genre.id)
                  );
                } else {
                  setSelectedGenres([...selectedGenres, genre.id]);
                }
              }}
            >
              <View
                className={`flex flex-col items-center justify-center flex-1 h-12 px-3 ${
                  selectedGenres.includes(genre.id)
                    ? 'bg-blue-500'
                    : 'bg-gray-800'
                } border border-gray-700 rounded-md`}
              >
                <AppText className="text-base text-white">{genre.name}</AppText>
              </View>
            </TouchableOpacity>
          </View>
        ))}
      </View>
    </View>
  );
}
