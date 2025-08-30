import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CatalogScreen from './CatalogScreen';
import ProductScreen from './ProductScreen';
import CheckoutScreen from './CheckoutScreen';
import OrderScreen from './OrderScreen';
import CartScreen from './CartScreen';
import { useTheme } from '../theme/ThemeProvider';

export type CatalogStackParamList = {
  CatalogMain: undefined;
  Product: { id: string };
  Checkout: undefined;
  Order: { id: string };
  Cart: undefined;
};

const CatalogStack = createNativeStackNavigator<CatalogStackParamList>();

export default function CatalogWrapper() {
  const theme = useTheme();
  return (
    <CatalogStack.Navigator screenOptions={{
      contentStyle: { backgroundColor: theme.colors.background },
      headerStyle: { backgroundColor: theme.colors.surface },
      headerTintColor: theme.colors.textPrimary,
    }}>
      <CatalogStack.Screen 
        name="CatalogMain" 
        component={CatalogScreen} 
        options={{ headerShown: false }} 
      />
      <CatalogStack.Screen 
        name="Product" 
        component={ProductScreen} 
        options={{ title: 'Товар' }} 
      />
      <CatalogStack.Screen 
        name="Checkout" 
        component={CheckoutScreen} 
        options={{ title: 'Оформление' }} 
      />
      <CatalogStack.Screen 
        name="Order" 
        component={OrderScreen} 
        options={{ title: 'Заказ' }} 
      />
      <CatalogStack.Screen 
        name="Cart" 
        component={CartScreen} 
        options={{ title: 'Корзина' }} 
      />
    </CatalogStack.Navigator>
  );
}
