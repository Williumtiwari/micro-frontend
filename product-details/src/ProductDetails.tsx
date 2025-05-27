import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Container,
  Grid,
  Typography,
  Button,
  Paper,
  Box,
  TextField,
  Snackbar,
  Alert,
} from '@mui/material';

// Mock product data
const mockProduct = {
  id: 1,
  name: 'Premium Fidget Spinner',
  price: 29.99,
  description: 'High-quality metal fidget spinner with ceramic bearings for smooth, quiet spinning. Perfect for stress relief and entertainment.',
  features: [
    'Premium metal construction',
    'Ceramic bearings for smooth spinning',
    'Long spin time',
    'Quiet operation',
    'Durable design',
  ],
  image: 'https://picsum.photos/400/400?random=1',
};

const ProductDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);
  const [showAlert, setShowAlert] = useState(false);

  const handleQuantityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(event.target.value);
    if (value > 0) {
      setQuantity(value);
    }
  };

  const handleAddToCart = () => {
    // TODO: Implement cart functionality
    setShowAlert(true);
  };

  const handleCloseAlert = () => {
    setShowAlert(false);
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 2 }}>
            <img
              src={mockProduct.image}
              alt={mockProduct.name}
              style={{ width: '100%', height: 'auto', borderRadius: '4px' }}
            />
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography variant="h4" component="h1" gutterBottom>
            {mockProduct.name}
          </Typography>
          <Typography variant="h5" color="primary" gutterBottom>
            ${mockProduct.price}
          </Typography>
          <Typography variant="body1" paragraph>
            {mockProduct.description}
          </Typography>
          <Box sx={{ my: 3 }}>
            <Typography variant="h6" gutterBottom>
              Features:
            </Typography>
            <ul>
              {mockProduct.features.map((feature, index) => (
                <li key={index}>
                  <Typography variant="body2">{feature}</Typography>
                </li>
              ))}
            </ul>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
            <TextField
              type="number"
              label="Quantity"
              value={quantity}
              onChange={handleQuantityChange}
              inputProps={{ min: 1 }}
              sx={{ width: '100px' }}
            />
            <Button
              variant="contained"
              color="primary"
              size="large"
              onClick={handleAddToCart}
            >
              Add to Cart
            </Button>
          </Box>
          <Button
            variant="outlined"
            color="primary"
            onClick={() => navigate('/')}
          >
            Back to Products
          </Button>
        </Grid>
      </Grid>
      <Snackbar
        open={showAlert}
        autoHideDuration={3000}
        onClose={handleCloseAlert}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseAlert} severity="success">
          Product added to cart!
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default ProductDetails; 