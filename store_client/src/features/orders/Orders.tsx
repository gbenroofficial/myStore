import { FormControl, Container, Paper } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";

import { useEffect, useState } from "react";
import agent from "../../App/api/agent";
import LoadingBox from "../../App/Layouts/LoadingBox";
import { Order } from "../../App/Models/Orders";
import { LoadingButton } from "@mui/lab";
import { formatCurrency } from "../../App/util/util";


export default function Orders() {
  const [loading, setLoading] = useState(true);
  const [orders, setOrders] = useState<Order[] | null>(null);
  console.log(orders);

  useEffect(() => {
    agent.Orders.getAll()
      .then((orders) => setOrders(orders))
      .catch((error) => console.log(error))
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const columns: GridColDef[] = [
    {
      field: "id",
      hideable: false,
      headerName: "Order number",
      width: 200,
    },
    {
      field: "orderDate",
      headerName: "Date ordered",
      width: 200,
      hideable: false,
      valueGetter: (params) => params.value.split("T")[0],
    },
    {
      field: "total",
      hideable: false,
      headerName: "Total price",      
      width: 200,
      valueGetter: (params) => formatCurrency(params.value),
    },

    {
      field: "orderStatus",
      hideable: false,
      headerName: "Status",
      width: 200,
    },
    {
      field: "custom",
      hideable: false,
      headerName: "",
      width: 300,
      renderCell: (params) => (
        <Container sx={{ display: "flex", justifyContent: "flex-end" }}>
          <FormControl>
            <LoadingButton aria-label="delete" color="primary">
              View
            </LoadingButton>
          </FormControl>
        </Container>
      ),
    },
  ];
  const getRowId = (order: Order) => order.id;

  if (loading) return <LoadingBox message="Loading orders" />;

  return (
    <>
      <Paper>
        {orders && (
          <DataGrid
            rows={orders}
            rowHeight={150}
            autoHeight
            columns={columns}
            pageSizeOptions={[5, 10]}
            checkboxSelection={false}
            getRowId={getRowId}
            columnVisibilityModel={{}}
          />
        )}
      </Paper>
    </>
  );
}
