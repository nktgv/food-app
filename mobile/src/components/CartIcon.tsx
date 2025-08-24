import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useCart } from '../context/CartContext';

interface CartIconProps {
  focused: boolean;
  color: string;
  size: number;
}

export default function CartIcon({ focused, color, size }: CartIconProps) {
  const { state } = useCart();
  const hasItems = state.totalItems > 0;

  return (
    <View style={styles.container}>
      <Ionicons 
        name={focused ? 'cart' : 'cart-outline'} 
        size={size} 
        color={color} 
      />
      {hasItems && (
        <View style={styles.badge}>
          <Text style={styles.badgeText}>
            {state.totalItems > 99 ? '99+' : state.totalItems}
          </Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
  },
  badge: {
    position: 'absolute',
    top: -8,
    right: -8,
    backgroundColor: '#FF5722',
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 4,
  },
  badgeText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
});
