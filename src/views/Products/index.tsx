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
import { styled } from '@mui/material/styles';
import { Button } from '@mui/material';

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

  useEffect(() => {
    axios.get('https://dummyjson.com/products')
      .then((res) => {
        setProductsData(res.data.products); 
      })
      .catch(err => console.log(err));
  }, []);

  return (
    <Main>
      <Box sx={{ padding: 4 }}>
        <Grid container spacing={3}>
          {productsData.map((product) => (
            <Grid
              key={product.id}
              item
              xs={12}
              sm={6}
              md={4}
            >
              <StyledCard>
                <StyledCardMedia
                  image={product.images[0]}
                  title={product.title}
                />
                <CardContent>
                  <Typography gutterBottom variant="h6" color="CaptionText"  component="div">
                    {product.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {product.description}
                  </Typography>
                  <Box sx={{ marginTop: 1 , display: 'flex', alignItems: 'center',  gap: 17}}>
                    <Chip label={product.price + ' $'}  color="default" />
                    <Button variant="contained" color="primary">Buy</Button>
                  </Box>
                 
                </CardContent>
              </StyledCard>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Main>
  );
};

export default Products;
