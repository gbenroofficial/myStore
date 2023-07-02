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
import React from "react";
import { Product } from "../../App/Models/Product";
import { Link } from "react-router-dom";
interface Props {
  product: Product;
}
const ProductCard = ({ product }: Props) => {
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
          <Button size="small">Add to cart</Button>
          <Button component={Link} to={`/catalogue/${product.id}`} size="small">View</Button>
        </CardActions>
      </Card>
    </>
  );
};

export default ProductCard;
