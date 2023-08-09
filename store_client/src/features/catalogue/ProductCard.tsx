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
import { Product } from "../../App/Models/Product";
import { Link } from "react-router-dom";
import { LoadingButton } from "@mui/lab";

import { useAppDispatch, useAppSelector } from "../../App/store/configureStore";
import { addBasketItemAsync } from "../Basket/basketSlice";
interface Props {
  product: Product;
}
const ProductCard = ({ product }: Props) => {  
  const { status } = useAppSelector((state) => state.basket);
  const dispatch = useAppDispatch(); 

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
