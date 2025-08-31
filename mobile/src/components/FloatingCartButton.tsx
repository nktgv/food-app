import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { ShoppingBagIcon } from './icons';
import { useNavigation } from '@react-navigation/native';
import { useCart } from '../context/CartContext';
import { useTheme } from '../theme/ThemeProvider';
import { fontFamily } from '../theme/typography';
import { colors } from '../theme/colors';

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
        style={[styles.button, { backgroundColor: colors.primary }]}
        onPress={handlePress}
        activeOpacity={0.8}
      >
        <Text style={styles.totalText}>{state.subtotal} {state.currency}</Text>
        <ShoppingBagIcon size={20} color={colors.textPrimary} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 24,
    left: 16,
    right: 16,
    zIndex: 100,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 16,
    paddingVertical: 16,
    paddingHorizontal: 24,
    shadowColor: colors.primaryDark,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 6,
  },
  totalText: {
    fontSize: 16,
    fontFamily: fontFamily.semiBold,
    marginRight: 8,
    color: colors.textPrimary,
  },
});
