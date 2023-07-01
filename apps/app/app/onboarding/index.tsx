import HeadlineGradient from '../../components/text/HeadlineGradient';
import AppText from '../../components/text/AppText';
import { BackHandler, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import PrimaryButton from '../../components/buttons/PrimaryButton';
import TMDBAttribution from '../../components/attributions/TMDB';
import Stepper from '../../components/general/Stepper';
import { useEffect, useRef, useState } from 'react';
import PagerView from 'react-native-pager-view';
import ChooseStreamingPlatform from '../../components/onboarding/ChooseStreamingPlatform';
import ChooseAge from '../../components/onboarding/ChooseAge';
import ChooseLanguage from '../../components/onboarding/ChooseLanguage';
import { useRouter } from 'expo-router';
import { useTypedSelector } from '../../hooks/useTypedSelector';

export default function OnBoarding() {
  const [currentStep, setCurrentStep] = useState(0);
  const pagerRef = useRef<PagerView>(null);
  const router = useRouter();

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
        <View>
          <Stepper count={3} currentStep={currentStep} />
        </View>
        <PagerView
          className="flex-1"
          scrollEnabled={false}
          layoutDirection="ltr"
          ref={pagerRef}
          initialPage={0}
        >
          <View className="flex-1" key="1">
            <ChooseStreamingPlatform />
          </View>
          <View className="flex-1" key="2">
            <ChooseAge />
          </View>
          <View className="flex-1" key="3">
            <ChooseLanguage />
          </View>
        </PagerView>
        <View>
          <PrimaryButton
            onClick={() => {
              if (currentStep === 2) {
                router.replace('/home');
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
      </SafeAreaView>
    </View>
  );
}
