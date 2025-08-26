import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../theme/ThemeProvider';
import { useCart } from '../context/CartContext';

interface CartIconProps {
  focused: boolean;
  color: string;
  size: number;
}

export default function CartIcon({ focused, color, size }: CartIconProps) {
  const { state } = useCart();
  const hasItems = state.totalItems > 0;
  const theme = useTheme();

  return (
    <View style={styles.container}>
      <Ionicons 
        name={focused ? 'cart' : 'cart-outline'} 
        size={size} 
        color={color} 
      />
      {hasItems && (
        <View style={[styles.badge, { backgroundColor: theme.colors.primary }] }>
          <Text style={[styles.badgeText, { color: theme.colors.surface }]}>
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
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 4,
  },
  badgeText: {
    fontSize: 12,
    fontWeight: 'bold',
  },
});
