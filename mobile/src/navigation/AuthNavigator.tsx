import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AuthScreen from '../screens/AuthScreen';
import PolicyScreen from '../screens/PolicyScreen';
import { useTheme } from '../theme/ThemeProvider';

export type AuthStackParamList = {
  Auth: undefined;
  Policy: undefined;
};

const Stack = createNativeStackNavigator<AuthStackParamList>();

export default function AuthNavigator() {
  const theme = useTheme();
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: theme.colors.background },
      }}
    >
      <Stack.Screen name="Auth" component={AuthScreen} />
      <Stack.Screen name="Policy" component={PolicyScreen} />
    </Stack.Navigator>
  );
}
