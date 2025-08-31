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
    return colors.gradients[tag as keyof typeof colors.gradients] || colors.gradients.food;
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
    <TouchableOpacity style={[styles.card, { backgroundColor: theme.colors.surface, shadowColor: theme.colors.gray300 }]} onPress={onPress} activeOpacity={0.8}>
      <View style={styles.imageContainer}>
        {getImageSource() ? (
          <Image source={getImageSource()!} style={styles.image} resizeMode="cover" />
        ) : (
          <Placeholder type={product.tags?.[0] || 'food'} style={styles.image} />
        )}
        <View style={styles.priceContainer}>
          <Text style={styles.price}>
            {product.base_price} {product.currency}
          </Text>
        </View>
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
            style={[styles.addButton, { backgroundColor: colors.primary }]}
            onPress={handleAddToCart}
            activeOpacity={0.8}
          >
            <Text style={[styles.addButtonText, { color: colors.textPrimary }]}>
              {product.base_price} ₽
            </Text>
            <Ionicons name="add" size={16} color={colors.textPrimary} />
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
    borderRadius: 12,
    marginBottom: 16,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
    borderWidth: 1,
    borderColor: colors.gray200,
  },
  imageContainer: {
    position: 'relative',
    height: 120,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    overflow: 'hidden',
    backgroundColor: colors.gray100,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  priceContainer: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: colors.background,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    shadowColor: colors.gray400,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  price: {
    color: colors.textPrimary,
    fontSize: 12,
    fontWeight: '600',
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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
    minHeight: 44,
    shadowColor: colors.primaryDark,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  addButtonText: {
    fontSize: 14,
    fontWeight: '600',
    marginRight: 4,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.gray100,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    minHeight: 44,
  },
  quantityButton: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  quantityText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.textPrimary,
    minWidth: 32,
    textAlign: 'center',
  },
});
