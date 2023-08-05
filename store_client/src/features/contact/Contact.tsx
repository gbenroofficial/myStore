import { Button, ButtonGroup, Typography } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../App/store/configureStore";
import { decrement, increment } from "./counterSlice";

const Contact = () => {
  const dispatch = useAppDispatch();
  const { data, title } = useAppSelector((state) => state.counter);
  return (
    <>
      <Typography variant="h2">{title}</Typography>
      <Typography variant="h5">here is the data: {data}</Typography>
      <ButtonGroup>
        <Button
          onClick={() => {
            dispatch(decrement(1));
          }}
        >
          Decrement
        </Button>
        <Button
          onClick={() => {
            dispatch(increment(1));
          }}
        >
          Increment
        </Button>
      </ButtonGroup>
    </>
  );
};

export default Contact;
