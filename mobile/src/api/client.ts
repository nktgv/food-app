// Для Android эмулятора нужно использовать 10.0.2.2 вместо localhost
const getApiBase = () => {
	// Проверяем, запущено ли приложение в Android эмуляторе
	if (__DEV__) {
		// В режиме разработки используем разные адреса для разных платформ
		const platform = require('react-native').Platform.OS;
		if (platform === 'android') {
			// Android эмулятор использует 10.0.2.2 для доступа к localhost хоста
			return 'http://10.0.2.2:8080/api';
		} else if (platform === 'ios') {
			// iOS симулятор может использовать localhost
			return 'http://localhost:8080/api';
		}
	}
	
	// Для продакшена или физических устройств используем переменную окружения
	return process.env.EXPO_PUBLIC_API_BASE || 'http://localhost:8080/api';
};

export const API_BASE = getApiBase();

// Types
export interface Product {
	id: string;
	name: string;
	description: string;
	media: string[];
	base_price: number;
	currency: string;
	variants: Variant[];
	modifier_groups: ModGroup[];
	allergens: string[];
	tags: string[];
}

export interface Variant {
	id: string;
	name: string;
	price_delta: number;
}

export interface ModGroup {
	id: string;
	name: string;
	min_select: number;
	max_select: number;
	required: boolean;
	modifiers: Modifier[];
}

export interface Modifier {
	id: string;
	name: string;
	price_delta: number;
	is_default?: boolean;
}

export interface CartItem {
	item_id: string;
	product_id: string;
	variant_id: string;
	qty: number;
	unit_price: number;
	modifiers_total: number;
	line_subtotal: number;
}

export interface CartTotals {
	items: CartItem[];
	subtotal: number;
	discounts: number;
	bonuses_applied: number;
	fees: number;
	tax: number;
	total: number;
	currency: string;
}

export interface CatalogResponse {
	categories: { id: string; name: string }[];
}

export interface CheckoutQuote {
	eta: number;
	fees: number;
	available_slots: string[];
}

export interface CheckoutPlace {
	order_id: string;
	payment_status: string;
}

async function request<T>(path: string, options?: RequestInit): Promise<T> {
	const url = `${API_BASE}${path}`;
	console.log(`API Request: ${url}`); // Для отладки
	
	try {
		const res = await fetch(url, {
			...options,
			headers: { 
				'Content-Type': 'application/json', 
				...(options?.headers || {}) 
			},
		});
		
		if (!res.ok) {
			throw new Error(`API ${res.status}: ${res.statusText}`);
		}
		
		return res.json() as Promise<T>;
	} catch (error) {
		console.error(`API Error for ${url}:`, error);
		throw error;
	}
}

export const api = {
	getCatalog: () => request<CatalogResponse>(`/catalog`),
	getProducts: () => request<Product[]>(`/products`),
	getProduct: (id: string) => request<Product>(`/products/${id}`),
	createCart: () => request<{ id: string }>(`/cart`, { method: 'POST', body: '{}' }),
	getTotals: () => request<CartTotals>(`/cart/totals`),
	quote: (body: any) => request<CheckoutQuote>(`/checkout/quote`, { method: 'POST', body: JSON.stringify(body) }),
	place: (body: any) => request<CheckoutPlace>(`/checkout/place`, { method: 'POST', body: JSON.stringify(body) }),
};
