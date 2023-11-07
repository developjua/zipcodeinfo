import React, { useState, useEffect } from "react";
import {
  Container,
  CssBaseline,
  ThemeProvider,
  createTheme,
} from "@mui/material";
import NavBar from "./components/NavBar";
import Searchbar from "./components/SearchBar";
import LocationCard from "./components/LocationCard";

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);


  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  

  const theme = createTheme({
    palette: {
      mode: isDarkMode ? "dark" : "light",
    },
  });



  return (
    <ThemeProvider theme={theme}>
      <CssBaseline enableColorScheme />
      
      <NavBar isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />

      <Container>
        <Searchbar isDarkMode={isDarkMode} />
      </Container>
    </ThemeProvider>
  );
}

export default App;
