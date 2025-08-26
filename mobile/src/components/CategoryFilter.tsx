import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { colors } from '../theme/colors';
import { typography } from '../theme/typography';
import { useTheme } from '../theme/ThemeProvider';

interface Category {
  id: string;
  name: string;
  icon: string; // not used in this tab design
}

interface CategoryFilterProps {
  categories: Category[];
  selectedCategory: string | null;
  onSelectCategory: (categoryId: string | null) => void;
}

export default function CategoryFilter({
  categories,
  selectedCategory,
  onSelectCategory
}: CategoryFilterProps) {
  const theme = useTheme();
  
  return (
    <View style={[styles.container, { backgroundColor: theme.colors.surface }]}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <TouchableOpacity
          style={[
            styles.categoryButton,
            selectedCategory === null && [
              styles.categoryButtonSelected,
              { backgroundColor: theme.colors.primary + '15' }
            ]
          ]}
          onPress={() => onSelectCategory(null)}
        >
          <Text style={[
            styles.categoryText,
            { color: theme.colors.textSecondary },
            selectedCategory === null && [
              styles.categoryTextSelected,
              { color: theme.colors.primary }
            ]
          ]}>
            Все
          </Text>

        </TouchableOpacity>
        
        {categories.map((category) => (
          <TouchableOpacity
            key={category.id}
            style={[
              styles.categoryButton,
              selectedCategory === category.id && [
                styles.categoryButtonSelected,
                { backgroundColor: theme.colors.primary + '15' }
              ]
            ]}
            onPress={() => onSelectCategory(category.id)}
          >
            <Text style={[
              styles.categoryText,
              { color: theme.colors.textSecondary },
              selectedCategory === category.id && [
                styles.categoryTextSelected,
                { color: theme.colors.primary }
              ]
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
    paddingVertical: 20,
    paddingBottom: 24,
    borderBottomWidth: 0,
    elevation: 0,
    shadowOpacity: 0,
  },
  scrollContent: {
    paddingHorizontal: 20,
  },
  categoryButton: {
    position: 'relative',
    alignItems: 'center',
    marginRight: 24,
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 25,
    minWidth: 80,
  },
  categoryButtonSelected: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 3,
  },
  categoryIcon: {
    marginBottom: 4,
  },
  categoryText: {
    textAlign: 'center',
    fontSize: 15,
    fontWeight: '600',
    letterSpacing: 0.3,
  },
  categoryTextSelected: {
    fontWeight: '800',
    letterSpacing: 0.5,
  },

});
