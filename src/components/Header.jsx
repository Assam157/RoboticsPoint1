import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { useItemContext } from '../context/ItemContext';
import {useNavigate} from "react-router-dom";
import {useLocation} from 'react-router-dom';
import Cart from './Cart';
 

 
const Header = () => {
  const { itemsInCart, totalPrice , cart} = useItemContext();
  const navigate=useNavigate();
  const location=useLocation();
  const queryParams = new URLSearchParams(location.search);
  const username = queryParams.get('username') || 'Guest';
  const handleLoginRequest = () => {
    navigate('/login'); // Adjust the path as needed
  };
  const handleSignUp=()=>{
    navigate("/SignUp");
  }
  const handleBuyNow=()=>{
    console.log(itemsInCart);
    navigate(`/Buypage?username=${username}`,{state:{productsToBuy:cart}})
  }
  return (
    <nav className='navbar'>
      <div className='navbar-brand'>
        <h1 className='ecom'>
          <p>Robotics Point</p>
        </h1>
      </div>
       
      <div className='navbar-items'>
      <div className='LoginButton'>
                <button className='LoginButton' onClick={handleLoginRequest}>
                    Login
                </button>
            </div>
            <div className='SignUpButton'>
                <button className='SignUpButton' onClick={handleSignUp}>
                    SignUp
                </button>
            </div>
        <h3 style={{ color: "green" }}>
          Total Price: {totalPrice || 0} Rs
        </h3>
        <div className='cart-num'>
          <FontAwesomeIcon icon={faCartShopping} size="2x" onClick={handleBuyNow} />
          <div className='cart-items'>
            {itemsInCart || 0}  {/* Ensure default value */}
          </div>
        </div>

      </div>
    </nav>
  );
};

export default Header;

 
