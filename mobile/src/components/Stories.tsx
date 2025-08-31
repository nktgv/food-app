import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  StyleSheet, 
  ScrollView, 
  Image,
  Dimensions 
} from 'react-native';
import { colors } from '../theme/colors';
import { fontFamily } from '../theme/typography';
import StoriesModal from './StoriesModal';

const { width: screenWidth } = Dimensions.get('window');

export interface Story {
  id: string;
  title: string;
  description: string;
  image: string;
  offer?: string;
  discount?: string;
  validUntil?: string;
}

const storiesData: Story[] = [
  {
    id: '1',
    title: 'Скидка 20%',
    description: 'На все шаурмы до конца месяца! Успевайте попробовать наши новые рецепты со скидкой.',
    image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=300&h=300&fit=crop&crop=center',
    offer: '20% скидка',
    discount: '20%',
    validUntil: '31 декабря',
  },
  {
    id: '2',
    title: 'Новое меню',
    description: 'Попробуйте наши новые блюда: шаурма с курицей и авокадо, и многое другое!',
    image: 'https://images.unsplash.com/photo-1529042410759-befb1204b468?w=300&h=300&fit=crop&crop=center',
    offer: 'Новинки',
  },
  {
    id: '3',
    title: 'Бесплатная доставка',
    description: 'При заказе от 1000 рублей доставка абсолютно бесплатна по всему городу.',
    image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=300&fit=crop&crop=center',
    offer: 'Доставка 0₽',
  },
  {
    id: '4',
    title: 'Комбо акция',
    description: 'Шаурма + напиток + десерт всего за 599 рублей. Выгодное предложение!',
    image: 'https://images.unsplash.com/photo-1551782450-a2132b4ba21d?w=300&h=300&fit=crop&crop=center',
    offer: 'Комбо 599₽',
  },
];

interface StoriesProps {
  stories?: Story[];
  onStoryPress?: (story: Story) => void;
}

export default function Stories({ stories = storiesData, onStoryPress }: StoriesProps) {
  const [selectedStoryIndex, setSelectedStoryIndex] = useState<number>(-1);
  const [modalVisible, setModalVisible] = useState(false);

  const handleStoryPress = (story: Story) => {
    const storyIndex = stories.findIndex(s => s.id === story.id);
    setSelectedStoryIndex(storyIndex);
    setModalVisible(true);
    onStoryPress?.(story);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
    setSelectedStoryIndex(-1);
  };

  return (
    <>
      <View style={styles.container}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
          style={styles.scrollView}
        >
          {stories.map((story) => (
            <TouchableOpacity
              key={story.id}
              style={styles.storyContainer}
              onPress={() => handleStoryPress(story)}
              activeOpacity={0.8}
            >
              <View style={styles.storyWrapper}>
                <View style={styles.storyImageContainer}>
                  <Image
                    source={{ uri: story.image }}
                    style={styles.storyImage}
                    defaultSource={require('../../assets/LOGO.png')}
                  />
                  <View style={styles.storyGradient} />
                  {story.offer && (
                    <View style={styles.offerBadge}>
                      <Text style={styles.offerText}>{story.offer}</Text>
                    </View>
                  )}
                </View>
                <Text style={styles.storyTitle} numberOfLines={2}>
                  {story.title}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <StoriesModal
        visible={modalVisible}
        stories={stories}
        initialStoryIndex={selectedStoryIndex}
        onClose={handleCloseModal}
      />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 16,
  },
  scrollView: {
    paddingLeft: 16,
  },
  scrollContent: {
    paddingRight: 16,
  },
  storyContainer: {
    marginRight: 12,
    width: 80,
  },
  storyWrapper: {
    alignItems: 'center',
  },
  storyImageContainer: {
    width: 70,
    height: 70,
    borderRadius: 35,
    overflow: 'hidden',
    position: 'relative',
    borderWidth: 2,
    borderColor: colors.primary,
    marginBottom: 8,
  },
  storyImage: {
    width: '100%',
    height: '100%',
    borderRadius: 33,
  },
  storyGradient: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.15)',
    borderRadius: 33,
  },
  offerBadge: {
    position: 'absolute',
    bottom: -2,
    left: -2,
    right: -2,
    backgroundColor: colors.primary,
    paddingVertical: 2,
    paddingHorizontal: 4,
    borderRadius: 8,
    minHeight: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  offerText: {
    fontSize: 8,
    fontFamily: fontFamily.bold,
    color: colors.textPrimary,
    textAlign: 'center',
  },
  storyTitle: {
    fontSize: 12,
    fontFamily: fontFamily.medium,
    color: colors.textPrimary,
    textAlign: 'center',
    lineHeight: 16,
  },
});
