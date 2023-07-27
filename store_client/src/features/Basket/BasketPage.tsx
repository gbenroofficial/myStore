import React, { useEffect, useState } from "react"
import agent from "../../App/api/agent";
import LoadingBox from "../../App/Layouts/LoadingBox";
import { Typography } from "@mui/material";
import { Basket } from "../../App/Models/Basket";

const BasketPage = () => {
    const [basket, setBasket] = useState<Basket>();
    const [loading, setLoading] = useState(true);
    
    useEffect(()=>{
        agent.Basket.get().then(basket => setBasket(basket)).catch(()=>{}).finally(()=>setLoading(false));
        
    }, []);
    if (loading) return <LoadingBox message="Loading items..." />;
    if(!basket) return <Typography variant="h3">Your basket is empty</Typography>
    
  return (
    <>
      <div>{basket.ownerId}</div>
    </>
  )
};

export default BasketPage;
