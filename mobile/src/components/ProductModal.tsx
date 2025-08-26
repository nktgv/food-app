import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Animated,
  Image,
  Alert
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { Product } from '../api/client';
import { useTheme } from '../theme/ThemeProvider';
import { useCart } from '../context/CartContext';
import Placeholder from '../assets/images/placeholder';

const { height: screenHeight } = Dimensions.get('window');
const modalHeight = screenHeight * 0.85;

interface ProductModalProps {
  product: Product | null;
  visible: boolean;
  onClose: () => void;
}

export default function ProductModal({ product, visible, onClose }: ProductModalProps) {
  const { addItem, getItemQuantity } = useCart();
  const theme = useTheme();
  const [quantity, setQuantity] = useState(1);
  const translateY = useRef(new Animated.Value(screenHeight)).current;
  const opacity = useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    if (visible) {
      setQuantity(1);
      Animated.parallel([
        Animated.timing(translateY, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(translateY, {
          toValue: screenHeight,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [visible]);

  const handleAddToCart = () => {
    if (product) {
      addItem(product, quantity);
      Alert.alert(
        'Добавлено в корзину! 🛒',
        `${product.name} (${quantity} шт.) добавлен в корзину`,
        [
          { text: 'Продолжить покупки', style: 'cancel' },
          { text: 'Перейти в корзину', onPress: onClose }
        ]
      );
      onClose();
    }
  };

    const getGradientColors = (): [string, string] => {
    const tag = product?.tags?.[0]?.toLowerCase() || 'food';
    return theme.colors.gradients[tag] || theme.colors.gradients.food;
  };

  const currentQuantity = product ? getItemQuantity(product.id) : 0;

  if (!product) return null;

  return (
    <Modal
      visible={visible}
      transparent
      animationType="none"
      onRequestClose={onClose}
    >
      <Animated.View style={[styles.overlay, { opacity }]}>
        <TouchableOpacity 
          style={styles.backdrop} 
          activeOpacity={1} 
          onPress={onClose}
        />
        
        <Animated.View 
          style={[
            styles.modalContainer,
            {
              backgroundColor: theme.colors.surface,
              transform: [{ translateY }],
            },
          ]}
        >
          {/* Handle bar */}
          <View style={[styles.handleBar, { backgroundColor: theme.colors.surface }]}>
            <View style={[styles.handle, { backgroundColor: theme.colors.gray300 }]} />
          </View>

          {/* Product Image */}
          <View style={styles.imageContainer}>
            {product.media && product.media.length > 0 ? (
              <Image source={{ uri: product.media[0] }} style={styles.image} resizeMode="cover" />
            ) : (
              <Placeholder type={product.tags?.[0] || 'food'} style={styles.image} />
            )}
            <LinearGradient
              colors={getGradientColors()}
              style={styles.gradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            />
            
            {/* Close button */}
            <TouchableOpacity style={styles.closeButton} onPress={onClose}>
              <Ionicons name="close" size={24} color="#fff" />
            </TouchableOpacity>

            {/* Price */}
            <View style={[styles.priceContainer, { backgroundColor: 'rgba(255, 255, 255, 0.95)' }]}>
              <Text style={[styles.price, { color: theme.colors.primary }]}>
                {product.base_price} {product.currency}
              </Text>
            </View>
          </View>

          {/* Content */}
          <View style={[styles.content, { backgroundColor: theme.colors.surface }]}>
            <Text style={[styles.name, { color: theme.colors.textPrimary }]}>{product.name}</Text>
            <Text style={[styles.description, { color: theme.colors.textSecondary }]}>{product.description}</Text>
            
            {/* Tags */}
            {product.tags && product.tags.length > 0 && (
              <View style={styles.tagsContainer}>
                {product.tags.map((tag, index) => (
                  <View key={index} style={[styles.tag, { backgroundColor: theme.colors.gray100 }]}>
                    <Text style={[styles.tagText, { color: theme.colors.textSecondary }]}>{tag}</Text>
                  </View>
                ))}
              </View>
            )}

            {/* Quantity Selector */}
            <View style={[styles.quantityContainer, { backgroundColor: theme.colors.gray100 }]}>
              <Text style={[styles.quantityLabel, { color: theme.colors.textPrimary }]}>Количество:</Text>
              <View style={styles.quantitySelector}>
                <TouchableOpacity
                  style={[styles.quantityButton, { borderColor: quantity <= 1 ? '#ccc' : theme.colors.primary }, quantity <= 1 && styles.quantityButtonDisabled]}
                  onPress={() => setQuantity(Math.max(1, quantity - 1))}
                  disabled={quantity <= 1}
                >
                  <Ionicons name="remove" size={20} color={quantity <= 1 ? '#ccc' : theme.colors.primary} />
                </TouchableOpacity>
                
                <Text style={[styles.quantityText, { color: theme.colors.textPrimary }]}>{quantity}</Text>
                
                <TouchableOpacity
                  style={[styles.quantityButton, { borderColor: theme.colors.primary }]}
                  onPress={() => setQuantity(quantity + 1)}
                >
                  <Ionicons name="add" size={20} color={theme.colors.primary} />
                </TouchableOpacity>
              </View>
            </View>

            {/* Current cart quantity */}
            {currentQuantity > 0 && (
              <View style={styles.cartInfo}>
                <Ionicons name="cart-outline" size={16} color={theme.colors.textSecondary} />
                <Text style={[styles.cartInfoText, { color: theme.colors.textSecondary }]}>
                  В корзине: {currentQuantity} шт.
                </Text>
              </View>
            )}

            {/* Variants */}
            {product.variants && product.variants.length > 0 && (
              <View style={styles.section}>
                <Text style={[styles.sectionTitle, { color: theme.colors.textPrimary }]}>Размеры</Text>
                {product.variants.map(variant => (
                  <View key={variant.id} style={[styles.variantItem, { borderBottomColor: theme.colors.divider }]}>
                    <Text style={[styles.variantName, { color: theme.colors.textPrimary }]}>{variant.name}</Text>
                    <Text style={[styles.variantPrice, { color: theme.colors.primary }]}>
                      {variant.price_delta > 0 ? '+' : ''}{variant.price_delta} {product.currency}
                    </Text>
                  </View>
                ))}
              </View>
            )}

            {/* Allergens */}
            {product.allergens && product.allergens.length > 0 && (
              <View style={styles.section}>
                <Text style={[styles.sectionTitle, { color: theme.colors.textPrimary }]}>Аллергены</Text>
                <View style={styles.allergensContainer}>
                  {product.allergens.map((allergen, index) => (
                    <View key={index} style={[styles.allergenTag, { backgroundColor: '#FFEBEE' }]}>
                      <Text style={[styles.allergenText, { color: '#D32F2F' }]}>{allergen}</Text>
                    </View>
                  ))}
                </View>
              </View>
            )}

            {/* Add to cart button */}
            <TouchableOpacity 
              style={styles.addToCartButton}
              onPress={handleAddToCart}
              activeOpacity={0.8}
            >
              <LinearGradient
                colors={getGradientColors()}
                style={styles.buttonGradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
              >
                <Ionicons name="cart-outline" size={20} color="#fff" />
                <Text style={styles.addToCartText}>
                  Добавить в корзину • {product.base_price * quantity} {product.currency}
                </Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </Animated.View>
      </Animated.View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  backdrop: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'transparent',
  },
  modalContainer: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderWidth: 3,
    borderBottomWidth: 0,
    borderColor: '#FF5722',
    height: modalHeight,
    overflow: 'hidden',
  },
  handleBar: {
    alignItems: 'center',
    paddingVertical: 12,
    backgroundColor: '#fff',
  },
  handle: {
    width: 40,
    height: 4,
    backgroundColor: '#ddd',
    borderRadius: 2,
  },
  imageContainer: {
    position: 'relative',
    height: 200,
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
  closeButton: {
    position: 'absolute',
    top: 20,
    right: 20,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  priceContainer: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  price: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FF5722',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
    lineHeight: 28,
  },
  description: {
    fontSize: 16,
    color: '#666',
    lineHeight: 22,
    marginBottom: 16,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 20,
  },
  tag: {
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    marginRight: 8,
    marginBottom: 8,
  },
  tagText: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
    paddingVertical: 12,
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
    paddingHorizontal: 16,
  },
  quantityLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  quantitySelector: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantityButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#FF5722',
  },
  quantityButtonDisabled: {
    borderColor: '#ccc',
  },
  quantityText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginHorizontal: 20,
    minWidth: 30,
    textAlign: 'center',
  },
  cartInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: '#E3F2FD',
    borderRadius: 8,
  },
  cartInfoText: {
    fontSize: 14,
    color: '#1976D2',
    marginLeft: 8,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 12,
  },
  variantItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  variantName: {
    fontSize: 16,
    color: '#333',
  },
  variantPrice: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FF5722',
  },
  allergensContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  allergenTag: {
    backgroundColor: '#FFEBEE',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    marginRight: 8,
    marginBottom: 8,
  },
  allergenText: {
    fontSize: 14,
    color: '#D32F2F',
    fontWeight: '500',
  },
  addToCartButton: {
    marginTop: 'auto',
    borderRadius: 12,
    overflow: 'hidden',
  },
  buttonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    paddingHorizontal: 24,
  },
  addToCartText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
    marginLeft: 8,
  },
});
