import { colors } from "./colors";

// Martian Grotesk font family - modern, clean, optimized for UI
export const fontFamily = {
  regular: 'Unbounded-Regular',
  medium: 'Unbounded-Medium',
  semiBold: 'Unbounded-SemiBold',
  bold: 'Unbounded-Bold',
  light: 'Unbounded-Light',
};

export const typography = {
  h1: {
    fontSize: 24,
    fontFamily: fontFamily.bold,
    color: colors.textPrimary,
    lineHeight: 32,
  },
  h2: {
    fontSize: 20,
    fontFamily: fontFamily.bold,
    color: colors.textPrimary,
    lineHeight: 28,
  },
  h3: {
    fontSize: 18,
    fontFamily: fontFamily.semiBold,
    color: colors.textPrimary,
    lineHeight: 24,
  },
  h4: {
    fontSize: 16,
    fontFamily: fontFamily.semiBold,
    color: colors.textPrimary,
    lineHeight: 22,
  },
  bodyLarge: {
    fontSize: 16,
    fontFamily: fontFamily.regular,
    color: colors.textPrimary,
    lineHeight: 24,
  },
  bodyMedium: {
    fontSize: 14,
    fontFamily: fontFamily.regular,
    color: colors.textPrimary,
    lineHeight: 20,
  },
  bodySmall: {
    fontSize: 12,
    fontFamily: fontFamily.regular,
    color: colors.textSecondary,
    lineHeight: 18,
  },
  button: {
    fontSize: 16,
    fontFamily: fontFamily.semiBold,
    color: colors.textPrimary,
  },
  caption: {
    fontSize: 12,
    fontFamily: fontFamily.regular,
    color: colors.textLight,
    lineHeight: 16,
  },
  // Дополнительные стили для современного дизайна
  productTitle: {
    fontSize: 16,
    fontFamily: fontFamily.semiBold,
    color: colors.textPrimary,
    lineHeight: 20,
  },
  productPrice: {
    fontSize: 14,
    fontFamily: fontFamily.bold,
    color: colors.textPrimary,
  },
  categoryTitle: {
    fontSize: 12,
    fontFamily: fontFamily.semiBold,
    color: colors.textPrimary,
  },
};
