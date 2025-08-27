import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';

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
  onSelectCategory
}: CategoryFilterProps) {
  return (
    <View style={styles.container}>
      <View style={styles.filterBlock}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
          style={styles.scrollView}
          decelerationRate="fast"
          snapToInterval={140}
          snapToAlignment="start"
        >
          {categories.map((category) => (
            <TouchableOpacity
              key={category.id}
              style={[
                styles.categoryButton,
                selectedCategory === category.id && styles.categoryButtonSelected
              ]}
              onPress={() => onSelectCategory(category.id)}
            >
              <Text 
                style={[
                  styles.categoryText,
                  selectedCategory === category.id && styles.categoryTextSelected
                ]}
                numberOfLines={1}
                ellipsizeMode="tail"
              >
                {category.name}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    zIndex: 9999,
    margin: 0,
    padding: 0,
    overflow: 'hidden',
    width: '100%',
  },
  filterBlock: {
    backgroundColor: '#ffffff',
    margin: 0,
    padding: 0,
    overflow: 'hidden',
    width: '100%',
  },
  scrollView: {
    height: 44,
    margin: 0,
    padding: 0,
    width: '100%',
  },
  scrollContent: {
    paddingHorizontal: 16,
    margin: 0,
    alignItems: 'center',
    gap: 4,
    width: '100%',
  },
  categoryButton: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
    paddingVertical: 6,
    margin: 0,
    borderRadius: 20,
    minWidth: 100,
    height: 32,
    backgroundColor: '#f5f5f5',
    borderWidth: 0,
    flexShrink: 0,
  },
  categoryButtonSelected: {
    backgroundColor: '#FF8C42',
    borderWidth: 0,
    transform: [{ scale: 1.02 }],
  },
  categoryText: {
    textAlign: 'center',
    fontSize: 14,
    fontWeight: '600',
    color: '#666666',
    flexShrink: 1,
  },
  categoryTextSelected: {
    fontWeight: '700',
    color: '#ffffff',
  },
});
