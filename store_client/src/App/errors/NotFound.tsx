import { Button, Container, Paper, Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <Container component={Paper} sx={{ height: 400 }}>
      <Typography gutterBottom variant="h3">
        Oops! we can't find what you're looking for
      </Typography>
      <Button component={Link} to="/catalogue" fullWidth>Go back to store</Button>
    </Container>
  );
};

export default NotFound;
