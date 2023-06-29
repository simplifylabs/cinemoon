import { styled } from 'nativewind';
import { Text, TextProps } from 'react-native';

interface Props extends TextProps {
  children: React.ReactNode;
  style?: TextProps['style'];
  weight?: 'black' | 'bold' | 'extra-bold' | 'medium' | 'regular' | 'semi-bold';
}

function AppText({ children, style, weight = 'regular', ...props }: Props) {
  return (
    <Text
      style={[
        { fontFamily: convertWeightToFontFamily(weight) },
        style ? style : undefined,
      ]}
      {...props}
    >
      {children}
    </Text>
  );
}

function convertWeightToFontFamily(
  weight: 'black' | 'bold' | 'extra-bold' | 'medium' | 'regular' | 'semi-bold'
) {
  if (weight === 'black') return 'Inter_900Black';
  if (weight === 'bold') return 'Inter_700Bold';
  if (weight === 'extra-bold') return 'Inter_800ExtraBold';
  if (weight === 'medium') return 'Inter_500Medium';
  if (weight === 'regular') return 'Inter_400Regular';
  if (weight === 'semi-bold') return 'Inter_600SemiBold';
  throw new Error(`Invalid weight: ${weight}`);
}

export default styled(AppText, {
  props: {
    style: true,
  },
});
