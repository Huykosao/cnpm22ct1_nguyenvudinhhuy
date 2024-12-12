import React, { useState, useEffect, useContext } from 'react';
import { UserContext } from './UserContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Header from './Header';
import Footer from './Footer';
import "../styles/Cart.css";
import Notification from './Notification';

const Cart = () => {
    const { user } = useContext(UserContext);
    const [cart, setCart] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [orders, setOrders] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        if (user) {
            setLoading(true);
            axios.get(`http://localhost:8080/api/cart/${user.user_id}`)
                .then(response => {
                    const { products, totalPrice } = response.data;
                    setCart(products);
                    setTotalPrice(totalPrice);
                    setLoading(false);
                })
                .catch(error => {
                    setError("Có lỗi khi tải giỏ hàng. Vui lòng thử lại.");
                    setLoading(false);
                    console.error("Error fetching cart data!", error);
                });
            axios.get(`http://localhost:8080/api/orders/${user.user_id}`)
                .then(response => {
                    setOrders(response.data);
                })
                .catch(error => {
                    setError("Có lỗi khi tải thông tin đơn hàng. Vui lòng thử lại.");
                    console.error("Error fetching orders data!", error);
                });
        }
    }, [user]);

    const removeFromCart = (product_id) => {
        axios.delete(`http://localhost:8080/api/cart/products/${product_id}`)
            .then(() => {
                const updatedCart = cart.filter(item => item.product_id !== product_id);
                setCart(updatedCart);
            })
            .catch(error => {
                console.error('Lỗi khi xóa sản phẩm:', error);
            });
    };


    const handleOrder = () => {
        navigate('/OrderPage', { state: { cartItems: cart, totalPrice } });
    };

    if (!user) {
        return <p>Vui lòng đăng nhập để xem giỏ hàng.</p>;
    }

    if (loading) {
        return <p>Đang tải giỏ hàng...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <div>
            <Header />
            <Notification />
            <div className="cart-container">
                <h2>Giỏ hàng</h2>
                {cart.length === 0 ? (
                    <p>Giỏ hàng của bạn hiện đang trống!</p>
                ) : (
                    <div>
                        <ul>
                            {cart.map((item, index) => (
                                <li key={index} className="cart-item">
                                    <img
                                        src={`${process.env.PUBLIC_URL}/image/${item.image}`}
                                        alt={item.Name}
                                        className="cart-item-image"
                                    />
                                    <div className="cart-item-info">
                                        <p>{item.Name}</p>
                                        <p>Giá: {item.gia.toLocaleString()} VND</p>
                                        <p>Số lượng: {item.quantity}</p>
                                    </div>
                                    <div className="cart-item-total">
                                        <button
                                            className="remove-button"
                                            onClick={() => removeFromCart(item.product_id)}>
                                            Xóa
                                        </button>
                                    </div>
                                </li>
                            ))}
                        </ul>

                        <div className="cart-total">
                            <p>Tổng cộng: {totalPrice.toLocaleString()} VND</p>
                            <button className='order' onClick={handleOrder}>Đặt Hàng</button>
                        </div>
                    </div>
                )}
                <div className="order-status-container">
                    <h2>Tình trạng đơn hàng</h2>
                    {orders.length === 0 ? (
                        <p>Hiện tại bạn chưa có đơn hàng nào.</p>
                    ) : (
                        <ul className="order-list">
                            {orders.map((order, id) => (
                                <li key={order.order_id} className={`order-item ${order.order_status ? 'confirmed' : 'pending'}`}>
                                    <div className="order-header">
                                        <span className="order-number">Đơn hàng: #{String(id + 1).padStart(2, '0')}</span>
                                        <span className={`order-status ${order.order_status ? 'confirmed' : 'pending'}`}>
                                            {order.order_status ? 'Đã Xác Nhận' : 'Chưa Được Xác Nhận'}
                                        </span>
                                    </div>
                                    <div className="order-dates">
                                        <span>Ngày tạo: {new Date(order.created_at).toLocaleString()}</span>
                                        <span>Cập nhật: {new Date(order.update_at).toLocaleString()}</span>
                                    </div>
                                </li>
                            ))}
                        </ul>

                    )}
                </div>
            </div>



            <Footer />
        </div>
    );
};

export default Cart;
