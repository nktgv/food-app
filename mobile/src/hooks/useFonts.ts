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
      const mapWeightToFamily = (style: any) => {
        if (!style) return style;
        const weight = style.fontWeight ?? null;
        if (!weight) return style;

        const weightKey = String(weight);
        let family = 'Unbounded-Regular';
        switch (weightKey) {
          case 'bold':
          case '700':
          case '800':
            family = 'Unbounded-Bold';
            break;
          case '600':
          case 'semiBold':
            family = 'Unbounded-SemiBold';
            break;
          case '500':
          case 'medium':
            family = 'Unbounded-Medium';
            break;
          case '300':
          case 'light':
            family = 'Unbounded-Light';
            break;
          default:
            family = 'Unbounded-Regular';
        }
        const { fontWeight, ...rest } = style;
        return { ...rest, fontFamily: family };
      };

      const patchRender = (Component: any) => {
        if (Component.__patched_for_unbounded) return;
        const oldRender = Component.render;
        Component.render = function (...args: any[]) {
          const origin = oldRender.apply(this, args);
          const originStyle = origin.props.style;
          let newStyle;
          if (Array.isArray(originStyle)) {
            newStyle = originStyle.map(mapWeightToFamily);
          } else {
            newStyle = mapWeightToFamily(originStyle);
          }
          return React.cloneElement(origin, { style: newStyle });
        };
        Component.__patched_for_unbounded = true;
      };

      patchRender(Text);
      patchRender(TextInput);

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
