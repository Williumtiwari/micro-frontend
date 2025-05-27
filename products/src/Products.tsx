import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Container,
  Pagination,
  Box,
} from '@mui/material';

// Mock data for products
const mockProducts = Array.from({ length: 20 }, (_, i) => ({
  id: i + 1,
  name: `Fidget Spinner ${i + 1}`,
  price: Math.floor(Math.random() * 50) + 10,
  image: `https://picsum.photos/200/200?random=${i + 1}`,
  description: 'High-quality fidget spinner for stress relief and entertainment.',
}));

const Products: React.FC = () => {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const productsPerPage = 8;
  const totalPages = Math.ceil(mockProducts.length / productsPerPage);

  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  const displayedProducts = mockProducts.slice(
    (page - 1) * productsPerPage,
    page * productsPerPage
  );

  return (
    <Container>
      <Typography variant="h4" component="h1" gutterBottom>
        Our Fidget Spinners
      </Typography>
      <Grid container spacing={3}>
        {displayedProducts.map((product) => (
          <Grid item xs={12} sm={6} md={3} key={product.id}>
            <Card>
              <CardMedia
                component="img"
                height="200"
                image={product.image}
                alt={product.name}
              />
              <CardContent>
                <Typography gutterBottom variant="h6" component="div">
                  {product.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {product.description}
                </Typography>
                <Typography variant="h6" color="primary" sx={{ mt: 2 }}>
                  ${product.price}
                </Typography>
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  sx={{ mt: 2 }}
                  onClick={() => navigate(`/product/${product.id}`)}
                >
                  View Details
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4, mb: 4 }}>
        <Pagination
          count={totalPages}
          page={page}
          onChange={handlePageChange}
          color="primary"
        />
      </Box>
    </Container>
  );
};

export default Products; 