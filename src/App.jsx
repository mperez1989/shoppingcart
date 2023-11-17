import { useState, useEffect } from 'react';
import './App.css';
import useFetch from './hooks/useFetch';
import Products from './components/Products';
import Cart from "../src/components/Cards";

function App() {
  const url = `https://mks-frontend-challenge-04811e8151e6.herokuapp.com/api/v1/products?page=1&rows=10&sortBy=id&orderBy=DESC`;
  const [products, getProducts, hasError, isLoading] = useFetch(url);
  const [cart, setCart] = useState([]);
  const [showModal,setShowModal] = useState(false);
  const [showCart, setShowCart] = useState(false); // Nuevo estado para controlar la visibilidad del carrito

  useEffect(() => {
    getProducts();
  }, []);

  const addToCart = (productId) => {
    const existingProduct = cart.find((item) => item.id === productId);

    if (existingProduct) {
      const updatedCart = cart.map((item) =>
        item.id === productId ? { ...item, quantity: item.quantity + 1 } : item
      );
      setCart(updatedCart);
    } else {
      const selectedProduct = products.products.find((product) => product.id === productId);
      setCart([...cart, { ...selectedProduct, quantity: 1 }]);
    }

    setShowCart(true);
  };

  const handleDelete = (productId) => {
    const updatedCart = cart.filter((item) => item.id !== productId);
    setCart(updatedCart);
  };

  const incrementQuantity = (productId) => {
    const updatedCart = cart.map((item) =>
      item.id === productId ? { ...item, quantity: item.quantity + 1 } : item
    );
    setCart(updatedCart);
  };

  const decrementQuantity = (productId) => {
    const updatedCart = cart.map((item) =>
      item.id === productId ? { ...item, quantity: Math.max(1, item.quantity - 1) } : item
    );
    setCart(updatedCart);
  };

  const handleCheckout = () =>{
    setCart([])
    setShowModal(true);
}

const handleCloseModal = () => {
  setShowModal(false);
};

  return (
    <div>
      <nav>
        <ul>
          <li className='list_item1'>
            <span>MSK</span>sistemas
          </li>
          <li className='list_item2'>
            <div className='shopingCard__container'>
              <img src="shopping_cart.png" alt="" />
              <span>{cart.length}</span>
            </div>
          </li>
        </ul>
      </nav>
      <div className="productCard__container">
        {products?.products.map((product) => (
          <Products key={product.id} product={product} addToCart={addToCart} />

          
        ))}
      </div>

           <Cart cart={cart} 
           onIncrement={incrementQuantity} 
           onDecrement={decrementQuantity} 
           onCheckout={handleCheckout} 
           setShowCart={setShowCart}
           showCard={showCart}
           onDelete={handleDelete}/>

      
    {showModal && (
        <div className='overlay'>
            <div className='modal'>
                <div className='modal__content'>
                    <p>your purchase was successful. !Thank!</p>
                    <button className='signup-btn' onClick={handleCloseModal}>Cerrar</button>
                </div>
            </div>
        </div>
      )}

    </div>

     
    
  );
}

export default App;