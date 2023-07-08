import { Button, ButtonGroup, Container, Typography } from "@mui/material";
import React from "react";
import agent from "../../App/api/agent";

const About = () => {
  return (
    <Container>
      <Typography gutterBottom variant="h2"> Error Testing</Typography>
      <ButtonGroup fullWidth>
        <Button
          variant="contained"
          onClick={() => agent.TestErrors.get400Error()}
        >
          
          Test 400 error
        </Button>
        <Button
          variant="contained"
          onClick={() => agent.TestErrors.get401Error()}
        >
          
          Test 401 error
        </Button>
        <Button
          variant="contained"
          onClick={() => agent.TestErrors.get404Error()}
        >
          
          Test 404 error
        </Button>
        <Button
          variant="contained"
          onClick={() => agent.TestErrors.get500Error()}
        >
          
          Test 500 error
        </Button>
        <Button
          variant="contained"
          onClick={() => agent.TestErrors.getValidationError()}
        >
          
          Test validation error
        </Button>
       
      </ButtonGroup>
    </Container>
  );
};

export default About;
