import { useSharedValue } from 'react-native-reanimated';

export const useScrollY = () => {
  const scrollY = useSharedValue(0);
  return scrollY;
};
