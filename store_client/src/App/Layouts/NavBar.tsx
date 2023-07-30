import {
  AppBar,
  Badge,
  Container,
  FormControlLabel,
  FormGroup,
  IconButton,
  List,
  ListItem,
  Switch,
  Toolbar,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useStoreContext } from "../context/StoreContext";
interface Props {
  setDarkMode: React.Dispatch<React.SetStateAction<boolean>>;
}
const NavBar = ({ setDarkMode }: Props) => {
  const [isChecked, setIsChecked] = useState(false);
  const [checkLabel, setCheckLabel] = useState("Dark mode");

  function toggleCheck(event: React.ChangeEvent<HTMLInputElement>) {
    setIsChecked(event.target.checked);
    isChecked ? setDarkMode(false) : setDarkMode(true);
    isChecked ? setCheckLabel("Dark mode") : setCheckLabel("Light mode");
  }

  const sectionsList = [
    { title: "home", path: "/" },
    { title: "catalogue", path: "/catalogue" },
    { title: "about", path: "/about" },
    { title: "contact", path: "/contact" },
  ];
  const logList = [
    { title: "login", path: "/login" },
    { title: "register", path: "/register" },
  ];

  const { basket } = useStoreContext();
  const itemsCount = basket?.items?.reduce((prevSum, item) => prevSum + item.quantity, 0)
  
  return (
    <AppBar position="sticky" sx={{ mb: 4 }}>
      <Toolbar sx={{ display: "flex" }}>
        <Typography variant="h6">Soso Store</Typography>

        <List sx={{ ml: 2, display: "flex" }}>
          {sectionsList.map(({ title, path }) => (
            <ListItem
              component={NavLink}
              to={path}
              key={title}
              sx={{
                color: "inherit",
                "&:hover": {
                  color: "grey.400",
                },
                "&:active": {
                  color: "action.active",
                },
              }}
            >
              {title.toUpperCase()}
            </ListItem>
          ))}
        </List>

        <FormGroup>
          <FormControlLabel
            control={<Switch checked={isChecked} onChange={toggleCheck} />}
            label={checkLabel}
          />
        </FormGroup>
        <Container sx={{ display: "flex", justifyContent: "flex-end" }}>
          <List sx={{ ml: 2, display: "flex" }}>
            {logList.map(({ title, path }) => (
              <ListItem
                component={NavLink}
                to={path}
                key={title}
                sx={{
                  color: "inherit",
                  "&:hover": {
                    color: "secondary.main",
                  },
                  "&:active": {
                    color: "text.secondary",
                  },
                }}
              >
                {title.toUpperCase()}
              </ListItem>
            ))}
          </List>
          <IconButton
            size="large"
            aria-label="show 17 new notifications"
            color="inherit"
            component={Link}
            to="/basket"
          >
            <Badge badgeContent={itemsCount} color="error">
              <ShoppingCartIcon />
            </Badge>
          </IconButton>
        </Container>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
