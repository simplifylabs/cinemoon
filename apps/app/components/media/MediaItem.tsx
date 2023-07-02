import { LinearGradient } from 'expo-linear-gradient';
import { Pressable, View } from 'react-native';
import Backdrop from '../images/Backdrop';
import AppText from '../text/AppText';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { styled } from 'nativewind';
import { useRouter } from 'expo-router';
import { Media, Type } from '../../types/general';

type Props = {
  style?: any;
  media: Media;
  type: Type;
};

function MediaItem({ style, media, type }: Props) {
  const { genres } = useTypedSelector((state) => state.genres);
  const router = useRouter();

  return (
    <Pressable onPress={() => router.push(`/media/${media.id}?type=${type}`)}>
      <View className="h-40 w-44" style={style}>
        <View className="h-40 m-2">
          <View
            className={`flex flex-col items-center justify-end flex-1 h-40 bg-gray-800  rounded-md relative`}
          >
            <View className="absolute w-full h-full rounded-md z-1">
              <LinearGradient
                colors={[
                  '#1f2128' + (20).toString(16),
                  '#1f2128' + (220).toString(16),
                  '#1f2128',
                ]}
                start={{ x: 1, y: 0 }}
                end={{ x: 1, y: 1 }}
                locations={[0, 0.7, 0.9]}
                style={{
                  flex: 1,
                  position: 'absolute',
                  width: '100%',
                  height: '100%',
                  borderRadius: 5,
                  zIndex: 3,
                }}
              />
              <Backdrop
                path={media.backdrop_path}
                size="w780"
                className="absolute w-full h-full rounded-md z-2"
              />
            </View>
            <View className="absolute z-20 right-2 top-2">
              <View
                className="w-[22px] h-[22px] flex flex-row items-center justify-center rounded-full"
                style={{
                  backgroundColor: hslToHex(
                    media.vote_average * 10 < 50
                      ? 50
                      : media.vote_average * 10 > 80
                      ? 80
                      : media.vote_average * 10,
                    76,
                    36
                  ),
                  opacity: 0.7,
                }}
              >
                <AppText
                  className="text-[11px] text-white"
                  weight="bold"
                  numberOfLines={1}
                  ellipsizeMode="tail"
                >
                  {Math.floor(media.vote_average * 10)}
                </AppText>
              </View>
            </View>
            <View className="relative z-10 flex flex-col w-full px-[8px] py-4">
              <View>
                <AppText
                  className="text-[14px] text-white"
                  weight="bold"
                  numberOfLines={1}
                  ellipsizeMode="tail"
                >
                  {media.title}
                </AppText>
              </View>
              <View className="flex flex-row space-x-1 mt-[2px] mb-[4px]">
                {media.genre_ids.slice(0, 2).map((genre: any) => (
                  <View
                    key={genre}
                    className="bg-gray-800 px-[4px] rounded-md py-[1px] opacity-70"
                  >
                    <AppText
                      className="text-[10px] text-gray-400"
                      weight="semi-bold"
                      numberOfLines={1}
                      ellipsizeMode="tail"
                    >
                      {genres[genre]}
                    </AppText>
                  </View>
                ))}
              </View>
            </View>
          </View>
        </View>
      </View>
    </Pressable>
  );
}

export default styled(MediaItem);

function hslToHex(h: number, s: number, l: number) {
  l /= 100;
  const a = (s * Math.min(l, 1 - l)) / 100;
  const f = (n: any) => {
    const k = (n + h / 30) % 12;
    const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
    return Math.round(255 * color)
      .toString(16)
      .padStart(2, '0'); // convert to Hex and prefix "0" if needed
  };
  return `#${f(0)}${f(8)}${f(4)}`;
}
