import React from 'react';
import { View, Text, StyleSheet, Linking, ScrollView } from 'react-native';
import { useTheme } from '../theme/ThemeProvider';
import { fontFamily } from '../theme/typography';

export default function AboutScreen() {
  const theme = useTheme();

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
      padding: 24,
    },
    title: {
      fontSize: 24,
      fontFamily: fontFamily.bold,
      color: theme.colors.textPrimary,
      marginBottom: 16,
    },
    text: {
      fontSize: 14,
      fontFamily: fontFamily.regular,
      color: theme.colors.textSecondary,
      marginBottom: 12,
    },
    link: {
      color: theme.colors.primary,
      textDecorationLine: 'underline',
    },
  });

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <Text style={styles.title}>О приложении</Text>
      <Text style={styles.text}>Fast Food Family v1.0.0</Text>
      <Text style={styles.text}>© {new Date().getFullYear()} Fast Food Family</Text>
      <Text style={styles.text}>
        Политику конфиденциальности можно посмотреть
        <Text style={styles.link} onPress={() => Linking.openURL('#')}> здесь</Text>
      </Text>
      <Text style={styles.text}>Контакты: support@fastfoodfamily.com</Text>
    </ScrollView>
  );
}
