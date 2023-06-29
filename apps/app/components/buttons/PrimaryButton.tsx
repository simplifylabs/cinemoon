import { styled } from 'nativewind';
import { Pressable, TextProps, View } from 'react-native';
import AppText from '../text/AppText';
import { MotiView } from 'moti';
import { useState } from 'react';

interface Props extends TextProps {
  children: React.ReactNode;
  onClick?: () => void;
}

function PrimaryButton({ children, style, onClick, ...props }: Props) {
  const [isPressing, setIsPressing] = useState(false);

  return (
    <View style={style}>
      <Pressable
        onPress={() => {
          if (onClick) onClick();
        }}
        onPressIn={() => {
          setIsPressing(true);
        }}
        onPressOut={() => {
          setIsPressing(false);
        }}
      >
        <View className="relative h-14">
          <MotiView
            className="absolute flex flex-row items-center justify-center w-full h-12 bg-blue-500 rounded-lg"
            animate={{
              top: isPressing ? 8 : 0,
            }}
            transition={{
              type: 'timing',
              duration: 100,
            }}
          >
            <AppText weight="semi-bold" className="text-white">
              {children}
            </AppText>
          </MotiView>
          <View className="flex flex-row items-center justify-center w-full h-12 mt-2 rounded-lg bg-blue-500/20"></View>
        </View>
      </Pressable>
    </View>
  );
}

export default styled(PrimaryButton, {
  props: {
    style: true,
  },
});
