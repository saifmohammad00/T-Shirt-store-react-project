import {  useRef} from "react";
import classes from "./Seller.module.css";

const Seller = (props) => {
    const nameref=useRef();
    const desref=useRef();
    const priceref=useRef();
    const largeinputref=useRef();
    const mediumref=useRef();
    const smallref=useRef();
    const Handlerdata=(event)=>{
        if(nameref.current.value==="" || desref.current.value==="" || priceref.current.value==="" || largeinputref.current.value==="" || mediumref.current.value==="" || smallref.current.value===""){
            return;
        }
        console.log("hello")
        const item={
            name:nameref.current.value,
            description:desref.current.value,
            price:+priceref.current.value,
            large:+largeinputref.current.value,
            medium:+mediumref.current.value,
            small:+smallref.current.value,
        }
         props.tshirtDetails(item);
         nameref.current.value="";
         desref.current.value="";
         priceref.current.value="";
         largeinputref.current.value="";
         mediumref.current.value="";
         smallref.current.value="";
    }
    return <div className={classes.seller}>
        <div>
            <label>T-Shirt Name:
                <input type="text" ref={nameref}/>
            </label>
        </div>
        <div>
            <label>Description:
                <input type="text" ref={desref}/>
            </label>
        </div>
        <div>
            <label>Price:
                <input type="number" ref={priceref}/>
            </label>
        </div>
        <div>
            <h3>Quantity Available</h3>
            <label>Large:
                <input type="number" ref={largeinputref}/>
            </label><br/>
            <label>Medium:
                <input type="number" ref={mediumref}/>
            </label><br/>
            <label>Small:
                <input type="number" ref={smallref}/>
            </label>
        </div>
        <button type='button' onClick={Handlerdata} className={classes.addbtn}>Add T-Shirt</button>
    </div>
}
export default Seller;