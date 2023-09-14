import { Button } from "@mui/material";
import { NavLink } from "react-router-dom";

const logList = [
    { title: "login", path: "/login" },
    { title: "register", path: "/register" },
  ];

const LoggedOutMenu = () => {
  return (
    <>
      {logList.map(({ title, path }) => (
                  <Button
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
                  </Button>
                ))}
    </>
  )
};

export default LoggedOutMenu;
