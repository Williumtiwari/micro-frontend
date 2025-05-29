import React, { Suspense } from 'react';
import { Routes, Route, Link, Navigate } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Container, CircularProgress, IconButton, Badge, Button } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { CartProvider, useCart } from './CartContext';
import { AuthProvider, useAuth } from 'auth/AuthContext';
import { ProtectedRoute } from 'auth/ProtectedRoute';
import { GoogleOAuthProvider } from '@react-oauth/google';

// Get Google OAuth Client ID from environment variable
if (!process.env.REACT_APP_GOOGLE_CLIENT_ID) {
  throw new Error('REACT_APP_GOOGLE_CLIENT_ID environment variable is not defined');
}
const GOOGLE_CLIENT_ID = process.env.REACT_APP_GOOGLE_CLIENT_ID;

// Lazy load micro-frontends
const Products = React.lazy(() => import('products/Products'));
const ProductDetails = React.lazy(() => import('productDetails/ProductDetails').then(module => ({ default: module.default })));
const Cart = React.lazy(() => import('cart/Cart'));
const Checkout = React.lazy(() => import('checkout/Checkout'));
const Confirmation = React.lazy(() => import('checkout/Confirmation'));
const SignIn = React.lazy(() => import('auth/SignIn'));

const AppContent: React.FC = () => {
  const { cartItems } = useCart();
  const { isAuthenticated, logout } = useAuth();
  const itemCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component={Link} to="/" sx={{ flexGrow: 1, textDecoration: 'none', color: 'inherit' }}>
            Fidget Spinner Shop
          </Typography>
          <IconButton color="inherit" component={Link} to="/cart">
            <Badge badgeContent={itemCount} color="error">
              <ShoppingCartIcon />
            </Badge>
          </IconButton>
          {isAuthenticated ? (
            <Button color="inherit" onClick={logout}>
              Sign Out
            </Button>
          ) : (
            <Button color="inherit" component={Link} to="/signin">
              Sign In
            </Button>
          )}
        </Toolbar>
      </AppBar>

      <Container sx={{ mt: 4 }}>
        <Suspense fallback={<CircularProgress />}>
          <Routes>
            <Route path="/" element={<Products />} />
            <Route path="/product/:id" element={<ProductDetails />} />
            <Route path="/signin" element={<SignIn />} />
            <Route
              path="/cart"
              element={
                <ProtectedRoute>
                  <Cart />
                </ProtectedRoute>
              }
            />
            <Route
              path="/checkout"
              element={
                <ProtectedRoute>
                  <Checkout />
                </ProtectedRoute>
              }
            />
            <Route
              path="/confirmation"
              element={
                <ProtectedRoute>
                  <Confirmation />
                </ProtectedRoute>
              }
            />
          </Routes>
        </Suspense>
      </Container>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <AuthProvider>
        <CartProvider>
          <AppContent />
        </CartProvider>
      </AuthProvider>
    </GoogleOAuthProvider>
  );
};

export default App; 