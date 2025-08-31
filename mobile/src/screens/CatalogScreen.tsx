import React, { useEffect, useState, useCallback, useRef } from 'react';
import { 
  View, 
  Text, 
  FlatList, 
  ActivityIndicator, 
  SafeAreaView, 
  StyleSheet,
  RefreshControl,
  StatusBar,
  ScrollView,
  TouchableOpacity,
  findNodeHandle
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import { api, Product } from '../api/client';
import { CatalogStackParamList } from './CatalogWrapper';
import ProductCard from '../components/ProductCard';
import CategoryFilter from '../components/CategoryFilter';
import ProductModal from '../components/ProductModal';
import Stories from '../components/Stories';
import { useCart } from '../context/CartContext';
import { useTheme } from '../theme/ThemeProvider';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import FloatingCartButton from '../components/FloatingCartButton';

type CatalogScreenNavigationProp = NativeStackNavigationProp<CatalogStackParamList, 'CatalogMain'>;

interface CatalogScreenProps {
  navigation: CatalogScreenNavigationProp;
}

interface Category {
  id: string;
  name: string;
  icon: string;
}

// Расширенные данные для демонстрации
const mockProducts: Product[] = [
  // ШАУРМА
  {
    id: '1',
    name: 'Баранина Де-Люкс На углях',
    description: 'Это сытное блюдо, которое утолит голод. Мясо приготовлено на углях и отличается особой сочностью. Овощи и сыр придают ему свежести. Соус содержит томат, майонез и специи.',
    media: [],
    base_price: 499,
    currency: '₽',
    variants: [],
    modifier_groups: [],
    allergens: ['пшеница', 'молоко'],
    tags: ['shaurma', 'баранина'],
    weight: 520
  },
  {
    id: '2',
    name: 'Шаверма Чак-Норрис',
    description: 'Шаверма Чак-Норрис - это сытное блюдо из категории шаурма. Сочная курочка, свежие овощи и фирменный соус Чак-Норрис в лепешке.',
    media: [],
    base_price: 419,
    currency: '₽',
    variants: [],
    modifier_groups: [],
    allergens: ['пшеница', 'молоко'],
    tags: ['shaurma', 'курица'],
    weight: 340
  },
  {
    id: '3',
    name: 'Арабская мясная XL',
    description: 'Хотите попробовать вкус настоящей арабской кухни? Тогда закажите у нас шаурму Арабская мясная! Сочная курочка, картошка, соленые овощи и маринованная капуста.',
    media: [],
    base_price: 419,
    currency: '₽',
    variants: [],
    modifier_groups: [],
    allergens: ['пшеница', 'молоко'],
    tags: ['shaurma', 'курица'],
    weight: 480
  },
  {
    id: '4',
    name: 'Шаверма Orange Mix XL',
    description: 'Это сытное блюдо, которое отлично утолит голод. Сочетание сочной курочки, свежих овощей и трех видов соуса создаёт богатый вкус.',
    media: [],
    base_price: 439,
    currency: '₽',
    variants: [],
    modifier_groups: [],
    allergens: ['пшеница', 'молоко'],
    tags: ['shaurма', 'курица'],
    weight: 450
  },
  {
    id: '5',
    name: 'Шаверма Манго-чили XL',
    description: 'Ищете новое гастрономическое приключение? Попробуйте наше блюдо из категории шаурма. Сочная курочка, свежие овощи, фирменный манго-чили соус.',
    media: [],
    base_price: 439,
    currency: '₽',
    variants: [],
    modifier_groups: [],
    allergens: ['пшеница', 'молоко'],
    tags: ['shaurма', 'курица'],
    weight: 450
  },
  {
    id: '6',
    name: 'Шаверма Триумф XL',
    description: 'Шаверма Триумф - это сытное блюдо из категории шаурма. Сочная курочка, свежие овощи и три оригинальных соуса в тонком лаваше.',
    media: [],
    base_price: 419,
    currency: '₽',
    variants: [],
    modifier_groups: [],
    allergens: ['пшеница', 'молоко'],
    tags: ['shaurma', 'курица']
  },
  {
    id: '7',
    name: 'Гриль-люкс с мраморной говядиной на углях',
    description: 'Сочная мраморная говядина, гриль-болгарский перец, гриль-красный лук, свежие овощи, фирменный чесночный соус, фирменный соус.',
    media: [],
    base_price: 499,
    currency: '₽',
    variants: [],
    modifier_groups: [],
    allergens: ['пшеница', 'молоко'],
    tags: ['shaurma', 'говядина']
  },
  {
    id: '8',
    name: 'Шаверма Карри XL',
    description: 'Это сытное блюдо, которое отлично утолит голод. Мясо курицы мягкое и сочное, овощи свежие и хрустящие. Два соуса придают вкус.',
    media: [],
    base_price: 439,
    currency: '₽',
    variants: [],
    modifier_groups: [],
    allergens: ['пшеница', 'молоко'],
    tags: ['shaurma', 'курица']
  },
  {
    id: '9',
    name: 'Шаверма Дубай с грецким орехом XL',
    description: 'Сытное блюдо из категории Шаурма с нежным мясом курицы, свежими овощами, грецким орехом и пикантным соусом в тонкой лепешке.',
    media: [],
    base_price: 439,
    currency: '₽',
    variants: [],
    modifier_groups: [],
    allergens: ['пшеница', 'молоко', 'орехи'],
    tags: ['shaurma', 'курица']
  },
  {
    id: '10',
    name: 'Шаверма Песто итальяно',
    description: 'Если вы любите морепродукты, то вам обязательно стоит попробовать эту шаурму.',
    media: [],
    base_price: 519,
    currency: '₽',
    variants: [],
    modifier_groups: [],
    allergens: ['пшеница', 'молоко', 'рыба'],
    tags: ['shaurma', 'морепродукты']
  },
  {
    id: '11',
    name: 'Япона Мама Терияки XL',
    description: 'Это сытное блюдо, которое отлично утолит голод. Сочетание сочной курочки и овощей.',
    media: [],
    base_price: 439,
    currency: '₽',
    variants: [],
    modifier_groups: [],
    allergens: ['пшеница', 'молоко', 'соя'],
    tags: ['shaurma', 'курица']
  },
  {
    id: '12',
    name: 'Шаверма по-русски XL',
    description: 'Сочная курица, ароматная морковь по-корейски, хрустящая капуста и картофель фри.',
    media: [],
    base_price: 449,
    currency: '₽',
    variants: [],
    modifier_groups: [],
    allergens: ['пшеница', 'молоко'],
    tags: ['shaurma', 'курица']
  },
  {
    id: '13',
    name: 'Шаверма По-питерски XL',
    description: 'Шаверма по-питерски с курицей, картофелем фри, свежими овощами и соусами.',
    media: [],
    base_price: 419,
    currency: '₽',
    variants: [],
    modifier_groups: [],
    allergens: ['пшеница', 'молоко'],
    tags: ['shaurma', 'курица']
  },
  {
    id: '14',
    name: 'Гранат spicy (острая) XL',
    description: 'Сочная курочка, нежный сыр чеддер, свежие овощи и пряные соусы - всё это завернуто в лаваш. Яркое и острое блюдо, которое порадует любителей остреньких блюд.',
    media: [],
    base_price: 439,
    currency: '₽',
    variants: [],
    modifier_groups: [],
    allergens: ['пшеница', 'молоко'],
    tags: ['shaurma', 'курица']
  },
  {
    id: '15',
    name: 'Шаверма Хижина в лесу XL',
    description: 'Это сытное блюдо, которое отлично утолит голод. Внутри нежной лепешки - ароматная курочка с овощами и соусом. Сочетание трав и специй делает блюдо особенным.',
    media: [],
    base_price: 419,
    currency: '₽',
    variants: [],
    modifier_groups: [],
    allergens: ['пшеница', 'молоко'],
    tags: ['shaurma', 'курица']
  },
  {
    id: '16',
    name: 'Шаверма с дымком XL',
    description: 'Сочная курочка, пикантный соус BBQ, свежие овощи и фирменный лаваш - всё что нужно для вкусного обеда. В этом блюде есть всё, за что мы любим шаверму.',
    media: [],
    base_price: 419,
    currency: '₽',
    variants: [],
    modifier_groups: [],
    allergens: ['пшеница', 'молоко'],
    tags: ['shaurma', 'курица']
  },
  {
    id: '17',
    name: 'Шаверма Длинная классика',
    description: 'Шаверма Длинная классика - это сытное блюдо. Сочная курочка, свежие овощи, фирменный чесночный соус и тонкий лаваш.',
    media: [],
    base_price: 409,
    currency: '₽',
    variants: [],
    modifier_groups: [],
    allergens: ['пшеница', 'молоко'],
    tags: ['shaurma', 'курица']
  },
  {
    id: '18',
    name: 'Шаверма на тарелке Big Size XXL с картошкой фри',
    description: 'Для настоящих любителей шавермы - порция XXL с картофелем фри на тарелке.',
    media: [],
    base_price: 649,
    currency: '₽',
    variants: [],
    modifier_groups: [],
    allergens: ['пшеница', 'молоко'],
    tags: ['shaurma', 'курица']
  },
  {
    id: '19',
    name: 'Острая мраморная говядина на углях',
    description: 'Предлагаем попробовать шаверму с мраморной говядиной! В составе сочная мраморная говядина. Соусы придают блюду насыщенный вкус.',
    media: [],
    base_price: 519,
    currency: '₽',
    variants: [],
    modifier_groups: [],
    allergens: ['пшеница', 'молоко'],
    tags: ['shaurma', 'говядина']
  },
  {
    id: '20',
    name: 'Шаверма Греческая XL',
    description: 'Блюдо отличается гармоничным сочетанием вкусов и текстур, где свежесть овощи и насыщенность курочки создают идеальное сочетание.',
    media: [],
    base_price: 439,
    currency: '₽',
    variants: [],
    modifier_groups: [],
    allergens: ['пшеница', 'молоко'],
    tags: ['shaurma', 'курица']
  },
  {
    id: '21',
    name: 'Шаверма коченая XL',
    description: 'Сочная шаверма порадует вас вкусом и ароматом. Нежный лаваш, сочная курица, копченый сыр, помидор, огурец, пекинская капуста.',
    media: [],
    base_price: 439,
    currency: '₽',
    variants: [],
    modifier_groups: [],
    allergens: ['пшеница', 'молоко'],
    tags: ['shaurma', 'курица']
  },
  {
    id: '22',
    name: 'Шаверма Самурай XL (терияки)',
    description: 'Если вы любите яркие вкусы и необычные сочетания, то вам точно понравится шаурма из категории фастфуд. Сочная курочка.',
    media: [],
    base_price: 439,
    currency: '₽',
    variants: [],
    modifier_groups: [],
    allergens: ['пшеница', 'молоко', 'соя'],
    tags: ['shaurma', 'курица']
  },
  {
    id: '23',
    name: 'Шаверма Брюс Ли XL',
    description: 'Сочная шаверма с курицей, овощами и азиатскими соусами.',
    media: [],
    base_price: 439,
    currency: '₽',
    variants: [],
    modifier_groups: [],
    allergens: ['пшеница', 'молоко'],
    tags: ['shaurma', 'курица']
  },
  {
    id: '24',
    name: 'Шаверма BBQ spicy (острая) XL',
    description: 'Это большая и сытная шаурма из нежной курочки, армянского лаваша, сочных овощей и трех огурчиков, пикантной заправки, а также соуса BBQ.',
    media: [],
    base_price: 419,
    currency: '₽',
    variants: [],
    modifier_groups: [],
    allergens: ['пшеница', 'молоко'],
    tags: ['shaurma', 'курица']
  },
  {
    id: '25',
    name: 'Шаверма Сочный гранат XL',
    description: 'Это сытное блюдо, которое отлично утолит голод. Сочетание сочной курицы, тягучей моцареллы и овощей, а также пикантные соусы.',
    media: [],
    base_price: 439,
    currency: '₽',
    variants: [],
    modifier_groups: [],
    allergens: ['пшеница', 'молоко'],
    tags: ['shaurma', 'курица']
  },
  {
    id: '26',
    name: 'Шаверма Шальная креветка',
    description: 'Если вы любите морепродукты, то вам обязательно стоит попробовать эту шаурму. Нежные креветки в хрустящей панировке, свежие овощи.',
    media: [],
    base_price: 499,
    currency: '₽',
    variants: [],
    modifier_groups: [],
    allergens: ['пшеница', 'молоко', 'рыба'],
    tags: ['shaurma', 'морепродукты']
  },
  {
    id: '27',
    name: 'Шаверма Жоль Моцарелла с грибами XL',
    description: 'Попробуйте это блюдо с грибами и моцареллой.',
    media: [],
    base_price: 439,
    currency: '₽',
    variants: [],
    modifier_groups: [],
    allergens: ['пшеница', 'молоко'],
    tags: ['shaurma', 'грибы']
  },
  {
    id: '28',
    name: 'Шаверма Сыр-бор (много сыра) XL',
    description: 'Сочная курочка, хрустящие овощи и много сыра - в этом блюде есть все, чтобы сделать ваш обед или ужин по-настоящему приятным.',
    media: [],
    base_price: 439,
    currency: '₽',
    variants: [],
    modifier_groups: [],
    allergens: ['пшеница', 'молоко'],
    tags: ['shaurma', 'сыр']
  },
  {
    id: '29',
    name: 'Шаурма в сырном лаваше с картошечкой по-домашнему XL',
    description: 'Это сытное блюдо, которое отлично утолит голод. Сочетание сочной курочка, фирменных соусов, свежих овощей и пекинской капусты.',
    media: [],
    base_price: 409,
    currency: '₽',
    variants: [],
    modifier_groups: [],
    allergens: ['пшеница', 'молоко'],
    tags: ['shaurma', 'картофель']
  },
  {
    id: '30',
    name: 'В лаваше с картошечкой по-домашнему XL',
    description: 'Сочная курочка, обжаренная картошка, свежие овощи и фирменный соус - всё это мы завернули в ароматный лаваш.',
    media: [],
    base_price: 409,
    currency: '₽',
    variants: [],
    modifier_groups: [],
    allergens: ['пшеница', 'молоко'],
    tags: ['shaurma', 'картофель']
  },
  {
    id: '31',
    name: 'Де-люкс Мраморная говядина на углях',
    description: 'Хотите удивить свои вкусовые рецепторы? Предлагаем попробовать шаверму Мраморная говядина де-люкс! Нежная курочка, свежие овощи.',
    media: [],
    base_price: 499,
    currency: '₽',
    variants: [],
    modifier_groups: [],
    allergens: ['пшеница', 'молоко'],
    tags: ['shaurma', 'говядина']
  },
  {
    id: '32',
    name: 'Чили острая XL',
    description: 'Это сытное блюдо для любителей пикантных вкусов. Внутри нежного лаваша сочная курочка с овощами: свежий помидор, огурчик.',
    media: [],
    base_price: 439,
    currency: '₽',
    variants: [],
    modifier_groups: [],
    allergens: ['пшеница', 'молоко'],
    tags: ['shaurma', 'острая']
  },
  {
    id: '33',
    name: 'Шаверма в лаваше XL',
    description: 'Блюдо отличается гармоничным сочетанием вкусов и текстур, где свежесть овощи и насыщенность курочки, свежесть овощей и насыщенность мяса.',
    media: [],
    base_price: 389,
    currency: '₽',
    variants: [],
    modifier_groups: [],
    allergens: ['пшеница', 'молоко'],
    tags: ['shaurma', 'классическая']
  },
  {
    id: '34',
    name: 'Шаверма по-сирийски двойная острая',
    description: 'Хотите попробовать настоящую шаурму? Тогда вам к нам. В этом блюде: аппетитная курочка с картошечкой, пикантный адждин, а также свежие овощи.',
    media: [],
    base_price: 389,
    currency: '₽',
    variants: [],
    modifier_groups: [],
    allergens: ['пшеница', 'молоко'],
    tags: ['shaurma', 'острая']
  },
  {
    id: '35',
    name: 'Шаверма на тарелке XXL',
    description: 'Большая порция шавермы на тарелке для настоящих любителей.',
    media: [],
    base_price: 549,
    currency: '₽',
    variants: [],
    modifier_groups: [],
    allergens: ['пшеница', 'молоко'],
    tags: ['shaurma', 'большая']
  },
  {
    id: '36',
    name: 'Шаверма в сырном лаваше XL',
    description: 'Попробуйте нашу невероятно сочную шаверму XL. Вкусное сочетание нежной курицы, фирменного и сырного лаваша.',
    media: [],
    base_price: 399,
    currency: '₽',
    variants: [],
    modifier_groups: [],
    allergens: ['пшеница', 'молоко'],
    tags: ['shaurma', 'сыр']
  },

  // ЗАКУСКИ
  {
    id: '37',
    name: 'Шарики Сырные Моцарелла',
    description: 'Сырные шарики — идеальная закуска для большой компании! В порции 6 сырных шариков, которые приготовлены из сыра моцарелла и обжарены в хрустящей панировке.',
    media: [],
    base_price: 399,
    currency: '₽',
    variants: [],
    modifier_groups: [],
    allergens: ['молоко', 'пшеница'],
    tags: ['snacks', 'сыр']
  },
  {
    id: '38',
    name: 'Луковые колечки',
    description: '7 шт. Хрустящие луковые колечки в золотистой панировке.',
    media: [],
    base_price: 299,
    currency: '₽',
    variants: [],
    modifier_groups: [],
    allergens: ['пшеница'],
    tags: ['snacks', 'лук']
  },
  {
    id: '39',
    name: 'Crazy Box Айдахо',
    description: 'Сочная курица с картофелем и фирменными соусами в удобной коробочке.',
    media: [],
    base_price: 469,
    currency: '₽',
    variants: [],
    modifier_groups: [],
    allergens: ['пшеница', 'молоко'],
    tags: ['snacks', 'курица']
  },
  {
    id: '40',
    name: 'Картофель по-деревенски',
    description: 'Золотистый картофель, приготовленный по-деревенски с ароматными специями.',
    media: [],
    base_price: 299,
    currency: '₽',
    variants: [],
    modifier_groups: [],
    allergens: [],
    tags: ['snacks', 'картофель']
  },
  {
    id: '41',
    name: 'Crazy Box Манго-Чили',
    description: 'Ищете чем удивить свои рецепторы? В нашей новой закуске есть всё, чтобы сделать ваш стол разнообразным. Сочная курочка и картошечка сочетаются с фирменным манго-чили соусом.',
    media: [],
    base_price: 439,
    currency: '₽',
    variants: [],
    modifier_groups: [],
    allergens: ['пшеница', 'молоко'],
    tags: ['snacks', 'курица']
  },
  {
    id: '42',
    name: 'Сырный Box',
    description: 'Ищете, чем удивить гостей? В этой закуске есть всё, чтобы сделать ваш стол разнообразным. Сочная курочка, тягучий сырный соус, нежный сыр.',
    media: [],
    base_price: 449,
    currency: '₽',
    variants: [],
    modifier_groups: [],
    allergens: ['пшеница', 'молоко'],
    tags: ['snacks', 'сыр']
  },
  {
    id: '43',
    name: 'Crazy box по-русски',
    description: 'Crazy box по-русски – это аппетитная закуска из сочной курицы, картофеля по-домашнему маринованной капусты, маринованной морковки.',
    media: [],
    base_price: 419,
    currency: '₽',
    variants: [],
    modifier_groups: [],
    allergens: ['пшеница', 'молоко'],
    tags: ['snacks', 'курица']
  },
  {
    id: '44',
    name: 'Crazy Box Батька Питер',
    description: 'Это сытное блюдо в стиле фастфуд, которое может заменить полноценный обед. Сочная курица и картошечка по-домашнему утолят голод.',
    media: [],
    base_price: 419,
    currency: '₽',
    variants: [],
    modifier_groups: [],
    allergens: ['пшеница', 'молоко'],
    tags: ['snacks', 'курица']
  },
  {
    id: '45',
    name: 'Crazy Box Батька Карри',
    description: 'Это сытное блюдо в стиле фастфуд. Сочная курочка и картошечка по-домашнему утолят голод, а сыр, моцарелла придаст сливочный вкус.',
    media: [],
    base_price: 439,
    currency: '₽',
    variants: [],
    modifier_groups: [],
    allergens: ['пшеница', 'молоко'],
    tags: ['snacks', 'курица']
  },
  {
    id: '46',
    name: 'Crazy Box Батька Дубай',
    description: 'Попробуйте Crazy Box Батька Дубай - аппетитную закуску из сочной курочки, моцареллы по-домашнему, сыра моцарелла, жареного лука.',
    media: [],
    base_price: 449,
    currency: '₽',
    variants: [],
    modifier_groups: [],
    allergens: ['пшеница', 'молоко'],
    tags: ['snacks', 'курица']
  },
  {
    id: '47',
    name: 'Crazy box Ниндзя',
    description: 'Это сытная закуска из нежного куриного филе и мягкой моцареллы, которые приобретают сладко-солёный вкус благодаря соевому соусу.',
    media: [],
    base_price: 439,
    currency: '₽',
    variants: [],
    modifier_groups: [],
    allergens: ['пшеница', 'молоко', 'соя'],
    tags: ['snacks', 'курица']
  },
  {
    id: '48',
    name: 'Crazy Box Pesto',
    description: 'Попробуйте Crazy Box Pesto из категории закусок. Сочная золотистая курочка, картошечка по-домашнему, молодая моцарелла с соусом песто.',
    media: [],
    base_price: 499,
    currency: '₽',
    variants: [],
    modifier_groups: [],
    allergens: ['пшеница', 'молоко'],
    tags: ['snacks', 'курица']
  },
  {
    id: '49',
    name: 'Spicy-Box',
    description: 'Ищете чем утолить голод? В разделе закусок вас ждёт Spicy-Box! Нежная моцарелла, сочная курица, пикантный лук и острый халапеньо.',
    media: [],
    base_price: 439,
    currency: '₽',
    variants: [],
    modifier_groups: [],
    allergens: ['пшеница', 'молоко'],
    tags: ['snacks', 'острая']
  },
  {
    id: '50',
    name: 'Гриб-Box',
    description: 'Гриб-Box – это сытная закуска из курицы, шампиньонов и моцареллы под грибным соусом, а на гарнир – ароматная картошка по-деревенски.',
    media: [],
    base_price: 439,
    currency: '₽',
    variants: [],
    modifier_groups: [],
    allergens: ['пшеница', 'молоко'],
    tags: ['snacks', 'грибы']
  },
  {
    id: '51',
    name: 'Crazy Box Говядина',
    description: 'Попробуйте нежную говядину с картошкой и моцареллой в коробочке.',
    media: [],
    base_price: 499,
    currency: '₽',
    variants: [],
    modifier_groups: [],
    allergens: ['пшеница', 'молоко'],
    tags: ['snacks', 'говядина']
  },
  {
    id: '52',
    name: 'Crazy box от Батьки',
    description: 'Аппетитная закуска с курицей и фирменными соусами.',
    media: [],
    base_price: 419,
    currency: '₽',
    variants: [],
    modifier_groups: [],
    allergens: ['пшеница', 'молоко'],
    tags: ['snacks', 'курица']
  },
  {
    id: '53',
    name: 'Картошка от Батьки',
    description: 'Картошка, жаренная по-домашнему, по фирменному рецепту, посыпается зеленью, солью, красной паприкой (неострой)',
    media: [],
    base_price: 199,
    currency: '₽',
    variants: [],
    modifier_groups: [],
    allergens: [],
    tags: ['snacks', 'картофель']
  },
  {
    id: '54',
    name: 'Шримп-box',
    description: 'Креветочки в панировке, картошечка фри, соус 1000 островов, соус сырный, соус сладкий чили',
    media: [],
    base_price: 599,
    currency: '₽',
    variants: [],
    modifier_groups: [],
    allergens: ['рыба', 'молоки', 'пшеница'],
    tags: ['snacks', 'креветки']
  },
  {
    id: '55',
    name: 'Сырные палочки моцарелла',
    description: 'Хрустящие снаружи и мягкие внутри, эти аппетитные палочки станут отличным выбором для любителей сыра. Они имеют нежный вкус моцареллы.',
    media: [],
    base_price: 399,
    currency: '₽',
    variants: [],
    modifier_groups: [],
    allergens: ['молоко', 'пшеница'],
    tags: ['snacks', 'сыр']
  },
  {
    id: '56',
    name: 'Креветочки в панировке',
    description: '5 шт. Сочные креветки в золотистой панировке.',
    media: [],
    base_price: 499,
    currency: '₽',
    variants: [],
    modifier_groups: [],
    allergens: ['рыба', 'пшеница'],
    tags: ['snacks', 'креветки']
  },
  {
    id: '57',
    name: 'Crazy Box Free',
    description: 'Сытная закуска без мяса для вегетарианцев и не только.',
    media: [],
    base_price: 439,
    currency: '₽',
    variants: [],
    modifier_groups: [],
    allergens: ['пшеница', 'молоко'],
    tags: ['snacks', 'вегетарианская']
  },
  {
    id: '58',
    name: 'Картофель фри',
    description: 'Классический картофель фри, золотистый и хрустящий.',
    media: [],
    base_price: 249,
    currency: '₽',
    variants: [],
    modifier_groups: [],
    allergens: [],
    tags: ['snacks', 'картофель']
  },

  // БУРГЕРЫ
  {
    id: '59',
    name: 'Бургер Dolce Vita',
    description: 'Элегантный бургер с изысканными ингредиентами.',
    media: [],
    base_price: 599,
    currency: '₽',
    variants: [],
    modifier_groups: [],
    allergens: ['пшеница', 'молоко'],
    tags: ['burger', 'премиум']
  },
  {
    id: '60',
    name: 'Бургер Тропический',
    description: 'Этот бургер относится к категории классических, но его яркий вкус позволит вам мысленно перенестись в тропический рай. Нежная говядина с ананасом.',
    media: [],
    base_price: 499,
    currency: '₽',
    variants: [],
    modifier_groups: [],
    allergens: ['пшеница', 'молоко'],
    tags: ['burger', 'говядина']
  },
  {
    id: '61',
    name: 'Бургер Папа Песто',
    description: 'Папа Песто - это бургер с сочной котлетой из мраморной говядины, мягкой булочкой бриош и фирменным соусом. В бургер также добавляется салат.',
    media: [],
    base_price: 599,
    currency: '₽',
    variants: [],
    modifier_groups: [],
    allergens: ['пшеница', 'молоко'],
    tags: ['burger', 'говядина']
  },
  {
    id: '62',
    name: 'Альпийский бургер',
    description: 'Горный воздух и альпийские травы вдохновили нас на создание этого бургера.',
    media: [],
    base_price: 599,
    currency: '₽',
    variants: [],
    modifier_groups: [],
    allergens: ['пшеница', 'молоко'],
    tags: ['burger', 'говядина']
  },
  {
    id: '63',
    name: 'Бургер Пацанский',
    description: 'Простой и сытный бургер для настоящих пацанов.',
    media: [],
    base_price: 499,
    currency: '₽',
    variants: [],
    modifier_groups: [],
    allergens: ['пшеница', 'молоко'],
    tags: ['burger', 'говядина']
  },
  {
    id: '64',
    name: 'Бургер Фермерский',
    description: 'Натуральные продукты с фермы в одном бургере.',
    media: [],
    base_price: 499,
    currency: '₽',
    variants: [],
    modifier_groups: [],
    allergens: ['пшеница', 'молоко'],
    tags: ['burger', 'говядина']
  },
  {
    id: '65',
    name: 'Бургер Папа сыр',
    description: 'Двойная порция сыра для настоящих любителей.',
    media: [],
    base_price: 549,
    currency: '₽',
    variants: [],
    modifier_groups: [],
    allergens: ['пшеница', 'молоко'],
    tags: ['burger', 'сыр']
  },
  {
    id: '66',
    name: 'БигБургер',
    description: 'Хотите попробовать наш бургер? Сочная мраморная говядина, фирменный соус, соус барбекю и сырный соус, хрустящий салат.',
    media: [],
    base_price: 699,
    currency: '₽',
    variants: [],
    modifier_groups: [],
    allergens: ['пшеница', 'молоко'],
    tags: ['burger', 'большой']
  },
  {
    id: '67',
    name: 'Бургер Вестерн',
    description: 'Ищете по-настоящему вкусный бургер? В нашем меню есть то, что вам нужно! Попробуйте бургер на углях из мраморной говядины.',
    media: [],
    base_price: 499,
    currency: '₽',
    variants: [],
    modifier_groups: [],
    allergens: ['пшеница', 'молоко'],
    tags: ['burger', 'говядина']
  },
  {
    id: '68',
    name: 'Бургер Мехико',
    description: 'Бургеры на углях - это всегда хорошая идея. Сочная мраморная говядина, свежие овощи, фирменный соус и ароматная булочка.',
    media: [],
    base_price: 499,
    currency: '₽',
    variants: [],
    modifier_groups: [],
    allergens: ['пшеница', 'молоко'],
    tags: ['burger', 'говядина']
  },
  {
    id: '69',
    name: 'Бургер Олд Фешен',
    description: 'Ищете по-настоящему вкусный бургер? Сочная мраморная говядина, фирменный соус, сыр чеддер, свежие овощи и ароматная булочка.',
    media: [],
    base_price: 499,
    currency: '₽',
    variants: [],
    modifier_groups: [],
    allergens: ['пшеница', 'молоко'],
    tags: ['burger', 'говядина']
  },

  // НАПИТКИ
  {
    id: '70',
    name: 'Морс Черная смородина Фирменная',
    description: 'Черная смородина и сок черной смородины, вода, сахар',
    media: [],
    base_price: 150,
    currency: '₽',
    variants: [],
    modifier_groups: [],
    allergens: [],
    tags: ['drink', 'морс']
  },
  {
    id: '71',
    name: 'Черноголовка Байкал',
    description: 'Этот напиток подарит вам бодрящую свежесть и пикантную горчинку, которые так ценят любители Байкала.',
    media: [],
    base_price: 150,
    currency: '₽',
    variants: [],
    modifier_groups: [],
    allergens: [],
    tags: ['drink', 'газировка']
  },
  {
    id: '72',
    name: 'Черноголовка Кола без сахара',
    description: 'Идеальный выбор для любителей колы, ценящих заботу о своем здоровье. Освежающий вкус напитка подарит вам бодрость и отличное настроение.',
    media: [],
    base_price: 150,
    currency: '₽',
    variants: [],
    modifier_groups: [],
    allergens: [],
    tags: ['drink', 'кола']
  },
  {
    id: '73',
    name: 'Черноголовка Лимонад',
    description: 'Освежающий газированный напиток для всей семьи. Сладкий лимонад с приятной кислинкой прекрасно утоляет жажду',
    media: [],
    base_price: 150,
    currency: '₽',
    variants: [],
    modifier_groups: [],
    allergens: [],
    tags: ['drink', 'лимонад']
  },
  {
    id: '74',
    name: 'Черноголовка кола лайм-мята',
    description: 'Черноголовка кола лайм-мята – это напиток из категории освежающих газировок',
    media: [],
    base_price: 120,
    currency: '₽',
    variants: [],
    modifier_groups: [],
    allergens: [],
    tags: ['drink', 'кола']
  },
  {
    id: '75',
    name: 'Черноголовка дикий апельсин юдзу',
    description: 'Черноголовка дикий апельсин – это напиток из категории мировые вкусы для тех, кто любит пробовать новое.',
    media: [],
    base_price: 120,
    currency: '₽',
    variants: [],
    modifier_groups: [],
    allergens: [],
    tags: ['drink', 'апельсин']
  },
  {
    id: '76',
    name: 'Черноголовка Кола',
    description: 'Освежающий газированный напиток темно-коричневого цвета с легкой горчинкой и нотками специй и фруктов.',
    media: [],
    base_price: 150,
    currency: '₽',
    variants: [],
    modifier_groups: [],
    allergens: [],
    tags: ['drink', 'кола']
  },
  {
    id: '77',
    name: 'Черноголовка Дюшес',
    description: 'Черноголовка Дюшес – это классический газированный напиток со вкусом дюшеса, который идеально утоляет жажду.',
    media: [],
    base_price: 150,
    currency: '₽',
    variants: [],
    modifier_groups: [],
    allergens: [],
    tags: ['drink', 'дюшес']
  },
  {
    id: '78',
    name: 'Черноголовка Лимон-лайм-лемонграсс',
    description: 'Черноголовка Лимон-лайм-лемонграсс – это напиток для тех, кто стремится попробовать все новое и интересное.',
    media: [],
    base_price: 120,
    currency: '₽',
    variants: [],
    modifier_groups: [],
    allergens: [],
    tags: ['drink', 'лимон']
  },
  {
    id: '79',
    name: 'Черноголовка Кола (банка)',
    description: 'Кола в удобной банке',
    media: [],
    base_price: 120,
    currency: '₽',
    variants: [],
    modifier_groups: [],
    allergens: [],
    tags: ['drink', 'кола']
  },

  // СОУСЫ
  {
    id: '80',
    name: '1000 островов',
    description: 'Соус морской',
    media: [],
    base_price: 59,
    currency: '₽',
    variants: [],
    modifier_groups: [],
    allergens: ['молоко'],
    tags: ['sauces', 'морской']
  },
  {
    id: '81',
    name: 'Соус Сырный',
    description: 'Кремовый сырный соус',
    media: [],
    base_price: 59,
    currency: '₽',
    variants: [],
    modifier_groups: [],
    allergens: ['молоко'],
    tags: ['sauces', 'сыр']
  },
  {
    id: '82',
    name: 'Соус Барбекю Heinz',
    description: 'Классический соус барбекю от Heinz',
    media: [],
    base_price: 59,
    currency: '₽',
    variants: [],
    modifier_groups: [],
    allergens: [],
    tags: ['sauces', 'барбекю']
  },
  {
    id: '83',
    name: 'Соус Коктейльчик',
    description: 'Микс из BBQ и чесночного соусов, а так же с острой фирменной аджикой',
    media: [],
    base_price: 79,
    currency: '₽',
    variants: [],
    modifier_groups: [],
    allergens: ['молоко'],
    tags: ['sauces', 'коктейль']
  },
  {
    id: '84',
    name: 'Острый',
    description: 'Острый соус шрирача',
    media: [],
    base_price: 59,
    currency: '₽',
    variants: [],
    modifier_groups: [],
    allergens: [],
    tags: ['sauces', 'острый']
  },
  {
    id: '85',
    name: 'Чесночный фирменный',
    description: 'Чесночный, на кефирной основе и без майонеза!',
    media: [],
    base_price: 49,
    currency: '₽',
    variants: [],
    modifier_groups: [],
    allergens: ['молоко'],
    tags: ['sauces', 'чеснок']
  },
  {
    id: '86',
    name: 'Сладкий чили',
    description: 'Чили сладенький',
    media: [],
    base_price: 59,
    currency: '₽',
    variants: [],
    modifier_groups: [],
    allergens: [],
    tags: ['sauces', 'чили']
  },

  // БАБЛ ШАВЕРМА
  {
    id: '87',
    name: 'Бабл Шаверма Манго',
    description: 'Бабл Шаверма Манго — это сочная курочка, свежие овощи и тонкий лаваш в сочетании с необычными соусами.',
    media: [],
    base_price: 539,
    currency: '₽',
    variants: [],
    modifier_groups: [],
    allergens: ['пшеница', 'молоко'],
    tags: ['bablshaurma', 'манго']
  },

  // ДЕСЕРТЫ
  {
    id: '88',
    name: 'Турецкая пахлава шоколадная',
    description: 'Традиционная турецкая сладость с шоколадом',
    media: [],
    base_price: 150,
    currency: '₽',
    variants: [],
    modifier_groups: [],
    allergens: ['пшеница', 'молоко', 'орехи'],
    tags: ['dessert', 'пахлава']
  },

  // РЫБА И МОРЕПРОДУКТЫ
  {
    id: '89',
    name: 'Шаверма с морепродуктами',
    description: 'Погрузитесь в мир морских глубин с блюдом из категории Рыба и морепродукты, где полоски кальмара, щупальца кальмара.',
    media: [],
    base_price: 649,
    currency: '₽',
    variants: [],
    modifier_groups: [],
    allergens: ['пшеница', 'молоко', 'рыба'],
    tags: ['seafood', 'морепродукты']
  }
];

const categories: Category[] = [
  { id: 'shaurma', name: 'Шаурма', icon: '🌯' },
  { id: 'snacks', name: 'Закуски', icon: '🍿' },
  { id: 'burger', name: 'Бургеры', icon: '🍔' },
  { id: 'drink', name: 'Напитки', icon: '🥤' },
  { id: 'sauces', name: 'Соусы', icon: '🍯' },
  { id: 'bablshaurma', name: 'Бабл Шаверма', icon: '🫧' },
  { id: 'dessert', name: 'Десерты', icon: '🍰' },
  { id: 'seafood', name: 'Рыба и морепродукты', icon: '🐟' },
];

export default function CatalogScreen({ navigation }: CatalogScreenProps) {
  const theme = useTheme();
  const { addItem } = useCart();
  
  const insets = useSafeAreaInsets();

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>(''); // Изменено на string
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [isCategoriesSticky, setIsCategoriesSticky] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string>('');
  const [headerHeight, setHeaderHeight] = useState(0);
  const [categoriesHeight, setCategoriesHeight] = useState(0);
  
  const scrollViewRef = useRef<ScrollView>(null);
  const headerRef = useRef<View>(null);
  const categoriesRef = useRef<View>(null);
  const categoryPositions = useRef<{ [key: string]: number }>({});
  const categoryRefs = useRef<{ [key: string]: React.RefObject<View> }>({});
  const isScrollingToCategory = useRef(false);

  useEffect(() => {
    loadProducts();
    // Устанавливаем первую категорию по умолчанию (Шаурма)
    if (categories.length > 0 && !selectedCategory) {
      setSelectedCategory(categories[0].id);
      setActiveCategory(categories[0].id);
    }
  }, [categories, selectedCategory]);

  // Измеряем высоты хедера и категорий
  const onHeaderLayout = (event: any) => {
    const { height } = event.nativeEvent.layout;
    setHeaderHeight(height);
  };

  const onCategoriesLayout = (event: any) => {
    const { height } = event.nativeEvent.layout;
    setCategoriesHeight(height);
  };

  const loadProducts = async () => {
    try {
      const apiProducts = await api.getProducts();
      // Объединяем API данные с моковыми для демонстрации
      const allProducts = [...apiProducts, ...mockProducts];
      setProducts(allProducts);
    } catch (error) {
      console.error('Failed to load products:', error);
      // Если API недоступен, используем только моковые данные
      setProducts(mockProducts);
    } finally {
      setLoading(false);
    }
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    
    // Имитируем загрузку данных
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  }, []);

  const filteredProducts = selectedCategory 
    ? products.filter(product => 
        product.tags.some(tag => tag.toLowerCase() === selectedCategory.toLowerCase())
      )
    : products.filter(product => 
        product.tags.some(tag => tag.toLowerCase() === categories[0]?.id.toLowerCase())
      );

  const handleSelectCategory = (categoryId: string) => {
    setSelectedCategory(categoryId);
    setActiveCategory(categoryId);
    
    // Прокручиваем к выбранной категории
    const doScroll = () => {
      if (categoryId && categoryPositions.current[categoryId] != null) {
        isScrollingToCategory.current = true;
        const stickyOffset = headerHeight + categoriesHeight + insets.top + 2;
        const extra = 8; // дополнительный отступ, чтобы заголовок был полностью виден
        scrollViewRef.current?.scrollTo({
          y: Math.max(0, categoryPositions.current[categoryId] - stickyOffset - extra),
          animated: true,
        });
        setTimeout(() => {
          isScrollingToCategory.current = false;
        }, 500);
      } else {
        // если позиция ещё не измерена (секция не в зоне рендеринга)
        measureAndScroll(categoryId);
      }
    };
    requestAnimationFrame(doScroll);
  };

  const onCategoryLayout = (categoryId: string, event: any) => {
    const { y } = event.nativeEvent.layout;
    categoryPositions.current[categoryId] = y;
  };

  const measureAndScroll = (categoryId: string) => {
    const ref = categoryRefs.current[categoryId];
    if (!ref?.current) return;
    const scrollNode = findNodeHandle(scrollViewRef.current);
    ref.current.measureLayout(scrollNode as number, (x, y) => {
      categoryPositions.current[categoryId] = y;
      const stickyOffset = headerHeight + categoriesHeight + insets.top + 2;
      scrollViewRef.current?.scrollTo({ y: Math.max(0, y - stickyOffset - 8), animated: true });
    }, () => {});
  };

  const handleScroll = (event: any) => {
    const offsetY = event.nativeEvent.contentOffset.y;
    
    // Категории закрепляются сразу после хедера с минимальным зазором
    if (offsetY > headerHeight + 2) {
      setIsCategoriesSticky(true);
    } else {
      setIsCategoriesSticky(false);
    }

    // Автоматическое переключение активной категории при скролле
    if (!isScrollingToCategory.current) {
      const stickyOffset = headerHeight + categoriesHeight + insets.top + 2;
      const scrollPosition = offsetY + stickyOffset;
      
      // Находим активную категорию на основе позиции скролла
      let newActiveCategory = selectedCategory;
      for (const [categoryId, position] of Object.entries(categoryPositions.current)) {
        if (scrollPosition >= position) {
          newActiveCategory = categoryId;
        }
      }
      
      if (newActiveCategory !== activeCategory) {
        setActiveCategory(newActiveCategory);
      }
    }
  };

  const handleProductPress = (product: Product) => {
    setSelectedProduct(product);
    setModalVisible(true);
  };

  const handleAddToCart = (product: Product) => {
    addItem(product, 1);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
    setSelectedProduct(null);
  };

  const renderProduct = ({ item }: { item: Product }) => (
    <ProductCard
      product={item}
      onPress={() => handleProductPress(item)}
      onAddToCart={() => handleAddToCart(item)}
    />
  );

  const renderHeader = () => (
    <View style={styles.header}>
      {/* Заголовок ресторана */}
      <View style={styles.restaurantHeader}>
        <View style={styles.locationSection}>
          <TouchableOpacity style={styles.locationButton}>
            <Text style={styles.pickupText}>Самовывоз</Text>
            <Ionicons name="chevron-down" size={16} color="#666" />
          </TouchableOpacity>
          <Text style={styles.restaurantAddress}>Среднерогатская, 13</Text>
        </View>
        <View style={styles.bonusSection}>
          <Text style={styles.bonusText}>У вас 57 бонусов!</Text>
        </View>
      </View>
      
      {/* Баннеры с акциями */}
      <View style={styles.promoSection}>
        <Stories />
      </View>
    </View>
  );

  const renderCategorySection = (category: Category) => {
    const categoryProducts = products.filter(product => 
      product.tags.some(tag => tag.toLowerCase() === category.id.toLowerCase())
    );

    if (categoryProducts.length === 0) return null;

    return (
      <View
        key={category.id}
        ref={(() => {
          if (!categoryRefs.current[category.id]) {
            categoryRefs.current[category.id] = React.createRef<View>() as React.RefObject<View>;
          }
          return categoryRefs.current[category.id];
        })()}
        style={styles.categorySection}
        onLayout={(event) => onCategoryLayout(category.id, event)}
      >
        <View style={styles.categoryHeader}>
          <Text style={styles.categoryTitle}>{category.name}</Text>
        </View>
        
        <View style={styles.productsGrid}>
          {categoryProducts.map((product) => (
            <View key={product.id} style={styles.productWrapper}>
              <ProductCard
                product={product}
                onPress={() => handleProductPress(product)}
                onAddToCart={() => {}}
              />
            </View>
          ))}
        </View>
      </View>
    );
  };

  if (loading) {
    return (
      <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
        <StatusBar barStyle={theme.mode === 'dark' ? 'light-content' : 'dark-content'} backgroundColor={theme.colors.surface} />
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={theme.colors.primary} />
          <Text style={[styles.loadingText, { color: theme.colors.textSecondary }]}>Загружаем меню...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      
      <SafeAreaView style={styles.safeArea}>
        {/* Закрепленные категории в шапке (показываются только при скроллинге) */}
        {isCategoriesSticky && (
          <View style={[styles.stickyCategories, { top: insets.top }]}>
            <CategoryFilter
              categories={categories}
              selectedCategory={activeCategory}
              onSelectCategory={handleSelectCategory}
            />
          </View>
        )}
        
        <ScrollView
          ref={scrollViewRef}
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          onScroll={handleScroll}
          scrollEventThrottle={16}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              colors={['#FF8C42']}
              tintColor="#FF8C42"
            />
          }
        >
          {/* Заголовок ресторана и баннеры (уезжают при скроллинге) */}
          <View style={styles.header} onLayout={onHeaderLayout}>
            {renderHeader()}
          </View>
          
          {/* Категории в основном контенте (скрываются при закреплении) */}
          {!isCategoriesSticky && (
            <View style={styles.categoriesSection} onLayout={onCategoriesLayout}>
              <CategoryFilter
                categories={categories}
                selectedCategory={activeCategory}
                onSelectCategory={handleSelectCategory}
              />
            </View>
          )}
          
          {/* Рендерим секции для каждой категории */}
          {categories.map(category => renderCategorySection(category))}
        </ScrollView>
        

        
        <ProductModal
          product={selectedProduct}
          visible={modalVisible}
          onClose={handleCloseModal}
        />
        
        <FloatingCartButton />
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: '#666',
  },
  row: {
    justifyContent: 'space-between',
    paddingHorizontal: 16,
  },
  listContainer: {
    paddingBottom: 20,
  },
  header: {
    backgroundColor: '#fff',
    margin: 0,
    paddingTop: 16,
    paddingBottom: 0,
    paddingHorizontal: 0,
    width: '100%',
    alignSelf: 'stretch',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 60,
  },
  emptyText: {
    fontSize: 48,
    marginBottom: 16,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 14,
    textAlign: 'center',
  },
  sectionHeader: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    marginTop: 8,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2C2C2C',
    letterSpacing: 0.5,
  },
  categorySection: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    paddingTop: 0,
    marginTop: 0,
    backgroundColor: '#fff', // Белый фон вместо серого
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0', // Более светлая граница
  },
  categoryHeader: {
    marginBottom: 8,
    marginTop: 0,
    paddingTop: 0,
  },
  categoryTitle: {
    fontSize: 22, // Увеличен размер
    fontWeight: 'bold',
    color: '#2C2C2C', // Более темный цвет
    letterSpacing: 0.5,
  },
  productsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  productWrapper: {
    width: '48%', // 2 columns
    marginBottom: 15,
  },
  safeArea: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
    overflow: 'hidden',
  },
  scrollContent: {
    paddingBottom: 20,
    paddingTop: 32,
    marginTop: 0,
  },

  stickyHeader: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
    backgroundColor: '#fff',
    paddingBottom: 0,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  scrollSpacer: {
    height: 0, // Отступ не нужен, заголовок в контенте
  },
  promoSection: {
    paddingTop: 8,
    paddingBottom: 0,
    backgroundColor: '#fff',
  },
  restaurantHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: '#fff',
  },
  locationSection: {
    flex: 1,
  },
  locationButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 2,
  },
  pickupText: {
    fontSize: 14,
    color: '#666',
    marginRight: 5,
    fontWeight: '500',
  },
  restaurantName: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#2C2C2C',
    marginBottom: 0,
  },
  restaurantAddress: {
    fontSize: 13,
    color: '#666',
  },
  bonusSection: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 0,
  },
  bonusText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FF8C42',
    textAlign: 'center',
  },

  categoriesSection: {
    paddingHorizontal: 0,
    paddingVertical: 0,
    backgroundColor: '#fff',
    overflow: 'hidden',
  },
  stickyCategories: {
    position: 'absolute',
    left: 0,
    right: 0,
    zIndex: 50,
    backgroundColor: '#fff',
    margin: 0,
    padding: 0,
    overflow: 'hidden',
  },
});
