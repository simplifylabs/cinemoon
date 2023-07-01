import AppText from '../../components/text/AppText';
import { BackHandler, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import PrimaryButton from '../../components/buttons/PrimaryButton';
import TMDBAttribution from '../../components/attributions/TMDB';
import Stepper from '../../components/general/Stepper';
import { useEffect, useRef, useState } from 'react';
import PagerView from 'react-native-pager-view';
import { useRouter } from 'expo-router';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { XMarkIcon } from 'react-native-heroicons/solid';
import { MagnifyingGlassCircleIcon } from 'react-native-heroicons/outline';
import colors from 'tailwindcss/colors';
import ChooseType from '../../components/finder/ChooseType';
import ChooseGenres from '../../components/finder/ChooseGenres';
import { Genre, Type } from '../../types/general';
import ChooseSimilar from '../../components/finder/ChooseSimilar';
import { API } from '../../util/api';
import FinderResults from '../../components/finder/Results';

export default function OnBoarding() {
  const [currentStep, setCurrentStep] = useState(0);
  const pagerRef = useRef<PagerView>(null);
  const router = useRouter();

  // State
  const [type, setType] = useState<Type | null>(null);
  const [genres, setGenres] = useState<number[]>([]);
  const [similar, setSimilar] = useState<number[]>([]);
  const [results, setResults] = useState<any[]>([]);

  // BackHandler
  useEffect(() => {
    const backAction = () => {
      if (currentStep === 0) return false;

      pagerRef.current?.setPage(currentStep - 1);
      setCurrentStep(currentStep - 1);
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction
    );

    return () => backHandler.remove();
  }, [currentStep]);

  return (
    <View className="bg-background flex-[1]">
      <SafeAreaView className="flex-[1] flex flex-col px-5 py-5 space-between">
        <View className="flex flex-row items-center justify-between">
          <View className="flex flex-row items-center space-x-2">
            <MagnifyingGlassCircleIcon
              width={32}
              height={32}
              stroke={colors.blue[500]}
            />
            <AppText className="text-base font-bold text-blue-500">
              Movie Finder
            </AppText>
          </View>
          <TouchableOpacity
            onPress={() => {
              router.back();
            }}
          >
            <View>
              <XMarkIcon width={30} height={30} fill={'#fff'} />
            </View>
          </TouchableOpacity>
        </View>
        <PagerView
          className="flex-1"
          scrollEnabled={false}
          layoutDirection="ltr"
          ref={pagerRef}
          initialPage={0}
        >
          <View className="flex-1" key="1">
            <ChooseType
              onChoose={(t) => {
                setType(t);
              }}
            />
          </View>
          <View className="flex-1" key="2">
            {type && (
              <ChooseGenres
                type={type}
                onChoose={(genres) => {
                  setGenres(genres);
                }}
              />
            )}
          </View>
          <View className="flex-1" key="3">
            <ChooseSimilar
              type={type}
              onChoose={(similar) => {
                setSimilar(similar);
              }}
            />
          </View>
          <View className="flex-1" key="4">
            <FinderResults type={type} results={results} />
          </View>
        </PagerView>
        {currentStep < 3 ? (
          <View>
            <View className="mb-5">
              <Stepper count={4} currentStep={currentStep} />
            </View>

            <PrimaryButton
              onClick={async () => {
                if (currentStep === 2) {
                  // Fetch results
                  const r = await API.post(`/v1/finder`, {
                    type,
                    genres,
                    similar,
                  });
                  setResults(r.data.results);
                  setCurrentStep(currentStep + 1);
                  pagerRef.current?.setPage(currentStep + 1);
                  return;
                }

                setCurrentStep(currentStep + 1);
                pagerRef.current?.setPage(currentStep + 1);
              }}
            >
              Next
            </PrimaryButton>

            <View className="mt-6">
              <TMDBAttribution />
            </View>
          </View>
        ) : (
          <View className="mt-6">
            <TMDBAttribution />
          </View>
        )}
      </SafeAreaView>
    </View>
  );
}
