import React from 'react';
import { View, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

interface PlaceholderProps {
  type: string;
  style?: any;
}

export default function Placeholder({ type, style }: PlaceholderProps) {
  const getGradientColors = () => {
    const gradients: { [key: string]: string[] } = {
      pizza: ['#FF6B6B', '#FF8E8E'],
      burger: ['#FFA726', '#FFB74D'],
      sushi: ['#4FC3F7', '#81D4FA'],
      pasta: ['#FF7043', '#FF8A65'],
      salad: ['#66BB6A', '#81C784'],
      dessert: ['#AB47BC', '#BA68C8'],
      drink: ['#26A69A', '#4DB6AC'],
      coffee: ['#8D6E63', '#A1887F'],
      breakfast: ['#FFB74D', '#FFCC02'],
      lunch: ['#4CAF50', '#66BB6A'],
      dinner: ['#FF5722', '#FF7043'],
      food: ['#FF5722', '#FF7043'],
    };
    
    return gradients[type.toLowerCase()] || gradients.food;
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
