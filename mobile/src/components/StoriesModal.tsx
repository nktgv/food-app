import React, { useEffect, useState, useRef } from 'react';
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  StyleSheet,
  Image,
  Dimensions,
  SafeAreaView,
  StatusBar,
  Animated,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { colors } from '../theme/colors';
import { fontFamily } from '../theme/typography';
import { Story } from './Stories';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');
const STORY_DURATION = 5000; // 5 секунд на каждую story

interface StoriesModalProps {
  visible: boolean;
  stories: Story[];
  initialStoryIndex: number;
  onClose: () => void;
}

export default function StoriesModal({ 
  visible, 
  stories, 
  initialStoryIndex, 
  onClose 
}: StoriesModalProps) {
  const [currentStoryIndex, setCurrentStoryIndex] = useState(0);
  const progressAnimations = useRef<Animated.Value[]>([]);
  const storyTimer = useRef<NodeJS.Timeout | null>(null);

  // Инициализируем анимации для прогресс-баров
  useEffect(() => {
    progressAnimations.current = stories.map(() => new Animated.Value(0));
  }, [stories.length]);

  // Эффект для управления stories
  useEffect(() => {
    if (visible && initialStoryIndex >= 0) {
      setCurrentStoryIndex(initialStoryIndex);
      startStoryProgress(initialStoryIndex);
    } else if (!visible) {
      // Сбрасываем все анимации когда модал закрывается
      progressAnimations.current.forEach(anim => anim.setValue(0));
      clearStoryTimer();
    }

    return () => {
      clearStoryTimer();
    };
  }, [visible, initialStoryIndex]);

  const clearStoryTimer = () => {
    if (storyTimer.current) {
      clearTimeout(storyTimer.current);
      storyTimer.current = null;
    }
  };

  const startStoryProgress = (storyIndex: number) => {
    if (storyIndex >= stories.length) {
      onClose();
      return;
    }

    clearStoryTimer();

    // Сбрасываем текущую анимацию
    progressAnimations.current[storyIndex]?.setValue(0);

    // Запускаем анимацию прогресс-бара
    Animated.timing(progressAnimations.current[storyIndex], {
      toValue: 1,
      duration: STORY_DURATION,
      useNativeDriver: false,
    }).start(({ finished }) => {
      if (finished) {
        goToNextStory();
      }
    });
  };

  const goToNextStory = () => {
    const nextIndex = currentStoryIndex + 1;
    if (nextIndex >= stories.length) {
      onClose();
    } else {
      setCurrentStoryIndex(nextIndex);
      startStoryProgress(nextIndex);
    }
  };

  const goToPrevStory = () => {
    if (currentStoryIndex > 0) {
      const prevIndex = currentStoryIndex - 1;
      // Сбрасываем текущую анимацию
      progressAnimations.current[currentStoryIndex]?.setValue(0);
      setCurrentStoryIndex(prevIndex);
      startStoryProgress(prevIndex);
    }
  };

  const handleClose = () => {
    clearStoryTimer();
    progressAnimations.current.forEach(anim => anim.setValue(0));
    onClose();
  };

  const handleLeftTap = () => {
    if (currentStoryIndex > 0) {
      goToPrevStory();
    } else {
      handleClose();
    }
  };

  const handleRightTap = () => {
    goToNextStory();
  };

  if (!visible || initialStoryIndex < 0 || !stories[currentStoryIndex]) {
    return null;
  }

  const currentStory = stories[currentStoryIndex];

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={false}
      onRequestClose={handleClose}
      statusBarTranslucent
    >
      <StatusBar barStyle="light-content" backgroundColor="rgba(0,0,0,0.8)" />
      <View style={styles.container}>
        {/* Background Image */}
        <Image
          source={{ uri: currentStory.image }}
          style={styles.backgroundImage}
          defaultSource={require('../../assets/LOGO.png')}
        />
        
        {/* Gradient Overlay */}
        <LinearGradient
          colors={['rgba(0,0,0,0.6)', 'rgba(0,0,0,0.2)', 'rgba(0,0,0,0.8)']}
          locations={[0, 0.5, 1]}
          style={styles.gradientOverlay}
        />

        <SafeAreaView style={styles.content}>
          {/* Header with multiple progress bars and close button */}
          <View style={styles.header}>
            <View style={styles.progressContainer}>
              {stories.map((_, index) => (
                <View key={index} style={styles.progressBarWrapper}>
                  <View style={styles.progressBarBackground} />
                  <Animated.View 
                    style={[
                      styles.progressBarFill,
                      {
                        width: index < currentStoryIndex 
                          ? '100%'  // Завершённые stories
                          : index === currentStoryIndex
                            ? progressAnimations.current[index]?.interpolate({
                                inputRange: [0, 1],
                                outputRange: ['0%', '100%'],
                              }) || '0%'  // Текущая story
                            : '0%',  // Будущие stories
                      }
                    ]}
                  />
                </View>
              ))}
            </View>
            
            <TouchableOpacity
              style={styles.closeButton}
              onPress={handleClose}
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            >
              <Ionicons name="close" size={24} color="white" />
            </TouchableOpacity>
          </View>

          {/* Story Content */}
          <View style={styles.storyContent}>
            {/* Discount Badge */}
            {currentStory.discount && (
              <View style={styles.discountBadge}>
                <Text style={styles.discountText}>-{currentStory.discount}</Text>
              </View>
            )}

            <View style={styles.textContainer}>
              <Text style={styles.storyTitle}>{currentStory.title}</Text>
              <Text style={styles.storyDescription}>{currentStory.description}</Text>
              
              {currentStory.validUntil && (
                <View style={styles.validContainer}>
                  <Ionicons name="time-outline" size={16} color="rgba(255,255,255,0.8)" />
                  <Text style={styles.validText}>Действует до {currentStory.validUntil}</Text>
                </View>
              )}
            </View>
          </View>

          {/* Bottom Actions */}
          <View style={styles.bottomActions}>
            {currentStory.offer && (
              <TouchableOpacity 
                style={[styles.actionButton, { backgroundColor: colors.primary }]}
                onPress={handleClose}
              >
                <Text style={styles.actionButtonText}>Воспользоваться</Text>
                <Ionicons name="arrow-forward" size={20} color={colors.textPrimary} />
              </TouchableOpacity>
            )}
          </View>
        </SafeAreaView>

        {/* Tap areas for navigation (left/right) */}
        <TouchableOpacity 
          style={styles.leftTapArea} 
          onPress={handleLeftTap}
          activeOpacity={1}
        />
        <TouchableOpacity 
          style={styles.rightTapArea} 
          onPress={handleRightTap}
          activeOpacity={1}
        />
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    position: 'relative',
  },
  backgroundImage: {
    width: screenWidth,
    height: screenHeight,
    position: 'absolute',
    resizeMode: 'cover',
  },
  gradientOverlay: {
    position: 'absolute',
    width: screenWidth,
    height: screenHeight,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 10,
    paddingBottom: 20,
  },
  progressContainer: {
    flex: 1,
    flexDirection: 'row',
    marginRight: 16,
    gap: 4,
  },
  progressBarWrapper: {
    flex: 1,
    height: 3,
    backgroundColor: 'rgba(255,255,255,0.3)',
    borderRadius: 2,
    overflow: 'hidden',
  },
  progressBarBackground: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(255,255,255,0.3)',
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: colors.primary,
    borderRadius: 2,
  },
  closeButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(0,0,0,0.5)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  storyContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 40,
  },
  discountBadge: {
    backgroundColor: colors.error,
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 25,
    marginBottom: 30,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  discountText: {
    fontSize: 24,
    fontFamily: fontFamily.bold,
    color: 'white',
    textAlign: 'center',
  },
  textContainer: {
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  storyTitle: {
    fontSize: 28,
    fontFamily: fontFamily.bold,
    color: 'white',
    textAlign: 'center',
    marginBottom: 16,
    lineHeight: 36,
  },
  storyDescription: {
    fontSize: 16,
    fontFamily: fontFamily.regular,
    color: 'rgba(255,255,255,0.9)',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 20,
  },
  validContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.15)',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
  },
  validText: {
    fontSize: 14,
    fontFamily: fontFamily.medium,
    color: 'rgba(255,255,255,0.8)',
    marginLeft: 6,
  },
  bottomActions: {
    paddingBottom: 40,
    alignItems: 'center',
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
    paddingVertical: 16,
    borderRadius: 25,
    minWidth: 200,
    shadowColor: colors.primaryDark,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  actionButtonText: {
    fontSize: 16,
    fontFamily: fontFamily.semiBold,
    color: colors.textPrimary,
    marginRight: 8,
  },
  leftTapArea: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: screenWidth * 0.3,
    height: screenHeight,
  },
  rightTapArea: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: screenWidth * 0.3,
    height: screenHeight,
  },
});