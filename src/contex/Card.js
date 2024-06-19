import { useState,useEffect, useContext, createContext } from "react";

const CardContext = createContext();
const CardProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  useEffect(()=>{
    let exisitingCartItem = localStorage.getItem('cart')
    if (exisitingCartItem){
      setCart(JSON.parse(exisitingCartItem))
    }
  },[])
  return (
    <CardContext.Provider value={[cart, setCart]}>
      {children}
    </CardContext.Provider>
  );
};

// custom hook
const useCard = () => useContext(CardContext);

export { useCard, CardProvider };