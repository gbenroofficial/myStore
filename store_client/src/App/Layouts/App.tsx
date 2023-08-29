import React, { useCallback, useEffect, useState } from "react";
import NavBar from "./NavBar";
import { Container, CssBaseline, createTheme } from "@mui/material";
import { ThemeProvider } from "@emotion/react";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LoadingBox from "./LoadingBox";
import { useAppDispatch } from "../store/configureStore";
import { getBasketAsync } from "../../features/Basket/basketSlice";
import { getCurrentUser } from "../../features/account/accountSlice";

function App() {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(true);

  const initializeApp = useCallback(async () => {
    try {
      await dispatch(getCurrentUser());
      await dispatch(getBasketAsync());
    } catch (error) {}
  }, [dispatch]);

  useEffect(() => {
    initializeApp()
      .then()
      .catch(() => {})
      .finally(() => {
        setLoading(false);
      });
  }, [initializeApp]);
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
