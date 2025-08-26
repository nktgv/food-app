import React from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView, TouchableOpacity, Linking } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../theme/ThemeProvider';
import { fontFamily } from '../theme/typography';

export default function SupportScreen() {
  const theme = useTheme();

  const handlePhonePress = () => {
    Linking.openURL('tel:+79991234567');
  };

  const handleEmailPress = () => {
    Linking.openURL('mailto:support@fastfoodfamily.ru');
  };

  const handleTelegramPress = () => {
    Linking.openURL('https://t.me/fastfoodfamily_support');
  };

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
      marginBottom: 16,
    },
    contactCard: {
      backgroundColor: theme.colors.surface,
      padding: 16,
      borderRadius: 12,
      marginBottom: 12,
      flexDirection: 'row',
      alignItems: 'center',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.05,
      shadowRadius: 4,
      elevation: 2,
    },
    contactIcon: {
      marginRight: 16,
    },
    contactInfo: {
      flex: 1,
    },
    contactTitle: {
      fontSize: 16,
      fontWeight: '600',
      fontFamily: fontFamily.semiBold,
      color: theme.colors.textPrimary,
      marginBottom: 4,
    },
    contactDescription: {
      fontSize: 14,
      fontFamily: fontFamily.regular,
      color: theme.colors.textSecondary,
    },
    contactValue: {
      fontSize: 14,
      fontFamily: fontFamily.medium,
      color: theme.colors.primary,
      marginTop: 4,
    },
    faqItem: {
      backgroundColor: theme.colors.surface,
      padding: 16,
      borderRadius: 12,
      marginBottom: 12,
    },
    faqQuestion: {
      fontSize: 16,
      fontWeight: '600',
      fontFamily: fontFamily.semiBold,
      color: theme.colors.textPrimary,
      marginBottom: 8,
    },
    faqAnswer: {
      fontSize: 14,
      lineHeight: 20,
      fontFamily: fontFamily.regular,
      color: theme.colors.textSecondary,
    },
    workingHours: {
      backgroundColor: theme.colors.surface,
      padding: 16,
      borderRadius: 12,
      borderLeftWidth: 4,
      borderLeftColor: theme.colors.primary,
    },
    workingTitle: {
      fontSize: 16,
      fontWeight: '600',
      fontFamily: fontFamily.semiBold,
      color: theme.colors.textPrimary,
      marginBottom: 8,
    },
    workingText: {
      fontSize: 14,
      fontFamily: fontFamily.regular,
      color: theme.colors.textSecondary,
      marginBottom: 4,
    },
  });

  const faqData = [
    {
      question: 'Сколько времени занимает доставка?',
      answer: 'Обычно доставка занимает от 30 до 60 минут в зависимости от загруженности и вашего местоположения. Точное время будет указано при оформлении заказа.'
    },
    {
      question: 'Можно ли отменить заказ?',
      answer: 'Да, заказ можно отменить бесплатно до начала его приготовления. После начала приготовления отмена возможна только по согласованию с рестораном.'
    },
    {
      question: 'Какие способы оплаты доступны?',
      answer: 'Мы принимаем оплату банковскими картами, через Apple Pay, Google Pay, а также наличными курьеру при получении заказа.'
    },
    {
      question: 'Есть ли программа лояльности?',
      answer: 'Да! В нашем приложении действует система накопления бонусов. За каждый заказ вы получаете от 5% до 20% кешбэка в зависимости от вашего статуса.'
    },
    {
      question: 'Что делать, если заказ пришел не тот?',
      answer: 'Сразу обратитесь в службу поддержки через приложение или по телефону. Мы оперативно решим проблему и либо довезем правильный заказ, либо вернем деньги.'
    }
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>Поддержка</Text>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Свяжитесь с нами</Text>
          
          <TouchableOpacity style={styles.contactCard} onPress={handlePhonePress}>
            <View style={styles.contactIcon}>
              <Ionicons name="call" size={24} color={theme.colors.primary} />
            </View>
            <View style={styles.contactInfo}>
              <Text style={styles.contactTitle}>Телефон</Text>
              <Text style={styles.contactDescription}>Звонок по России</Text>
              <Text style={styles.contactValue}>+7 (999) 123-45-67</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={styles.contactCard} onPress={handleEmailPress}>
            <View style={styles.contactIcon}>
              <Ionicons name="mail" size={24} color={theme.colors.primary} />
            </View>
            <View style={styles.contactInfo}>
              <Text style={styles.contactTitle}>Email</Text>
              <Text style={styles.contactDescription}>Ответим в течение 24 часов</Text>
              <Text style={styles.contactValue}>support@fastfoodfamily.ru</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={styles.contactCard} onPress={handleTelegramPress}>
            <View style={styles.contactIcon}>
              <Ionicons name="paper-plane" size={24} color={theme.colors.primary} />
            </View>
            <View style={styles.contactInfo}>
              <Text style={styles.contactTitle}>Telegram</Text>
              <Text style={styles.contactDescription}>Быстрая поддержка в мессенджере</Text>
              <Text style={styles.contactValue}>@fastfoodfamily_support</Text>
            </View>
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Время работы</Text>
          <View style={styles.workingHours}>
            <Text style={styles.workingTitle}>Ресторан и доставка</Text>
            <Text style={styles.workingText}>Понедельник - Воскресенье: 10:00 - 23:00</Text>
            <Text style={styles.workingText}>Служба поддержки: 9:00 - 24:00</Text>
            <Text style={styles.workingText}>Последний заказ принимается в 22:30</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Часто задаваемые вопросы</Text>
          {faqData.map((item, index) => (
            <View key={index} style={styles.faqItem}>
              <Text style={styles.faqQuestion}>{item.question}</Text>
              <Text style={styles.faqAnswer}>{item.answer}</Text>
            </View>
          ))}
        </View>

        <View style={styles.section}>
          <View style={styles.workingHours}>
            <Text style={styles.workingTitle}>Адрес</Text>
            <Text style={styles.workingText}>г. Москва, ул. Примерная, д. 123</Text>
            <Text style={styles.workingText}>Ближайшее метро: Примерная (5 мин пешком)</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
