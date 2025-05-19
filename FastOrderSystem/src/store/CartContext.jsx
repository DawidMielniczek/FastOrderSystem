import { act, createContext, useReducer } from "react";

const CartContext = createContext({
    items: [],
    addItem: (item) => {},
    removeItem: (id) => {} 
});

function cartReducer(state, action){
    if(action.type === 'ADD_ITEM') {
        const existingCartItemIndex = state.items.findIndex((item) => {item.id === action.item.id} );

        const updatedItems = [...state.items];

        if(existingCartItemIndex > -1) {

            const existingItem = state.items[existingCartItemIndex];

            const updateItem = {
                ...existingItem,
                quantity: existingItem.quantity +1
            };
            updatedItems[existingCartItemIndex] = updateItem;
        } else {
            updatedItems.push({...action.item, quantity: 1});
        }
        return {...state, items: updatedItems}
    }

    if(action.type === 'REMOVE_ITEM'){
        const existingItemIndex = state.items.findIndex((item) => { item.id === state.item.id});

        const existingCartItem = state.items[existingItemIndex];

        const updatedItems = [...state.items];

        if(existingCartItem.quantity === 1){
            updatedItems.splice(existingItemIndex, 1);
        } else {
            const updatedItem = {...existingCartItem, quantity: existingCartItem.quantity -1};
            updatedItems[existingCartItemIndex] = updatedItem;
        }
        return {...state, items: updatedItems}
    }

    return state;
}

export function CartContextProvider({ children }){

    useReducer(cartReducer, {items: []});



    return <CartContext.Provider>
        {children}
    </CartContext.Provider>
}

export default CartContext;