import { Fragment, useContext, useEffect, useState } from "react";
import context from "../store/context"
import axios from "axios";

const url='https://crudcrud.com/api/a8eacf66a9b54a43ad8ca0738eeff9d5'

const Button = (props) => {
    const conCtx = useContext(context);
    const [newItem, setNewItem] = useState(props);
    const buttonHandler = async(size) => {
        try{
            if (newItem[size] > 0) {
                props.ChangeVal({id:newItem.id,size:size});
                setNewItem(prevItems => ({
                    ...prevItems,
                    [size]: prevItems[size] - 1
                }));
                const newItemToAdd = {
                    id:newItem.id,
                    name:newItem.name,
                    price:+newItem.price,
                    large:0,
                    medium:0,
                    small:0
                };
                const nitem={...newItemToAdd,[size]:1};
                const z=await axios.get(`${url}/cart`);
                const {_id,...y}=z.data.find((item)=>item.id===newItem.id);
                if(y){
                    await axios.put(`${url}/cart/${_id}`,{...y,[size]:y[size]+1});
                }
                else{
                    await axios.post(`${url}/cart`,nitem);
                }
                conCtx.addItem(nitem);
            }
        }catch(error){
            console.log(error);
        }
    };
    useEffect(()=>{
        async function getCart(){
            const x=await axios.get(`${url}/cart`);
            for(const key in x.data){
                conCtx.addItem(x.data[key]);
            }
        }
        getCart();
    },[])
    const handleDelete=()=>{
         props.delete(newItem.id);
    }
    return <Fragment>
        <button onClick={() => buttonHandler('large')} type="button">
            Buy Large ({newItem.large})
        </button>
        <button onClick={() => buttonHandler('medium')} type="button">
            Buy Medium ({newItem.medium})
        </button>
        <button onClick={() => buttonHandler('small')} type="button">
            Buy Small ({newItem.small})
        </button>
        <button onClick={handleDelete}>Delete</button>
    </Fragment>
}
export default Button;