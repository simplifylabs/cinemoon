import { styled } from 'nativewind';
import { Image } from 'react-native';

type Props = {
  path: string;
  size?: 'w92' | 'w154' | 'w185' | 'w342' | 'w500' | 'w780' | 'original';
  style?: any;
};

function Poster({ path, size = 'original', style }: Props) {
  return (
    <Image
      source={{ uri: `https://image.tmdb.org/t/p/${size}${path}` }}
      style={style}
    />
  );
}

export default styled(Poster);
