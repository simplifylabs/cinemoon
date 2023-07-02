import { ActivityIndicator, View } from 'react-native';
import { useEffect } from 'react';
import { useLocalSearchParams } from 'expo-router';
import { useDispatch } from 'react-redux';
import { RootDispatch } from '../../../store';
import { Type } from '../../../types/general';
import { useTypedSelector } from '../../../hooks/useTypedSelector';
import Backdrop from '../../../components/images/Backdrop';
import { LinearGradient } from 'expo-linear-gradient';
import Poster from '../../../components/images/Poster';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import AppText from '../../../components/text/AppText';
import colors from 'tailwindcss/colors';

export default function OnBoarding() {
  const params = useLocalSearchParams();
  const dispatch = useDispatch<RootDispatch>();
  const id = parseInt(params.id as string);
  const type = params.type as Type;
  const media = useTypedSelector((state) => state.media.medias[type][id]);
  const insets = useSafeAreaInsets();

  useEffect(() => {
    dispatch.media.fetchMedia({
      mediaId: parseInt(params.id as string),
      type: params.type as Type,
    });
  }, [dispatch.media, params.id, params.type]);

  if (!media) return null;

  return (
    <View className="bg-background flex-[1]">
      {media.state === 'LOADING' && (
        <View className="flex-[1] flex flex-col items-center justify-center">
          <ActivityIndicator color="white" size="large" />
        </View>
      )}
      {media.state === 'LOADED' && (
        <View className="flex-[1]">
          <View className="relative">
            <View
              style={{
                paddingTop: insets.top + 20,
              }}
              className="relative z-10 flex flex-col px-5"
            >
              <View className="flex flex-row items-center space-x-6 mb-7">
                <View>
                  <Poster
                    path={media.data.poster_path}
                    size="w185"
                    className="w-28 aspect-[9/16] rounded-md"
                  />
                </View>
                <View className="flex flex-col flex-1">
                  <View className="flex flex-row mb-3 space-x-2">
                    {media.data.popularity > 1000 && (
                      <View className="flex flex-row space-x-2">
                        <AppText
                          className="text-[12px] text-blue-500 uppercase"
                          weight="bold"
                        >
                          Popular
                        </AppText>
                        <View className="h-full w-[2px] rounded-full bg-gray-700"></View>
                      </View>
                    )}
                    {media.data.is_adult && (
                      <View className="flex flex-row space-x-2">
                        <AppText
                          className="text-[12px] text-gray-400 uppercase"
                          weight="bold"
                        >
                          18+
                        </AppText>
                        <View className="h-full w-[2px] rounded-full bg-gray-700"></View>
                      </View>
                    )}
                    <AppText
                      weight="medium"
                      className="text-[12px] text-gray-400"
                    >
                      {media.data.release_date?.split('-')[0] ||
                        media.data.first_air_date?.split('-')[0]}
                    </AppText>
                  </View>

                  <AppText
                    weight="extra-bold"
                    className="text-2xl text-white"
                    selectable
                    selectionColor={colors.blue[700]}
                  >
                    {media.data.title || media.data.name}
                  </AppText>
                </View>
              </View>
              <View>
                <AppText
                  className="leading-[19px] text-[12px] text-gray-400"
                  selectable
                  selectionColor={colors.blue[700]}
                >
                  {media.data.overview}
                </AppText>
              </View>
            </View>
            <Backdrop
              path={media.data.backdrop_path}
              size="w780"
              className="absolute top-0 left-0 w-full h-80 rounded-b-md"
            />
            <LinearGradient
              colors={[
                '#1f2128' + (190).toString(16),
                '#1f2128' + (150).toString(16),
                '#1f2128',
              ]}
              start={{ x: 1, y: 0 }}
              end={{ x: 1, y: 1 }}
              locations={[0, 0.7, 1]}
              style={{
                flex: 1,
                position: 'absolute',
                width: '100%',
                height: 320,
                borderBottomLeftRadius: 5,
                borderBottomRightRadius: 5,

                zIndex: 3,
              }}
            />
          </View>
        </View>
      )}
    </View>
  );
}
