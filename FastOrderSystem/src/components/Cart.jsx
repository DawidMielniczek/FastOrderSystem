import { createContext, useContext } from "react";
import Modal from "./UI/Modal";
import CartContext from "../store/CartContext";
import { currencyFormatter } from "../util/formatting";
import Button from "./UI/Button";

export default function Cart(){

    const context = useContext(CartContext);

    const cartTotal = context.items.reduce((totalPrice, item) => {
        totalPrice += item.quantity * item.price
    }, 0);

    return (
        <Modal className="cart">
            <h2> Your Cart</h2>
            <ul>
                {context.items.map(item =>{
                    <li key={item.id}>
                        {item.name} - { item.quantity}
                    </li>
                }) }
            </ul>
            <p className="cart-total"> {currencyFormatter.format(cartTotal)} </p>
            <p className="modal-actions">
                <Button textOnly> Close </Button>
                <Button> Go to Checkout </Button>
            </p>
        </Modal>
    );
}