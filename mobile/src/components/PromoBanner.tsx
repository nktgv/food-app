import React, { useState, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, ScrollView, Animated } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../theme/ThemeProvider';

const { width: screenWidth } = Dimensions.get('window');

interface PromoBannerProps {
  onPress?: () => void;
}

const promotions = [
  {
    id: '1',
    title: '🎁 Регистрация',
    subtitle: 'Cashback от 5% бонусами',
    description: 'При регистрации в приложении',
    colors: ['#FF8C42', '#FFB366'] as [string, string],
    icon: 'gift'
  },
  {
    id: '2',
    title: '⭐ У вас 1250 бонусов',
    subtitle: 'Давайте потратим их!',
    description: 'Используйте накопленные баллы',
    colors: ['#8B4513', '#A0522D'] as [string, string],
    icon: 'star'
  },
  {
    id: '3',
    title: '🔥 Горячие предложения',
    subtitle: 'Скидки до 30%',
    description: 'На популярные позиции',
    colors: ['#D32F2F', '#F44336'] as [string, string],
    icon: 'flame'
  }
];

export default function PromoBanner({ onPress }: PromoBannerProps) {
  const theme = useTheme();
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollViewRef = useRef<ScrollView>(null);

  const handleScroll = (event: any) => {
    const contentOffset = event.nativeEvent.contentOffset.x;
    const index = Math.round(contentOffset / screenWidth);
    setCurrentIndex(index);
  };

  const goToSlide = (index: number) => {
    scrollViewRef.current?.scrollTo({
      x: index * screenWidth,
      animated: true,
    });
  };

  return (
    <View style={styles.container}>
      <ScrollView
        ref={scrollViewRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        style={styles.scrollView}
        contentContainerStyle={styles.scrollViewContent}
      >
        {promotions.map((promo, index) => (
          <TouchableOpacity
            key={promo.id}
            style={styles.slide}
            onPress={onPress}
            activeOpacity={0.9}
          >
            <LinearGradient
              colors={promo.colors}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.gradient}
            >
              <View style={styles.content}>
                <View style={styles.textContainer}>
                  <Text style={styles.title}>{promo.title}</Text>
                  <Text style={styles.subtitle}>{promo.subtitle}</Text>
                  <Text style={styles.description}>{promo.description}</Text>
                </View>
                <View style={styles.iconContainer}>
                  <Ionicons name={promo.icon as any} size={32} color="#fff" />
                </View>
              </View>
            </LinearGradient>
          </TouchableOpacity>
        ))}
      </ScrollView>
      
      <View style={styles.indicators}>
        {promotions.map((_, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.indicator,
              currentIndex === index && styles.activeIndicator
            ]}
            onPress={() => goToSlide(index)}
          />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  scrollView: {
    flexGrow: 0,
  },
  scrollViewContent: {
    alignItems: 'center',
  },
  slide: {
    width: screenWidth - 32, // Account for screen padding
    height: 120,
    marginHorizontal: 4,
  },
  gradient: {
    flex: 1,
    borderRadius: 16,
    padding: 20,
  },
  content: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  textContainer: {
    flex: 1,
    marginRight: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 2,
  },
  description: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.9)',
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  indicators: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 16,
  },
  indicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#ddd',
    marginHorizontal: 4,
  },
  activeIndicator: {
    backgroundColor: '#FF8C42',
    width: 24,
  },
});
