import React, { useEffect, useState } from 'react';
import { 
  View, 
  Text, 
  FlatList, 
  ActivityIndicator, 
  SafeAreaView, 
  StyleSheet,
  RefreshControl,
  StatusBar
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { api, Product } from '../api/client';
import { CatalogStackParamList } from './CatalogWrapper';
import ProductCard from '../components/ProductCard';
import CategoryFilter from '../components/CategoryFilter';
import ProductModal from '../components/ProductModal';
import { useCart } from '../context/CartContext';

type CatalogScreenNavigationProp = NativeStackNavigationProp<CatalogStackParamList, 'CatalogMain'>;

interface CatalogScreenProps {
  navigation: CatalogScreenNavigationProp;
}

interface Category {
  id: string;
  name: string;
  icon: string;
}

// Расширенные данные для демонстрации
const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Пицца Маргарита',
    description: 'Классическая пицца с томатным соусом, моцареллой и базиликом',
    media: [],
    base_price: 850,
    currency: '₽',
    variants: [],
    modifier_groups: [],
    allergens: ['молоко', 'глютен'],
    tags: ['pizza', 'итальянская']
  },
  {
    id: '2',
    name: 'Бургер Классический',
    description: 'Сочная говяжья котлета с овощами и специальным соусом',
    media: [],
    base_price: 650,
    currency: '₽',
    variants: [],
    modifier_groups: [],
    allergens: ['глютен', 'горчица'],
    tags: ['burger', 'американская']
  },
  {
    id: '3',
    name: 'Ролл Калифорния',
    description: 'Ролл с крабом, авокадо и огурцом',
    media: [],
    base_price: 450,
    currency: '₽',
    variants: [],
    modifier_groups: [],
    allergens: ['рыба', 'соя'],
    tags: ['sushi', 'японская']
  },
  {
    id: '4',
    name: 'Паста Карбонара',
    description: 'Спагетти с беконом, яйцом и пармезаном',
    media: [],
    base_price: 750,
    currency: '₽',
    variants: [],
    modifier_groups: [],
    allergens: ['глютен', 'молоко', 'яйца'],
    tags: ['pasta', 'итальянская']
  },
  {
    id: '5',
    name: 'Цезарь с курицей',
    description: 'Свежий салат с куриным филе, сухариками и соусом Цезарь',
    media: [],
    base_price: 550,
    currency: '₽',
    variants: [],
    modifier_groups: [],
    allergens: ['глютен', 'горчица'],
    tags: ['salad', 'здоровое']
  },
  {
    id: '6',
    name: 'Тирамису',
    description: 'Итальянский десерт с кофе и маскарпоне',
    media: [],
    base_price: 350,
    currency: '₽',
    variants: [],
    modifier_groups: [],
    allergens: ['молоко', 'яйца'],
    tags: ['dessert', 'итальянская']
  },
  {
    id: '7',
    name: 'Латте',
    description: 'Кофе с молоком и молочной пенкой',
    media: [],
    base_price: 250,
    currency: '₽',
    variants: [],
    modifier_groups: [],
    allergens: ['молоко'],
    tags: ['coffee', 'напитки']
  },
  {
    id: '8',
    name: 'Суп Том Ям',
    description: 'Острый тайский суп с креветками и кокосовым молоком',
    media: [],
    base_price: 680,
    currency: '₽',
    variants: [],
    modifier_groups: [],
    allergens: ['рыба', 'моллюски'],
    tags: ['soup', 'тайская']
  },
  {
    id: '9',
    name: 'Стейк Рибай',
    description: 'Сочный стейк из говядины с овощами гриль',
    media: [],
    base_price: 1200,
    currency: '₽',
    variants: [],
    modifier_groups: [],
    allergens: [],
    tags: ['steak', 'американская']
  },
  {
    id: '10',
    name: 'Паэлья',
    description: 'Испанское блюдо с рисом, морепродуктами и шафраном',
    media: [],
    base_price: 950,
    currency: '₽',
    variants: [],
    modifier_groups: [],
    allergens: ['рыба', 'моллюски'],
    tags: ['paella', 'испанская']
  },
  {
    id: '11',
    name: 'Чизкейк',
    description: 'Нежный чизкейк с ягодным соусом',
    media: [],
    base_price: 420,
    currency: '₽',
    variants: [],
    modifier_groups: [],
    allergens: ['молоко', 'глютен'],
    tags: ['dessert', 'американская']
  },
  {
    id: '12',
    name: 'Мохито',
    description: 'Освежающий коктейль с лаймом и мятой',
    media: [],
    base_price: 380,
    currency: '₽',
    variants: [],
    modifier_groups: [],
    allergens: [],
    tags: ['drink', 'коктейль']
  }
];

const categories: Category[] = [
  { id: 'pizza', name: 'Пицца', icon: '🍕' },
  { id: 'burger', name: 'Бургеры', icon: '🍔' },
  { id: 'sushi', name: 'Суши', icon: '🍣' },
  { id: 'pasta', name: 'Паста', icon: '🍝' },
  { id: 'salad', name: 'Салаты', icon: '🥗' },
  { id: 'dessert', name: 'Десерты', icon: '🍰' },
  { id: 'drink', name: 'Напитки', icon: '🥤' },
  { id: 'coffee', name: 'Кофе', icon: '☕' },
];

export default function CatalogScreen({ navigation }: CatalogScreenProps) {
  const { addItem } = useCart();
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  
  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      const apiProducts = await api.getProducts();
      // Объединяем API данные с моковыми для демонстрации
      const allProducts = [...apiProducts, ...mockProducts];
      setProducts(allProducts);
    } catch (error) {
      console.error('Failed to load products:', error);
      // Если API недоступен, используем только моковые данные
      setProducts(mockProducts);
    } finally {
      setLoading(false);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await loadProducts();
    setRefreshing(false);
  };

  const filteredProducts = selectedCategory 
    ? products.filter(product => 
        product.tags.some(tag => tag.toLowerCase() === selectedCategory.toLowerCase())
      )
    : products;

  const handleSelectCategory = (categoryId: string | null) => {
    setSelectedCategory(categoryId);
  };

  const handleProductPress = (product: Product) => {
    setSelectedProduct(product);
    setModalVisible(true);
  };

  const handleAddToCart = (product: Product) => {
    addItem(product, 1);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
    setSelectedProduct(null);
  };

  const renderProduct = ({ item }: { item: Product }) => (
    <ProductCard
      product={item}
      onPress={() => handleProductPress(item)}
      onAddToCart={() => handleAddToCart(item)}
    />
  );

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="dark-content" backgroundColor="#fff" />
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#FF5722" />
          <Text style={styles.loadingText}>Загружаем меню...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      
      <View style={styles.header}>
        <Text style={styles.title}>🍽️ Меню</Text>
        <Text style={styles.subtitle}>Выберите любимое блюдо</Text>
      </View>

      <CategoryFilter
        categories={categories}
        selectedCategory={selectedCategory}
        onSelectCategory={handleSelectCategory}
      />

      <FlatList
        data={filteredProducts}
        keyExtractor={(item) => item.id}
        renderItem={renderProduct}
        numColumns={2}
        columnWrapperStyle={styles.row}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={['#FF5722']}
            tintColor="#FF5722"
          />
        }
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>😔</Text>
            <Text style={styles.emptyTitle}>Ничего не найдено</Text>
            <Text style={styles.emptySubtitle}>
              Попробуйте выбрать другую категорию
            </Text>
          </View>
        }
      />
      
      <ProductModal
        product={selectedProduct}
        visible={modalVisible}
        onClose={handleCloseModal}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
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
  listContainer: {
    padding: 16,
  },
  row: {
    justifyContent: 'space-between',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 60,
  },
  emptyText: {
    fontSize: 48,
    marginBottom: 16,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
});
