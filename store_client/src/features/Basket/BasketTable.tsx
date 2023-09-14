import { LoadingButton } from "@mui/lab";
import {
  CardMedia,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Container,
  Paper,
  SelectChangeEvent,
} from "@mui/material";
import { GridColDef, DataGrid } from "@mui/x-data-grid";
import { BasketItem } from "../../App/Models/Basket";
import { formatCurrency } from "../../App/util/util";
import { deleteBasketItemAsync, updateBasketItemAsync } from "./basketSlice";
import { useAppDispatch, useAppSelector } from "../../App/store/configureStore";
import DeleteIcon from "@mui/icons-material/Delete";
import { useEffect, useState } from "react";

interface Props {
  isBasket?: boolean;
  items: BasketItem[];
}

const BasketTable = ({ items, isBasket = true }: Props) => {
  const [isWide, setIsWide] = useState(true);

  useEffect(() => {
    function handleResize() {
      if (window.innerWidth > 768) {
        setIsWide(true);
      } else {
        setIsWide(false);
      }
    }

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const dispatch = useAppDispatch();
  const { status } = useAppSelector((state) => state.basket);

  function handleQuantityChange(e: SelectChangeEvent<any>, id: number) {
    const newQuantity = e.target.value;
    dispatch(
      updateBasketItemAsync({ productId: id, quantity: parseInt(newQuantity) })
    );
  }

  const columns: GridColDef[] = [
    {
      field: "pictureUrl",
      hideable: false,
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
    { field: "name", headerName: "Product", flex: 0.5, hideable: false },
    {
      field: "price",
      hideable: false,
      headerName: "Price",
      type: "number",
      flex: 0.5,
      valueGetter: (params) => formatCurrency(params.value),
    },
    {
      field: "quantity",
      hideable: false,
      headerName: "Quantity",
      flex: 0.8,
      renderCell: (params) => (
        <>
          <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
            <InputLabel id="demo-simple-select-label">Quantity</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={params.row.quantity}
              label="Quantity"
              onChange={(e) => handleQuantityChange(e, params.id as number)}
              disabled={!isBasket}
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
      hideable: false,
      headerName: "Subtotal",
      type: "number",
      flex: 0.5,
      valueGetter: (params) =>
        "\u00A3" + (params.row.price * params.row.quantity) / 100,
    },

    {
      field: "custom",
      hideable: false,
      headerName: "",
      flex: 0.5,
      renderCell: (params) => (
        <Container sx={{ display: "flex", justifyContent: "flex-end" }}>
          <FormControl>
            <LoadingButton
              loading={
                status === "pendingBasketRemoval" + (params.id as number)
              }
              aria-label="delete"
              color="error"
              onClick={() =>
                dispatch(
                  deleteBasketItemAsync({ productId: params.id as number })
                )
              }
            >
              <DeleteIcon />
            </LoadingButton>
          </FormControl>
        </Container>
      ),
    },
  ];

  const getRowId = (item: BasketItem) => item.productId;
  return (
    <>
      <Paper>
        <DataGrid
          rows={items}
          rowHeight={70}
          autoHeight
          columns={columns}
          pageSizeOptions={[5, 10]}
          checkboxSelection={isBasket && isWide}
          getRowId={getRowId}
          columnVisibilityModel={{ custom: isBasket, price: isWide, pictureUrl: isWide }}
        />
      </Paper>
    </>
  );
};

export default BasketTable;
