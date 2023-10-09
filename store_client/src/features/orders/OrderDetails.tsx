
import { Order } from "../../App/Models/Orders";
import BasketTable from "../Basket/BasketTable";
import { BasketItem } from "../../App/Models/Basket";
import BasketSummary from "../Basket/BasketSummary";
import { Box, Typography, Button, Paper } from "@mui/material";
interface Props {
  setOrderNum: any;
  order: Order;
}
const OrderDetails = ({ setOrderNum, order }: Props) => {
  var subTotal = order.orderItems.reduce(
    (sum, item) => sum + item.quantity * item.price,
    0
  )!;
  return (
    <>
      <Box display="flex" justifyContent="space-between" component={Paper} sx={{mb: 3}}>
        
          <Typography sx={{ p: 2 }} gutterBottom variant="h4">
            Order #{order.id} - {order.orderStatus}
          </Typography>
        

        <Button onClick={() => {setOrderNum(0)}} size="large" sx={{m: 2}}>Back</Button>
      </Box>
      <BasketTable items={order.orderItems as BasketItem[]} isBasket={false} />
      <Box sx={{mb: 2}}></Box>
      <BasketSummary subTotal={subTotal} />
    </>
  );
};

export default OrderDetails;
