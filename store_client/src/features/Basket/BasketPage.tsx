import React, { useEffect, useState } from "react";
import agent from "../../App/api/agent";
import LoadingBox from "../../App/Layouts/LoadingBox";
import {
  CardMedia,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import { Basket, BasketItem } from "../../App/Models/Basket";
import { GridColDef, DataGrid } from "@mui/x-data-grid";

const BasketPage = () => {
  const [basket, setBasket] = useState<Basket>();
  const [loading, setLoading] = useState(true);

  

  useEffect(() => {
    agent.Basket.get()
      .then((basket) => setBasket(basket))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);
  if (loading) return <LoadingBox message="Loading items..." />;
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
          sx={{ height: "90%", backgroundSize: "fill" }}
          image={params.value}
        />
      ),
    },
    { field: "name", headerName: "Product", width: 300 },
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
              value={10}
              label="Age"
            >
              <MenuItem value={10}>10</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
            </Select>
          </FormControl>
        </>
      ),
    },
    {
      field: "price",
      headerName: "Price",
      type: "number",
      width: 90,
      valueGetter: (params) => "\u00A3" + params.value / 100,
    },
  ];

  const getRowId = (item: BasketItem) => item.productId;
  return (
    <>
      <div style={{ height: 800, width: "100%" }}>
        <DataGrid
          rows={basket.items}
          rowHeight={100}
          columns={columns}
          pageSizeOptions={[5, 10]}
          checkboxSelection
          getRowId={getRowId}
        />
      </div>
    </>
  );
};

export default BasketPage;
