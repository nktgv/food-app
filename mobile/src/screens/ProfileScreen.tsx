import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert, Modal, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useTheme, useThemeContext } from '../theme/ThemeProvider';
import { Ionicons } from '@expo/vector-icons';
import { ProfileStackParamList } from './ProfileWrapper';

type ProfileScreenNavigationProp = NativeStackNavigationProp<ProfileStackParamList, 'ProfileMain'>;

interface ProfileScreenProps {
  navigation: ProfileScreenNavigationProp;
}

export default function ProfileScreen({ navigation }: ProfileScreenProps) {
  const theme = useTheme();
  const { themeMode, setThemeMode, systemScheme } = useThemeContext();
  
  // Profile state
  const [profile, setProfile] = useState({
    name: 'Александр Петров',
    email: 'alex.petrov@example.com',
    phone: '+7 (999) 123-45-67',
  });

  // Loyalty program state
  const [loyaltyData] = useState({
    bonusBalance: 1250,
    totalSpent: 25000,
    level: 'Gold',
    bonusRate: 15, // 15% возврат
    nextLevelSpend: 5000, // осталось потратить до следующего уровня
  });

  // Edit modal state
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [editedProfile, setEditedProfile] = useState(profile);

  const handleEditProfile = () => {
    setEditedProfile(profile);
    setEditModalVisible(true);
  };

  const handleSaveProfile = () => {
    setProfile(editedProfile);
    setEditModalVisible(false);
    Alert.alert('Успех', 'Профиль обновлен!');
  };

  const getLoyaltyLevelInfo = (level: string) => {
    switch (level) {
      case 'Silver':
        return { color: ['#C0C0C0', '#E8E8E8'] as [string, string], icon: 'medal-outline', rate: 5 };
      case 'Gold':
        return { color: ['#D4AF37', '#F7E98E'] as [string, string], icon: 'medal', rate: 15 };
      case 'Platinum':
        return { color: ['#E5E4E2', '#F8F8FF'] as [string, string], icon: 'trophy', rate: 20 };
      default:
        return { color: ['#8B4513', '#DEB887'] as [string, string], icon: 'ribbon-outline', rate: 5 };
    }
  };

  const handleThemePress = () => {
    Alert.alert(
      'Выбор темы',
      `Системная тема: ${systemScheme || 'неизвестно'}`,
      [
        {
          text: 'Авто (системная)',
          onPress: () => setThemeMode('auto'),
          style: themeMode === 'auto' ? 'default' : 'cancel'
        },
        {
          text: 'Светлая',
          onPress: () => setThemeMode('light'),
          style: themeMode === 'light' ? 'default' : 'cancel'
        },
        {
          text: 'Темная',
          onPress: () => setThemeMode('dark'),
          style: themeMode === 'dark' ? 'default' : 'cancel'
        }
      ]
    );
  };

  const handlePolicyPress = () => {
    navigation.navigate('Policy');
  };

  const handleTermsPress = () => {
    navigation.navigate('Terms');
  };

  const handleSupportPress = () => {
    navigation.navigate('Support');
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <ScrollView style={styles.scrollView}>



        {/* Карта лояльности */}
        <View style={[styles.section, { backgroundColor: 'transparent', padding: 0 }]}>
          <LinearGradient
            colors={getLoyaltyLevelInfo(loyaltyData.level).color}
            style={styles.loyaltyCard}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <View style={styles.loyaltyHeader}>
              <View>
                <Text style={styles.loyaltyTitle}>FAST FOOD FAMILY</Text>
                <Text style={styles.loyaltySubtitle}>Карта лояльности</Text>
              </View>
              <Ionicons 
                name={getLoyaltyLevelInfo(loyaltyData.level).icon as any} 
                size={32} 
                color="rgba(0, 0, 0, 0.8)" 
              />
            </View>
            
            <View style={styles.loyaltyContent}>
              <View style={styles.loyaltyBalance}>
                <Text style={styles.balanceLabel}>Баланс бонусов</Text>
                <Text style={styles.balanceValue}>{loyaltyData.bonusBalance} ₽</Text>
              </View>
              
              <View style={styles.loyaltyLevel}>
                <Text style={styles.levelLabel}>Уровень: {loyaltyData.level}</Text>
                <Text style={styles.levelRate}>Возврат: {loyaltyData.bonusRate}%</Text>
              </View>
            </View>
            
            <View style={styles.loyaltyProgress}>
              <Text style={styles.progressText}>
                До Platinum: осталось потратить {loyaltyData.nextLevelSpend} ₽
              </Text>
              <View style={styles.progressBar}>
                <View 
                  style={[
                    styles.progressFill, 
                    { width: `${Math.max(10, ((loyaltyData.totalSpent % 30000) / 30000) * 100)}%` }
                  ]} 
                />
              </View>
            </View>
          </LinearGradient>
        </View>

        <View style={[styles.section, { backgroundColor: theme.colors.surface }]}>
          <Text style={[styles.sectionTitle, { color: theme.colors.textPrimary }]}>Информация о пользователе</Text>
          
          <View style={[styles.infoCard, { borderBottomColor: theme.colors.divider }]}>
            <Text style={[styles.infoLabel, { color: theme.colors.textSecondary }]}>Имя:</Text>
            <Text style={[styles.infoValue, { color: theme.colors.textPrimary }]}>{profile.name}</Text>
          </View>
          <View style={[styles.infoCard, { borderBottomColor: theme.colors.divider }]}>
            <Text style={[styles.infoLabel, { color: theme.colors.textSecondary }]}>Email:</Text>
            <Text style={[styles.infoValue, { color: theme.colors.textPrimary }]}>{profile.email}</Text>
          </View>
          <View style={[styles.infoCard, { borderBottomColor: theme.colors.divider }]}>
            <Text style={[styles.infoLabel, { color: theme.colors.textSecondary }]}>Телефон:</Text>
            <Text style={[styles.infoValue, { color: theme.colors.textPrimary }]}>{profile.phone}</Text>
          </View>
          
          <TouchableOpacity onPress={handleEditProfile} style={[styles.fullEditButton, { backgroundColor: theme.colors.primary }]}>
            <Ionicons name="pencil" size={20} color={theme.colors.surface} />
            <Text style={[styles.fullEditButtonText, { color: theme.colors.surface }]}>Изменить профиль</Text>
          </TouchableOpacity>
        </View>

        <View style={[styles.section, { backgroundColor: theme.colors.surface }]}>
          <Text style={[styles.sectionTitle, { color: theme.colors.textPrimary }]}>Последние три заказа</Text>
          
          <View style={[styles.orderItem, { borderBottomColor: theme.colors.divider }]}>
            <View style={styles.orderInfo}>
              <Text style={[styles.orderTitle, { color: theme.colors.textPrimary }]}>Заказ #2045</Text>
              <Text style={[styles.orderDate, { color: theme.colors.textSecondary }]}>25 августа, 18:45</Text>
            </View>
            <View style={styles.orderStatus}>
              <Text style={[styles.orderPrice, { color: theme.colors.textPrimary }]}>1,250 ₽</Text>
              <Text style={[styles.statusText, { color: theme.colors.success }]}>Доставлен</Text>
            </View>
          </View>

          <View style={[styles.orderItem, { borderBottomColor: theme.colors.divider }]}>
            <View style={styles.orderInfo}>
              <Text style={[styles.orderTitle, { color: theme.colors.textPrimary }]}>Заказ #2034</Text>
              <Text style={[styles.orderDate, { color: theme.colors.textSecondary }]}>22 августа, 14:20</Text>
            </View>
            <View style={styles.orderStatus}>
              <Text style={[styles.orderPrice, { color: theme.colors.textPrimary }]}>890 ₽</Text>
              <Text style={[styles.statusText, { color: theme.colors.success }]}>Доставлен</Text>
            </View>
          </View>

          <View style={[styles.orderItem, { borderBottomColor: theme.colors.divider }]}>
            <View style={styles.orderInfo}>
              <Text style={[styles.orderTitle, { color: theme.colors.textPrimary }]}>Заказ #2021</Text>
              <Text style={[styles.orderDate, { color: theme.colors.textSecondary }]}>19 августа, 20:15</Text>
            </View>
            <View style={styles.orderStatus}>
              <Text style={[styles.orderPrice, { color: theme.colors.textPrimary }]}>1,540 ₽</Text>
              <Text style={[styles.statusText, { color: theme.colors.success }]}>Доставлен</Text>
            </View>
          </View>

          <TouchableOpacity style={[styles.moreButton, { backgroundColor: theme.colors.primary }]}>
            <Text style={[styles.moreButtonText, { color: theme.colors.surface }]}>Показать ещё</Text>
          </TouchableOpacity>
        </View>

        <View style={[styles.section, { backgroundColor: theme.colors.surface }]}>
          <Text style={[styles.sectionTitle, { color: theme.colors.textPrimary }]}>Настройки</Text>
          <TouchableOpacity style={[styles.menuItem, { borderBottomColor: theme.colors.divider }]}>
            <Text style={[styles.menuText, { color: theme.colors.textPrimary }]}>Уведомления</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.menuItem, { borderBottomColor: theme.colors.divider }]}>
            <Text style={[styles.menuText, { color: theme.colors.textPrimary }]}>Язык</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.menuItem, { borderBottomColor: theme.colors.divider }]} onPress={handleThemePress}>
            <View style={styles.menuItemContent}>
              <View style={styles.menuItemLeft}>
                <Ionicons 
                  name={theme.mode === 'dark' ? 'moon' : 'sunny'} 
                  size={20} 
                  color={theme.colors.primary} 
                  style={styles.menuIcon}
                />
                <Text style={[styles.menuText, { color: theme.colors.textPrimary }]}>Тема</Text>
              </View>
              <Text style={[styles.menuSubText, { color: theme.colors.textSecondary }]}>
                {themeMode === 'auto' ? 'Авто' : themeMode === 'dark' ? 'Темная' : 'Светлая'}
              </Text>
            </View>
          </TouchableOpacity>
        </View>

        <View style={[styles.section, { backgroundColor: theme.colors.surface }]}>
          <Text style={[styles.sectionTitle, { color: theme.colors.textPrimary }]}>О приложении</Text>
          <View style={[styles.infoCard, { borderBottomColor: theme.colors.divider }]}>
            <Text style={[styles.infoLabel, { color: theme.colors.textSecondary }]}>Версия:</Text>
            <Text style={[styles.infoValue, { color: theme.colors.textPrimary }]}>1.0.0</Text>
          </View>
          <TouchableOpacity style={[styles.menuItem, { borderBottomColor: theme.colors.divider }]} onPress={handlePolicyPress}>
            <Text style={[styles.menuText, { color: theme.colors.textPrimary }]}>Политика конфиденциальности</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.menuItem, { borderBottomColor: theme.colors.divider }]} onPress={handleTermsPress}>
            <Text style={[styles.menuText, { color: theme.colors.textPrimary }]}>Условия использования</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.menuItem, { borderBottomColor: theme.colors.divider }]} onPress={handleSupportPress}>
            <Text style={[styles.menuText, { color: theme.colors.textPrimary }]}>Поддержка</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={[styles.logoutButton, { backgroundColor: theme.colors.error }]}>
          <Text style={[styles.logoutText, { color: theme.colors.surface }]}>Выйти</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Modal for editing profile */}
      <Modal
        visible={editModalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setEditModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContent, { backgroundColor: theme.colors.surface }]}>
            <View style={[styles.modalHeader, { borderBottomColor: theme.colors.divider }]}>
              <Text style={[styles.modalTitle, { color: theme.colors.textPrimary }]}>Редактировать профиль</Text>
              <TouchableOpacity onPress={() => setEditModalVisible(false)}>
                <Ionicons name="close" size={24} color={theme.colors.textSecondary} />
              </TouchableOpacity>
            </View>

            <ScrollView style={styles.modalBody}>
              <View style={styles.inputGroup}>
                <Text style={[styles.inputLabel, { color: theme.colors.textSecondary }]}>Имя</Text>
                <TextInput
                  style={[
                    styles.textInput, 
                    { 
                      backgroundColor: theme.colors.background, 
                      borderColor: theme.colors.divider,
                      color: theme.colors.textPrimary
                    }
                  ]}
                  value={editedProfile.name}
                  onChangeText={(text) => setEditedProfile({...editedProfile, name: text})}
                  placeholder="Введите имя"
                  placeholderTextColor={theme.colors.textSecondary}
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={[styles.inputLabel, { color: theme.colors.textSecondary }]}>Email</Text>
                <TextInput
                  style={[
                    styles.textInput, 
                    { 
                      backgroundColor: theme.colors.background, 
                      borderColor: theme.colors.divider,
                      color: theme.colors.textPrimary
                    }
                  ]}
                  value={editedProfile.email}
                  onChangeText={(text) => setEditedProfile({...editedProfile, email: text})}
                  placeholder="Введите email"
                  placeholderTextColor={theme.colors.textSecondary}
                  keyboardType="email-address"
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={[styles.inputLabel, { color: theme.colors.textSecondary }]}>Телефон</Text>
                <TextInput
                  style={[
                    styles.textInput, 
                    { 
                      backgroundColor: theme.colors.background, 
                      borderColor: theme.colors.divider,
                      color: theme.colors.textPrimary
                    }
                  ]}
                  value={editedProfile.phone}
                  onChangeText={(text) => setEditedProfile({...editedProfile, phone: text})}
                  placeholder="Введите телефон"
                  placeholderTextColor={theme.colors.textSecondary}
                  keyboardType="phone-pad"
                />
              </View>
            </ScrollView>

            <View style={styles.modalFooter}>
              <TouchableOpacity 
                style={[styles.cancelButton, { borderColor: theme.colors.divider }]} 
                onPress={() => setEditModalVisible(false)}
              >
                <Text style={[styles.cancelButtonText, { color: theme.colors.textSecondary }]}>Отмена</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={[styles.saveButton, { backgroundColor: theme.colors.primary }]} 
                onPress={handleSaveProfile}
              >
                <Text style={[styles.saveButtonText, { color: theme.colors.surface }]}>Сохранить</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  section: {
    marginTop: 20,
    marginHorizontal: 16,
    borderRadius: 12,
    padding: 16,
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
  },
  editButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  editText: {
    fontSize: 14,
    marginLeft: 6,
    fontWeight: '600',
    letterSpacing: 0.3,
  },
  fullEditButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    borderRadius: 12,
    marginTop: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  fullEditButtonText: {
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
    letterSpacing: 0.3,
  },
  
  // Loyalty Card Styles
  loyaltyCard: {
    marginHorizontal: 16,
    borderRadius: 16,
    padding: 20,
    marginTop: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 8,
  },
  loyaltyHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 20,
  },
  loyaltyTitle: {
    color: 'rgba(0, 0, 0, 0.9)',
    fontSize: 22,
    fontWeight: '900',
    letterSpacing: 1.5,
    textShadowColor: 'rgba(255, 255, 255, 0.8)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  loyaltySubtitle: {
    color: 'rgba(0, 0, 0, 0.8)',
    fontSize: 16,
    fontWeight: '700',
    marginTop: 2,
    textShadowColor: 'rgba(255, 255, 255, 0.6)',
    textShadowOffset: { width: 0.5, height: 0.5 },
    textShadowRadius: 1,
  },
  loyaltyContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  loyaltyBalance: {
    flex: 1,
  },
  balanceLabel: {
    color: 'rgba(0, 0, 0, 0.75)',
    fontSize: 14,
    fontWeight: '700',
    textTransform: 'uppercase',
    marginBottom: 4,
    letterSpacing: 1.0,
    textShadowColor: 'rgba(255, 255, 255, 0.5)',
    textShadowOffset: { width: 0.5, height: 0.5 },
    textShadowRadius: 1,
  },
  balanceValue: {
    color: 'rgba(0, 0, 0, 0.95)',
    fontSize: 30,
    fontWeight: '900',
    textShadowColor: 'rgba(255, 255, 255, 0.8)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  loyaltyLevel: {
    alignItems: 'flex-end',
  },
  levelLabel: {
    color: 'rgba(0, 0, 0, 0.8)',
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 2,
    textShadowColor: 'rgba(255, 255, 255, 0.5)',
    textShadowOffset: { width: 0.5, height: 0.5 },
    textShadowRadius: 1,
  },
  levelRate: {
    color: 'rgba(0, 0, 0, 0.95)',
    fontSize: 20,
    fontWeight: '900',
    textShadowColor: 'rgba(255, 255, 255, 0.8)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  loyaltyProgress: {
    marginTop: 5,
  },
  progressText: {
    color: 'rgba(0, 0, 0, 0.8)',
    fontSize: 13,
    marginBottom: 8,
    fontWeight: '600',
    textShadowColor: 'rgba(255, 255, 255, 0.4)',
    textShadowOffset: { width: 0.5, height: 0.5 },
    textShadowRadius: 1,
  },
  progressBar: {
    height: 6,
    backgroundColor: 'rgba(0, 0, 0, 0.15)',
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    borderRadius: 3,
  },
  
  // Original styles
  infoCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
  },
  infoLabel: {
    fontSize: 16,
  },
  infoValue: {
    fontSize: 16,
    fontWeight: '500',
  },
  menuItem: {
    paddingVertical: 12,
    borderBottomWidth: 1,
  },
  menuText: {
    fontSize: 16,
  },
  menuItemContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    flex: 1,
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuIcon: {
    marginRight: 12,
  },
  menuSubText: {
    fontSize: 14,
  },
  logoutButton: {
    margin: 16,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  logoutText: {
    fontSize: 16,
    fontWeight: '600',
  },
  
  // Modal styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: '80%',
    paddingBottom: 20,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '700',
  },
  modalBody: {
    padding: 20,
    maxHeight: 300,
  },
  inputGroup: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
  },
  textInput: {
    borderWidth: 1,
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    fontWeight: '500',
  },
  modalFooter: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingTop: 20,
    gap: 12,
  },
  cancelButton: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
  },
  cancelButtonText: {
    fontSize: 16,
    fontWeight: '600',
  },
  saveButton: {
    flex: 1,
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
  },
  saveButtonText: {
    fontSize: 16,
    fontWeight: '600',
  },

  // Order styles
  orderItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
  },
  orderInfo: {
    flex: 1,
  },
  orderTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  orderDate: {
    fontSize: 13,
    opacity: 0.7,
  },
  orderStatus: {
    alignItems: 'flex-end',
  },
  orderPrice: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 4,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  moreButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    borderRadius: 12,
    marginTop: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  moreButtonText: {
    fontSize: 16,
    fontWeight: '600',
    letterSpacing: 0.3,
  },
});
