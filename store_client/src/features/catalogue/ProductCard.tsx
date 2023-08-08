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

import { useAppDispatch, useAppSelector } from "../../App/store/configureStore";
import { addBasketItemAsync, setBasket } from "../Basket/basketSlice";
interface Props {
  product: Product;
}
const ProductCard = ({ product }: Props) => {
  const [loading, setLoading] = useState(false);
  const { status } = useAppSelector((state) => state.basket);
  const dispatch = useAppDispatch();

  function addItem(productId: number) {
    setLoading(true);
    agent.Basket.addItem(productId)
      .then((basket) => dispatch(setBasket(basket)))
      .catch((error) => {})
      .finally(() => setLoading(false));
  }

  return (
    <>
      <Card key={product.id} sx={{ maxWidth: 345 }}>
        <CardHeader
          avatar={<Avatar>{product.name.charAt(0)}</Avatar>}
          title={product.name}
          titleTypographyProps={{ sx: { fontWeight: "bold" } }}
        />

        <CardMedia
          component="img"
          sx={{ height: "90%", backgroundSize: "contain" }}
          image={product.pictureUrl}
          alt={product.name}
        />
        <CardContent>
          <Typography>
            Price: {"\u00A3"}
            {product.price / 100}
          </Typography>
          <Typography>
            {product.brand}/{product.type}
          </Typography>
        </CardContent>

        <CardActions>
          <LoadingButton
            onClick={() =>
              dispatch(addBasketItemAsync({ productId: product.id }))
            }
            size="small"
            loading={status.includes("pendingBasketAddition"+ product.id)}
          >
            Add to cart
          </LoadingButton>
          <Button component={Link} to={`/catalogue/${product.id}`} size="small">
            View
          </Button>
        </CardActions>
      </Card>
    </>
  );
};

export default ProductCard;
