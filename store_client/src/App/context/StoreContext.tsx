import { PropsWithChildren, createContext, useContext, useState } from "react";
import { Basket } from "../Models/Basket";

interface StoreContextShape {
  basket: Basket | null;
  setBasket: (basket: Basket) => void;
  deleteItem: (productId: number,) => void;
}
export const StoreContext = createContext<StoreContextShape | undefined>(
  undefined
);

export function useStoreContext(){
  const context = useContext(StoreContext);
  if(context === undefined){
    throw Error("oops - it seems you're trying to access storeContext from outside it's provider")
  }
  return context;
}
export function StoreContextProvider({ children }: PropsWithChildren<any>) {
  const [basket, setBasket] = useState<Basket | null>(null);

  function deleteItem(productId: number) {
    if (!basket) return;
    const items = [...basket.items];
    const itemIndex = items.findIndex((item) => item.productId === productId);
    if (itemIndex >= 0) {
      items.splice(itemIndex, 1);
    }
    setBasket(prevState => {return {...prevState!, items}})
  }
  return (
    <StoreContext.Provider value={{ basket, setBasket, deleteItem }}>
      {children}
    </StoreContext.Provider>
  );
}
