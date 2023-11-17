import { useState } from 'react';
import { FaTimes } from 'react-icons/fa';

const CartItem = ({ item, onIncrement, onDecrement, onDelete }) => {
  return (
    <div className="cartItem">
      <img className="cartItem__image" src={item.photo} alt="" />
      <div className="cartItem__details">
        <h3>{item.name}</h3>
        <p>R${item.price} c/u</p>
      </div>
      <div className="cartItem__quantity">
        <button onClick={() => onDecrement(item.id)}>-</button>
        <span>{item.quantity}</span>
        <button onClick={() => onIncrement(item.id)}>+</button>
      </div>
      <span className='cartItem__delete' onClick={() => onDelete(item.id)}>
      <FaTimes />
      </span>
    </div>
  );
};

const Cart = ({ cart, onIncrement, onDecrement,onDelete,onCheckout,setShowCart,showCard }) => {
    const [showModal,setShowModal] = useState(false);

    const handleCheckout = () =>{
        setShowModal(true);
        onCheckout();
        setShowCart(false);  // Oculta el carrito al finalizar la compra
    }

  
    
  return (

    <div className={`cart ${showCard ? 'visible' : 'hidden'}`}>
       
         <h2>Shopping Cart</h2>
       
      {cart.map((item) => (
        <CartItem key={item.id} item={item} onIncrement={onIncrement} onDecrement={onDecrement} onDelete={onDelete} />
      ))}
      <div className="cart__total">
        <p>Total:</p>
        <p>R${calculateTotal(cart)}</p>
      </div>
      <div className='center'>
       <button className='cart__checkout' onClick={handleCheckout}>
        Finalizar compra
      </button>
      </div>
     
    </div>
  );
};

const calculateTotal = (cart) => {
  return cart.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
};

export default Cart;