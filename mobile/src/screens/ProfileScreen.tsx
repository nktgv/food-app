import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function ProfileScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.header}>
          <Text style={styles.title}>Профиль</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Информация о пользователе</Text>
          <View style={styles.infoCard}>
            <Text style={styles.infoLabel}>Имя:</Text>
            <Text style={styles.infoValue}>Пользователь</Text>
          </View>
          <View style={styles.infoCard}>
            <Text style={styles.infoLabel}>Email:</Text>
            <Text style={styles.infoValue}>user@example.com</Text>
          </View>
          <View style={styles.infoCard}>
            <Text style={styles.infoLabel}>Телефон:</Text>
            <Text style={styles.infoValue}>+7 (999) 123-45-67</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>История заказов</Text>
          <TouchableOpacity style={styles.menuItem}>
            <Text style={styles.menuText}>Мои заказы</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItem}>
            <Text style={styles.menuText}>Избранное</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Настройки</Text>
          <TouchableOpacity style={styles.menuItem}>
            <Text style={styles.menuText}>Уведомления</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItem}>
            <Text style={styles.menuText}>Язык</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItem}>
            <Text style={styles.menuText}>Тема</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>О приложении</Text>
          <View style={styles.infoCard}>
            <Text style={styles.infoLabel}>Версия:</Text>
            <Text style={styles.infoValue}>1.0.0</Text>
          </View>
          <TouchableOpacity style={styles.menuItem}>
            <Text style={styles.menuText}>Политика конфиденциальности</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItem}>
            <Text style={styles.menuText}>Условия использования</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItem}>
            <Text style={styles.menuText}>Поддержка</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.logoutButton}>
          <Text style={styles.logoutText}>Выйти</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollView: {
    flex: 1,
  },
  header: {
    padding: 20,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  section: {
    marginTop: 20,
    backgroundColor: '#fff',
    marginHorizontal: 16,
    borderRadius: 12,
    padding: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 12,
  },
  infoCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  infoLabel: {
    fontSize: 16,
    color: '#666',
  },
  infoValue: {
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
  },
  menuItem: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  menuText: {
    fontSize: 16,
    color: '#333',
  },
  logoutButton: {
    margin: 16,
    backgroundColor: '#ff4444',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  logoutText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
