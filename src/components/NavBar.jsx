import React from "react";
import { AppBar, Toolbar, Typography, Grid } from "@mui/material";
import DarkModeSwitch from "./DarkModeSwitch"; // Import the DarkModeSwitch component

const Navbar = ({ isDarkMode, toggleDarkMode }) => (
  <AppBar position="static">
    <Toolbar>
      <Typography
        variant="h6"
        style={{
          textAlign: "center",
          border: "1px solid black",
          width: "200px",
          background: isDarkMode ? "#333" : "#fff",
          color: isDarkMode ? "#fff" : "#333",
          padding: "8px",
          borderRadius: "4px",
        }}
      >
        Zip Code Info
      </Typography>
      <Grid container justifyContent="flex-end" alignItems="center">
        <Typography variant="body2" style={{ color: "white" }}>
          Dark Mode
        </Typography>
        <DarkModeSwitch
          isDarkMode={isDarkMode}
          toggleDarkMode={toggleDarkMode}
        />
      </Grid>
    </Toolbar>
  </AppBar>
);

export default Navbar;
