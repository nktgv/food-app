export const colors = {
  // Основные цвета на основе логотипа
  primary: '#FED07C', // Светло-оранжевый из внешнего кольца логотипа
  primaryLight: '#FFB366', // Более светлый оранжевый
  primaryDark: '#E67E22', // Темный оранжевый

  // Акцентные цвета
  accent: '#FED07C', // Темно-коричневый из текста логотипа
  accentLight: '#A0522D', // Светло-коричневый
  accentDark: '#654321', // Очень темный коричневый

  // Фоновые цвета - все белые для чистоты
  background: '#FFFFFF', // Белый фон
  surface: '#FFFFFF', // Белый для карточек

  // Текстовые цвета - более мягкие
  textPrimary: '#2C2C2C', // Темно-серый для основного текста
  textSecondary: '#6B6B6B', // Средне-серый для второстепенного текста
  textLight: '#9E9E9E', // Светло-серый для легкого текста

  // Границы и разделители - очень светлые
  border: '#F0F0F0', // Очень светлый серый для границ
  divider: '#F8F8F8', // Почти белый для разделителей

  // Статусные цвета
  error: '#D32F2F', // Красный
  success: '#388E3C', // Зеленый
  warning: '#FF9800', // Оранжевый
  warningLight: '#FFB74D',

  // Цвета продуктов на основе логотипа
  productRed: '#FF5722', // Красный как томат
  productRedLight: '#FF8A65',
  productOrange: '#FF8C42', // Оранжевый как основной цвет
  productOrangeLight: '#FFB366',
  productBrown: '#8B4513', // Коричневый как текст
  productBrownLight: '#A0522D',
  productGreen: '#4CAF50', // Зеленый как салат
  productGreenLight: '#81C784',

  // Градации серого на основе коричневой палитры
  gray50: '#FAFAFA',
  gray100: '#F5F5F5',
  gray200: '#EEEEEE',
  gray300: '#E0E0E0',
  gray400: '#BDBDBD',
  gray500: '#9E9E9E',
  gray600: '#757575',
  gray700: '#616161',
  gray800: '#424242',
  gray900: '#212121',

  // Градиенты для категорий продуктов на основе новой палитры
  gradients: {
    shaurma: ['#FF8C42', '#FFB366'] as [string, string],
    'курица': ['#FFB366', '#FFCC80'] as [string, string],
    'говядина': ['#8B4513', '#A0522D'] as [string, string],
    'морепродукты': ['#26A69A', '#4DB6AC'] as [string, string],
    'острая': ['#FF5722', '#FF8A65'] as [string, string],
    'сыр': ['#FFB300', '#FFC107'] as [string, string],
    'большая': ['#9C27B0', '#BA68C8'] as [string, string],
    'картофель': ['#FF9800', '#FFB74D'] as [string, string],
    'грибы': ['#795548', '#8D6E63'] as [string, string],
    'классическая': ['#607D8B', '#78909C'] as [string, string],
    'баранина': ['#8BC34A', '#9CCC65'] as [string, string],
    'лук': ['#FF9800', '#FFA726'] as [string, string],
    'премиум': ['#9C27B0', '#AB47BC'] as [string, string],
    'большой': ['#E91E63', '#F06292'] as [string, string],
    'морс': ['#8E24AA', '#BA68C8'] as [string, string],
    'газировка': ['#00ACC1', '#26C6DA'] as [string, string],
    'кола': ['#795548', '#8D6E63'] as [string, string],
    'лимонад': ['#FFD54F', '#FFEB3B'] as [string, string],
    'апельсин': ['#FF9800', '#FFB74D'] as [string, string],
    'дюшес': ['#8BC34A', '#9CCC65'] as [string, string],
    'лимон': ['#FFEB3B', '#FFF176'] as [string, string],
    'морской': ['#0097A7', '#00BCD4'] as [string, string],
    'коктейль': ['#E91E63', '#F06292'] as [string, string],
    'острый': ['#FF5722', '#FF8A65'] as [string, string],
    'чили': ['#FF3D00', '#FF5722'] as [string, string],
    'манго': ['#FFB74D', '#FFC107'] as [string, string],
    'пахлава': ['#D2691E', '#CD853F'] as [string, string],
    'вегетарианская': ['#4CAF50', '#66BB6A'] as [string, string],
    // Основные категории
    snacks: ['#FFB366', '#FFCC80'] as [string, string],
    burger: ['#FF8C42', '#FFB366'] as [string, string],
    drink: ['#26A69A', '#4DB6AC'] as [string, string],
    sauces: ['#FF9800', '#FFB74D'] as [string, string],
    bablshaurma: ['#E91E63', '#F06292'] as [string, string],
    dessert: ['#AB47BC', '#BA68C8'] as [string, string],
    seafood: ['#00BCD4', '#26C6DA'] as [string, string],
    pizza: ['#FF6B6B', '#FF8E8E'] as [string, string],
    sushi: ['#4FC3F7', '#81D4FA'] as [string, string],
    pasta: ['#FF8C42', '#FFB366'] as [string, string],
    salad: ['#66BB6A', '#81C784'] as [string, string],
    coffee: ['#8D6E63', '#A1887F'] as [string, string],
    breakfast: ['#FFB366', '#FFCC80'] as [string, string],
    lunch: ['#4CAF50', '#66BB6A'] as [string, string],
    dinner: ['#FF8C42', '#FFB366'] as [string, string],
    food: ['#FF8C42', '#FFB366'] as [string, string],
  },
};
