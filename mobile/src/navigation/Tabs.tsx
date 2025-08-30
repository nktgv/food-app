import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import GridIcon from '../../assets/icons/menu-navigation-grid-1528-svgrepo-com.svg';
import UserIcon from '../../assets/icons/user_icon_150670.svg';
import InfoIcon from '../../assets/icons/info_badged_filled_icon_142884.svg';
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
        tabBarIcon: ({ color }) => {
          const iconProps = { width: 28, height: 28, fill: color, stroke: color, color };
          if (route.name === 'Catalog') {
            return <GridIcon {...iconProps} />;
          }
          if (route.name === 'Profile') {
            return <UserIcon {...iconProps} />;
          }
          if (route.name === 'About') {
            return <InfoIcon {...iconProps} />;
          }
          return null;
        },
        tabBarActiveTintColor: '#262626',
        tabBarInactiveTintColor: '#6A6A6A',
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: '#D7D7D7',
          borderTopWidth: 0,
          height: 80,
        },
      })}
    >
      <Tab.Screen name="Catalog" component={CatalogWrapper} options={{ title: 'Меню' }} />
      <Tab.Screen name="Profile" component={ProfileWrapper} options={{ title: 'Профиль' }} />
      <Tab.Screen name="About" component={AboutScreen} options={{ title: 'Инфо' }} />
    </Tab.Navigator>
  );
}
