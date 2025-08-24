import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { Product } from '../api/client';

export interface CartItem {
  id: string;
  product: Product;
  quantity: number;
  variantId?: string;
  modifiers: string[];
  unitPrice: number;
  totalPrice: number;
}

interface CartState {
  items: CartItem[];
  totalItems: number;
  subtotal: number;
  currency: string;
}

type CartAction =
  | { type: 'ADD_ITEM'; payload: { product: Product; quantity?: number; variantId?: string } }
  | { type: 'REMOVE_ITEM'; payload: { itemId: string } }
  | { type: 'UPDATE_QUANTITY'; payload: { itemId: string; quantity: number } }
  | { type: 'CLEAR_CART' }
  | { type: 'SET_CART'; payload: CartState };

const initialState: CartState = {
  items: [],
  totalItems: 0,
  subtotal: 0,
  currency: '₽'
};

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case 'ADD_ITEM': {
      const { product, quantity = 1, variantId } = action.payload;
      const existingItemIndex = state.items.findIndex(
        item => item.product.id === product.id && item.variantId === variantId
      );

      if (existingItemIndex >= 0) {
        // Обновляем существующий товар
        const updatedItems = [...state.items];
        const existingItem = updatedItems[existingItemIndex];
        const newQuantity = existingItem.quantity + quantity;
        const newTotalPrice = product.base_price * newQuantity;

        updatedItems[existingItemIndex] = {
          ...existingItem,
          quantity: newQuantity,
          totalPrice: newTotalPrice
        };

        return {
          ...state,
          items: updatedItems,
          totalItems: state.totalItems + quantity,
          subtotal: state.subtotal + (product.base_price * quantity)
        };
      } else {
        // Добавляем новый товар
        const newItem: CartItem = {
          id: `${product.id}-${variantId || 'default'}-${Date.now()}`,
          product,
          quantity,
          variantId,
          modifiers: [],
          unitPrice: product.base_price,
          totalPrice: product.base_price * quantity
        };

        return {
          ...state,
          items: [...state.items, newItem],
          totalItems: state.totalItems + quantity,
          subtotal: state.subtotal + newItem.totalPrice
        };
      }
    }

    case 'REMOVE_ITEM': {
      const { itemId } = action.payload;
      const itemToRemove = state.items.find(item => item.id === itemId);
      
      if (!itemToRemove) return state;

      return {
        ...state,
        items: state.items.filter(item => item.id !== itemId),
        totalItems: state.totalItems - itemToRemove.quantity,
        subtotal: state.subtotal - itemToRemove.totalPrice
      };
    }

    case 'UPDATE_QUANTITY': {
      const { itemId, quantity } = action.payload;
      const itemIndex = state.items.findIndex(item => item.id === itemId);
      
      if (itemIndex === -1) return state;

      const item = state.items[itemIndex];
      const quantityDiff = quantity - item.quantity;
      const priceDiff = item.unitPrice * quantityDiff;

      if (quantity <= 0) {
        // Удаляем товар если количество 0 или меньше
        return {
          ...state,
          items: state.items.filter(item => item.id !== itemId),
          totalItems: state.totalItems - item.quantity,
          subtotal: state.subtotal - item.totalPrice
        };
      }

      const updatedItems = [...state.items];
      updatedItems[itemIndex] = {
        ...item,
        quantity,
        totalPrice: item.unitPrice * quantity
      };

      return {
        ...state,
        items: updatedItems,
        totalItems: state.totalItems + quantityDiff,
        subtotal: state.subtotal + priceDiff
      };
    }

    case 'CLEAR_CART':
      return initialState;

    case 'SET_CART':
      return action.payload;

    default:
      return state;
  }
}

interface CartContextType {
  state: CartState;
  addItem: (product: Product, quantity?: number, variantId?: string) => void;
  removeItem: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  getItemQuantity: (productId: string, variantId?: string) => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  const addItem = (product: Product, quantity: number = 1, variantId?: string) => {
    dispatch({ type: 'ADD_ITEM', payload: { product, quantity, variantId } });
  };

  const removeItem = (itemId: string) => {
    dispatch({ type: 'REMOVE_ITEM', payload: { itemId } });
  };

  const updateQuantity = (itemId: string, quantity: number) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { itemId, quantity } });
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  const getItemQuantity = (productId: string, variantId?: string): number => {
    const item = state.items.find(
      item => item.product.id === productId && item.variantId === variantId
    );
    return item ? item.quantity : 0;
  };

  return (
    <CartContext.Provider value={{
      state,
      addItem,
      removeItem,
      updateQuantity,
      clearCart,
      getItemQuantity
    }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
