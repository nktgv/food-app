import React from 'react';
import { View, ActivityIndicator, StyleSheet, Image } from 'react-native';
import { useCustomFonts } from '../hooks/useFonts';
import { useTheme } from '../theme/ThemeProvider';

export default function SplashScreen() {
  const fontsLoaded = useCustomFonts();
  const theme = useTheme();

  if (!fontsLoaded) {
    return (
      <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
        <Image source={require('../../assets/LOGO.svg')} style={styles.logo} resizeMode="contain" />
        <ActivityIndicator size="large" color={theme.colors.primary} style={styles.loader} />
      </View>
    );
  }

  // This component is intended to be used conditionally. If fonts loaded, parent navigates.
  return null;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 140,
    height: 140,
  },
  loader: {
    marginTop: 24,
  },
});
