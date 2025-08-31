import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AuthNavigator from './AuthNavigator';
import Tabs from './Tabs';
import { useAuth } from '../context/AuthContext';

export default function RootNavigator() {
  const { isAuthenticated } = useAuth();

  return (
    <NavigationContainer>{isAuthenticated ? <Tabs /> : <AuthNavigator />}</NavigationContainer>
  );
}
