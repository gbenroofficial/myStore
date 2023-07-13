import { Backdrop, CircularProgress, Typography } from "@mui/material";
import React from "react";

interface Props{
    message?: string;
}
const LoadingBox = ({message= "Loading..."}: Props) => {
  return (
    <>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={true} invisible={true}        
      >        
        <CircularProgress color="secondary" size={100}/>
        <Typography variant="h4" sx={{justifyContent: "center", position: "fixed", top: "60%"}} color="primary">{message}</Typography>
      </Backdrop>
    </>
  );
};

export default LoadingBox;
