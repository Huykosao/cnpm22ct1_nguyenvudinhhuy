import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { UserProvider } from './components/UserContext';
import { useState } from 'react';
import Home from './components/home';
import Login from './components/login';
import Register from './components/register';
import ProductDetail from './components/ProductDetail';
import Cart from './components/Cart';
import OrderPage from './components/OrderPage';
import './App.css';
import Profile from './components/Profile';

function App() {
  const [loggedIn, setLoggedIn] = useState(false)
  const [email, setEmail] = useState('')
  return (
    <UserProvider>
      <div className="App">
        <BrowserRouter>
          <Routes>
            
            <Route
              path="/"
              element={<Home email={email} loggedIn={loggedIn} setLoggedIn={setLoggedIn} />}
            />
            <Route path="/login" element={<Login setLoggedIn={setLoggedIn} setEmail={setEmail} />} />
            <Route path="/register" element={<Register />} /> 
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/Cart" element={<Cart />} />
            <Route path="/OrderPage" element={<OrderPage />} />
            <Route path='/Profile' element={<Profile />} />
          </Routes>
        </BrowserRouter>
      </div>
    </UserProvider>
  )
}

export default App