import { ScrollView, View } from 'react-native';
import AppText from '../text/AppText';
import { Type } from '../../types/general';
import Backdrop from '../images/Backdrop';
import { LinearGradient } from 'expo-linear-gradient';
import colors from 'tailwindcss/colors';
import { useTypedSelector } from '../../hooks/useTypedSelector';

type Props = {
  type: Type | null;
  results: any[];
};

export default function FinderResults({ type, results }: Props) {
  const { genres } = useTypedSelector((state) => state.genres);

  return (
    <View className="flex flex-col items-center justify-center flex-1 mt-8 bg-background">
      <AppText className="text-3xl text-center text-white" weight="extra-bold">
        That’s what we’ve found for you!
      </AppText>
      <ScrollView className="flex-1 w-full mt-4">
        <View className="flex flex-row flex-wrap items-center justify-center w-full">
          {results.map((result) => (
            <View className="h-40 w-44" key={result.id}>
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
                      path={result.backdrop_path}
                      size="w780"
                      className="absolute w-full h-full rounded-md z-2"
                    />
                  </View>
                  <View className="absolute z-20 right-2 top-2">
                    <View
                      className="w-[22px] h-[22px] flex flex-row items-center justify-center rounded-full"
                      style={{
                        backgroundColor: hslToHex(
                          result.vote_average * 10 < 50
                            ? 50
                            : result.vote_average * 10 > 80
                            ? 80
                            : result.vote_average * 10,
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
                        {Math.floor(result.vote_average * 10)}
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
                        {result.title}
                      </AppText>
                    </View>
                    <View className="flex flex-row space-x-1 mt-[2px] mb-[4px]">
                      {result.genre_ids.slice(0, 2).map((genre: any) => (
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
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

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
