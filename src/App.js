import Cart from "./components/Cart/Cart";
import Seller from "./components/Seller";
import Buyer from "./components/Buyer";
import { useEffect, useState } from "react";
import AppcontextProvider from "./store/contextProvider";
import axios from "axios";

const url = 'https://crudcrud.com/api/a8eacf66a9b54a43ad8ca0738eeff9d5'

function App() {
  const [newItem, setNewItem] = useState([]);
  const data = async(item) => {
    const nitem = { ...item, id: Math.random() };
    const x = await axios.post(`${url}/shirtLists`, {
      ...nitem
    })
    setNewItem((prev) => {
      return [...prev, nitem];
    });
  }
  useEffect(() => {
    async function list() {
      const x = await axios.get(`${url}/shirtLists`);
      if (x.data.length) {
        for (const key in x.data) {
          setNewItem((prev) => [...prev, x.data[key]]);
        }
      }
    }
    list();
  }, []);

  const preVal = (val) => {
    setNewItem((prevItems) => {
      return prevItems.map((item) =>
        item.id === val.id ? { ...item, [val.size]: item[val.size] - 1 } : item
      );
    });
  };
  const handledelete = async (id) => {
    const y = await axios.get(`${url}/shirtLists`);
    const z = y.data.find((item) => item.id === id);
    const x = await axios.delete(`${url}/shirtLists/${z._id}`);
    setNewItem((prev) => {
      return prev.filter((item) => item.id !== id);
    })
  }
  return (
    <AppcontextProvider>
      <Cart />
      <Seller tshirtDetails={data} />
      <Buyer preserveVal={preVal} addProduct={newItem} delete={handledelete} />
    </AppcontextProvider>
  );
}

export default App;
