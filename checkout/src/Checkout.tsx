import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Typography,
  Paper,
  Grid,
  TextField,
  Button,
  FormControlLabel,
  Checkbox,
  Box,
  Stepper,
  Step,
  StepLabel,
} from '@mui/material';
import { useCart } from 'container/CartContext';
import SharedCartProvider from 'container/SharedCartProvider';

const steps = ['Shipping address', 'Payment details', 'Review order'];

const CheckoutContent: React.FC = () => {
  const navigate = useNavigate();
  const { cartItems, clearCart } = useCart();
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    address1: '',
    address2: '',
    city: '',
    state: '',
    zip: '',
    country: '',
    cardName: '',
    cardNumber: '',
    expDate: '',
    cvv: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleNext = () => {
    if (activeStep === steps.length - 1) {
      clearCart();
      navigate('/confirmation');
    } else {
      setActiveStep((prevStep) => prevStep + 1);
    }
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleNext();
  };

  const getStepContent = (step: number) => {
    switch (step) {
      case 0:
        return (
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                label="First name"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                label="Last name"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                label="Address line 1"
                name="address1"
                value={formData.address1}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Address line 2"
                name="address2"
                value={formData.address2}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                label="City"
                name="city"
                value={formData.city}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                label="State/Province/Region"
                name="state"
                value={formData.state}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                label="Zip / Postal code"
                name="zip"
                value={formData.zip}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                label="Country"
                name="country"
                value={formData.country}
                onChange={handleInputChange}
              />
            </Grid>
          </Grid>
        );
      case 1:
        return (
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                label="Name on card"
                name="cardName"
                value={formData.cardName}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                label="Card number"
                name="cardNumber"
                value={formData.cardNumber}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                label="Expiry date"
                name="expDate"
                placeholder="MM/YY"
                value={formData.expDate}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                label="CVV"
                name="cvv"
                value={formData.cvv}
                onChange={handleInputChange}
              />
            </Grid>
          </Grid>
        );
      case 2:
        return (
          <Box>
            <Typography variant="h6" gutterBottom>
              Order summary
            </Typography>
            <Typography variant="body1" paragraph>
              Shipping address:
            </Typography>
            <Typography variant="body2" paragraph>
              {formData.firstName} {formData.lastName}
              <br />
              {formData.address1}
              <br />
              {formData.address2 && `${formData.address2}\n`}
              {formData.city}, {formData.state} {formData.zip}
              <br />
              {formData.country}
            </Typography>
            <Typography variant="body1" paragraph>
              Payment details:
            </Typography>
            <Typography variant="body2" paragraph>
              Card holder: {formData.cardName}
              <br />
              Card number: **** **** **** {formData.cardNumber.slice(-4)}
              <br />
              Expiry date: {formData.expDate}
            </Typography>
            <Typography variant="body1" paragraph>
              Cart items:
            </Typography>
            {cartItems.map((item: { id: number; name: string; price: number; quantity: number }) => (
              <Typography key={item.id} variant="body2" paragraph>
                {item.name} x {item.quantity} - ${(item.price * item.quantity).toFixed(2)}
              </Typography>
            ))}
            <Typography variant="h6" gutterBottom>
              Total: ${cartItems.reduce((sum: number, item: { price: number; quantity: number }) => 
                sum + item.price * item.quantity, 0).toFixed(2)}
            </Typography>
          </Box>
        );
      default:
        return 'Unknown step';
    }
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
      <Paper sx={{ p: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Checkout
        </Typography>
        <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        <form onSubmit={handleSubmit}>
          {getStepContent(activeStep)}
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3 }}>
            {activeStep !== 0 && (
              <Button onClick={handleBack} sx={{ mr: 1 }}>
                Back
              </Button>
            )}
            <Button
              variant="contained"
              color="primary"
              onClick={handleNext}
              disabled={!formData.firstName || !formData.lastName || !formData.address1 || !formData.city || !formData.state || !formData.zip || !formData.country}
            >
              {activeStep === steps.length - 1 ? 'Place order' : 'Next'}
            </Button>
          </Box>
        </form>
      </Paper>
    </Container>
  );
};

const Checkout: React.FC = () => {
  return (
    <SharedCartProvider>
      <CheckoutContent />
    </SharedCartProvider>
  );
};

export default Checkout; 