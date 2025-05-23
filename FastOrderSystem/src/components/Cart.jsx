import { createContext, useContext } from "react";
import Modal from "./UI/Modal";
import CartContext from "../store/CartContext";
import { currencyFormatter } from "../util/formatting";
import Button from "./UI/Button";
import UserProgressContext from "../store/UserProgressContext";
import CartItem from "./CartItem";

export default function Cart(){

    const context = useContext(CartContext);
    const userProgressContext = useContext(UserProgressContext);

    const cartTotal = context.items.reduce((totalPrice, item) => {
        return totalPrice += item.quantity * item.price;
    }, 0);
            console.log(cartTotal);

    function handleCloseCart(){
        userProgressContext.hideCart();
    }

    function handleGoToCheckout(){
        userProgressContext.showCheckout();
    }

    return (
        <Modal className="cart" open={userProgressContext.progress==='cart'} onClose={userProgressContext.progress==='cart' ? handleCloseCart: null }>
            <h2> Your Cart</h2>
            <ul>
                {context.items.map(item =>{
                    return <CartItem key= {item.id} item={item} />
                }) }
            </ul>
            <p className="cart-total"> {currencyFormatter.format(cartTotal)} </p>
            <p className="modal-actions">
                <Button textOnly onClick={handleCloseCart}> Close </Button>
               {context.items.length > 0 && <Button onClick={handleGoToCheckout}> Go to Checkout </Button> } 
            </p>
        </Modal>
    );
}