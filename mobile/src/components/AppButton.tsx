import React from 'react';
import { TouchableOpacity, Text, StyleSheet, GestureResponderEvent } from 'react-native';
import { useTheme } from '../theme/ThemeProvider';
import { fontFamily } from '../theme/typography';
import { colors } from '../theme/colors';

interface AppButtonProps {
  title: string;
  onPress: (event: GestureResponderEvent) => void;
  color?: string;
  disabled?: boolean;
  variant?: 'primary' | 'secondary' | 'outline';
}

const AppButton: React.FC<AppButtonProps> = ({ 
  title, 
  onPress, 
  color, 
  disabled = false,
  variant = 'primary'
}) => {
  const theme = useTheme();
  
  const getButtonStyle = () => {
    if (disabled) {
      return {
        backgroundColor: colors.gray300,
        borderColor: colors.gray300,
      };
    }

    switch (variant) {
      case 'primary':
        return {
          backgroundColor: color || colors.primary,
          borderColor: color || colors.primary,
        };
      case 'secondary':
        return {
          backgroundColor: colors.gray100,
          borderColor: colors.gray100,
        };
      case 'outline':
        return {
          backgroundColor: 'transparent',
          borderColor: color || colors.primary,
        };
      default:
        return {
          backgroundColor: color || colors.primary,
          borderColor: color || colors.primary,
        };
    }
  };

  const getTextStyle = () => {
    if (disabled) {
      return { color: colors.gray500 };
    }

    switch (variant) {
      case 'primary':
        return { color: colors.textPrimary };
      case 'secondary':
        return { color: colors.textPrimary };
      case 'outline':
        return { color: color || colors.primary };
      default:
        return { color: colors.textPrimary };
    }
  };

  return (
    <TouchableOpacity
      style={[styles.button, getButtonStyle()]}
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.8}
    >
      <Text style={[styles.text, getTextStyle()]}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 48,
    borderWidth: 1,
    shadowColor: colors.gray900,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  text: {
    fontFamily: fontFamily.semiBold,
    fontSize: 16,
  },
});

export default AppButton;
