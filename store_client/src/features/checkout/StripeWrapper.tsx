import { Elements } from "@stripe/react-stripe-js";
import Checkout from "./Checkout";
import { loadStripe } from "@stripe/stripe-js";
import { useAppDispatch } from "../../App/store/configureStore";
import { useEffect, useState } from "react";
import agent from "../../App/api/agent";
import { setBasket } from "../Basket/basketSlice";
import LoadingBox from "../../App/Layouts/LoadingBox";

const stripePromise = loadStripe(
  "pk_test_51Nq9drKqht93pFY1Hp7pD4O2wweQB09zRIMt2LX7eclZYB0D9sfdwb3cwuxSWTq4RLc7Fnnn11V1JfOEJKVpDbHl00c6d9LeQH"
);

const StripeWrapper = () => {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    agent.Payments.createPI()
          .then(basket => dispatch(setBasket(basket)))
          .catch(error => console.log(error))
          .finally(() => setLoading(false));
  }, [dispatch])
  if(loading) return <LoadingBox />
  return (
    <Elements stripe={stripePromise}>
      <Checkout />
    </Elements>
  );
};

export default StripeWrapper;
