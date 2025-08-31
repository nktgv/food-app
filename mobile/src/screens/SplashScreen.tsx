import React from 'react';
import { View, ActivityIndicator, StyleSheet, Image } from 'react-native';
import { useTheme } from '../theme/ThemeProvider';

export default function SplashScreen() {
  const theme = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Image source={require('../../assets/LOGO.png')} style={styles.logo} resizeMode="contain" />
      <ActivityIndicator size="large" color={theme.colors.primary} style={styles.loader} />
    </View>
  );
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
