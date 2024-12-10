import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useUser } from './UserContext'; // Import useUser from UserContext
import "../styles/Header.css";

const Header = () => {
    const [searchTerm, setSearchTerm] = useState('');
    
    const { user, logout } = useUser(); 
    const location = useLocation();
    const navigate = useNavigate();
    
    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleSearchSubmit = (event) => {
        event.preventDefault();
        
        console.log("Search for:", searchTerm);
    };

    const goHome = () => {
        navigate('/');
    };

    const goToCart = () => {
        navigate('/cart');
    };
    const goToLogin = () =>{
        navigate('/login');
    }
    const goToRegister = () =>{
        navigate('/register');
    }
    const handleLogout = () => {
        logout(); 
        window.location.href = '/'; 
    };

    const isLoginPage = location.pathname === '/login' || location.pathname === '/register';

    return (
        <header className="header">
            <div className="top-menu">
                <div className="logo" onClick={goHome}>
                    <img 
                        src="https://media.dau.edu.vn/Media/1_TH1057/Images/logo-dhktdn-150.png" 
                        alt="Logo" 
                    />
                    <span className="shop-name">HUYSHOP</span>
                </div>
                <div className="user-section">
                    {user ? (
                        <div className="logged-in">
                            <span className="welcome-message">Xin Chào, {user.username} !</span>
                            <div className="user-icon">
                                <img 
                                    src="https://static.vecteezy.com/system/resources/previews/008/442/086/non_2x/illustration-of-human-icon-user-symbol-icon-modern-design-on-blank-background-free-vector.jpg" 
                                    alt="User" 
                                />
                            </div>
                            <button onClick={handleLogout} className="logout-button">Đăng Xuất</button>
                        </div>
                    ) : (
                        <div>
                            <button onClick={goToLogin} className="login-link">Đăng Nhập</button>/
                            <button onClick={goToRegister} className="login-link">Đăng Ký</button>
                        </div>
                    )}
                </div>
            </div>

            {!isLoginPage && (
                <div className="bottom-menu">
                    {user ? (
                        <nav className="nav-links">
                            <button onClick={goHome}>Trang Chủ</button>
                            <button onClick={goToCart}>Giỏ Hàng</button>
                            <button href="/profile">Thông Tin cá Nhân</button>
                        </nav>
                    ) : (
                        <div></div>
                    )}
                    <form onSubmit={handleSearchSubmit} className="search-form">
                        <input
                            type="text"
                            value={searchTerm}
                            onChange={handleSearchChange}
                            placeholder="Tìm kiếm sản phẩm...."
                            className="search-input"
                        />
                        <button type="submit" className="search-button">Tìm Kiếm</button>
                    </form>
                </div>
            )}
        </header>
    );
};

export default Header;
