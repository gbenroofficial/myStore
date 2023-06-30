import {
  AppBar,
  Container,
  FormControlLabel,
  FormGroup,
  Switch,
  Toolbar,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
interface Props {
  setDarkMode: React.Dispatch<React.SetStateAction<boolean>>;
}
const NavBar = ({ setDarkMode }: Props) => {
  const [isChecked, setIsChecked] = useState(false);

  function toggleCheck(event: React.ChangeEvent<HTMLInputElement>) {
    setIsChecked(event.target.checked);
    isChecked ? setDarkMode(false) : setDarkMode(true);
  }
  return (
    <AppBar position="static" sx={{ mb: 4 }}>
      <Toolbar>
        <Typography variant="h6">Soso Store</Typography>
        <Container>
          <FormGroup>
            <FormControlLabel
              control={<Switch checked={isChecked} onChange={toggleCheck} />}
              label="Required"
            />
          </FormGroup>
        </Container>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
