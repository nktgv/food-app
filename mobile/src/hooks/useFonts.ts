import { useFonts } from 'expo-font';

export const useCustomFonts = () => {
  const [fontsLoaded] = useFonts({
    'MartianGrotesk-Regular': require('../../assets/fonts/MartianGrotesk-Regular.ttf'),
    'MartianGrotesk-Medium': require('../../assets/fonts/MartianGrotesk-Medium.ttf'),
    'MartianGrotesk-Bold': require('../../assets/fonts/MartianGrotesk-Bold.ttf'),
    'MartianGrotesk-Light': require('../../assets/fonts/MartianGrotesk-Light.ttf'),
  });

  return fontsLoaded;
};
