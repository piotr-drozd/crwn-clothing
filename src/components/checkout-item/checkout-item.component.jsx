import { useDispatch, useSelector } from 'react-redux';
import { selectCartItems } from '../../store/cart/cart.selector';
import { addItemToCart, removeItemFromCart, clearItemFromCart } from '../../store/cart/cart.action';


import './checkout-item.styles.scss'

const CheckoutItem = ({ cartItem }) => {

  const dispatch = useDispatch();
  
  const cartItems = useSelector(selectCartItems);
  
  const addItemHandler = () => dispatch(addItemToCart(cartItems, cartItem));
  const removeItemHandler = () => dispatch(removeItemFromCart(cartItems, cartItem));
  const clearItemHandler = () => dispatch(clearItemFromCart(cartItems, cartItem));

  const { name, imageUrl, price, quantity } = cartItem;
  return (
    <div className='checkout-item-container'>
      <div className='image-container'>
        <img src={imageUrl} alt={`${name}`} />
      </div>
      <span className='name'>{name}</span>
      <span className='quantity'>
        <div className='arrow' onClick={removeItemHandler}>
          &#10094;
        </div>
        <span className='value'>
          {quantity}
        </span>
        <div className='arrow' onClick={addItemHandler}>
          &#10095;
        </div>
      </span>
      <div className='price'>{price}</div>
      <div className='remove-button' onClick={clearItemHandler}>&#10005;</div>
    </div>
  );
};

export default CheckoutItem;