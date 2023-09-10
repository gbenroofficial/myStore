import {
  Button,
  Grid,
  SelectChangeEvent,
  Typography,
} from "@mui/material";
import BasketSummary from "./BasketSummary";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../App/store/configureStore";
import { updateBasketItemAsync } from "./basketSlice";
import BasketTable from "./BasketTable";

const BasketPage = () => {
  const dispatch = useAppDispatch();
  const { basket, status } = useAppSelector((state) => state.basket);

  function handleQuantityChange(e: SelectChangeEvent<any>, id: number) {
    const newQuantity = e.target.value;
    dispatch(
      updateBasketItemAsync({ productId: id, quantity: parseInt(newQuantity) })
    );
  }

  if (!basket)
    return <Typography variant="h3">Your basket is empty</Typography>;

  return (
    <>
      <div style={{ height: 800, width: "100%" }}>
        <BasketTable items={basket.items} isBasket={true} />

        <Grid container sx={{ mt: 1 }}>
          <Grid item xs={6} />
          <Grid item xs={6}>
            <BasketSummary />
            <Button
              component={Link}
              to="/checkout"
              variant="contained"
              size="large"
              fullWidth
              sx={{ mt: 1 }}
            >
              Checkout
            </Button>
          </Grid>
        </Grid>
      </div>
    </>
  );
};

export default BasketPage;
