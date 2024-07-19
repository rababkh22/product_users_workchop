import React, { useEffect, useState } from 'react';
import Main from '@/layouts/Main';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import axios from 'axios';
import Grid from '@mui/material/Grid';

interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string; 
  images: string[];
}

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
      <Box>
        <Grid container spacing={2}>
          {productsData.map((product) => (
            <Grid
              key={product.id}
              item
              xs={4}
            >
              <Card sx={{ maxWidth: 345 }}>
                <CardMedia
                  sx={{ height: 140 }}
                  image={product.images[0]}
                  title={product.title}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {product.title}
                  </Typography>
                  <Typography gutterBottom variant="h5" component="div">
                    {product.price + ' $'}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {product.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Main>
  );
};

export default Products;
