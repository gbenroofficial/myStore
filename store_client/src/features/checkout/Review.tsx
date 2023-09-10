import { Grid, Typography } from "@mui/material";
import BasketTable from "../Basket/BasketTable";
import BasketSummary from "../Basket/BasketSummary";
import { useAppSelector } from "../../App/store/configureStore";

export default function Review() {
    const {basket} = useAppSelector(state => state.basket)
  return (
    <>
      <Typography variant="h6" gutterBottom>
        Order summary
      </Typography>
      {basket && <BasketTable items={basket.items} isBasket={false} />}      
      <Grid container sx={{ mt: 1 }}>
        <Grid item xs={6} />
        <Grid item xs={6}>
          <BasketSummary />          
        </Grid>
      </Grid>
    </>
  );
}
