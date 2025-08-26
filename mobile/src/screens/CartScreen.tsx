import React from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  SafeAreaView, 
  FlatList, 
  Alert, 
  StyleSheet,
  StatusBar
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useCart, CartItem } from '../context/CartContext';
import { useTheme } from '../theme/ThemeProvider';

interface CartScreenProps {
  navigation: any;
}

export default function CartScreen({ navigation }: CartScreenProps) {
  const { state, removeItem, updateQuantity } = useCart();
  const theme = useTheme();

  const handleCheckout = () => {
    if (state.items.length === 0) {
      Alert.alert('Корзина пуста', 'Добавьте товары в корзину');
      return;
    }
    // Навигация к оформлению заказа
    Alert.alert('Оформление заказа', 'Переход к оформлению заказа...');
  };

  const handleRemoveItem = (itemId: string) => {
    Alert.alert(
      'Удалить товар',
      'Вы уверены, что хотите удалить этот товар из корзины?',
      [
        { text: 'Отмена', style: 'cancel' },
        { 
          text: 'Удалить', 
          style: 'destructive',
          onPress: () => removeItem(itemId)
        }
      ]
    );
  };

  const renderCartItem = ({ item }: { item: CartItem }) => (
    <View style={styles.cartItem}>
      <View style={styles.itemImage}>
        <LinearGradient
          colors={['#FF6B6B', '#FF8E8E']}
          style={styles.imageGradient}
        />
        <Ionicons name="restaurant" size={24} color="#fff" />
      </View>
      
      <View style={styles.itemContent}>
        <Text style={styles.itemName}>{item.product.name}</Text>
        <Text style={styles.itemPrice}>
          {item.unitPrice} {state.currency} × {item.quantity}
        </Text>
        
        {/* Quantity controls */}
        <View style={styles.quantityControls}>
          <TouchableOpacity
            style={[styles.quantityButton, item.quantity <= 1 && styles.quantityButtonDisabled]}
            onPress={() => updateQuantity(item.id, item.quantity - 1)}
            disabled={item.quantity <= 1}
          >
            <Ionicons 
              name="remove" 
              size={16} 
              color={item.quantity <= 1 ? '#ccc' : '#FF5722'} 
            />
          </TouchableOpacity>
          
          <Text style={styles.quantityText}>{item.quantity}</Text>
          
          <TouchableOpacity
            style={styles.quantityButton}
            onPress={() => updateQuantity(item.id, item.quantity + 1)}
          >
            <Ionicons name="add" size={16} color="#FF5722" />
          </TouchableOpacity>
        </View>
      </View>
      
      <View style={styles.itemActions}>
        <Text style={styles.itemTotal}>
          {item.totalPrice} {state.currency}
        </Text>
        <TouchableOpacity 
          style={styles.removeButton}
          onPress={() => handleRemoveItem(item.id)}
        >
          <Ionicons name="trash-outline" size={20} color="#FF5722" />
        </TouchableOpacity>
      </View>
    </View>
  );

  if (state.items.length === 0) {
    return (
      <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
        <StatusBar barStyle={theme.mode === 'dark' ? 'light-content' : 'dark-content'} backgroundColor={theme.colors.surface} />
        <View style={styles.emptyContainer}>
          <Ionicons name="cart-outline" size={80} color={theme.colors.gray400} />
          <Text style={[styles.emptyTitle, { color: theme.colors.textPrimary }]}>Корзина пуста</Text>
          <Text style={[styles.emptyText, { color: theme.colors.textSecondary }]}>
            Добавьте товары из меню, чтобы сделать заказ
          </Text>
          <TouchableOpacity 
            style={styles.browseButton}
            onPress={() => navigation.navigate('Catalog')}
          >
            <LinearGradient
              colors={[theme.colors.primary, theme.colors.primaryLight]}
              style={styles.browseButtonGradient}
            >
              <Text style={styles.browseButtonText}>Перейти в меню</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <StatusBar barStyle={theme.mode === 'dark' ? 'light-content' : 'dark-content'} backgroundColor={theme.colors.surface} />
      
      <View style={styles.header}>
        <Text style={[styles.headerTitle, { color: theme.colors.textPrimary }]}>🛒 Корзина</Text>
        <Text style={[styles.headerSubtitle, { color: theme.colors.textSecondary }]}>
          {state.totalItems} товар(ов) на сумму {state.subtotal} {state.currency}
        </Text>
      </View>

      <FlatList
        data={state.items}
        renderItem={renderCartItem}
        keyExtractor={(item) => item.id}
        style={styles.list}
        showsVerticalScrollIndicator={false}
      />
      
      <View style={styles.footer}>
        <View style={styles.summary}>
          <View style={styles.summaryRow}>
            <Text style={[styles.summaryLabel, { color: theme.colors.textSecondary }]}>Подытог:</Text>
            <Text style={[styles.summaryValue, { color: theme.colors.textPrimary }]}>
              {state.subtotal} {state.currency}
            </Text>
          </View>
          
          <View style={[styles.summaryRow, styles.totalRow]}>
            <Text style={[styles.totalLabel, { color: theme.colors.textPrimary }]}>Итого:</Text>
            <Text style={[styles.totalValue, { color: theme.colors.primary }]}>
              {state.subtotal} {state.currency}
            </Text>
          </View>
        </View>

        <TouchableOpacity 
          style={styles.checkoutButton}
          onPress={handleCheckout}
          activeOpacity={0.8}
        >
          <LinearGradient
            colors={[theme.colors.primary, theme.colors.primaryLight]}
            style={styles.checkoutButtonGradient}
          >
            <Ionicons name="card-outline" size={20} color="#fff" />
            <Text style={styles.checkoutButtonText}>Оформить заказ</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
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
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#666',
  },
  list: {
    flex: 1,
  },
  cartItem: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    marginHorizontal: 16,
    marginVertical: 8,
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  itemImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  imageGradient: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    borderRadius: 8,
  },
  itemContent: {
    flex: 1,
    justifyContent: 'center',
  },
  itemName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  itemPrice: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  quantityControls: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantityButton: {
    width: 28,
    height: 28,
    borderRadius: 14,
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
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginHorizontal: 12,
    minWidth: 20,
    textAlign: 'center',
  },
  itemActions: {
    alignItems: 'flex-end',
    justifyContent: 'space-between',
  },
  itemTotal: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FF5722',
    marginBottom: 8,
  },
  removeButton: {
    padding: 4,
  },
  footer: {
    backgroundColor: '#fff',
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  summary: {
    marginBottom: 20,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  summaryLabel: {
    fontSize: 16,
    color: '#666',
  },
  summaryValue: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
  },
  totalRow: {
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
    paddingTop: 12,
    marginTop: 8,
  },
  totalLabel: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  totalValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FF5722',
  },
  checkoutButton: {
    borderRadius: 12,
    overflow: 'hidden',
  },
  checkoutButtonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    paddingHorizontal: 24,
  },
  checkoutButtonText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
    marginLeft: 8,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333',
    marginTop: 16,
    marginBottom: 8,
  },
  emptyText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 32,
  },
  browseButton: {
    borderRadius: 12,
    overflow: 'hidden',
  },
  browseButtonGradient: {
    paddingVertical: 16,
    paddingHorizontal: 32,
  },
  browseButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
});
