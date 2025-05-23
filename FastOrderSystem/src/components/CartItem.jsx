import { useContext } from "react";
import { currencyFormatter } from "../util/formatting";
import CartContext from "../store/CartContext";

export default function CartItem({item}){

    const contextCart = useContext(CartContext);

    function handleAddItem(){
        contextCart.addItem(item);
    }
    function handleRemoveItem(){
        contextCart.removeItem(item.id);
    }
    return (
        
        <li className="cart-item">
            <p>
                {item.name} - {item.quantity} X  {currencyFormatter.format(item.price)}
            </p>
            <p className="cart-item-actions">
                <button onClick={handleRemoveItem}> - </button>
                <span> {item.quantity} </span>
                <button onClick={handleAddItem}> + </button>
            </p>
        </li>
    );
}