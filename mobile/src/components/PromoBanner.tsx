import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../theme/ThemeProvider';

const { width } = Dimensions.get('window');

interface PromoBannerProps {
  onPress?: () => void;
}

export default function PromoBanner({ onPress }: PromoBannerProps) {
  const theme = useTheme();

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.banner}
        onPress={onPress}
        activeOpacity={0.9}
      >
        <LinearGradient
          colors={['#FF6B35', '#F7931E']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.gradient}
        >
          <View style={styles.content}>
            <View style={styles.textContainer}>
              <Text style={styles.title}>🔥 Горячие акции!</Text>
              <Text style={styles.subtitle}>Скидки до 30% на шаурму</Text>
              <Text style={styles.description}>Только сегодня • Успей заказать</Text>
            </View>
            <View style={styles.iconContainer}>
              <Ionicons name="chevron-forward" size={24} color="#fff" />
            </View>
          </View>
        </LinearGradient>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.smallBanner, styles.firstSmallBanner]}
        onPress={onPress}
        activeOpacity={0.9}
      >
        <LinearGradient
          colors={['#4ECDC4', '#44A08D']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.smallGradient}
        >
          <View style={styles.smallContent}>
            <Text style={styles.smallTitle}>💳 Cashback 10%</Text>
            <Text style={styles.smallSubtitle}>При оплате картой</Text>
          </View>
        </LinearGradient>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.smallBanner}
        onPress={onPress}
        activeOpacity={0.9}
      >
        <LinearGradient
          colors={['#667eea', '#764ba2']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.smallGradient}
        >
          <View style={styles.smallContent}>
            <Text style={styles.smallTitle}>🚚 Доставка 0₽</Text>
            <Text style={styles.smallSubtitle}>От 999 рублей</Text>
          </View>
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  banner: {
    width: '100%',
    height: 100,
    borderRadius: 16,
    marginBottom: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 6,
  },
  gradient: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: '800',
    color: '#fff',
    marginBottom: 4,
    letterSpacing: 0.5,
  },
  subtitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 2,
    opacity: 0.95,
  },
  description: {
    fontSize: 13,
    color: '#fff',
    opacity: 0.8,
    fontWeight: '500',
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  smallBanner: {
    width: (width - 44) / 2, // учитываем отступы и gap между баннерами
    height: 80,
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  firstSmallBanner: {
    marginRight: 12,
  },
  smallGradient: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  smallContent: {
    alignItems: 'center',
  },
  smallTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#fff',
    marginBottom: 2,
    textAlign: 'center',
  },
  smallSubtitle: {
    fontSize: 11,
    color: '#fff',
    opacity: 0.9,
    fontWeight: '500',
    textAlign: 'center',
  },
});
