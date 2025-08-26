import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ProfileScreen from './ProfileScreen';
import PolicyScreen from './PolicyScreen';
import TermsScreen from './TermsScreen';
import SupportScreen from './SupportScreen';
import { useTheme } from '../theme/ThemeProvider';

export type ProfileStackParamList = {
  ProfileMain: undefined;
  Policy: undefined;
  Terms: undefined;
  Support: undefined;
};

const ProfileStack = createNativeStackNavigator<ProfileStackParamList>();

export default function ProfileWrapper() {
  const theme = useTheme();
  
  return (
    <ProfileStack.Navigator 
      screenOptions={{
        contentStyle: { backgroundColor: theme.colors.background },
        headerStyle: { backgroundColor: theme.colors.surface },
        headerTintColor: theme.colors.textPrimary,
        headerTitleStyle: {
          fontWeight: '600',
        },
      }}
    >
      <ProfileStack.Screen 
        name="ProfileMain" 
        component={ProfileScreen} 
        options={{ title: 'Профиль' }} 
      />
      <ProfileStack.Screen 
        name="Policy" 
        component={PolicyScreen} 
        options={{ title: 'Политика конфиденциальности' }} 
      />
      <ProfileStack.Screen 
        name="Terms" 
        component={TermsScreen} 
        options={{ title: 'Условия пользования' }} 
      />
      <ProfileStack.Screen 
        name="Support" 
        component={SupportScreen} 
        options={{ title: 'Поддержка' }} 
      />
    </ProfileStack.Navigator>
  );
}
