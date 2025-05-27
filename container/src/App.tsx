import React, { Suspense } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Container, CircularProgress, IconButton, Badge } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

// Lazy load micro-frontends
const Products = React.lazy(() => import('products/Products'));
const ProductDetails = React.lazy(() => import('./productDetails/ProductDetails'));
const Cart = React.lazy(() => import('./cart/Cart'));
const Checkout = React.lazy(() => import('./checkout/Checkout'));

const App: React.FC = () => {
  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component={Link} to="/" sx={{ flexGrow: 1, textDecoration: 'none', color: 'inherit' }}>
            Fidget Spinner Shop
          </Typography>
          <IconButton color="inherit" component={Link} to="/cart">
            <Badge badgeContent={0} color="error">
              <ShoppingCartIcon />
            </Badge>
          </IconButton>
        </Toolbar>
      </AppBar>

      <Container sx={{ mt: 4 }}>
        <Suspense fallback={<CircularProgress />}>
          <Routes>
            <Route path="/" element={<Products />} />
            <Route path="/product/:id" element={<ProductDetails />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
          </Routes>
        </Suspense>
      </Container>
    </div>
  );
};

export default App; 