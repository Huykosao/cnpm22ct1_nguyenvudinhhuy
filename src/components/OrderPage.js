import React, { useState, useContext } from "react";
import { UserContext } from "./UserContext";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import Header from "./Header";
import Footer from "./Footer";
import "../styles/OrderPage.css"

const OrderPage = () => {
  const { user } = useContext(UserContext);
  const [shippingAddress, setShippingAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("Cash On Delivery");
  const [error, setError] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();
  const { cartItems = [], totalPrice = 0 } = location.state || {};

  // Đặt hàng
  const handlePlaceOrder = () => {
    if (!shippingAddress) {
      setError("Vui lòng nhập địa chỉ giao hàng!");
      return;
    }

    const orderData = {
      userId: user.user_id,
      cartItems,
      shippingAddress,
      paymentMethod,
      totalPrice,
    };

    axios
      .post("http://localhost:8080/api/order", orderData)
      .then((response) => {
        axios
          .delete(`http://localhost:8080/api/cart/${user.user_id}`)
          .then(() => {
            alert('Đặt hàng thành công và giỏ hàng đã được làm sạch!');
            navigate("/cart");
          })
          .catch((error) => {
            console.error('Lỗi khi làm sạch giỏ hàng sau khi đặt hàng:', error);
            setError("Có lỗi khi làm sạch giỏ hàng. Vui lòng thử lại.");
          });
      })
      .catch((error) => {
        setError("Có lỗi khi đặt hàng. Vui lòng thử lại!");
        console.error(error);
      });
  };


  return (
    <div>
      <Header />
      <div className="order-container">
        <h2>Đặt hàng</h2>

        {/* Hiển thị giỏ hàng */}
        <h3>Sản phẩm trong giỏ</h3>
        <ul>
          {cartItems.map((item, index) => (
            <div key={index} className="order-item">
              {item.Name} x {item.quantity} - Giá:{" "}
              {(item.gia * item.quantity).toLocaleString()} VND
            </div>
          ))}
        </ul>

        {/* Form đặt hàng */}
        <div>
          <h3>Địa chỉ giao hàng</h3>
          <textarea
            value={shippingAddress}
            onChange={(e) => setShippingAddress(e.target.value)}
            placeholder="Nhập địa chỉ giao hàng"
          />

          <h3>Phương thức thanh toán</h3>
          <select
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
          >
            <option value="Cash On Delivery">Thanh toán khi nhận hàng</option>
          </select>
          <h3>Tổng tiền: {totalPrice.toLocaleString()} VND</h3>
          {error && <p style={{ color: "red" }}>{error}</p>}

          <button onClick={handlePlaceOrder}>Đặt hàng</button>
        </div>

      </div>
      <Footer />
    </div>
  );
};

export default OrderPage;
