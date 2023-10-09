import { useCallback, useEffect, useState } from "react";
import NavBar from "./NavBar";
import { Container, CssBaseline, createTheme } from "@mui/material";
import { ThemeProvider } from "@emotion/react";
import { Outlet, useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LoadingBox from "./LoadingBox";
import { useAppDispatch } from "../store/configureStore";
import { getBasketAsync } from "../../features/Basket/basketSlice";
import { getCurrentUser } from "../../features/account/accountSlice";
import HomePage from "../../features/homePage/HomePage";

function App() {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(true);
  const location = useLocation();

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
        {loading ? (
          <LoadingBox message="Initialising application..." />
        ) : location.pathname === "/" ? (
          <HomePage />
        ) : (
          <Container maxWidth="xl" sx={{ mt: 4 }}>
            <Outlet />
          </Container>
        )}
      </ThemeProvider>
    </>
  );
}

export default App;
