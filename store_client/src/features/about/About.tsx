import {
  Alert,
  AlertTitle,
  Button,
  ButtonGroup,
  Container,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import agent from "../../App/api/agent";

const About = () => {
  const [validationErrors, setValidationErrors] = useState<string[]>([]);

  function getValidationErrors() {
    agent.TestErrors.getValidationError()
      .then(() => {
        console.log("should have gone to valError catch");
      })
      .catch((error) => setValidationErrors(error));
  }
  return (
    <Container>
      <Typography gutterBottom variant="h2">
        {" "}
        Error Testing
      </Typography>
      <ButtonGroup fullWidth>
        <Button
          variant="contained"
          onClick={() => agent.TestErrors.get400Error().catch((error) => {})}
        >
          Test 400 error
        </Button>
        <Button
          variant="contained"
          onClick={() => agent.TestErrors.get401Error().catch((error) => {})}
        >
          Test 401 error
        </Button>
        <Button
          variant="contained"
          onClick={() => agent.TestErrors.get404Error().catch((error) => {})}
        >
          Test 404 error
        </Button>
        <Button
          variant="contained"
          onClick={() => agent.TestErrors.get500Error().catch((error) => {})}
        >
          Test 500 error
        </Button>
        <Button variant="contained" onClick={getValidationErrors}>
          Test validation error
        </Button>
      </ButtonGroup>
      {validationErrors.length > 0 && (
        <Alert severity="error">
          <AlertTitle> Validation Errors </AlertTitle>
          <List>
            {validationErrors.map((error) => (
              <ListItem key={error}>
                <ListItemText>{error}</ListItemText>
              </ListItem>
            ))}
          </List>
        </Alert>
      )}
    </Container>
  );
};

export default About;
