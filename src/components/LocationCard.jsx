import React from "react";
import { Grid, Paper, Typography, Button, Box } from "@mui/material";
import { AnimatePresence, motion } from "framer-motion";

const cardStyle = {
  padding: "1rem",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  height: "100%",
  margin:"10px"
};

const containerStyle = {
  display: "flex",
  flexWrap: "wrap",
};

const clearButtonStyle = {
  display: "flex",
  justifyContent: "center",
  width: "100%",
  marginTop:"45px"
};

const LocationCard = ({ location, onClear }) => {
  const handleClear = (id) => {
    onClear(id);
  };

  return (
    <Box sx={containerStyle}>
      <AnimatePresence>
        {location && location.length > 0 ? (
          location.map((locations) => (
            <motion.div
              key={locations.id}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.5 }}
            >
              <Grid item xs={12} sm={6} md={4} lg={3}>
                <Paper elevation={3} sx={cardStyle}>
                  <Typography variant="h6" gutterBottom>
                    Location Information
                  </Typography>
                  <div>
                    <Typography variant="body1" gutterBottom>
                      Country: {locations.country}
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                      State: {locations.state}
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                      Place Name: {locations.placeName}
                    </Typography>
                  </div>
                  <Button
                    variant="contained"
                    color="error"
                    onClick={() => handleClear(locations.id)}
                  >
                    Delete
                  </Button>
                </Paper>
              </Grid>
            </motion.div>
          ))
        ) : ''}
      </AnimatePresence>
      {location && location.length > 0 && (
        <Box sx={clearButtonStyle}>
          <Button
            variant="contained"
            color="error"
            onClick={() => handleClear(null)}
          >
            Clear All
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default LocationCard;
