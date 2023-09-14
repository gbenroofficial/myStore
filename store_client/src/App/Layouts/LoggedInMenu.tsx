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

  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
 

  return (
    <>
      <Tooltip title="Account settings">
        <IconButton
          onClick={handleOpenUserMenu}
          size="small"
          sx={{ pl: 2 }}          
        >
          <Avatar sx={{ width: 32, height: 32 }}>
            {user?.email.charAt(0)}
          </Avatar>
        </IconButton>
      </Tooltip>

      <Menu
       sx={{ mt: '45px' }}
       id="menu-appbar"
       anchorEl={anchorElUser}
       anchorOrigin={{
         vertical: 'top',
         horizontal: 'right',
       }}
       keepMounted
       transformOrigin={{
         vertical: 'top',
         horizontal: 'right',
       }}
       open={Boolean(anchorElUser)}
       onClose={handleCloseUserMenu}
       onClick={handleCloseUserMenu}
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
