import {
  Box,
  Tooltip,
  IconButton,
  Avatar,
  Menu,
  MenuItem,
  ListItemIcon,
} from "@mui/material";
import React from "react";
import { useAppDispatch, useAppSelector } from "../store/configureStore";
import { logOut } from "../../features/account/accountSlice";
import { Logout } from "@mui/icons-material";
import { clearBasket } from "../../features/Basket/basketSlice";
import ViewListIcon from "@mui/icons-material/ViewList";
import { Link } from "react-router-dom";

const LoggedInMenu = () => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.account);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Box sx={{ display: "flex", alignItems: "center", textAlign: "center" }}>
        <Tooltip title="Account settings">
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{ ml: 2 }}
            aria-controls={open ? "account-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
          >
            <Avatar sx={{ width: 32, height: 32 }}>{user?.email.charAt(0)}</Avatar>
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            "&:before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <MenuItem
          onClick={() => {
            dispatch(logOut());
            dispatch(clearBasket());
          }}
        >
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Log Out
        </MenuItem>
        <MenuItem component={Link} to="/orders">
          <ListItemIcon>
            <ViewListIcon fontSize="small" />
          </ListItemIcon>
          Orders
        </MenuItem>
      </Menu>
    </>
  );
};

export default LoggedInMenu;
