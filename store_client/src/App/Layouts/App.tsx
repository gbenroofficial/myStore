import React, { useState } from "react";
import Catalogue from "../../features/catalogue/Catalogue";
import NavBar from "./NavBar";
import { Container, CssBaseline, createTheme } from "@mui/material";
import { ThemeProvider } from "@emotion/react";

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const paletteType = darkMode ? "dark" : "light";
  const theme = createTheme({
    palette: {
      mode: paletteType,
      background:{
        default: paletteType === "light"? "#eeeeee" : "#121212"
      }
    },
  });

  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <NavBar setDarkMode={setDarkMode} />
        <Container>
          <Catalogue />
        </Container>
      </ThemeProvider>
    </>
  );
}

export default App;
