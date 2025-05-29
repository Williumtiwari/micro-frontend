import React, { useState, useEffect } from 'react';
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
  useTheme,
  useMediaQuery,
} from '@mui/material';
import { useCart } from 'container/CartContext';
import SharedCartProvider from 'container/SharedCartProvider';
import { products, Product } from '../../products/src/data';

const ProductDetailsContent: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);
  const [showAlert, setShowAlert] = useState(false);
  const { addToCart, cartItems } = useCart();
  const [product, setProduct] = useState<Product | undefined>(products.find((p: Product) => p.id === id));
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));

  useEffect(() => {
    if (!product) {
      navigate('/');
    }
  }, [product, navigate]);

  if (!product) {
    return null;
  }

  const handleQuantityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(event.target.value);
    if (value > 0) {
      setQuantity(value);
    }
  };

  const handleAddToCart = () => {
    console.log('Adding to cart:', product, 'quantity:', quantity);
    addToCart({
      id: parseInt(product.id),
      name: product.name,
      price: product.price,
      image: product.imageUrl
    }, quantity);
    console.log('Current cart items:', cartItems);
    setShowAlert(true);
  };

  const handleCloseAlert = () => {
    setShowAlert(false);
  };

  // Generate features based on product description
  const features = [
    'High-quality materials',
    'Smooth spinning action',
    'Durable construction',
    'Perfect for stress relief',
    'Great for all ages'
  ];

  return (
    <Container 
      maxWidth="lg" 
      sx={{ 
        mt: { xs: 2, sm: 3, md: 4 }, 
        mb: { xs: 2, sm: 3, md: 4 },
        px: { xs: 2, sm: 3, md: 4 }
      }}
    >
      <Grid container spacing={{ xs: 2, sm: 3, md: 4 }}>
        <Grid item xs={12} md={6}>
          <Paper 
            elevation={3} 
            sx={{ 
              p: { xs: 1, sm: 2 },
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            <img
              src={product.imageUrl}
              alt={product.name}
              style={{ 
                width: '100%', 
                height: 'auto', 
                borderRadius: '4px',
                maxHeight: isMobile ? '300px' : '500px',
                objectFit: 'contain'
              }}
            />
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Box sx={{ 
            display: 'flex', 
            flexDirection: 'column',
            gap: { xs: 1, sm: 2, md: 3 }
          }}>
            <Typography 
              variant={isMobile ? "h5" : "h4"} 
              component="h1" 
              gutterBottom
              sx={{ 
                fontWeight: 'bold',
                fontSize: { xs: '1.5rem', sm: '2rem', md: '2.5rem' }
              }}
            >
              {product.name}
            </Typography>
            <Typography 
              variant={isMobile ? "h6" : "h5"} 
              color="primary" 
              gutterBottom
              sx={{ 
                fontSize: { xs: '1.25rem', sm: '1.5rem', md: '1.75rem' }
              }}
            >
              ${product.price.toFixed(2)}
            </Typography>
            <Typography 
              variant="body1" 
              paragraph
              sx={{ 
                fontSize: { xs: '0.875rem', sm: '1rem' },
                lineHeight: 1.6
              }}
            >
              {product.description}
            </Typography>
            <Box sx={{ 
              my: { xs: 2, sm: 3 },
              backgroundColor: 'background.paper',
              p: { xs: 2, sm: 3 },
              borderRadius: 1
            }}>
              <Typography 
                variant="h6" 
                gutterBottom
                sx={{ 
                  fontSize: { xs: '1rem', sm: '1.25rem' },
                  mb: 2
                }}
              >
                Features:
              </Typography>
              <ul style={{ 
                margin: 0, 
                paddingLeft: isMobile ? '1.5rem' : '2rem',
                listStyleType: 'disc'
              }}>
                {features.map((feature, index) => (
                  <li key={index}>
                    <Typography 
                      variant="body2"
                      sx={{ 
                        fontSize: { xs: '0.875rem', sm: '1rem' },
                        mb: 1
                      }}
                    >
                      {feature}
                    </Typography>
                  </li>
                ))}
              </ul>
            </Box>
            <Box sx={{ 
              display: 'flex', 
              flexDirection: { xs: 'column', sm: 'row' },
              alignItems: { xs: 'stretch', sm: 'center' },
              gap: 2, 
              mb: 3 
            }}>
              <TextField
                type="number"
                label="Quantity"
                value={quantity}
                onChange={handleQuantityChange}
                inputProps={{ min: 1 }}
                sx={{ 
                  width: { xs: '100%', sm: '120px' },
                  mb: { xs: 2, sm: 0 }
                }}
              />
              <Button
                variant="contained"
                color="primary"
                size="large"
                onClick={handleAddToCart}
                fullWidth={isMobile}
                sx={{ 
                  py: { xs: 1.5, sm: 2 },
                  fontSize: { xs: '0.875rem', sm: '1rem' }
                }}
              >
                Add to Cart
              </Button>
            </Box>
            <Button
              variant="outlined"
              color="primary"
              onClick={() => navigate('/')}
              fullWidth={isMobile}
              sx={{ 
                mt: { xs: 1, sm: 2 },
                py: { xs: 1, sm: 1.5 }
              }}
            >
              Back to Products
            </Button>
          </Box>
        </Grid>
      </Grid>
      <Snackbar
        open={showAlert}
        autoHideDuration={3000}
        onClose={handleCloseAlert}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        sx={{
          bottom: { xs: 16, sm: 24 }
        }}
      >
        <Alert 
          onClose={handleCloseAlert} 
          severity="success"
          sx={{ 
            width: '100%',
            fontSize: { xs: '0.875rem', sm: '1rem' }
          }}
        >
          Product added to cart!
        </Alert>
      </Snackbar>
    </Container>
  );
};

const ProductDetails: React.FC = () => {
  return (
    <SharedCartProvider>
      <ProductDetailsContent />
    </SharedCartProvider>
  );
};

export default ProductDetails; 