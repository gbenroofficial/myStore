import {
  CardHeader,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  Avatar,
  Button,
} from "@mui/material";
import React, { useState } from "react";
import { Product } from "../../App/Models/Product";
import { Link } from "react-router-dom";
import agent from "../../App/api/agent";
import { LoadingButton } from "@mui/lab";
interface Props {
  product: Product;
}
const ProductCard = ({ product }: Props) => {
  const[loading, setLoading] = useState(false);

  function addItem(productId: number){
    setLoading(true);
    agent.Basket.addItem(productId).catch(error => {}).finally(() => setLoading(false))
  }

  return (
    <>
      <Card key={product.id} sx={{ maxWidth: 345 }}>
        <CardHeader
          avatar={<Avatar>{product.name.charAt(0)}</Avatar>}
          title={product.name}
          titleTypographyProps={
            {sx:{fontWeight:"bold"}}
          }
        />

        <CardMedia
          component="img"
          sx={{height:140, backgroundSize: "contain"}}
          image={product.pictureUrl}
          alt={product.name}
        />
        <CardContent>
          <Typography>Price: {'\u00A3'}{product.price / 100}</Typography>
          <Typography>
            {product.brand}/{product.type}
          </Typography>
        </CardContent>

        <CardActions>
          <LoadingButton onClick={()=> addItem(product.id)} size="small" loading={loading}>Add to cart</LoadingButton>
          <Button component={Link} to={`/catalogue/${product.id}`} size="small">View</Button>
        </CardActions>
      </Card>
    </>
  );
};

export default ProductCard;
