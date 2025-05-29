declare module 'container/CartContext' {
  export interface CartItem {
    id: number;
    name: string;
    price: number;
    quantity: number;
    image: string;
  }

  export interface CartContextType {
    cartItems: CartItem[];
    addToCart: (item: Omit<CartItem, 'quantity'>, quantity: number) => void;
    updateQuantity: (id: number, quantity: number) => void;
    removeFromCart: (id: number) => void;
    clearCart: () => void;
  }

  export const useCart: () => CartContextType;
}

declare module 'container/SharedCartProvider' {
  import { ReactNode } from 'react';
  const SharedCartProvider: React.FC<{ children: ReactNode }>;
  export default SharedCartProvider;
} 