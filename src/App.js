import Cart from "./components/Cart/Cart";
import Seller from "./components/Seller";
import Buyer from "./components/Buyer";
import { useState } from "react";
import AppcontextProvider from "./store/contextProvider";

function App() {
  const [newItem,setNewItem]=useState([]);
  const data=(item)=>{
      setNewItem((prev)=>[...prev,{...item,id:prev.length+1}]);
  }
  const preVal = (val) => {
    setNewItem((prevItems) => {
      return prevItems.map((item) =>
        item.id === val.id ? { ...item, [val.size]: item[val.size] - 1 } : item
      );
    });
  };
  return (
    <AppcontextProvider>
      <Cart />
      <Seller tshirtDetails={data}/>
      <Buyer  preserveVal={preVal} addProduct={newItem}/>
      </AppcontextProvider>
  );
}

export default App;
