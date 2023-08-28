import React, { useEffect, useState } from "react";
import NavBar from "./NavBar";
import { Container, CssBaseline, createTheme } from "@mui/material";
import { ThemeProvider } from "@emotion/react";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getCookie } from "../util/util";
import agent from "../api/agent";
import LoadingBox from "./LoadingBox";
import { useAppDispatch } from "../store/configureStore";
import { setBasket } from "../../features/Basket/basketSlice";
import { getCurrentUser } from "../../features/account/accountSlice";

function App() {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const buyerId = getCookie("buyerId");
    dispatch(getCurrentUser())
    if (buyerId) {
      agent.Basket.get()
        .then((basket) => dispatch(setBasket(basket)))
        .catch(() => {})
        .finally(() => setLoading(false));
    } else setLoading(false);
  }, [dispatch]);
  const [darkMode, setDarkMode] = useState(false);
  const paletteType = darkMode ? "dark" : "light";
  const theme = createTheme({
    palette: {
      mode: paletteType,
      background: {
        default: paletteType === "light" ? "#eeeeee" : "#121212",
      },
    },
  });
  if (loading) return <LoadingBox message="Initialising application..." />;

  return (
    <>
      <ThemeProvider theme={theme}>
        <ToastContainer
          position="top-center"
          hideProgressBar={true}
          theme="colored"
        />
        <CssBaseline />
        <NavBar setDarkMode={setDarkMode} />
        <Container>
          <Outlet />
        </Container>
      </ThemeProvider>
    </>
  );
}

export default App;
