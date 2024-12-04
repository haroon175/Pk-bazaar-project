import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Navbar from '../src/components/Navbar';   
import SignUp from '../src/components/SignUp';
import Login from '../src/components/Login';
import Home from './screens/Home/Home';
import ListCategory from './screens/Categories/ListCategory';
import ProductPage from './screens/Products/ProductPage';
import ProductDetailPage from './screens/Products/ProductDetailPage';
import Store from './screens/Store/Store';
import ShoppingCart from './screens/ShoppingCarts/ShoppingCart';
import MyStore from './screens/Store/MyShop';
import Profile from './screens/Profile/Profile';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false); 
  useEffect(() => {
    const userLoggedIn = localStorage.getItem('isLoggedIn'); 
    if (userLoggedIn === 'true') {
      setIsLoggedIn(true);
    }
  }, []);

  return (
    <Router>
      <Routes>
        {/* Route for unauthenticated users */}
        <Route 
          path="/" 
          element={!isLoggedIn ? <Navbar setIsLoggedIn={setIsLoggedIn} /> : <Navigate to="/" />} 
        />       
        
        <Route path='/signup' element={<SignUp />} />        
        <Route path='/login' element={<Login />} />

        {/* Routes for authenticated users */}
        <Route 
          path="/eg"
          element={ <ListCategory /> } 
        />
        <Route path="/products/:categoryId" element={<ProductPage />} />
        <Route path="/product-detail" element={<ProductDetailPage />} />
        <Route path='/createStore' element={<Store/>}/>
        <Route path='/shoppingCarts' element={<ShoppingCart/>}/>
        <Route path="/my-store/my-shop" element={<MyStore/>} />
        <Route path='/profile' element={<Profile/>}/>
        {/* Any other protected routes can go here */}
      </Routes>
    </Router>
  );
}

export default App;
