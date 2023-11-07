import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Box,
  Button,
  TextField,
  Typography,
  CircularProgress,
} from "@mui/material";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LocationCard from "./LocationCard";
import { motion } from "framer-motion";

const SearchBar = ({isDarkMode}) => {
  const [query, setQuery] = useState("");
  const [result, setResult] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const locationData = JSON.parse(localStorage.getItem("locationData"));
    setResult(locationData);
  }, []);

  const ToastStyle = {
    style: {
      background: isDarkMode ? "#333" : "#fff",
      color: isDarkMode ? "#fff" : "#333",
    },
  };

  const handleSearch = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(`https://api.zippopotam.us/in/${query}`);
      const data = response.data.places[0];
      const locationData = {
        id: response.data["post code"],
        country: response.data.country,
        state: data.state,
        placeName: data["place name"],
      };

      let existingData = JSON.parse(localStorage.getItem("locationData")) || [];
      const dataExists = existingData.some(
        (item) => item.id === locationData.id
      );

      if (!dataExists) {
        existingData.push(locationData);
        localStorage.setItem("locationData", JSON.stringify(existingData));
        setResult(existingData);
      } else {
        toast.info("This Zip Code Already Called", ToastStyle);
      }
    } catch (error) {
      console.error("Error fetching data:", error.response.status);
      if (error.response.status) toast.error("Data Not Found", ToastStyle);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClear = (id) => {
    if (id) {
      let existingData = JSON.parse(localStorage.getItem("locationData")) || [];
      const updatedData = existingData.filter((item) => item.id !== id);
      setResult(updatedData);
      localStorage.setItem("locationData", JSON.stringify(updatedData));
    } else {
      localStorage.clear();
      setResult([]);
    }
  };

  return (
    <Box p={2}>
      <ToastContainer/>
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.5 }}
      >
        <Typography
          variant="h4"
          gutterBottom
          align="center"
          style={{
            textTransform: "uppercase",
            fontSize: "1.5rem",
            fontWeight: "bold",
            letterSpacing: "0.1em",
          }}
        >
          ZIP Code and City Search
        </Typography>
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <TextField
            label="Enter postal code"
            variant="outlined"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            fullWidth
            style={{ marginBottom: "1rem" }}
          />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Box display="flex" justifyContent="center">
            <Button variant="contained" color="primary" onClick={handleSearch}>
              Search
            </Button>
          </Box>
        </motion.div>
      </motion.div>
      {isLoading ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.5 }}
          transition={{ type: "spring", duration: 1 }}
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "3rem",
          }}
        >
          <CircularProgress />
        </motion.div>
      ) : result ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.5 }}
          transition={{ type: "spring", duration: 1 }}
          style={{ marginTop: "3rem" }}
        >
          <LocationCard location={result} onClear={handleClear} />
        </motion.div>
      ) : null}
    </Box>
  );
};

export default SearchBar;
