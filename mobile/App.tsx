import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { CartProvider } from './src/context/CartContext';
import { ThemeProvider, useTheme } from './src/theme/ThemeProvider';
import CatalogWrapper from './src/screens/CatalogWrapper';
import CartScreen from './src/screens/CartScreen';
import ProfileWrapper from './src/screens/ProfileWrapper';
import CartIcon from './src/components/CartIcon';

export type RootTabParamList = {
  Catalog: undefined;
  Cart: undefined;
  Profile: undefined;
};

const Tab = createBottomTabNavigator<RootTabParamList>();

function Tabs() {
  const theme = useTheme();
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: keyof typeof Ionicons.glyphMap;

          if (route.name === 'Catalog') {
            iconName = focused ? 'restaurant' : 'restaurant-outline';
          } else if (route.name === 'Cart') {
            iconName = focused ? 'cart' : 'cart-outline';
          } else if (route.name === 'Profile') {
            iconName = focused ? 'person' : 'person-outline';
          } else {
            iconName = 'help-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: theme.colors.textSecondary,
        headerShown: false,
        tabBarStyle: { backgroundColor: theme.colors.surface },
      })}
    >
      <Tab.Screen
        name="Catalog"
        component={CatalogWrapper}
        options={{ title: 'Меню' }}
      />
      <Tab.Screen
        name="Cart"
        component={CartScreen}
        options={{
          title: 'Корзина',
          tabBarIcon: ({ focused, color, size }) => (
            <CartIcon focused={focused} color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileWrapper}
        options={{ title: 'Профиль' }}
      />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <CartProvider>
        <NavigationContainer>
          <Tabs />
        </NavigationContainer>
      </CartProvider>
    </ThemeProvider>
  );
}
