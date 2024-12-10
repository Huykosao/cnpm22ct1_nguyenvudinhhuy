import React, { useState, useEffect,useContext } from 'react';
import { useParams } from 'react-router-dom'; // Dùng để lấy ID sản phẩm từ URL
import axios from 'axios';
import Header from './Header';
import Footer from './Footer';
import { UserContext } from './UserContext'; 
import "../styles/ProductDetail.css"; // Thêm CSS nếu cần

const ProductDetail = () => {
    const { id } = useParams(); // Lấy ID sản phẩm từ URL
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const { user } = useContext(UserContext); 

    useEffect(() => {
        axios
            .get(`http://localhost:8080/api/products/${id}`)
            .then((response) => {
                setProduct(response.data);
                setLoading(false);
            })
            .catch((error) => {
                console.error('Lỗi khi tải sản phẩm:', error);
                setLoading(false);
            });
    }, [id]);

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

    if (loading) {
        return <p>Đang tải...</p>;
    }

    if (!product) {
        return <p>Không tìm thấy sản phẩm!</p>;
    }

    return (
        <div>
            <Header />
                <div className='container-detail'>
                    <div className="product-detail-image">
                        <img 
                            src={`${process.env.PUBLIC_URL}/image/${product.image}`} 
                            alt={product.Name} 
                        />
                    </div>
                    <div className="product-detail-info">
                        <h1>{product.Name}</h1>
                        <p className="product-price">{product.gia.toLocaleString()} VND</p>
                        <p className="product-description">{product.mota}</p>
                        <p className="product-stock">Còn lại: {product.soluong}</p>
                        <button className="add-to-cart-button" onClick={() => handleAddProduct(product.product_id)}>Thêm vào giỏ hàng</button>
                    </div>
                </div>
            <Footer />
        </div>
    );
};

export default ProductDetail;
