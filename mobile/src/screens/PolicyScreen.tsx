import React from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView } from 'react-native';
import { useTheme } from '../theme/ThemeProvider';
import { fontFamily } from '../theme/typography';

export default function PolicyScreen() {
  const theme = useTheme();

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    content: {
      padding: 20,
    },
    title: {
      fontSize: 28,
      fontWeight: '700',
      fontFamily: fontFamily.bold,
      color: theme.colors.textPrimary,
      marginBottom: 20,
      textAlign: 'center',
    },
    section: {
      marginBottom: 24,
    },
    sectionTitle: {
      fontSize: 18,
      fontWeight: '600',
      fontFamily: fontFamily.semiBold,
      color: theme.colors.textPrimary,
      marginBottom: 12,
    },
    paragraph: {
      fontSize: 14,
      lineHeight: 20,
      fontFamily: fontFamily.regular,
      color: theme.colors.textSecondary,
      marginBottom: 12,
    },
    listItem: {
      fontSize: 14,
      lineHeight: 20,
      fontFamily: fontFamily.regular,
      color: theme.colors.textSecondary,
      marginBottom: 6,
      marginLeft: 16,
    },
    contactInfo: {
      backgroundColor: theme.colors.surface,
      padding: 16,
      borderRadius: 12,
      marginTop: 20,
    },
    contactTitle: {
      fontSize: 16,
      fontWeight: '600',
      fontFamily: fontFamily.semiBold,
      color: theme.colors.textPrimary,
      marginBottom: 8,
    },
    contactText: {
      fontSize: 14,
      fontFamily: fontFamily.regular,
      color: theme.colors.textSecondary,
      marginBottom: 4,
    },
  });

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>Политика конфиденциальности</Text>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>1. Общие положения</Text>
          <Text style={styles.paragraph}>
            Настоящая политика обработки персональных данных (далее - Политика) 
            действует в отношении всей информации, которую приложение Fast Food Family 
            может получить о пользователе во время использования приложения.
          </Text>
          <Text style={styles.paragraph}>
            Использование приложения означает согласие с условиями данной политики 
            обработки персональных данных и указанными в ней условиями обработки 
            персональной информации пользователя.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>2. Сбор и использование информации</Text>
          <Text style={styles.paragraph}>
            Мы собираем и используем следующие виды информации:
          </Text>
          <Text style={styles.listItem}>• Имя, телефон, email для оформления заказов</Text>
          <Text style={styles.listItem}>• Адрес доставки для выполнения заказов</Text>
          <Text style={styles.listItem}>• Информация о заказах и предпочтениях</Text>
          <Text style={styles.listItem}>• Технические данные устройства для работы приложения</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>3. Защита информации</Text>
          <Text style={styles.paragraph}>
            Мы применяем современные технологии защиты для обеспечения безопасности 
            ваших персональных данных. Все данные передаются по защищенным каналам 
            связи и хранятся на защищенных серверах.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>4. Передача третьим лицам</Text>
          <Text style={styles.paragraph}>
            Мы не продаем, не обмениваем и не передаем ваши персональные данные 
            третьим лицам, за исключением случаев, необходимых для выполнения заказа 
            (службы доставки, платежные системы).
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>5. Cookies и аналитика</Text>
          <Text style={styles.paragraph}>
            Приложение может использовать технологии для улучшения качества сервиса 
            и анализа пользовательского опыта. Вы можете отключить сбор аналитики 
            в настройках приложения.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>6. Ваши права</Text>
          <Text style={styles.paragraph}>
            Вы имеете право:
          </Text>
          <Text style={styles.listItem}>• Получать информацию о ваших персональных данных</Text>
          <Text style={styles.listItem}>• Требовать исправления неточных данных</Text>
          <Text style={styles.listItem}>• Требовать удаления ваших данных</Text>
          <Text style={styles.listItem}>• Отозвать согласие на обработку данных</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>7. Изменения в политике</Text>
          <Text style={styles.paragraph}>
            Мы оставляем за собой право изменять данную политику. При внесении 
            изменений дата вступления изменений в силу будет обновлена. 
            Продолжение использования приложения означает согласие с изменениями.
          </Text>
        </View>

        <View style={styles.contactInfo}>
          <Text style={styles.contactTitle}>Контактная информация</Text>
          <Text style={styles.contactText}>Email: privacy@fastfoodfamily.ru</Text>
          <Text style={styles.contactText}>Телефон: +7 (999) 123-45-67</Text>
          <Text style={styles.contactText}>
            Последнее обновление: {new Date().toLocaleDateString('ru-RU')}
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
