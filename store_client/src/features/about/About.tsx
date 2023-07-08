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
          onClick={() => agent.TestErrors.get400Error().catch(error => {})}
        >
          
          Test 400 error
        </Button>
        <Button
          variant="contained"
          onClick={() => agent.TestErrors.get401Error().catch(error => {})}
        >
          
          Test 401 error
        </Button>
        <Button
          variant="contained"
          onClick={() => agent.TestErrors.get404Error().catch(error => {})}
        >
          
          Test 404 error
        </Button>
        <Button
          variant="contained"
          onClick={() => agent.TestErrors.get500Error().catch(error => {})}
        >
          
          Test 500 error
        </Button>
        <Button
          variant="contained"
          onClick={() => agent.TestErrors.getValidationError().catch(error => {})}
        >
          
          Test validation error
        </Button>
       
      </ButtonGroup>
    </Container>
  );
};

export default About;
