import React from 'react';
import { View, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useTheme } from '../../theme/ThemeProvider';

interface PlaceholderProps {
  type: string;
  style?: any;
}

export default function Placeholder({ type, style }: PlaceholderProps) {
  const theme = useTheme();
  
  const getGradientColors = () => {
    return theme.colors.gradients[type.toLowerCase()] || theme.colors.gradients.food;
  };

  return (
    <View style={[styles.container, style]}>
      <LinearGradient
        colors={getGradientColors()}
        style={styles.gradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    borderRadius: 8,
    overflow: 'hidden',
  },
  gradient: {
    flex: 1,
  },
});
