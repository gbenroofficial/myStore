import agent from "../../App/api/agent";
import {
  Button,
  CardMedia,
  Container,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Typography,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { BasketItem } from "../../App/Models/Basket";
import { GridColDef, DataGrid } from "@mui/x-data-grid";
import { useStoreContext } from "../../App/context/StoreContext";
import BasketSummary from "./BasketSummary";
import { formatCurrency } from "../../App/util/util";
import { Link } from "react-router-dom";

const BasketPage = () => {
  const { basket, setBasket } = useStoreContext();

  function handleQuantityChange(e: SelectChangeEvent<any>, id: number) {
    const newQuantity = e.target.value;
    agent.Basket.updateItem(id, parseInt(newQuantity))
      .then((basket) => {
        setBasket(basket);
      })
      .catch(() => {});
  }

  function handleItemDelete(id: number) {
    agent.Basket.removeItem(id)
      .then((basket) => {
        setBasket(basket);
      })
      .catch(() => {});
  }

  if (!basket)
    return <Typography variant="h3">Your basket is empty</Typography>;

  const columns: GridColDef[] = [
    {
      field: "pictureUrl",
      headerName: "Image",
      width: 100,
      renderCell: (params) => (
        <CardMedia
          component="img"
          sx={{ height: "90%", width: "70%", backgroundSize: "fill" }}
          image={params.value}
        />
      ),
    },
    { field: "name", headerName: "Product", width: 300 },
    {
      field: "price",
      headerName: "Price",
      type: "number",
      width: 90,
      valueGetter: (params) => formatCurrency(params.value),
    },
    {
      field: "quantity",
      headerName: "Quantity",
      width: 200,

      renderCell: (params) => (
        <>
          <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
            <InputLabel id="demo-simple-select-label">Age</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={params.row.quantity}
              label="Age"
              onChange={(e) => handleQuantityChange(e, params.id as number)}
            >
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((quantity) => (
                <MenuItem key={quantity} value={quantity}>
                  {quantity}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </>
      ),
    },
    {
      field: "subtotal",
      headerName: "Subtotal",
      type: "number",
      width: 100,
      valueGetter: (params) =>
        "\u00A3" + (params.row.price * params.row.quantity) / 100,
    },

    {
      field: "custom",
      headerName: "",
      width: 250,
      renderCell: (params) => (
        <Container sx={{ display: "flex", justifyContent: "flex-end" }}>
          <FormControl>
            <IconButton
              aria-label="delete"
              color="error"
              onClick={() => handleItemDelete(params.id as number)}
            >
              <DeleteIcon />
            </IconButton>
          </FormControl>
        </Container>
      ),
    },
  ];

  const getRowId = (item: BasketItem) => item.productId;
  return (
    <>
      <div style={{ height: 800, width: "100%" }}>
        <DataGrid
          rows={basket.items}
          rowHeight={70}
          autoHeight
          columns={columns}
          pageSizeOptions={[5, 10]}
          checkboxSelection
          getRowId={getRowId}
          sx={{ bgcolor: "white" }}
        />
        <Grid container sx={{mt: 1}}>
          <Grid item xs={6} />
          <Grid item xs={6}>
            <BasketSummary />
            <Button
              component={Link}
              to="/checkout"
              variant="contained"
              size="large"
              fullWidth
              sx={{mt: 1}}
            >Checkout</Button>
          </Grid>
        </Grid>
      </div>
    </>
  );
};

export default BasketPage;
