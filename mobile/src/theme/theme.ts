import { useColorScheme } from 'react-native';

export type ColorPalette = {
  primary: string;
  primaryLight: string;
  primaryDark: string;
  accent: string;
  accentLight: string;
  accentDark: string;
  background: string;
  surface: string;
  textPrimary: string;
  textSecondary: string;
  textLight: string;
  border: string;
  divider: string;
  error: string;
  success: string;
  warning: string;
  warningLight: string;
  productRed: string;
  productRedLight: string;
  productBlue: string;
  productBlueLight: string;
  productPurple: string;
  productPurpleLight: string;
  productTeal: string;
  productTealLight: string;
  gray50: string;
  gray100: string;
  gray200: string;
  gray300: string;
  gray400: string;
  gray500: string;
  gray600: string;
  gray700: string;
  gray800: string;
  gray900: string;
  gradients: {
    [key: string]: [string, string];
  };
};

export type Typography = {
  h1: TextStyle;
  h2: TextStyle;
  h3: TextStyle;
  h4: TextStyle;
  bodyLarge: TextStyle;
  bodyMedium: TextStyle;
  bodySmall: TextStyle;
  button: TextStyle;
  caption: TextStyle;
};

export type Spacing = {
  xs: number;
  sm: number;
  md: number;
  lg: number;
  xl: number;
};

export type Radius = {
  sm: number;
  md: number;
  lg: number;
  xl: number;
};

export type Theme = {
  colors: ColorPalette;
  typography: Typography;
  spacing: Spacing;
  radius: Radius;
  mode: 'light' | 'dark';
};

import type { TextStyle } from 'react-native';
import { colors as lightColors } from './colors';
import { typography as baseTypography } from './typography';

const spacing: Spacing = { xs: 4, sm: 8, md: 12, lg: 16, xl: 24 };
const radius: Radius = { sm: 6, md: 8, lg: 12, xl: 16 };

const createTypography = (palette: ColorPalette): Typography => ({
  ...baseTypography,
  h1: { ...baseTypography.h1, color: palette.textPrimary },
  h2: { ...baseTypography.h2, color: palette.textPrimary },
  h3: { ...baseTypography.h3, color: palette.textPrimary },
  h4: { ...baseTypography.h4, color: palette.textPrimary },
  bodyLarge: { ...baseTypography.bodyLarge, color: palette.textPrimary },
  bodyMedium: { ...baseTypography.bodyMedium, color: palette.textPrimary },
  bodySmall: { ...baseTypography.bodySmall, color: palette.textSecondary },
  button: { ...baseTypography.button, color: palette.surface },
  caption: { ...baseTypography.caption, color: palette.textLight },
});

const darkPalette: ColorPalette = {
  ...lightColors,
  background: '#0E0E0F',
  surface: '#18181A',
  textPrimary: '#F5F5F6',
  textSecondary: '#C2C2C3',
  textLight: '#8B8B8C',
  border: '#2A2A2D',
  divider: '#202022',
};

export const lightTheme: Theme = {
  colors: lightColors,
  typography: createTypography(lightColors),
  spacing,
  radius,
  mode: 'light',
};

export const darkTheme: Theme = {
  colors: darkPalette,
  typography: createTypography(darkPalette),
  spacing,
  radius,
  mode: 'dark',
};


