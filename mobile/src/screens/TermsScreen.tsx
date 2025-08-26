import React from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView } from 'react-native';
import { useTheme } from '../theme/ThemeProvider';
import { fontFamily } from '../theme/typography';

export default function TermsScreen() {
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
    warning: {
      backgroundColor: theme.colors.surface,
      padding: 16,
      borderRadius: 12,
      marginTop: 20,
      borderLeftWidth: 4,
      borderLeftColor: theme.colors.primary,
    },
    warningTitle: {
      fontSize: 16,
      fontWeight: '600',
      fontFamily: fontFamily.semiBold,
      color: theme.colors.primary,
      marginBottom: 8,
    },
    warningText: {
      fontSize: 14,
      fontFamily: fontFamily.regular,
      color: theme.colors.textSecondary,
    },
  });

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>Условия пользования</Text>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>1. Принятие условий</Text>
          <Text style={styles.paragraph}>
            Используя мобильное приложение Fast Food Family, вы соглашаетесь с настоящими 
            условиями пользования. Если вы не согласны с какими-либо из этих условий, 
            пожалуйста, не используйте наше приложение.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>2. Описание сервиса</Text>
          <Text style={styles.paragraph}>
            Fast Food Family - это мобильное приложение для заказа еды с доставкой. 
            Мы предоставляем платформу для выбора, заказа и оплаты блюд из нашего 
            ресторана быстрого питания.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>3. Регистрация и аккаунт</Text>
          <Text style={styles.paragraph}>
            Для использования некоторых функций приложения вам может потребоваться 
            создать аккаунт. Вы обязуются:
          </Text>
          <Text style={styles.listItem}>• Предоставлять точную и актуальную информацию</Text>
          <Text style={styles.listItem}>• Поддерживать безопасность вашего аккаунта</Text>
          <Text style={styles.listItem}>• Немедленно уведомлять о несанкционированном доступе</Text>
          <Text style={styles.listItem}>• Нести ответственность за все действия в аккаунте</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>4. Заказы и оплата</Text>
          <Text style={styles.paragraph}>
            При размещении заказа:
          </Text>
          <Text style={styles.listItem}>• Вы подтверждаете правильность всей информации</Text>
          <Text style={styles.listItem}>• Оплата производится через безопасные платежные системы</Text>
          <Text style={styles.listItem}>• Цены могут изменяться без предварительного уведомления</Text>
          <Text style={styles.listItem}>• Мы оставляем право отклонить заказ в случае недоступности товара</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>5. Доставка</Text>
          <Text style={styles.paragraph}>
            Условия доставки:
          </Text>
          <Text style={styles.listItem}>• Доставка осуществляется в пределах зоны обслуживания</Text>
          <Text style={styles.listItem}>• Время доставки является ориентировочным</Text>
          <Text style={styles.listItem}>• За доставку может взиматься дополнительная плата</Text>
          <Text style={styles.listItem}>• Клиент должен быть доступен по указанному адресу</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>6. Возврат и отмена</Text>
          <Text style={styles.paragraph}>
            Отмена заказа возможна до начала его приготовления. После начала 
            приготовления отмена возможна только по соглашению сторон. Возврат 
            средств осуществляется в течение 5-10 рабочих дней.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>7. Запрещенное использование</Text>
          <Text style={styles.paragraph}>
            Запрещается:
          </Text>
          <Text style={styles.listItem}>• Использовать приложение в незаконных целях</Text>
          <Text style={styles.listItem}>• Нарушать работу приложения или серверов</Text>
          <Text style={styles.listItem}>• Копировать или модифицировать контент приложения</Text>
          <Text style={styles.listItem}>• Создавать поддельные аккаунты или заказы</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>8. Ответственность</Text>
          <Text style={styles.paragraph}>
            Мы прикладываем максимальные усилия для обеспечения качественного сервиса, 
            однако не несем ответственности за косвенные убытки, возникшие в результате 
            использования приложения.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>9. Изменение условий</Text>
          <Text style={styles.paragraph}>
            Мы оставляем за собой право изменять настоящие условия в любое время. 
            Существенные изменения будут доведены до пользователей через приложение 
            или email-уведомления.
          </Text>
        </View>

        <View style={styles.warning}>
          <Text style={styles.warningTitle}>Важно!</Text>
          <Text style={styles.warningText}>
            Продолжая использовать приложение, вы соглашаетесь с текущей версией 
            условий пользования. Последнее обновление: {new Date().toLocaleDateString('ru-RU')}
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
