import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, TextInput, StatusBar, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../theme/ThemeProvider';
import { Ionicons } from '@expo/vector-icons';

export default function ProfileScreen() {
  const theme = useTheme();
  
  // Profile state
  const [profileData, setProfileData] = useState({
    name: 'Владислав',
    phone: '+7 (910) 827-52-18',
  });

  // Loyalty program state
  const [loyaltyData] = useState({
    bonusBalance: 1250,
    cashbackLevel: 7, // 7% cashback
    levelName: 'Gold',
    totalSpent: 25000,
    nextLevelSpend: 5000,
  });

  const getLoyaltyLevelInfo = (cashbackLevel: number) => {
    switch (cashbackLevel) {
      case 1:
        return { 
          name: 'Новичок', 
          color: '#E0E0E0',
          icon: 'star-outline',
          description: 'Начинающий участник'
        };
      case 5:
        return { 
          name: 'Бронза', 
          color: '#CD7F32',
          icon: 'medal',
          description: 'Активный клиент'
        };
      case 7:
        return { 
          name: 'Золото', 
          color: '#FFD700',
          icon: 'trophy',
          description: 'Постоянный клиент'
        };
      case 10:
        return { 
          name: 'Платина', 
          color: '#E5E4E2',
          icon: 'diamond',
          description: 'VIP клиент'
        };
      default:
        return { 
          name: 'Новичок', 
          color: '#E0E0E0',
          icon: 'star-outline',
          description: 'Начинающий участник'
        };
    }
  };

  const levelInfo = getLoyaltyLevelInfo(loyaltyData.cashbackLevel);

  const handleLoyaltyPress = () => {
    Alert.alert('Программа лояльности', 'Открывается программа лояльности с детальной информацией о бонусах и уровнях');
  };

  const handleOrdersPress = () => {
    Alert.alert('Мои заказы', 'Открывается история заказов с возможностью отслеживания статусов');
  };

  const handleProfilePress = () => {
    setEditModalVisible(true);
  };

  const handleAboutAppPress = () => {
    Alert.alert('О приложении', 'Версия 1.0.0\nFast Food Family\nПоддержка: support@fastfoodfamily.com');
  };

  const handleLogoutPress = () => {
    Alert.alert(
      'Выйти из приложения',
      'Вы уверены, что хотите выйти?',
      [
        {
          text: 'Отмена',
          style: 'cancel',
        },
        {
          text: 'Выйти',
          style: 'destructive',
          onPress: () => Alert.alert('Выход', 'Вы вышли из приложения'),
        },
      ]
    );
  };

  const handleSaveProfile = () => {
    Alert.alert('Успех', 'Профиль обновлен!');
    setEditModalVisible(false);
  };

  // Edit modal state
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [editedProfile, setEditedProfile] = useState(profileData);

  const openEditModal = () => {
    setEditedProfile(profileData);
    setEditModalVisible(true);
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <StatusBar barStyle={theme.mode === 'dark' ? 'light-content' : 'dark-content'} backgroundColor={theme.colors.surface} />
      
      {/* Header with username in corner */}
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <Text style={styles.userName}>{profileData.name}</Text>
          <Text style={styles.userPhone}>{profileData.phone}</Text>
        </View>
      </View>

      {/* Loyalty Card */}
      <View style={styles.loyaltyCard}>
        <View style={styles.loyaltyHeader}>
          <View style={styles.loyaltyLeft}>
            <View style={[styles.levelIconContainer, { backgroundColor: '#808080' }]}>
              <Ionicons name={levelInfo.icon as any} size={24} color="#fff" />
            </View>
            <View style={styles.loyaltyInfo}>
              <Text style={styles.levelName}>{levelInfo.name}</Text>
              <Text style={styles.levelDescription}>{levelInfo.description}</Text>
            </View>
          </View>
          <View style={styles.loyaltyRight}>
            <Text style={styles.cashbackPercent}>{loyaltyData.cashbackLevel}%</Text>
            <Text style={styles.cashbackLabel}>Кешбэк</Text>
          </View>
        </View>
        
        <View style={styles.loyaltyContent}>
          <View style={styles.bonusSection}>
            <Text style={styles.bonusLabel}>Баланс бонусов</Text>
            <Text style={styles.bonusAmount}>{loyaltyData.bonusBalance}</Text>
          </View>
          
          {loyaltyData.cashbackLevel === 10 ? (
            <View style={styles.vipMessage}>
              <Ionicons name="trophy" size={20} color="#FFD700" />
              <Text style={styles.vipText}>Поздравляем! Вы прошли все уровни!</Text>
            </View>
          ) : (
            <View style={styles.progressSection}>
              <Text style={styles.progressText}>
                До следующего уровня: {loyaltyData.nextLevelSpend} ₽
              </Text>
              <View style={styles.progressBar}>
                <View 
                  style={[
                    styles.progressFill, 
                    { 
                      width: `${Math.max(10, ((loyaltyData.totalSpent % 30000) / 30000) * 100)}%`,
                      backgroundColor: levelInfo.color
                    }
                  ]} 
                />
              </View>
            </View>
          )}
        </View>
      </View>

      {/* Menu Items */}
      <View style={styles.menuContainer}>
        {/* Loyalty Program - First Button */}
        <TouchableOpacity style={styles.menuItem} onPress={handleLoyaltyPress} activeOpacity={0.7}>
          <View style={styles.menuItemLeft}>
            <View style={styles.menuIconContainer}>
              <Ionicons name="card" size={24} color="#808080" />
            </View>
            <View style={styles.menuText}>
              <Text style={styles.menuTitle}>Программа лояльности</Text>
              <Text style={styles.menuSubtitle}>Бонусы, скидки, специальные предложения</Text>
            </View>
          </View>
          <Ionicons name="chevron-forward" size={20} color="#ccc" />
        </TouchableOpacity>

        {/* My Orders */}
        <TouchableOpacity style={styles.menuItem} onPress={handleOrdersPress} activeOpacity={0.7}>
          <View style={styles.menuItemLeft}>
            <View style={styles.menuIconContainer}>
              <Ionicons name="bag" size={24} color="#808080" />
            </View>
            <View style={styles.menuText}>
              <Text style={styles.menuTitle}>Мои заказы</Text>
              <Text style={styles.menuSubtitle}>История заказов и статусы</Text>
            </View>
          </View>
          <Ionicons name="chevron-forward" size={20} color="#ccc" />
        </TouchableOpacity>

        {/* Profile */}
        <TouchableOpacity style={styles.menuItem} onPress={openEditModal} activeOpacity={0.7}>
          <View style={styles.menuItemLeft}>
            <View style={styles.menuIconContainer}>
              <Ionicons name="person" size={24} color="#808080" />
            </View>
            <View style={styles.menuText}>
              <Text style={styles.menuTitle}>Мои данные</Text>
              <Text style={styles.menuSubtitle}>Редактировать профиль</Text>
            </View>
          </View>
          <Ionicons name="chevron-forward" size={20} color="#ccc" />
        </TouchableOpacity>

        {/* About App */}
        <TouchableOpacity style={styles.menuItem} onPress={handleAboutAppPress} activeOpacity={0.7}>
          <View style={styles.menuItemLeft}>
            <View style={styles.menuIconContainer}>
              <Ionicons name="information-circle" size={24} color="#808080" />
            </View>
            <View style={styles.menuText}>
              <Text style={styles.menuTitle}>О приложении</Text>
              <Text style={styles.menuSubtitle}>Версия, информация, поддержка</Text>
            </View>
          </View>
          <Ionicons name="chevron-forward" size={20} color="#ccc" />
        </TouchableOpacity>
      </View>

      {/* Logout Button - Subtle */}
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogoutPress} activeOpacity={0.7}>
        <Ionicons name="log-out-outline" size={20} color="#999" />
        <Text style={styles.logoutText}>Выйти</Text>
      </TouchableOpacity>

      {/* Edit Profile Modal */}
      <Modal
        visible={editModalVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setEditModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContent, { backgroundColor: theme.colors.surface }]}>
            <View style={styles.modalHeader}>
              <Text style={[styles.modalTitle, { color: theme.colors.textPrimary }]}>Редактировать профиль</Text>
              <TouchableOpacity onPress={() => setEditModalVisible(false)}>
                <Ionicons name="close" size={24} color={theme.colors.textSecondary} />
              </TouchableOpacity>
            </View>
            
            <View style={styles.modalBody}>
              <View style={styles.inputGroup}>
                <Text style={[styles.inputLabel, { color: theme.colors.textSecondary }]}>Имя</Text>
                <TextInput
                  style={[styles.input, { 
                    borderColor: theme.colors.border,
                    color: theme.colors.textPrimary,
                    backgroundColor: theme.colors.background
                  }]}
                  value={editedProfile.name}
                  onChangeText={(text) => setEditedProfile({ ...editedProfile, name: text })}
                  placeholder="Введите имя"
                  placeholderTextColor={theme.colors.textLight}
                />
              </View>
              
              <View style={styles.inputGroup}>
                <Text style={[styles.inputLabel, { color: theme.colors.textSecondary }]}>Телефон</Text>
                <TextInput
                  style={[styles.input, { 
                    borderColor: theme.colors.border,
                    color: theme.colors.textPrimary,
                    backgroundColor: theme.colors.background
                  }]}
                  value={editedProfile.phone}
                  onChangeText={(text) => setEditedProfile({ ...editedProfile, phone: text })}
                  placeholder="Введите телефон"
                  placeholderTextColor={theme.colors.textLight}
                  keyboardType="phone-pad"
                />
              </View>
            </View>
            
            <View style={styles.modalFooter}>
              <TouchableOpacity 
                style={[styles.cancelButton, { borderColor: theme.colors.border }]}
                onPress={() => setEditModalVisible(false)}
              >
                <Text style={[styles.cancelButtonText, { color: theme.colors.textSecondary }]}>Отмена</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={[styles.saveButton, { backgroundColor: theme.colors.primary }]}
                onPress={handleSaveProfile}
              >
                <Text style={styles.saveButtonText}>Сохранить</Text>
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
  header: {
    paddingTop: 16,
    paddingBottom: 12,
    paddingHorizontal: 20,
    alignItems: 'flex-end',
    backgroundColor: 'transparent',
    borderBottomWidth: 0,
  },
  headerTop: {
    alignItems: 'flex-end',
  },
  userName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2C2C2C',
    marginBottom: 2,
    letterSpacing: 0.3,
  },
  userPhone: {
    fontSize: 13,
    color: '#8E8E93',
    fontWeight: '400',
    letterSpacing: 0.2,
  },
  loyaltyCard: {
    marginHorizontal: 16,
    borderRadius: 16,
    padding: 20,
    marginTop: 12,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#E9ECEF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  loyaltyHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  loyaltyLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  levelIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  loyaltyInfo: {
    flex: 1,
  },
  levelName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2C2C2C',
    marginBottom: 4,
  },
  levelDescription: {
    fontSize: 14,
    color: '#6B6B6B',
  },
  loyaltyRight: {
    alignItems: 'center',
    minWidth: 60,
  },
  cashbackPercent: {
    fontSize: 28,
    fontWeight: '800',
    color: '#FF8C42',
    marginBottom: 4,
    textAlign: 'center',
  },
  cashbackLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#6B6B6B',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    textAlign: 'center',
  },
  loyaltyContent: {
    marginTop: 5,
  },
  bonusSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    paddingVertical: 15,
    paddingHorizontal: 16,
    backgroundColor: '#F8F9FA',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E9ECEF',
  },
  bonusLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#2C2C2C',
  },
  bonusAmount: {
    fontSize: 24,
    fontWeight: '700',
    color: '#FF8C42',
  },
  progressSection: {
    marginTop: 5,
  },
  progressText: {
    fontSize: 13,
    color: '#6B6B6B',
    marginBottom: 10,
    textAlign: 'center',
  },
  progressBar: {
    height: 8,
    backgroundColor: '#E0E0E0',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 4,
  },
  vipMessage: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 15,
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E9ECEF',
  },
  vipText: {
    fontSize: 12,
    color: '#6B6B6B',
    marginLeft: 6,
    fontStyle: 'italic',
  },
  menuContainer: {
    marginTop: 16,
    marginHorizontal: 16,
  },
  menuItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    backgroundColor: '#fff',
    marginBottom: 1,
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  menuIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f8f9fa',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  menuText: {
    flex: 1,
  },
  menuTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2C2C2C',
    marginBottom: 4,
  },
  menuSubtitle: {
    fontSize: 13,
    color: '#6B6B6B',
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    borderRadius: 12,
    margin: 16,
    marginBottom: 32,
    backgroundColor: '#f0f0f0',
    borderWidth: 1,
    borderColor: '#ccc',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  logoutText: {
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
    color: '#999',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderWidth: 3,
    borderBottomWidth: 0,
    borderColor: '#FF5722',
    maxHeight: '80%',
    paddingBottom: 20,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '700',
  },
  modalBody: {
    padding: 20,
  },
  inputGroup: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    fontWeight: '500',
    borderColor: '#eee',
    color: '#333',
    backgroundColor: '#f0f0f0',
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
    color: '#fff',
  },
});
