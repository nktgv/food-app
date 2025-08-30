import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import ShoppingBagIcon from '../../assets/icons/shopping_bag.svg';
import { useNavigation } from '@react-navigation/native';
import { useCart } from '../context/CartContext';
import { useTheme } from '../theme/ThemeProvider';

export default function FloatingCartButton() {
  const { state } = useCart();
  const theme = useTheme();
  const navigation = useNavigation();

  if (state.totalItems === 0) {
    return null;
  }

  const handlePress = () => {
    // @ts-ignore - assume Cart screen exists in navigation stack
    navigation.navigate('Cart');
  };

  return (
    <View style={styles.container} pointerEvents="box-none">
      <TouchableOpacity
        style={[styles.button, { backgroundColor: theme.colors.primary }]}
        onPress={handlePress}
        activeOpacity={0.8}
      >
        <Text style={[styles.totalText]}>{state.subtotal} {state.currency}</Text>
        <ShoppingBagIcon width={24} height={24} stroke={theme.colors.surface} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    zIndex: 100,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 30,
    paddingVertical: 10,
    paddingHorizontal: 20,
    elevation: 4,
  },
  totalText: {
    fontSize: 18,
    fontWeight: 'normal',
    fontFamily: 'Unbounded-Regular',
    marginRight: 8,
    color: '#1E1E1E',
  },
  icon: {
    marginLeft: 4,
  },
});
