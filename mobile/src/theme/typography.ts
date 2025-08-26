import { colors } from "./colors";

// Martian Grotesk font family - modern, clean, optimized for UI
export const fontFamily = {
  regular: 'MartianGrotesk-Regular',
  medium: 'MartianGrotesk-Medium',
  semiBold: 'MartianGrotesk-Bold',
  bold: 'MartianGrotesk-Bold',
  light: 'MartianGrotesk-Light',
};

export const typography = {
  h1: {
    fontSize: 32,
    fontWeight: '700',
    fontFamily: fontFamily.bold,
    color: colors.textPrimary,
  },
  h2: {
    fontSize: 28,
    fontWeight: '700',
    fontFamily: fontFamily.bold,
    color: colors.textPrimary,
  },
  h3: {
    fontSize: 24,
    fontWeight: '600',
    fontFamily: fontFamily.semiBold,
    color: colors.textPrimary,
  },
  h4: {
    fontSize: 20,
    fontWeight: '600',
    fontFamily: fontFamily.semiBold,
    color: colors.textPrimary,
  },
  bodyLarge: {
    fontSize: 16,
    fontWeight: '400',
    fontFamily: fontFamily.regular,
    color: colors.textPrimary,
  },
  bodyMedium: {
    fontSize: 14,
    fontWeight: '400',
    fontFamily: fontFamily.regular,
    color: colors.textPrimary,
  },
  bodySmall: {
    fontSize: 12,
    fontWeight: '400',
    fontFamily: fontFamily.regular,
    color: colors.textSecondary,
  },
  button: {
    fontSize: 16,
    fontWeight: '600',
    fontFamily: fontFamily.medium,
    color: colors.surface,
  },
  caption: {
    fontSize: 10,
    fontWeight: '400',
    fontFamily: fontFamily.regular,
    color: colors.textLight,
  },
};
