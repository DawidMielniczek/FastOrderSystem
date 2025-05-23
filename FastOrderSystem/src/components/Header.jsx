import { useContext } from 'react';
import logo from '../assets/logo.jpg';
import Button from './UI/Button';
import CartContext from '../store/CartContext';
import UserProgressContext from '../store/UserProgressContext';

export default function Header(){

    const context = useContext(CartContext);
    const progressContext = useContext(UserProgressContext);

    const totalItems = context.items.reduce((totalNumber, item) => {
        return totalNumber + item.quantity;
    }, 0);

    function handleShowCart(){
        progressContext.showCart();
    }
    return (
        <header id="main-header">
            <div id="title">
                <img src={logo} alt="Restaurant logo" />
                <h1> Fast Order System </h1>
            </div>
            <nav>
                <Button textOnly onClick={handleShowCart} > Cart ({totalItems}) </Button>
            </nav>
        </header>
    )
}