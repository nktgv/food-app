import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, SafeAreaView, StyleSheet } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { CatalogStackParamList } from './CatalogWrapper';

type OrderScreenRouteProp = RouteProp<CatalogStackParamList, 'Order'>;

interface OrderScreenProps {
	route: OrderScreenRouteProp;
}

type OrderStatus = 'NEW' | 'KITCHEN_CONFIRMED' | 'IN_PREPARATION' | 'READY_FOR_PICKUP' | 'OUT_FOR_DELIVERY' | 'DELIVERED';

const getStatusText = (status: OrderStatus): string => {
	switch (status) {
		case 'NEW':
			return 'Заказ принят';
		case 'KITCHEN_CONFIRMED':
			return 'Кухня подтвердила заказ';
		case 'IN_PREPARATION':
			return 'Готовится';
		case 'READY_FOR_PICKUP':
			return 'Готов к выдаче';
		case 'OUT_FOR_DELIVERY':
			return 'В пути';
		case 'DELIVERED':
			return 'Доставлен';
		default:
			return 'Неизвестный статус';
	}
};

const getStatusColor = (status: OrderStatus): string => {
	switch (status) {
		case 'NEW':
		case 'KITCHEN_CONFIRMED':
			return '#007AFF';
		case 'IN_PREPARATION':
			return '#FF9500';
		case 'READY_FOR_PICKUP':
		case 'OUT_FOR_DELIVERY':
			return '#28a745';
		case 'DELIVERED':
			return '#6c757d';
		default:
			return '#666';
	}
};

export default function OrderScreen({ route }: OrderScreenProps) {
	const { id } = route.params;
	const [status, setStatus] = useState<OrderStatus>('NEW');

	useEffect(() => {
		const t = setInterval(() => {
			// Простая симуляция обновления статуса
			setStatus((s) => {
				switch (s) {
					case 'NEW':
						return 'KITCHEN_CONFIRMED';
					case 'KITCHEN_CONFIRMED':
						return 'IN_PREPARATION';
					case 'IN_PREPARATION':
						return 'READY_FOR_PICKUP';
					case 'READY_FOR_PICKUP':
						return 'OUT_FOR_DELIVERY';
					case 'OUT_FOR_DELIVERY':
						return 'DELIVERED';
					default:
						return s;
				}
			});
		}, 3000);

		return () => clearInterval(t);
	}, []);

	return (
		<SafeAreaView style={styles.container}>
			<View style={styles.content}>
				<Text style={styles.orderId}>Заказ #{id}</Text>
				
				<View style={styles.statusContainer}>
					<Text style={styles.statusLabel}>Статус:</Text>
					<Text style={[styles.statusText, { color: getStatusColor(status) }]}>
						{getStatusText(status)}
					</Text>
				</View>

				{status === 'NEW' && (
					<View style={styles.loadingContainer}>
						<ActivityIndicator size="large" color="#007AFF" />
						<Text style={styles.loadingText}>Ожидание подтверждения кухни...</Text>
					</View>
				)}

				{status === 'DELIVERED' && (
					<View style={styles.completedContainer}>
						<Text style={styles.completedText}>🎉</Text>
						<Text style={styles.completedMessage}>
							Заказ успешно доставлен!
						</Text>
					</View>
				)}
			</View>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
	},
	content: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		padding: 20,
	},
	orderId: {
		fontSize: 24,
		fontWeight: '700',
		marginBottom: 20,
		color: '#333',
	},
	statusContainer: {
		alignItems: 'center',
		marginBottom: 30,
	},
	statusLabel: {
		fontSize: 16,
		color: '#666',
		marginBottom: 8,
	},
	statusText: {
		fontSize: 18,
		fontWeight: '600',
	},
	loadingContainer: {
		alignItems: 'center',
	},
	loadingText: {
		marginTop: 16,
		fontSize: 16,
		color: '#666',
		textAlign: 'center',
	},
	completedContainer: {
		alignItems: 'center',
	},
	completedText: {
		fontSize: 48,
		marginBottom: 16,
	},
	completedMessage: {
		fontSize: 18,
		color: '#28a745',
		fontWeight: '600',
		textAlign: 'center',
	},
});
