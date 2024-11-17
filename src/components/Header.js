import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'
import Home from './home';

import "../styles/Header.css";

const Header = () => {
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleSearchSubmit = (event) => {
        event.preventDefault();
        
        console.log("Search for:", searchTerm);
    };
    const navigate = useNavigate()

    const goHome = () => {
        navigate('/')  
      }

    return (
        <header className="header">
            <div className="top-menu">
                <div className="logo" onClick={goHome}>
                    <img  src="https://media.dau.edu.vn/Media/1_TH1057/Images/logo-dhktdn-150.png" alt="Logo" />
                    <span className="shop-name">HUYSHOP</span>
                </div>
                <div className="user-section">
                    <a href="/login" className="login-link">Đăng Nhập</a>/<a href="/register" className="login-link">Đăng Ký</a>
                    <div className="user-icon" >
                        <img  src="https://static.vecteezy.com/system/resources/previews/008/442/086/non_2x/illustration-of-human-icon-user-symbol-icon-modern-design-on-blank-background-free-vector.jpg" alt="User" />
                    </div>
                </div>
            </div>
            <div className="bottom-menu">
                <nav className="nav-links">
                    <a href="/">Trang Chủ</a>
                    <a href="/cart">Giỏ Hàng</a>
                    <a href="/profile">Thông Tin cá Nhân</a>
                </nav>
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
        </header>
    );
};

export default Header;
