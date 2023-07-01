import { styled } from 'nativewind';
import { Image } from 'react-native';

type Props = {
  path: string;
  size?: 'w300' | 'w780' | 'w1280' | 'original';
  style?: any;
};

function Backdrop({ path, size = 'original', style }: Props) {
  return (
    <Image
      source={{ uri: `https://image.tmdb.org/t/p/${size}${path}` }}
      style={style}
    />
  );
}

export default styled(Backdrop);
