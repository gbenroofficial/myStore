import React from "react";
import { useDispatch, useSelector } from "react-redux/es/exports";
import { CounterState, DECREMENT_COUNT, INCREMENT_COUNT, decrement, increment } from "./counterReducer";
import { Button, ButtonGroup, Typography } from "@mui/material";
const Contact = () => {
  const dispatch = useDispatch();
  const { data, title } = useSelector((state: CounterState) => state);
  return (
    <>
      <Typography variant="h2">{title}</Typography>
      <Typography variant="h5">here is the data: {data}</Typography>
      <ButtonGroup>
        <Button
          onClick={() => {
            dispatch(decrement());
          }}
        >
          Decrement
        </Button>
        <Button
          onClick={() => {
            dispatch(increment());
          }}
        >
          Increment
        </Button>
      </ButtonGroup>
    </>
  );
};

export default Contact;
