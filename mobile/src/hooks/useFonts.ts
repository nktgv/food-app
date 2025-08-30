import { useFonts } from 'expo-font';
import React from 'react';
import { Text, TextInput } from 'react-native';

export const useCustomFonts = () => {
  const [fontsLoaded] = useFonts({
    'Unbounded-Regular': require('../../assets/fonts/Unbounded-Regular.ttf'),
    'Unbounded-Medium': require('../../assets/fonts/Unbounded-Medium.ttf'),
    'Unbounded-SemiBold': require('../../assets/fonts/Unbounded-SemiBold.ttf'),
    'Unbounded-Bold': require('../../assets/fonts/Unbounded-Bold.ttf'),
    'Unbounded-Light': require('../../assets/fonts/Unbounded-Light.ttf'),
  });

  React.useEffect(() => {
    if (fontsLoaded) {
      // Apply globally to Text and TextInput
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      if (Text?.defaultProps == null) Text.defaultProps = {};
      // @ts-ignore
      Text.defaultProps.style = [{ fontFamily: 'Unbounded-Regular' }, Text.defaultProps.style];

      // @ts-ignore
      if (TextInput?.defaultProps == null) TextInput.defaultProps = {};
      // @ts-ignore
      TextInput.defaultProps.style = [{ fontFamily: 'Unbounded-Regular' }, TextInput.defaultProps.style];
    }
  }, [fontsLoaded]);

  return fontsLoaded;
};
