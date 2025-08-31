import React from 'react';
import { CartProvider } from './src/context/CartContext';
import { ThemeProvider } from './src/theme/ThemeProvider';
import { AuthProvider } from './src/context/AuthContext';
import RootNavigator from './src/navigation/RootNavigator';
import SplashScreen from './src/screens/SplashScreen';
import { useCustomFonts } from './src/hooks/useFonts';

export default function App() {
  const fontsLoaded = useCustomFonts();

  return (
    <ThemeProvider>
      {!fontsLoaded ? (
        <SplashScreen />
      ) : (
        <AuthProvider>
          <CartProvider>
            <RootNavigator />
          </CartProvider>
        </AuthProvider>
      )}
    </ThemeProvider>
  );
}
