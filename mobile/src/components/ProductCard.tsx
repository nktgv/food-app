import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import Placeholder from '../assets/images/placeholder';
import { colors } from '../theme/colors';
import { typography } from '../theme/typography';
import { useTheme } from '../theme/ThemeProvider';
import { useCart } from '../context/CartContext';

const { width } = Dimensions.get('window');
const cardWidth = (width - 48) / 2; // 2 колонки с отступами

import { Product } from '../api/client';

interface ProductCardProps {
  product: Product;
  onPress: () => void;
  onAddToCart: () => void;
}

export default function ProductCard({ product, onPress, onAddToCart }: ProductCardProps) {
  const theme = useTheme();
  const { state, addItem, updateQuantity, getItemQuantity } = useCart();
  
  // Находим текущий товар в корзине
  const currentQuantity = getItemQuantity(product.id);

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

  const getProductWeight = () => {
    // Здесь можно добавить логику для получения веса продукта
    // Например, если у продукта есть поле 'weight'
    return product.weight || 0;
  };

  const handleAddToCart = () => {
    addItem(product, 1);
  };

  const handleIncreaseQuantity = () => {
    if (currentQuantity === 0) {
      addItem(product, 1);
    } else {
      const cartItem = state.items.find(item => item.product.id === product.id);
      if (cartItem) {
        updateQuantity(cartItem.id, currentQuantity + 1);
      }
    }
  };

  const handleDecreaseQuantity = () => {
    if (currentQuantity > 0) {
      const cartItem = state.items.find(item => item.product.id === product.id);
      if (cartItem) {
        updateQuantity(cartItem.id, currentQuantity - 1);
      }
    }
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
            <Text style={styles.tag}>{product.tags[0].toUpperCase()}</Text>
          </View>
        )}
      </View>
      
      <View style={styles.content}>
        <Text style={[styles.name, { color: theme.colors.textPrimary }]} numberOfLines={2}>
          {product.name}
        </Text>
        
        {/* Добавляем вес продукта */}
        <Text style={[styles.weight, { color: theme.colors.textSecondary }]}>
          {getProductWeight()} г
        </Text>
        
        <Text style={[styles.description, { color: theme.colors.textSecondary }]} numberOfLines={2}>
          {product.description}
        </Text>
        
        {currentQuantity === 0 ? (
          <TouchableOpacity 
            style={styles.addButton}
            onPress={handleAddToCart}
            activeOpacity={0.8}
          >
            <LinearGradient
              colors={getGradientColors()}
              style={styles.addButtonGradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
            >
                             <Text style={[styles.addButtonText, { color: colors.surface }]}>{product.base_price} ₽</Text>
              <Ionicons name="chevron-forward" size={16} color={theme.colors.surface} />
            </LinearGradient>
          </TouchableOpacity>
        ) : (
          <View style={styles.quantityContainer}>
            <TouchableOpacity 
              style={styles.quantityButton}
              onPress={handleDecreaseQuantity}
              activeOpacity={0.8}
            >
              <Ionicons name="remove" size={20} color={colors.primary} />
            </TouchableOpacity>
            
            <Text style={styles.quantityText}>{currentQuantity}</Text>
            
            <TouchableOpacity 
              style={styles.quantityButton}
              onPress={handleIncreaseQuantity}
              activeOpacity={0.8}
            >
              <Ionicons name="add" size={20} color={colors.primary} />
            </TouchableOpacity>
          </View>
        )}
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
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  imageContainer: {
    position: 'relative',
    height: 140,
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
    opacity: 0.4,
  },
  priceContainer: {
    position: 'absolute',
    top: 12,
    right: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  price: {
    color: colors.primary,
    fontSize: 14,
    fontWeight: '700',
  },
  tagContainer: {
    position: 'absolute',
    bottom: 12,
    left: 12,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 16,
  },
  tag: {
    color: colors.surface,
    fontSize: 12,
    fontWeight: '600',
    letterSpacing: 0.5,
  },
  content: {
    padding: 16,
    paddingTop: 12,
  },
  name: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 6,
    lineHeight: 20,
  },
  weight: {
    fontSize: 13,
    marginBottom: 6,
  },
  description: {
    fontSize: 13,
    lineHeight: 18,
    opacity: 0.7,
    marginBottom: 16,
  },
  addButton: {
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 3,
  },
  addButtonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 16,
    minHeight: 48,
  },
  addButtonText: {
    fontSize: 16,
    fontWeight: '700',
    flex: 1,
    textAlign: 'center',
  },
  arrowIcon: {
    marginLeft: 4,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.surface,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    minHeight: 48,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 3,
  },
  quantityButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  quantityText: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.primary,
    minWidth: 40,
    textAlign: 'center',
  },
});
