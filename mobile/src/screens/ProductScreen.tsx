import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Button,
  ActivityIndicator,
  ScrollView,
  SafeAreaView,
  Alert,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  Image
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { api, Product } from '../api/client';
import { CatalogStackParamList } from './CatalogWrapper';
import Placeholder from '../assets/images/placeholder';

type ProductScreenNavigationProp = NativeStackNavigationProp<CatalogStackParamList, 'Product'>;
type ProductScreenRouteProp = RouteProp<CatalogStackParamList, 'Product'>;

interface ProductScreenProps {
  route: ProductScreenRouteProp;
  navigation: ProductScreenNavigationProp;
}

type OrderStatus = 'NEW' | 'KITCHEN_CONFIRMED' | 'IN_PREPARATION' | 'READY_FOR_PICKUP' | 'OUT_FOR_DELIVERY' | 'DELIVERED';

export default function ProductScreen({ route, navigation }: ProductScreenProps) {
  const { id } = route.params;
  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState<Product | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    api.getProduct(id)
      .then(setProduct)
      .catch(error => {
        console.error('Failed to load product:', error);
        setError('Не удалось загрузить товар');
      })
      .finally(() => setLoading(false));
  }, [id]);

  const handleAddToCart = () => {
    Alert.alert(
      'Добавлено в корзину! 🛒',
      `${product?.name} добавлен в корзину`,
      [
        { text: 'Продолжить покупки', style: 'cancel' },
        {
          text: 'Перейти в корзину',
          onPress: () => navigation.navigate('CatalogMain')
        }
      ]
    );
  };

  const getGradientColors = (): [string, string] => {
    const tag = product?.tags?.[0]?.toLowerCase() || 'food';
    const gradients: { [key: string]: [string, string] } = {
      pizza: ['#FF6B6B', '#FF8E8E'],
      burger: ['#FFA726', '#FFB74D'],
      sushi: ['#4FC3F7', '#81D4FA'],
      pasta: ['#FF7043', '#FF8A65'],
      salad: ['#66BB6A', '#81C784'],
      dessert: ['#AB47BC', '#BA68C8'],
      drink: ['#26A69A', '#4DB6AC'],
      coffee: ['#8D6E63', '#A1887F'],
      food: ['#FF5722', '#FF7043'],
    };

    return gradients[tag] || gradients.food;
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="light-content" backgroundColor="#FF5722" />
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#FF5722" />
          <Text style={styles.loadingText}>Загружаем товар...</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (error || !product) {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="light-content" backgroundColor="#FF5722" />
        <View style={styles.errorContainer}>
          <Ionicons name="alert-circle-outline" size={64} color="#FF5722" />
          <Text style={styles.errorTitle}>Ошибка загрузки</Text>
          <Text style={styles.errorText}>
            {error || 'Товар не найден'}
          </Text>
          <TouchableOpacity
            style={styles.retryButton}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.retryButtonText}>Вернуться назад</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#FF5722" />

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Header с изображением */}
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

          {/* Кнопка назад */}
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="arrow-back" size={24} color="#fff" />
          </TouchableOpacity>

          {/* Цена */}
          <View style={styles.priceContainer}>
            <Text style={styles.price}>
              {product.base_price} {product.currency}
            </Text>
          </View>
        </View>

        {/* Контент */}
        <View style={styles.content}>
          <Text style={styles.name}>{product.name}</Text>
          <Text style={styles.description}>{product.description}</Text>

          {/* Теги */}
          {product.tags && product.tags.length > 0 && (
            <View style={styles.tagsContainer}>
              {product.tags.map((tag, index) => (
                <View key={index} style={styles.tag}>
                  <Text style={styles.tagText}>{tag}</Text>
                </View>
              ))}
            </View>
          )}

          {/* Варианты */}
          {product.variants && product.variants.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Размеры</Text>
              {product.variants.map(variant => (
                <View key={variant.id} style={styles.variantItem}>
                  <Text style={styles.variantName}>{variant.name}</Text>
                  <Text style={styles.variantPrice}>
                    {variant.price_delta > 0 ? '+' : ''}{variant.price_delta} {product.currency}
                  </Text>
                </View>
              ))}
            </View>
          )}

          {/* Аллергены */}
          {product.allergens && product.allergens.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Аллергены</Text>
              <View style={styles.allergensContainer}>
                {product.allergens.map((allergen, index) => (
                  <View key={index} style={styles.allergenTag}>
                    <Text style={styles.allergenText}>{allergen}</Text>
                  </View>
                ))}
              </View>
            </View>
          )}

          {/* Кнопка добавления в корзину */}
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
              <Text style={styles.addToCartText}>Добавить в корзину</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollView: {
    flex: 1,
  },
  imageContainer: {
    position: 'relative',
    height: 300,
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
  backButton: {
    position: 'absolute',
    top: 20,
    left: 20,
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
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FF5722',
  },
  content: {
    padding: 20,
  },
  name: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 12,
    lineHeight: 34,
  },
  description: {
    fontSize: 16,
    color: '#666',
    lineHeight: 24,
    marginBottom: 20,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 24,
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
  section: {
    marginBottom: 24,
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
    marginTop: 20,
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
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: '#666',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333',
    marginTop: 16,
    marginBottom: 8,
  },
  errorText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 24,
  },
  retryButton: {
    backgroundColor: '#FF5722',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  retryButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
