import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addToCart, removeFromCart, updateQuantity } from './cartSlice';
import './App.css';

const products = [
  { id: 1, name: 'Laptop', price: 1200 },
  { id: 2, name: 'Mouse', price: 25 },
  { id: 3, name: 'Keyboard', price: 45 },
];

function App() {
  const cart = useSelector(state => state.cart);
  const dispatch = useDispatch();

  return (
    <div className="App">
      <h1>My Shop</h1>
      <h2>Products</h2>
      <div className="product-list">
        {products.map(product => (
          <div className="product" key={product.id}>
            <h3>{product.name}</h3>
            <p>${product.price}</p>
            <button onClick={() => dispatch(addToCart(product))}>Add to Cart</button>
          </div>
        ))}
      </div>

      <h2>Shopping Cart</h2>
      {cart.length === 0 ? (
        <p>No items in cart</p>
      ) : (
        cart.map(item => (
          <div key={item.id} className="cart-item">
            <span>{item.name} (${item.price})</span>
            <input
              type="number"
              min="1"
              value={item.quantity}
              onChange={(e) =>
                dispatch(updateQuantity({ id: item.id, quantity: Number(e.target.value) }))
              }
            />
            <button onClick={() => dispatch(removeFromCart(item.id))}>Remove</button>
          </div>
        ))
      )}
    </div>
  );
}

export default App;
