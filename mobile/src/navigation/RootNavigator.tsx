import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AuthNavigator from './AuthNavigator';
import Tabs from './Tabs';
import SplashScreen from '../screens/SplashScreen';
import { useAuth } from '../context/AuthContext';

export default function RootNavigator() {
  const { isAuthenticated } = useAuth();
  const [isReady, setReady] = useState(false);

  useEffect(() => {
    // fonts are loaded inside SplashScreen hook; simulate readiness after mount
    const timer = setTimeout(() => setReady(true), 500);
    return () => clearTimeout(timer);
  }, []);

  if (!isReady) {
    return <SplashScreen />;
  }

  return (
    <NavigationContainer>{isAuthenticated ? <Tabs /> : <AuthNavigator />}</NavigationContainer>
  );
}
