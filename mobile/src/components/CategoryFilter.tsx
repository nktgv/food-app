import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';

interface Category {
  id: string;
  name: string;
  icon: string;
}

interface CategoryFilterProps {
  categories: Category[];
  selectedCategory: string | null;
  onSelectCategory: (categoryId: string | null) => void;
}

const categoryIcons: { [key: string]: string } = {
  all: '🍽️',
  pizza: '🍕',
  burger: '🍔',
  sushi: '🍣',
  pasta: '🍝',
  salad: '🥗',
  dessert: '🍰',
  drink: '🥤',
  coffee: '☕',
  breakfast: '🥐',
  lunch: '🍱',
  dinner: '🍽️',
};

export default function CategoryFilter({ 
  categories, 
  selectedCategory, 
  onSelectCategory 
}: CategoryFilterProps) {
  return (
    <View style={styles.container}>
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <TouchableOpacity
          style={[
            styles.categoryButton,
            selectedCategory === null && styles.selectedCategory
          ]}
          onPress={() => onSelectCategory(null)}
        >
          <Text style={styles.categoryIcon}>🍽️</Text>
          <Text style={[
            styles.categoryText,
            selectedCategory === null && styles.selectedCategoryText
          ]}>
            Все
          </Text>
        </TouchableOpacity>
        
        {categories.map((category) => (
          <TouchableOpacity
            key={category.id}
            style={[
              styles.categoryButton,
              selectedCategory === category.id && styles.selectedCategory
            ]}
            onPress={() => onSelectCategory(category.id)}
          >
            <Text style={styles.categoryIcon}>
              {categoryIcons[category.name.toLowerCase()] || '🍽️'}
            </Text>
            <Text style={[
              styles.categoryText,
              selectedCategory === category.id && styles.selectedCategoryText
            ]}>
              {category.name}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  scrollContent: {
    paddingHorizontal: 16,
  },
  categoryButton: {
    alignItems: 'center',
    marginRight: 16,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#f8f9fa',
    borderWidth: 1,
    borderColor: '#e9ecef',
    minWidth: 80,
  },
  selectedCategory: {
    backgroundColor: '#FF5722',
    borderColor: '#FF5722',
  },
  categoryIcon: {
    fontSize: 20,
    marginBottom: 4,
  },
  categoryText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#666',
    textAlign: 'center',
  },
  selectedCategoryText: {
    color: '#fff',
  },
});
