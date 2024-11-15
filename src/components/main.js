import React from 'react';
// import { Link } from 'react-router-dom';
import "../styles/Main.css";

const Main = () => {
    const consoles = [
        {
            id: 'ps5',
            title: 'PlayStation 5',
            backgroundColor: '#003791',
            logo: '🎮'
        },
        {
            id: 'switch',
            title: 'Nintendo Switch',
            backgroundColor: '#e60012',
            logo: '🎮'
        },
        {
            id: 'xbox',
            title: 'Xbox Game Pass',
            backgroundColor: '#107C10',
            logo: '🎮'
        },
        {
            id: 'steam',
            title: 'Steam Deck',
            backgroundColor: '#171a21',
            logo: '🎮'
        },
        {
            id: 'rog',
            title: 'ROG Ally',
            backgroundColor: '#ff0029',
            logo: '🎮'
        },
        {
            id: 'samsung',
            title: 'Samsung Gaming',
            backgroundColor: '#1428a0',
            logo: '🎮'
        }
    ];

    return (
        <div className="div-content">
            {/* Featured Banner */}
            <section className="featured-section">
                <div className="featured-banner">
                    <div className="placeholder-text">
                        <span className="logo-text">PS5</span>
                        <span className="price-text">Trả góp chỉ 770k/tháng</span>
                    </div>
                </div>
            </section>

            {/* Console Banners */}
            <section className="console-banners">
                <div className="banner-grid">
                    {consoles.map((console) => (
                        <div 
                            key={console.id} 
                            className="banner-item"
                            data-console={console.id}
                            style={{ backgroundColor: console.backgroundColor }}
                        >
                            <div className="placeholder-content">
                                <span className="console-logo">{console.logo}</span>
                                <span className="console-title">{console.title}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            

            {/* Product List Section */}
            <section className="product-list-section">
                <h2>San Pham</h2>
                <div className="product-list">
                    {Array(6).fill().map((_, index) => (
                        <div className="product-item" key={index}>
                            <div className="product-image-placeholder"></div>
                            <h3>San Pham</h3>
                            <p>Mo ta san pham ..................</p>
                        </div>
                    ))}
                </div>
            </section>

        </div>
    );
};

export default Main;