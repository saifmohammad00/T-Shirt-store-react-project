import classes from "./Buyer.module.css";
import Button from "./Button";

const Buyer = (props) => {
    const abc=(val)=>{
        props.preserveVal(val);
     }
     const handledelete=(id)=>{
        props.delete(id);
     }
    return <div className={classes.buyer}>
        {props.addProduct.map((item) => {
            return <div className={classes.product} key={item.id}>
                <span>{item.name}</span>
                <span>{item.description}</span>
                <span>Price:${item.price}</span>
                <Button
                    id={item.id}
                    name={item.name}
                    price={item.price}
                    large={item.large}
                    medium={item.medium}
                    small={item.small}
                    ChangeVal={abc}
                    delete={handledelete}
                />
            </div>
        })}
    </div>
}
export default Buyer;