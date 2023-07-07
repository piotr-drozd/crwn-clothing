import { createContext, useState, useEffect } from "react";

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
    console.log(cartItems)
    console.log(productToClear)
    const existingCartItem = cartItems.find(
        (cartItem) => cartItem.id === productToClear.id
    );

    console.log(cartItems)
    console.log(existingCartItem)
    if (existingCartItem) {
        return (cartItems.filter(cartItem => cartItem.id !== productToClear.id));
    }
    console.log(cartItems)
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

export const CartProvider = ({ children }) => {

    const [isCartOpen, setIsCartOpen] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [cartCount, setCartCount] = useState(0);
    const [cartTotal, setCartTotal] = useState(0);

    useEffect(() => {
        const newCartCount = cartItems.reduce((total, cartItem) => total + cartItem.quantity, 0)
        setCartCount(newCartCount);
    }, [cartItems])

    useEffect(() => {
        const newCartTotal = cartItems.reduce((total, cartItem) => total + (cartItem.quantity * cartItem.price), 0)
        setCartTotal(newCartTotal);
    }, [cartItems])

    const addItemToCart = (productToAdd) => {
        setCartItems(addCartItem(cartItems, productToAdd))
    }

    const removeItemFromCart = (productToRemove) => {
        setCartItems(removeCartItem(cartItems, productToRemove))
    }

    const clearItemFromCart = (productToClear) => {
        setCartItems(clearCartItem(cartItems, productToClear))
    }

    const value = { isCartOpen, setIsCartOpen, addItemToCart, removeItemFromCart, clearItemFromCart, cartItems, cartCount, cartTotal };

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}