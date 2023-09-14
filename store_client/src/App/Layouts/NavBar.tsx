import {
  AppBar,
  Badge,
  Box,
  Button,
  Container,
  FormControlLabel,
  FormGroup,
  IconButton,
  List,
  ListItem,
  Menu,
  MenuItem,
  Switch,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useAppSelector } from "../store/configureStore";
import LoggedInMenu from "./LoggedInMenu";
import MenuIcon from "@mui/icons-material/Menu";
import LoggedOutMenu from "./LoggedOutMenu";

const sectionsList = [
  { title: "home", path: "/" },
  { title: "catalogue", path: "/catalogue" },
  { title: "about", path: "/about" },
  { title: "contact", path: "/contact" },
];

interface Props {
  setDarkMode: React.Dispatch<React.SetStateAction<boolean>>;
}
const NavBar = ({ setDarkMode }: Props) => {
  const [isChecked, setIsChecked] = useState(false);
  const [checkLabel, setCheckLabel] = useState("Dark mode");

  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  function toggleCheck(event: React.ChangeEvent<HTMLInputElement>) {
    setIsChecked(event.target.checked);
    isChecked ? setDarkMode(false) : setDarkMode(true);
    isChecked ? setCheckLabel("Dark mode") : setCheckLabel("Light mode");
  }

  const { basket } = useAppSelector((state) => state.basket);
  const { user } = useAppSelector((state) => state.account);

  const itemsCount = basket?.items?.reduce(
    (prevSum, item) => prevSum + item.quantity,
    0
  );

  return (
    <AppBar position="sticky" sx={{ mb: 4 }}>
      <Container maxWidth="xl">
        <Toolbar>
          <Typography
            variant="h6"
            noWrap
            component={NavLink}
            to={"/"}
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            SOSO
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {sectionsList.map(({ title, path }) => (
                <MenuItem
                  key={title}
                  component={NavLink}
                  to={path}
                  onClick={handleCloseNavMenu}
                >
                  <Typography textAlign="center">
                    {title.toUpperCase()}
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          <Typography
            variant="h5"
            noWrap
            component={NavLink}
            to={"/"}
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            SOSO
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {sectionsList.map(({ title, path }) => (
              <Button
                key={title}
                component={NavLink}
                to={path}
                onClick={handleCloseNavMenu}
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
              </Button>
            ))}

            <FormControlLabel
              control={<Switch checked={isChecked} onChange={toggleCheck} />}
              label={checkLabel}
              sx={{ ml: 2 }}
            />
          </Box>

          <Box sx={{ flexGrow: 0 }}>
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

            {user ? (
              <LoggedInMenu />
            ) : (
              <LoggedOutMenu />
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default NavBar;
