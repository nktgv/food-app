import React, { useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, LayoutChangeEvent } from 'react-native';
import { fontFamily } from '../theme/typography';
import { colors } from '../theme/colors';

interface Category {
  id: string;
  name: string;
  icon: string;
}

interface CategoryFilterProps {
  categories: Category[];
  selectedCategory: string;
  onSelectCategory: (categoryId: string) => void;
}

export default function CategoryFilter({
  categories,
  selectedCategory,
  onSelectCategory,
}: CategoryFilterProps) {
  const scrollRef = useRef<ScrollView>(null);
  const buttonLayout = useRef<Record<string, { x: number; width: number }>>({});
  const scrollViewWidth = useRef<number>(0);
  const scrollOffset = useRef<number>(0);

  // Когда активная категория меняется, скроллим горизонтальный список, чтобы кнопка была видна
  useEffect(() => {
    if (!selectedCategory || !buttonLayout.current[selectedCategory]) return;
    const { x, width } = buttonLayout.current[selectedCategory];
    const containerW = scrollViewWidth.current || 0;
    const leftVisible = scrollOffset.current;
    const rightVisible = leftVisible + containerW;

    const btnLeft = x - 10; // with small margin
    const btnRight = x + width + 10;

    // Проверяем видимость: если полностью видна, не скроллим
    if (btnLeft >= leftVisible && btnRight <= rightVisible) return;

    // Если слева невидима – прокручиваем так, чтобы кнопка оказалась чуть левее
    if (btnLeft < leftVisible) {
      scrollRef.current?.scrollTo({ x: btnLeft, animated: true });
    } else if (btnRight > rightVisible) {
      // Если справа выходит – прокручиваем вправо
      const target = btnRight - containerW;
      scrollRef.current?.scrollTo({ x: target, animated: true });
    }
  }, [selectedCategory]);

  const handleButtonLayout = (id: string, e: LayoutChangeEvent) => {
    const { x, width } = e.nativeEvent.layout;
    buttonLayout.current[id] = { x, width };
  };

  return (
    <View style={styles.container}>
      <View style={styles.filterBlock}>
        <ScrollView
          ref={scrollRef}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
          style={styles.scrollView}
          onScroll={(e) => {
            scrollOffset.current = e.nativeEvent.contentOffset.x;
          }}
          onLayout={(e) => {
            scrollViewWidth.current = e.nativeEvent.layout.width;
          }}
        >
          {categories.map((category) => {
            const isSelected = selectedCategory === category.id;
            return (
              <TouchableOpacity
                key={category.id}
                style={[styles.categoryButton, isSelected && styles.categoryButtonSelected]}
                onPress={() => onSelectCategory(category.id)}
                onLayout={(e) => handleButtonLayout(category.id, e)}
                activeOpacity={0.8}
              >
                <Text
                  style={[styles.categoryText, isSelected && styles.categoryTextSelected]}
                  numberOfLines={1}
                  ellipsizeMode="tail"
                >
                  {category.name}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background,
    zIndex: 9999,
    paddingVertical: 8,
    borderBottomWidth: 0,
  },
  filterBlock: {
    backgroundColor: colors.background,
  },
  scrollView: {
    height: 40,
  },
  scrollContent: {
    paddingHorizontal: 16,
    alignItems: 'center',
    gap: 8,
  },
  categoryButton: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    minWidth: 80,
    height: 36,
    backgroundColor: colors.gray100,
    flexShrink: 0,
    shadowColor: colors.gray900,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  categoryButtonSelected: {
    backgroundColor: colors.primary,
    shadowColor: colors.primaryDark,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    transform: [{ scale: 1.02 }],
  },
  categoryText: {
    textAlign: 'center',
    fontSize: 12,
    fontFamily: fontFamily.medium,
    color: colors.textSecondary,
    flexShrink: 1,
  },
  categoryTextSelected: {
    fontFamily: fontFamily.semiBold,
    color: colors.textPrimary,
  },
});
