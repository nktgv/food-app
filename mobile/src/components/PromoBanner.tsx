import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, ScrollView } from 'react-native';
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
    title: 'БЕСПЛАТНАЯ ДОСТАВКА',
    subtitle: 'При заказе от 1000 ₽',
    colors: ['#FF8C42', '#FFB366'] as [string, string],
    icon: 'bicycle',
    image: '🚚'
  },
  {
    id: '2',
    title: 'СЕКРЕТНЫЕ ПРОМОКОДЫ В ТГ',
    subtitle: 'Скидки до 50%',
    colors: ['#FF8C42', '#FFB366'] as [string, string],
    icon: 'paper-plane',
    image: '📱'
  },
  {
    id: '3',
    title: 'РОЛЛЫ В ТОРТИЛЬЕ',
    subtitle: 'от 160 ₽',
    colors: ['#4CAF50', '#66BB6A'] as [string, string],
    icon: 'restaurant',
    image: '🌯'
  }
];

export default function PromoBanner({ onPress }: PromoBannerProps) {
  const theme = useTheme();

  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
        style={styles.scrollView}
      >
        {promotions.map((promo) => (
          <TouchableOpacity
            key={promo.id}
            style={styles.promoCard}
            onPress={onPress}
            activeOpacity={0.9}
          >
            <LinearGradient
              colors={promo.colors}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.gradient}
            >
              <View style={styles.cardContent}>
                <View style={styles.textSection}>
                  <Text style={styles.title}>{promo.title}</Text>
                  <Text style={styles.subtitle}>{promo.subtitle}</Text>
                </View>
                <View style={styles.iconSection}>
                  <Ionicons name={promo.icon as any} size={32} color="#fff" />
                </View>
              </View>
            </LinearGradient>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 24,
    marginBottom: 30,
    zIndex: 1,
  },
  scrollView: {
    height: 100,
  },
  scrollContent: {
    paddingHorizontal: 16,
  },
  promoCard: {
    width: screenWidth - 80, // Одна карточка на экран с отступами
    height: 100,
    marginRight: 16,
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 2,
  },
  gradient: {
    flex: 1,
    padding: 16,
  },
  cardContent: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  textSection: {
    flex: 1,
    marginRight: 16,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 6,
    lineHeight: 20,
  },
  subtitle: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.95)',
    lineHeight: 18,
    fontWeight: '500',
  },
  iconSection: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
