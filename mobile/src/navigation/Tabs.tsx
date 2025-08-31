import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Text } from 'react-native';
import { GridIcon, UserIcon, InfoIcon } from '../components/icons';
import CatalogWrapper from '../screens/CatalogWrapper';
import ProfileWrapper from '../screens/ProfileWrapper';
import AboutScreen from '../screens/AboutScreen';
import CartIcon from '../components/CartIcon';
import { useTheme } from '../theme/ThemeProvider';

export type RootTabParamList = {
  Catalog: undefined;
  Profile: undefined;
  About: undefined;
};

const Tab = createBottomTabNavigator<RootTabParamList>();

export default function Tabs() {
  const theme = useTheme();
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, focused }) => {
          const iconSize = 28;
          if (route.name === 'Catalog') {
            return <GridIcon size={iconSize} color={color} />;
          }
          if (route.name === 'Profile') {
            return <UserIcon size={iconSize} color={color} />;
          }
          if (route.name === 'About') {
            return <InfoIcon size={iconSize} color={color} />;
          }
          return null;
        },
        tabBarActiveTintColor: theme.colors.textPrimary,
        tabBarInactiveTintColor: theme.colors.textSecondary,
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: theme.colors.background,
          borderTopWidth: 1,
          borderTopColor: theme.colors.gray200,
          height: 80,
          paddingTop: 8,
          paddingBottom: 20,
        },
      })}
    >
      <Tab.Screen name="Catalog" component={CatalogWrapper} options={{ title: 'Меню' }} />
      <Tab.Screen name="Profile" component={ProfileWrapper} options={{ title: 'Профиль' }} />
      <Tab.Screen name="About" component={AboutScreen} options={{ title: 'Инфо' }} />
    </Tab.Navigator>
  );
}
