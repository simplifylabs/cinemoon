import { MotiView } from 'moti';
import { styled } from 'nativewind';
import { View } from 'react-native';

type Props = {
  count: number;
  currentStep: number;
  style?: View['props']['style'];
};

function Stepper({ count, currentStep, style }: Props) {
  return (
    <View
      className="flex flex-row items-center justify-center space-x-2"
      style={style}
    >
      {Array.from({ length: count }).map((_, index) => {
        return (
          <MotiView
            key={index}
            className="h-3 bg-gray-700 rounded-full"
            animate={{
              width: currentStep === index ? 12 * 3 : 12,
            }}
            transition={{
              type: 'timing',
              duration: 100,
            }}
          />
        );
      })}
    </View>
  );
}

export default styled(Stepper);
