import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import Placeholder from '../assets/images/placeholder';
import { colors } from '../theme/colors';
import { typography } from '../theme/typography';
import { useTheme } from '../theme/ThemeProvider';

const { width } = Dimensions.get('window');
const cardWidth = (width - 48) / 2; // 2 колонки с отступами

interface ProductCardProps {
  product: {
    id: string;
    name: string;
    description: string;
    media: string[];
    base_price: number;
    currency: string;
    tags: string[];
  };
  onPress: () => void;
  onAddToCart: () => void;
}

export default function ProductCard({ product, onPress, onAddToCart }: ProductCardProps) {
  const theme = useTheme();
  const getImageSource = () => {
    // Если есть медиа, используем первое изображение
    if (product.media && product.media.length > 0) {
      return { uri: product.media[0] };
    }
    
    // Иначе возвращаем null для использования заглушки
    return null;
  };

  const getGradientColors = (): [string, string] => {
    const tag = product.tags?.[0]?.toLowerCase() || 'food';
    const gradients: { [key: string]: [string, string] } = {
      pizza: ['#FF8C42', '#FFB366'], // Оранжевые цвета логотипа
      burger: ['#FFB366', '#FFCC80'], // Светло-оранжевые
      sushi: ['#26A69A', '#4DB6AC'], // Бирюзовый
      pasta: ['#FF8C42', '#FFB366'], // Основные оранжевые
      salad: ['#4CAF50', '#66BB6A'], // Зеленый
      dessert: ['#AB47BC', '#BA68C8'], // Фиолетовый
      drink: ['#26A69A', '#4DB6AC'], // Бирюзовый
      food: ['#FF8C42', '#FFB366'], // Основные оранжевые
    };
    
    return gradients[tag] || gradients.food;
  };

  return (
    <TouchableOpacity style={[styles.card, { backgroundColor: theme.colors.surface, shadowColor: theme.colors.gray900 }]} onPress={onPress} activeOpacity={0.8}>
      <View style={styles.imageContainer}>
        {getImageSource() ? (
          <Image source={getImageSource()!} style={styles.image} resizeMode="cover" />
        ) : (
          <Placeholder type={product.tags?.[0] || 'food'} style={styles.image} />
        )}
        <LinearGradient
          colors={getGradientColors()}
          style={styles.gradient}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        />
        <View style={styles.priceContainer}>
          <Text style={styles.price}>
            {product.base_price} {product.currency}
          </Text>
        </View>
        {product.tags && product.tags.length > 0 && (
          <View style={styles.tagContainer}>
            <Text style={styles.tag}>{product.tags[0]}</Text>
          </View>
        )}
      </View>
      
      <View style={styles.content}>
        <Text style={[styles.name, { color: theme.colors.textPrimary }]} numberOfLines={2}>
          {product.name}
        </Text>
        <Text style={[styles.description, { color: theme.colors.textSecondary }]} numberOfLines={2}>
          {product.description}
        </Text>
        
        <TouchableOpacity 
          style={styles.addButton}
          onPress={onAddToCart}
          activeOpacity={0.8}
        >
          <LinearGradient
            colors={getGradientColors()}
            style={styles.addButtonGradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
          >
            <Ionicons name="add" size={16} color={theme.colors.surface} />
            <Text style={[styles.addButtonText, { color: theme.colors.surface }]}>
              {product.base_price} {product.currency}
            </Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    width: cardWidth,
    borderRadius: 16,
    marginBottom: 16,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  imageContainer: {
    position: 'relative',
    height: 120,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  gradient: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    opacity: 0.3,
  },
  priceContainer: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  price: {
    color: colors.primary,
  },
  tagContainer: {
    position: 'absolute',
    bottom: 8,
    left: 8,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  tag: {
    color: colors.surface,
    textTransform: 'uppercase',
  },
  content: {
    padding: 12,
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
    lineHeight: 20,
  },
  description: {
    fontSize: 13,
    lineHeight: 16,
    opacity: 0.8,
  },
  addButton: {
    marginTop: 12,
    borderRadius: 8,
    overflow: 'hidden',
  },
  addButtonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  addButtonText: {
    marginLeft: 4,
    fontSize: 14,
    fontWeight: '600',
  },
});
