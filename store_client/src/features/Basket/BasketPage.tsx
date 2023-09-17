import { Button, Grid, Typography } from "@mui/material";
import BasketSummary from "./BasketSummary";
import { Link } from "react-router-dom";
import { useAppSelector } from "../../App/store/configureStore";

import BasketTable from "./BasketTable";

const BasketPage = () => {
  const { basket } = useAppSelector((state) => state.basket);

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
