import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Button,
  Divider,
  Box,
  TextField,
  Paper,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { useCart } from 'container/CartContext';
import SharedCartProvider from 'container/SharedCartProvider';

const CartContent: React.FC = () => {
  const navigate = useNavigate();
  const { cartItems, updateQuantity, removeFromCart } = useCart();

  useEffect(() => {
    console.log('Cart items updated:', cartItems);
  }, [cartItems]);

  const handleQuantityChange = (productId: number, newQuantity: number) => {
    console.log('Updating quantity for product:', productId, 'to:', newQuantity);
    updateQuantity(productId, newQuantity);
  };

  const handleRemoveItem = (productId: number) => {
    console.log('Removing product:', productId);
    removeFromCart(productId);
  };

  const calculateTotal = () => {
    const total = cartItems.reduce((sum: number, item: { price: number; quantity: number }) => 
      sum + item.price * item.quantity, 0);
    console.log('Calculated total:', total);
    return total;
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Shopping Cart
      </Typography>
      {cartItems.length === 0 ? (
        <Paper sx={{ p: 3, textAlign: 'center' }}>
          <Typography variant="h6">Your cart is empty</Typography>
        </Paper>
      ) : (
        <>
          <List>
            {cartItems.map((item: { id: number; name: string; price: number; quantity: number; image: string }) => (
              <React.Fragment key={item.id}>
                <ListItem>
                  <img
                    src={item.image}
                    alt={item.name}
                    style={{ width: 60, height: 60, marginRight: 16 }}
                  />
                  <ListItemText
                    primary={item.name}
                    secondary={`$${item.price.toFixed(2)}`}
                  />
                  <ListItemSecondaryAction>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <TextField
                        type="number"
                        value={item.quantity}
                        onChange={(e) => {
                          const newQuantity = parseInt(e.target.value);
                          if (newQuantity > 0) {
                            handleQuantityChange(item.id, newQuantity);
                          }
                        }}
                        inputProps={{ min: 1 }}
                        sx={{ width: '80px' }}
                      />
                      <IconButton
                        edge="end"
                        aria-label="delete"
                        onClick={() => handleRemoveItem(item.id)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Box>
                  </ListItemSecondaryAction>
                </ListItem>
                <Divider />
              </React.Fragment>
            ))}
          </List>
          <Box sx={{ mt: 3, textAlign: 'right' }}>
            <Typography variant="h6" gutterBottom>
              Total: ${calculateTotal().toFixed(2)}
            </Typography>
            <Button
              variant="contained"
              color="primary"
              size="large"
              onClick={() => navigate('/checkout')}
            >
              Proceed to Checkout
            </Button>
          </Box>
        </>
      )}
    </Container>
  );
};

const Cart: React.FC = () => {
  return (
    <SharedCartProvider>
      <CartContent />
    </SharedCartProvider>
  );
};

export default Cart; 