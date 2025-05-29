import React from 'react';
import { CartProvider } from './CartContext';

// This component will be used to wrap micro-frontends
export const SharedCartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <CartProvider>{children}</CartProvider>;
};

export default SharedCartProvider; 