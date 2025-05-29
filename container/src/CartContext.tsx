import React, { createContext, useContext, useState, ReactNode, useCallback } from 'react';

export interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (item: Omit<CartItem, 'quantity'>, quantity: number) => void;
  updateQuantity: (id: number, quantity: number) => void;
  removeFromCart: (id: number) => void;
  clearCart: () => void;
}

// Create a global event bus for cart updates
const cartEventBus = {
  listeners: new Set<(items: CartItem[]) => void>(),
  items: [] as CartItem[],
  subscribe(listener: (items: CartItem[]) => void) {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  },
  notify() {
    this.listeners.forEach(listener => listener(this.items));
  },
  updateItems(newItems: CartItem[]) {
    this.items = newItems;
    this.notify();
  }
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>(cartEventBus.items);

  // Subscribe to cart updates
  React.useEffect(() => {
    const unsubscribe = cartEventBus.subscribe(setCartItems);
    return () => {
      unsubscribe();
    };
  }, []);

  const addToCart = useCallback((item: Omit<CartItem, 'quantity'>, quantity: number) => {
    const newItems = [...cartEventBus.items];
    const existingItem = newItems.find((i) => i.id === item.id);
    
    if (existingItem) {
      const index = newItems.findIndex(i => i.id === item.id);
      newItems[index] = { ...existingItem, quantity: existingItem.quantity + quantity };
    } else {
      newItems.push({ ...item, quantity });
    }
    
    cartEventBus.updateItems(newItems);
  }, []);

  const updateQuantity = useCallback((id: number, quantity: number) => {
    if (quantity > 0) {
      const newItems = cartEventBus.items.map((item) =>
        item.id === id ? { ...item, quantity } : item
      );
      cartEventBus.updateItems(newItems);
    }
  }, []);

  const removeFromCart = useCallback((id: number) => {
    const newItems = cartEventBus.items.filter((item) => item.id !== id);
    cartEventBus.updateItems(newItems);
  }, []);

  const clearCart = useCallback(() => {
    cartEventBus.updateItems([]);
  }, []);

  const value = {
    cartItems,
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart,
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

// Export for module federation
export default {
  CartProvider,
  useCart,
}; 