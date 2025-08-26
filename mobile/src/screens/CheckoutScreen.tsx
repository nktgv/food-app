import React, { useState } from 'react';
import { View, Text, Button, ActivityIndicator, SafeAreaView, Alert, StyleSheet } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { api, CheckoutQuote } from '../api/client';
import { CatalogStackParamList } from './CatalogWrapper';
import { useTheme } from '../theme/ThemeProvider';

type CheckoutScreenNavigationProp = NativeStackNavigationProp<CatalogStackParamList, 'Checkout'>;

interface CheckoutScreenProps {
	navigation: CheckoutScreenNavigationProp;
}

export default function CheckoutScreen({ navigation }: CheckoutScreenProps) {
	const theme = useTheme();
	const [loading, setLoading] = useState(false);
	const [quote, setQuote] = useState<CheckoutQuote | null>(null);
	const [error, setError] = useState<string | null>(null);

	const onQuote = async () => {
		setLoading(true);
		setError(null);
		try {
			const q = await api.quote({ 
				cart_id: 'cart_dev', 
				fulfillment_type: 'pickup' 
			});
			setQuote(q);
		} catch (error) {
			console.error('Failed to get quote:', error);
			setError('Не удалось получить квоту доставки');
		} finally {
			setLoading(false);
		}
	};

	const onPlace = async () => {
		if (!quote) {
			Alert.alert('Ошибка', 'Сначала получите квоту доставки');
			return;
		}

		setLoading(true);
		setError(null);
		try {
			const res = await api.place({ 
				cart_id: 'cart_dev', 
				payment_method: 'token', 
				fulfillment_details: {} 
			});
			navigation.navigate('Order', { id: res.order_id });
		} catch (error) {
			console.error('Failed to place order:', error);
			setError('Не удалось оформить заказ');
		} finally {
			setLoading(false);
		}
	};

	return (
		<SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
			<View style={styles.content}>
				<Text style={[styles.title, { color: theme.colors.textPrimary }]}>
					Оформление заказа
				</Text>

				<View style={styles.buttonContainer}>
					<Button 
						title="Получить квоту доставки" 
						onPress={onQuote}
						color={theme.colors.primary}
						disabled={loading}
					/>
				</View>

				{loading && (
					<View style={styles.loadingContainer}>
						<ActivityIndicator size="large" color={theme.colors.primary} />
						<Text style={[styles.loadingText, { color: theme.colors.textSecondary }]}>
							Загрузка...
						</Text>
					</View>
				)}

				{error && (
					<View style={[styles.errorContainer, { backgroundColor: theme.colors.error + '20' }]}>
						<Text style={[styles.errorText, { color: theme.colors.error }]}>
							{error}
						</Text>
					</View>
				)}

				{quote && (
					<View style={[styles.quoteContainer, { backgroundColor: theme.colors.surface }]}>
						<Text style={[styles.quoteTitle, { color: theme.colors.textPrimary }]}>
							Информация о доставке:
						</Text>
						<Text style={[styles.quoteText, { color: theme.colors.textSecondary }]}>
							Время доставки: {quote.eta} мин
						</Text>
						<Text style={[styles.quoteText, { color: theme.colors.textSecondary }]}>
							Стоимость доставки: {quote.fees} EUR
						</Text>
						<Text style={[styles.quoteText, { color: theme.colors.textSecondary }]}>
							Доступные слоты: {quote.available_slots.join(', ')}
						</Text>
					</View>
				)}

				<View style={styles.bottomContainer}>
					<Button 
						title="Разместить заказ" 
						onPress={onPlace}
						color={theme.colors.success}
						disabled={loading || !quote}
					/>
				</View>
			</View>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 16,
	},
	content: {
		flex: 1,
	},
	title: {
		fontSize: 20,
		fontWeight: '700',
		marginBottom: 24,
		textAlign: 'center',
	},
	buttonContainer: {
		marginBottom: 24,
	},
	loadingContainer: {
		alignItems: 'center',
		marginBottom: 16,
	},
	loadingText: {
		marginTop: 8,
	},
	errorContainer: {
		padding: 12,
		borderRadius: 8,
		marginBottom: 16,
	},
	errorText: {
		textAlign: 'center',
		fontWeight: '500',
	},
	quoteContainer: {
		padding: 16,
		borderRadius: 8,
		marginBottom: 24,
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.1,
		shadowRadius: 4,
		elevation: 3,
	},
	quoteTitle: {
		fontSize: 16,
		fontWeight: '600',
		marginBottom: 8,
	},
	quoteText: {
		marginBottom: 4,
	},
	bottomContainer: {
		flex: 1,
		justifyContent: 'flex-end',
	},
});
