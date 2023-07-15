import { createContext, useReducer } from "react";

import { createAction } from "../utils/reducer/reducer.utils";

const addCartItem = (cartItems, productToAdd) => {
    // find if cartItems contains productToAdd
    const existingCartItem = cartItems.find(
        (cartItem) => cartItem.id === productToAdd.id
    );


    if (existingCartItem) {
        return (cartItems.map((cartItem) =>
            cartItem.id === productToAdd.id
                ? { ...cartItem, quantity: cartItem.quantity + 1 }
                : cartItem
        ));
    }

    // return new array with modified cartItems/ new cart item
    return (
        [...cartItems, { ...productToAdd, quantity: 1 }]
    );

}

/* other version
const existingCartItem = cartItems.find((cartItem) => cartItem.id === productToAdd.id);
console.log(cartItems)
if (existingCartItem){
    const indexOfExistingCartItem = cartItems.findIndex((cartItem) => cartItem.id === productToAdd.id);
    cartItems[indexOfExistingCartItem].quantity = cartItems[indexOfExistingCartItem].quantity + 1;
    return (
        cartItems
    )
} else {
    return (
        [...cartItems, {...productToAdd, quantity: 1}]
    )
}
*/

const removeCartItem = (cartItems, productToRemove) => {

    const existingCartItem = cartItems.find(
        (cartItem) => cartItem.id === productToRemove.id
    );


    if (existingCartItem.quantity === 1) {
        return (cartItems.filter(cartItem => cartItem.id !== productToRemove.id));
    }

    if (existingCartItem) {
        return (cartItems.map(cartItem =>
            cartItem.id === productToRemove.id
                ? { ...cartItem, quantity: cartItem.quantity - 1 }
                : cartItem
        ))
    }
}

const clearCartItem = (cartItems, productToClear) => {
    const existingCartItem = cartItems.find(
        (cartItem) => cartItem.id === productToClear.id
    );

    if (existingCartItem) {
        return (cartItems.filter(cartItem => cartItem.id !== productToClear.id));
    }
}

export const CartContext = createContext({
    isCartOpen: false,
    setIsCartOpen: () => { },
    cartItems: [],
    addItemToCart: () => { },
    removeItemFromCart: () => { },
    clearItemFromCart: () => { },
    cartCount: 0,
    cartTotal: 0,
    setcartCount: () => { },
});

const CART_ACTION_TYPES = {
    TOGGLE_IS_CART_OPEN: 'TOGGLE_IS_CART_OPEN',
    SET_CART_ITEMS: 'SET_CART_ITEMS',
}

const INITIAL_STATE = {
    isCartOpen: false,
    cartItems: [],
    cartCount: 0,
    cartTotal: 0,
}

const cartReducer = (state, action) => {
    const { type, payload } = action;

    switch (type) {
        case CART_ACTION_TYPES.TOGGLE_IS_CART_OPEN:
            return {
                ...state,
                isCartOpen: payload,
            }
        case CART_ACTION_TYPES.SET_CART_ITEMS:
            return {
                ...state,
                ...payload,
            }
        default:
            throw new Error('Unhandled type ${type} in userReducer');
    }
}

export const CartProvider = ({ children }) => {

    const [state, dispatch] = useReducer(cartReducer, INITIAL_STATE);
    const { isCartOpen, cartItems, cartCount, cartTotal } = state;

    const updateCartItemsReducer = (newCartItems) => {
        const newCartCount = newCartItems.reduce(
            (total, cartItem) => total + cartItem.quantity,
            0
        );

        const newCartTotal = newCartItems.reduce(
            (total, cartItem) => total + cartItem.quantity * cartItem.price,
            0
        );

        dispatch(createAction(CART_ACTION_TYPES.SET_CART_ITEMS, {
                cartItems: newCartItems,
                cartCount: newCartCount,
                cartTotal: newCartTotal
            })
        );
    }

    const setIsCartOpen = (bool) => {
        dispatch(createAction( CART_ACTION_TYPES.TOGGLE_IS_CART_OPEN, bool))
    };

    const addItemToCart = (productToAdd) => {
        const newCartItems = addCartItem(cartItems, productToAdd);
        console.log(newCartItems)
        updateCartItemsReducer(newCartItems);
    };

    const removeItemFromCart = (productToRemove) => {
        const newCartItems = removeCartItem(cartItems, productToRemove);
        updateCartItemsReducer(newCartItems);
    };

    const clearItemFromCart = (productToClear) => {
        const newCartItems = clearCartItem(cartItems, productToClear);
        updateCartItemsReducer(newCartItems);
    };

    const value = { isCartOpen, setIsCartOpen, addItemToCart, removeItemFromCart, clearItemFromCart, cartItems, cartCount, cartTotal };

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}