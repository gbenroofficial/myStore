import { Elements } from "@stripe/react-stripe-js";
import Checkout from "./Checkout";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(
  "pk_test_51Nq9drKqht93pFY1Hp7pD4O2wweQB09zRIMt2LX7eclZYB0D9sfdwb3cwuxSWTq4RLc7Fnnn11V1JfOEJKVpDbHl00c6d9LeQH"
);

const StripeWrapper = () => {
  return (
    <Elements stripe={stripePromise}>
      <Checkout />
    </Elements>
  );
};

export default StripeWrapper;
