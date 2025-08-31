import React, { useState } from 'react';
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
  Dimensions,
  SafeAreaView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Product } from '../api/client';
import { colors } from '../theme/colors';
import { fontFamily } from '../theme/typography';
import { useTheme } from '../theme/ThemeProvider';
import { useCart } from '../context/CartContext';
import Placeholder from '../assets/images/placeholder';

const { width } = Dimensions.get('window');

interface ProductModalProps {
  product: Product | null;
  visible: boolean;
  onClose: () => void;
}

export default function ProductModal({ product, visible, onClose }: ProductModalProps) {
  const theme = useTheme();
  const { addItem, getItemQuantity, updateQuantity, state } = useCart();
  const [quantity, setQuantity] = useState(1);

  if (!product) return null;

  const currentQuantity = getItemQuantity(product.id);

  const handleAddToCart = () => {
    if (quantity > 0) {
      addItem(product, quantity);
      onClose();
    }
  };

  const handleQuantityChange = (newQuantity: number) => {
    setQuantity(Math.max(1, newQuantity));
  };

  const getImageSource = () => {
    if (product.media && product.media.length > 0) {
      return { uri: product.media[0] };
    }
    return null;
  };

  const getProductWeight = () => {
    return product.weight || 450;
  };

  const getTotalPrice = () => {
    return product.base_price * quantity;
  };

  return (
    <Modal
      animationType="slide"
      transparent={false}
      visible={visible}
      onRequestClose={onClose}
      statusBarTranslucent
    >
      <SafeAreaView style={styles.container}>
        {/* Header with close button */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Ionicons name="arrow-back" size={24} color={colors.textPrimary} />
          </TouchableOpacity>
        </View>

        <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollView}>
          {/* Product Image */}
          <View style={styles.imageContainer}>
            {getImageSource() ? (
              <Image source={getImageSource()!} style={styles.image} resizeMode="cover" />
            ) : (
              <Placeholder type={product.tags?.[0] || 'food'} style={styles.image} />
            )}
          </View>

          {/* Product Details */}
          <View style={styles.content}>
            <Text style={styles.title}>{product.name}</Text>
            <Text style={styles.weight}>{getProductWeight()} г</Text>
            <Text style={styles.description}>{product.description}</Text>

            {/* Nutritional info placeholder */}
            <View style={styles.nutritionContainer}>
              <Text style={styles.nutritionTitle}>Добавки к шаурме</Text>
              <Text style={styles.nutritionSubtitle}>кетчуп +25 ₽</Text>
              
              <View style={styles.nutritionGrid}>
                <View style={styles.nutritionItem}>
                  <Text style={styles.nutritionValue}>50</Text>
                  <Text style={styles.nutritionLabel}>белки</Text>
                </View>
                <View style={styles.nutritionItem}>
                  <Text style={styles.nutritionValue}>50</Text>
                  <Text style={styles.nutritionLabel}>жиры</Text>
                </View>
                <View style={styles.nutritionItem}>
                  <Text style={styles.nutritionValue}>50</Text>
                  <Text style={styles.nutritionLabel}>калории</Text>
                </View>
                <View style={styles.nutritionItem}>
                  <Text style={styles.nutritionValue}>50</Text>
                  <Text style={styles.nutritionLabel}>углеводы</Text>
                </View>
              </View>
            </View>

            {/* Ingredients toggle placeholder */}
            <TouchableOpacity style={styles.ingredientsToggle}>
              <Text style={styles.ingredientsText}>Комментарии к заказу</Text>
              <Ionicons name="chevron-down" size={20} color={colors.textSecondary} />
            </TouchableOpacity>

            {/* Current cart info */}
            {currentQuantity > 0 && (
              <View style={styles.cartInfo}>
                <Ionicons name="basket-outline" size={16} color={colors.primary} />
                <Text style={styles.cartInfoText}>
                  В корзине: {currentQuantity} шт.
                </Text>
              </View>
            )}
          </View>
        </ScrollView>

        {/* Bottom actions */}
        <View style={styles.bottomContainer}>
          {/* Quantity controls */}
          <View style={styles.quantityRow}>
            <TouchableOpacity 
              style={[styles.quantityButton, { opacity: quantity <= 1 ? 0.5 : 1 }]}
              onPress={() => handleQuantityChange(quantity - 1)}
              disabled={quantity <= 1}
            >
              <Text style={styles.quantityButtonText}>-</Text>
            </TouchableOpacity>
            
            <Text style={styles.quantityDisplay}>
              {quantity}x {product.base_price} ₽
            </Text>
            
            <TouchableOpacity 
              style={styles.quantityButton}
              onPress={() => handleQuantityChange(quantity + 1)}
            >
              <Text style={styles.quantityButtonText}>+</Text>
            </TouchableOpacity>
          </View>

          {/* Add to cart button */}
          <TouchableOpacity 
            style={[styles.addToCartButton, { backgroundColor: colors.primary }]}
            onPress={handleAddToCart}
          >
            <Text style={styles.addToCartText}>{getTotalPrice()} ₽</Text>
            <Ionicons name="add" size={20} color={colors.textPrimary} />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.gray200,
  },
  closeButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.gray100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scrollView: {
    flex: 1,
  },
  imageContainer: {
    height: 250,
    backgroundColor: colors.gray100,
    marginHorizontal: 16,
    marginVertical: 16,
    borderRadius: 12,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  content: {
    padding: 16,
  },
  title: {
    fontSize: 22,
    fontFamily: fontFamily.bold,
    color: colors.textPrimary,
    marginBottom: 8,
  },
  weight: {
    fontSize: 14,
    fontFamily: fontFamily.medium,
    color: colors.textSecondary,
    marginBottom: 12,
  },
  description: {
    fontSize: 16,
    fontFamily: fontFamily.regular,
    color: colors.textSecondary,
    lineHeight: 24,
    marginBottom: 24,
  },
  nutritionContainer: {
    marginBottom: 24,
  },
  nutritionTitle: {
    fontSize: 16,
    fontFamily: fontFamily.semiBold,
    color: colors.textPrimary,
    marginBottom: 8,
  },
  nutritionSubtitle: {
    fontSize: 14,
    fontFamily: fontFamily.regular,
    color: colors.textSecondary,
    marginBottom: 16,
  },
  nutritionGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  nutritionItem: {
    alignItems: 'center',
    flex: 1,
  },
  nutritionValue: {
    fontSize: 16,
    fontFamily: fontFamily.bold,
    color: colors.textPrimary,
    marginBottom: 4,
  },
  nutritionLabel: {
    fontSize: 12,
    fontFamily: fontFamily.regular,
    color: colors.textSecondary,
  },
  ingredientsToggle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: colors.gray200,
  },
  ingredientsText: {
    fontSize: 16,
    fontFamily: fontFamily.medium,
    color: colors.textPrimary,
  },
  cartInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.gray100,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    marginTop: 16,
  },
  cartInfoText: {
    fontSize: 14,
    fontFamily: fontFamily.medium,
    color: colors.textPrimary,
    marginLeft: 8,
  },
  bottomContainer: {
    padding: 16,
    backgroundColor: colors.surface,
    borderTopWidth: 1,
    borderTopColor: colors.gray200,
  },
  quantityRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  quantityButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.gray200,
    alignItems: 'center',
    justifyContent: 'center',
  },
  quantityButtonText: {
    fontSize: 20,
    fontFamily: fontFamily.bold,
    color: colors.textPrimary,
  },
  quantityDisplay: {
    fontSize: 18,
    fontFamily: fontFamily.semiBold,
    color: colors.textPrimary,
  },
  addToCartButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 24,
    shadowColor: colors.primaryDark,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  addToCartText: {
    fontSize: 16,
    fontFamily: fontFamily.semiBold,
    color: colors.textPrimary,
    marginRight: 8,
  },
});