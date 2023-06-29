/* eslint-disable @typescript-eslint/ban-ts-comment */
import MaskedView from '@react-native-masked-view/masked-view';
import { LinearGradient } from 'expo-linear-gradient';
import AppText from './AppText';
// import tailwind colors
import colors from 'tailwindcss/colors';

type Props = {
  children: React.ReactNode;
};

export default function HeadlineGradient({ children }: Props) {
  return (
    <>
      {/* @ts-ignore */}
      <MaskedView
        maskElement={
          <AppText className="mt-1 text-3xl" weight="extra-bold">
            {children}
          </AppText>
        }
      >
        <LinearGradient
          colors={[colors.blue['500'], colors.sky['600']]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={{ flex: 1 }}
        >
          <AppText className="mt-1 text-3xl opacity-0" weight="extra-bold">
            {children}
          </AppText>
        </LinearGradient>
      </MaskedView>
    </>
  );
}
