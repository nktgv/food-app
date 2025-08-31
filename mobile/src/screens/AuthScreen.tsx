import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Pressable, KeyboardAvoidingView, Platform, Image } from 'react-native';
import { useTheme } from '../theme/ThemeProvider';
import { fontFamily } from '../theme/typography';
import { useAuth } from '../context/AuthContext';

export default function AuthScreen() {
  const theme = useTheme();
  const { login } = useAuth();
  const [phoneDigits, setPhoneDigits] = useState('');

  const formatPhone = (digits: string) => {
    const part1 = digits.slice(0, 3);
    const part2 = digits.slice(3, 6);
    const part3 = digits.slice(6, 8);
    const part4 = digits.slice(8, 10);
    let formatted = '';
    if (part1) formatted += `(${part1}`;
    if (part1 && part1.length === 3) formatted += ')';
    if (part2) formatted += `-${part2}`;
    if (part3) formatted += `-${part3}`;
    if (part4) formatted += `-${part4}`;
    return formatted;
  };

  const handleChange = (text: string) => {
    // keep only digits
    const digits = text.replace(/\D/g, '').slice(0, 10);
    setPhoneDigits(digits);
  };

  const handleContinue = () => {
    if (phoneDigits.length === 10) {
      login(`+7${phoneDigits}`);
    }
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
      padding: 24,
      justifyContent: 'center',
    },
    logo: {
      width: 160,
      height: 190,
      alignSelf: 'center',
      marginBottom: 24,
    },
    title: {
      fontSize: 32,
      fontFamily: fontFamily.semiBold,
      textAlign: 'center',
      color: theme.colors.textPrimary,
      marginBottom: 16,
    },
    subtitle: {
      fontSize: 16,
      fontFamily: fontFamily.regular,
      textAlign: 'center',
      color: theme.colors.textSecondary,
      marginBottom: 32,
    },
    phoneContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      borderWidth: 1,
      borderColor: theme.colors.textPrimary,
      borderRadius: 12,
      overflow: 'hidden',
      marginBottom: 32,
      height: 64,
      backgroundColor: theme.colors.surface,
    },
    prefix: {
      width: 48,
      height: '100%',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: theme.colors.surface,
      borderRightWidth: 1,
      borderRightColor: theme.colors.textPrimary,
    },
    prefixText: {
      fontSize: 16,
      fontFamily: fontFamily.bold,
      color: theme.colors.textPrimary,
    },
    input: {
      flex: 1,
      paddingHorizontal: 10,
      fontSize: 14,
      fontFamily: fontFamily.medium,
      color: theme.colors.textPrimary,
    },
    button: {
      backgroundColor: theme.colors.accent,
      paddingVertical: 18,
      borderRadius: 12,
      alignItems: 'center',
      shadowColor: theme.colors.accentDark,
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.3,
      shadowRadius: 6,
      elevation: 3,
    },
    buttonText: {
      fontSize: 14,
      fontFamily: fontFamily.bold,
      color: theme.colors.textPrimary,
    },
    policyText: {
      marginTop: 32,
      fontSize: 12,
      fontFamily: fontFamily.regular,
      color: theme.colors.textSecondary,
      textAlign: 'center',
    },
    policyLink: {
      textDecorationLine: 'underline',
      fontFamily: fontFamily.semiBold,
      color: theme.colors.textSecondary,
    },
  });

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={styles.container}>
      <Image source={require('../../assets/LOGO.png')} style={styles.logo} resizeMode="contain" />
      <Text style={styles.title}>Шаурмичка</Text>
      <Text style={styles.subtitle}>Ты всего в паре кликов от того, чтобы заказать свою любимую еду</Text>

      <View style={styles.phoneContainer}>
        <View style={styles.prefix}>
          <Text style={styles.prefixText}>+7</Text>
        </View>
        <TextInput
          style={styles.input}
          keyboardType="number-pad"
          placeholder="Введите свой номер телефона"
          placeholderTextColor={theme.colors.textSecondary}
          value={formatPhone(phoneDigits)}
          onChangeText={handleChange}
          maxLength={16}
        />
      </View>

      <Pressable style={styles.button} onPress={handleContinue}>
        <Text style={styles.buttonText}>Продолжить</Text>
      </Pressable>

      <Text style={styles.policyText}>
        Продолжая вы соглашаетесь с{' '}
        <Text style={styles.policyLink}>политикой конфиденциальности</Text>
      </Text>
    </KeyboardAvoidingView>
  );
}
