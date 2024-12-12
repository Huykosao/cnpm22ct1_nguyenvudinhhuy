import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import "../styles/Main.css";
import axios from 'axios';
import { useUser } from './UserContext';  // Import UserContext để lấy thông tin người dùng

const Main = () => {
    const [products, setProducts] = useState([]);
    const { user } = useUser();  // Lấy thông tin người dùng từ UserContext
    const navigate = useNavigate();

    const consoles = [
        { id: 'ps5', title: 'PlayStation 5', backgroundImage: 'https://i.pinimg.com/736x/cc/ee/97/ccee975f4cee32f399c4fcbf2b1714d0.jpg', logo: '🎮' },
        { id: 'switch', title: 'Nintendo Switch',backgroundImage: 'https://bizweb.dktcdn.net/thumb/1024x1024/100/083/470/products/346617469-1283952755542657-9097654698039225549-n.jpg?v=1720891057167', logo: '🎮' },
        { id: 'xbox', title: 'Xbox Game Pass', backgroundImage: 'https://i.pinimg.com/236x/cd/f1/23/cdf123b800d441300810ea308749be5f.jpg', logo: '🎮' },
        { id: 'steam', title: 'Steam Deck', backgroundImage: 'https://i.pinimg.com/736x/8b/99/75/8b99754f91cbcb646dd04cf69f55b734.jpg', logo: '🎮' },
        { id: 'rog', title: 'ROG Ally', backgroundImage: 'https://i.pinimg.com/736x/b8/0b/c3/b80bc3f47dcca05935fa8a5b412a20d0.jpg', logo: '🎮' },
        { id: 'samsung', title: 'Samsung Gaming', backgroundImage: 'https://i.pinimg.com/736x/65/17/f7/6517f765e8f289d9f74507b7a3494b69.jpg', logo: '🎮' }
    ];


    useEffect(() => {
        axios.get('http://localhost:8080/api/products')
            .then(response => {
                setProducts(response.data);
            })
            .catch(error => {
                console.error('Lỗi khi tải sản phẩm:', error);
            });
    }, []);

    // Thêm sản phẩm vào giỏ hàng
    const handleAddProduct = (productId) => {
        if (!user || !user.user_id) {
            alert('Bạn cần đăng nhập để thêm sản phẩm vào giỏ hàng!');
            return;
        }

        const requestData = {
            userId: user.user_id,
            productId: productId
        };

        axios.post('http://localhost:8080/api/cart/add', requestData)
            .then(response => {
                console.log(response.data.message);
                alert('Sản phẩm đã được thêm vào giỏ hàng!');
            })
            .catch(error => {
                console.error(error.response ? error.response.data.message : error.message);
                alert('Không thể thêm sản phẩm vào giỏ hàng. Vui lòng thử lại!');
            });
    };

    const goToDetail = (id) => {
        navigate(`/product/${id}`);
    };

    return (
        <div className="div-content">
            <section className="featured-section">
                <div className="featured-banner">
                    <div className="placeholder-text">
                        <span className="logo-text">PS5</span>
                        <span className="price-text">Trả góp chỉ 770k/tháng</span>
                    </div>
                </div>
            </section>
            
            <section className="console-banners">
                <div className="banner-grid">
                    {consoles.map((console) => (
                        <div
                            key={console.id}
                            className="banner-item"
                            data-console={console.id}
                            style={{
                                backgroundImage: console.backgroundImage
                                    ? `url(${console.backgroundImage})`
                                    : undefined,
                                backgroundColor: console.backgroundColor || 'transparent',
                            }}
                        >
                            <div className="placeholder-content">
                                <span className="console-logo">{console.logo}</span>
                                <span className="console-title">{console.title}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </section>


            <section className="product-list-section">
                <h2>Sản Phẩm</h2>
                <div className="product-list">
                    {products.map(product => (
                        <div className="product-item" key={product.product_id}>
                            <img
                                src={`${process.env.PUBLIC_URL}/image/${product.image}`}
                                alt={product.Name}
                                className="product-image"
                                onClick={() => goToDetail(product.product_id)}
                            />
                            <h3>{product.Name}</h3>
                            <p className='product-description'>{product.mota}</p>
                            <p className='product-price'>{product.gia.toLocaleString()} VND</p>
                            <button
                                className='order-product'
                                onClick={() => handleAddProduct(product.product_id)}
                            >
                                Thêm Vào Giỏ
                            </button>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default Main;
