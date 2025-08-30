import React from 'react';
import { CartProvider } from './src/context/CartContext';
import { ThemeProvider } from './src/theme/ThemeProvider';
import { AuthProvider } from './src/context/AuthContext';
import RootNavigator from './src/navigation/RootNavigator';

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <CartProvider>
          <RootNavigator />
        </CartProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}
