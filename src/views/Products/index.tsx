import React, { useEffect, useState } from 'react';
import Main from '@/layouts/Main';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import axios from 'axios';
import Grid from '@mui/material/Grid';
import Chip from '@mui/material/Chip';
import { Button, Pagination } from '@mui/material';
import { styled } from '@mui/material/styles';

interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string; 
  images: string[];
}

const StyledCard = styled(Card)(({ theme }) => ({
  maxWidth: 340,
  margin: theme.spacing(2),
  backgroundColor: '#f0f0f0',
  transition: 'transform 0.2s',
  '&:hover': {
    transform: 'scale(1.05)',
  },
}));

const StyledCardMedia = styled(CardMedia)(({ theme }) => ({
  height: 200,
}));

const Products = (): JSX.Element => {
  const [productsData, setProductsData] = useState<Product[]>([]);
  const [page, setPage] = useState(1);
  const productsPerPage = 6; 
  useEffect(() => {
    axios.get('https://dummyjson.com/products')
      .then((res) => {
        setProductsData(res.data.products);
      })
      .catch(err => console.log(err));
  }, []);

  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  const displayedProducts = productsData.slice((page - 1) * productsPerPage, page * productsPerPage);
  const pageCount = Math.ceil(productsData.length / productsPerPage);

  return (
    <Main>
      <Box sx={{ padding: 4 }}>
        <Grid container spacing={3}>
          {displayedProducts.map((product) => (
            <Grid
              key={product.id}
              item
              xs={12}
              sm={6}
              md={4}
            >
              <StyledCard>
                <StyledCardMedia
                  image={product.images[0] || '/path/to/fallback-image.jpg'} 
                  title={product.title}
                />
                <CardContent>
                  <Typography gutterBottom variant="h6" color="CaptionText" component="div">
                    {product.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {product.description}
                  </Typography>
                  <Box sx={{ marginTop: 1, display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Chip label={product.price + ' $'} color="default" />
                    <Button variant="contained" color="primary">Buy</Button>
                  </Box>
                </CardContent>
              </StyledCard>
            </Grid>
          ))}
        </Grid>
        <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 4 }}>
          <Pagination
            count={pageCount}
            page={page}
            onChange={handlePageChange}
            color="primary"
          />
        </Box>
      </Box>
    </Main>
  );
};

export default Products;
