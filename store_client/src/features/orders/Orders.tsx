import { FormControl, Container, Paper, Box, Typography } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";

import { useEffect, useState } from "react";
import agent from "../../App/api/agent";
import LoadingBox from "../../App/Layouts/LoadingBox";
import { Order } from "../../App/Models/Orders";
import { LoadingButton } from "@mui/lab";
import { formatCurrency } from "../../App/util/util";
import OrderDetails from "./OrderDetails";

export default function Orders() {
  const [loading, setLoading] = useState(true);
  const [orders, setOrders] = useState<Order[] | null>(null);
  const [orderNum, setOrderNum] = useState(0);

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
            <LoadingButton
              aria-label="delete"
              color="primary"
              onClick={() => {
                setOrderNum(params.id as number);
              }}
            >
              View
            </LoadingButton>
          </FormControl>
        </Container>
      ),
    },
  ];
  const getRowId = (order: Order) => order.id;

  if (orderNum > 0 && orders) {
    const selectedOrder = orders.find((order) => order.id === orderNum);
    if (selectedOrder != null) {
      return <OrderDetails setOrderNum={setOrderNum} order={selectedOrder} />;
    }
  }

  if (loading) return <LoadingBox message="Loading orders" />;

  return (
    <>
      {orders && (
        <>
          <Box
            display="flex"
            justifyContent="space-between"
            component={Paper}
            sx={{ mb: 3 }}
          >
            <Typography sx={{ p: 2 }} gutterBottom variant="h4">
              Orders
            </Typography>
          </Box>
          <Paper>
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
          </Paper>
        </>
      )}
    </>
  );
}
