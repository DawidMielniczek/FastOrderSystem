import { useContext } from "react";
import Modal from "./UI/Modal";
import CartContext from "../store/CartContext";
import { currencyFormatter } from "../util/formatting";
import Input from "./UI/Input";
import Button from "./UI/Button";
import UserProgressContext from "../store/UserProgressContext";
import useHttp from "../hooks/useHttp";
import Error from "./Error";
import { useActionState } from "react";

const requestConfig = {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    }
};

export default function Checkout() {

    const cartCtx = useContext(CartContext);
    const progressCtx = useContext(UserProgressContext);
    const cartTotal = cartCtx.items.reduce((totalPrice, item) => totalPrice + item.quantity * item.price, 0);

    const { data, error, sendRequest, clearData} = useHttp('http://localhost:3000/orders', requestConfig);

    function handleClose() {
        progressCtx.hideCheckout();
    }

    function handleFinish(){
        progressCtx.hideCheckout();
        cartCtx.clearCart();
        clearData();
    }

    async function checkoutAction(prevState, fd) {
        
        const customerData = Object.fromEntries(fd.entries());

        await sendRequest(JSON.stringify({
            order: {
                items: cartCtx.items,
                customer: customerData
            }
        }));
    }

    const [formState, formAction, pending] = useActionState(checkoutAction, null);

    let actions = (<>
        <Button type="button" textOnly onClick={handleClose}>
            Close
        </Button>
        <Button>
            Submit Order
        </Button>
    </>);

    if(pending){
        actions = <span> Sending order data...</span>
    }
    if(data && !error){
        return <Modal open={progressCtx.progress === 'checkout'} onClose={handleFinish}>
            <h2> Success!</h2>
            <p> Your orderd was submitted successfully.</p>
            <p> We will get back to you with more details via email within the new few minutes.</p>
            <p className="modal-actions">
                <Button onClick={handleFinish}> Okay </Button>
            </p>
        </Modal>
    }

    return (
        <Modal open={progressCtx.progress === 'checkout'} onClose={handleClose}>
            <form action={formAction}>
                <h2> Checkout </h2>
                <p> Total Amount: {currencyFormatter.format(cartTotal)}</p>

                <Input lable="Full Name" type="text" id="name" />
                <Input label="E-mail Address" type="email" id="email" />
                <Input label="Street" type="text" id="street" />
                <div className="control-row">
                    <Input label="Postal Code" type="text" id="postal-code" />
                    <Input label="City" type="text" id="city" />
                </div>
                {error && <Error title="Failed to submit order..." message={error} />}
                <p className="modal-actions">
                    {actions}
                </p>
            </form>
        </Modal>
    );
}