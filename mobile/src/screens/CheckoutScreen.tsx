import React, { useState } from 'react';
import { View, Text, Button, ActivityIndicator, SafeAreaView, Alert } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { api, CheckoutQuote } from '../api/client';
import { CatalogStackParamList } from './CatalogWrapper';

type CheckoutScreenNavigationProp = NativeStackNavigationProp<CatalogStackParamList, 'Checkout'>;

interface CheckoutScreenProps {
	navigation: CheckoutScreenNavigationProp;
}

export default function CheckoutScreen({ navigation }: CheckoutScreenProps) {
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
		<SafeAreaView style={{ flex: 1, padding: 16 }}>
			<View style={{ flex: 1 }}>
				<Text style={{ fontSize: 20, fontWeight: '700', marginBottom: 24, textAlign: 'center' }}>
					Оформление заказа
				</Text>

				<View style={{ marginBottom: 24 }}>
					<Button 
						title="Получить квоту доставки" 
						onPress={onQuote}
						color="#007AFF"
						disabled={loading}
					/>
				</View>

				{loading && (
					<View style={{ alignItems: 'center', marginBottom: 16 }}>
						<ActivityIndicator size="large" />
						<Text style={{ marginTop: 8, color: '#666' }}>
							Загрузка...
						</Text>
					</View>
				)}

				{error && (
					<View style={{ 
						padding: 12, 
						backgroundColor: '#f8d7da', 
						borderRadius: 8, 
						marginBottom: 16 
					}}>
						<Text style={{ color: '#721c24', textAlign: 'center' }}>
							{error}
						</Text>
					</View>
				)}

				{quote && (
					<View style={{ 
						padding: 16, 
						backgroundColor: '#f8f9fa', 
						borderRadius: 8, 
						marginBottom: 24 
					}}>
						<Text style={{ fontSize: 16, fontWeight: '600', marginBottom: 8 }}>
							Информация о доставке:
						</Text>
						<Text style={{ marginBottom: 4 }}>
							Время доставки: {quote.eta} мин
						</Text>
						<Text style={{ marginBottom: 4 }}>
							Стоимость доставки: {quote.fees} EUR
						</Text>
						<Text>
							Доступные слоты: {quote.available_slots.join(', ')}
						</Text>
					</View>
				)}

				<View style={{ flex: 1, justifyContent: 'flex-end' }}>
					<Button 
						title="Разместить заказ" 
						onPress={onPlace}
						color="#28a745"
						disabled={loading || !quote}
					/>
				</View>
			</View>
		</SafeAreaView>
	);
}
