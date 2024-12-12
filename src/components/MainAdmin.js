import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "../styles/MainAdmin.css";

import CRUDProduct from './CRUDProducts';

const MainAdmin = () => {
    const [selectedSection, setSelectedSection] = useState('dashboard')
    const [CRUDShow, SetCRUDShow] = useState(false)
    const [addBack, SetaddBack] = useState('Thêm Sản phẩm Mới')
    const [title, SetTitle] = useState('Quản lý Sản phẩm')
    const [total, setTotal] = useState(0);
    const [products, setProducts] = useState([]);
    const [orders, setOrders] = useState([]);
    const [users, setUsers] = useState([])

    useEffect(() => {
        axios.get('http://localhost:8080/api/products')
            .then(response => {
                setProducts(response.data);
            })
            .catch(error => {
                console.error('Lỗi khi tải sản phẩm:', error);
            });
        axios.get('http://localhost:8080/api/products')
            .then((response) => {
                setProducts(response.data);
                const totalQuantity = response.data.reduce((sum, product) => sum + product.soluong, 0);
                setTotal(totalQuantity);
            })
            .catch((error) => console.error('Lỗi khi lấy sản phẩm:', error));
        axios.get('http://localhost:8080/api/users')
            .then(response => {
                setUsers(response.data);
            })
            .catch(error => {
                console.error('lỗi khi lấy dữa liệu khách hàng:', error);
            });
        axios.get('http://localhost:8080/api/orders')
            .then(response => {
                setOrders(response.data);
            })
            .catch(error => {
                console.error('Lỗi khi tải đơn hàng:', error);
            });
    }, []);


    const handleDelete = (id) => {
        axios.delete(`http://localhost:8080/api/products/${id}`)
            .then(() => {

                setProducts(products.filter(product => product.product_id !== id));
            })
            .catch(error => {
                console.error('Lỗi khi xóa sản phẩm:', error);
            });
    };
    const handleDeleteOrder = (orderId) => {
        axios.delete(`http://localhost:8080/api/orders/${orderId}`)
            .then(() => {

                setOrders(orders.filter(order => order.order_id !== orderId))
            })
            .catch(error => {
                console.error('Lỗi khi xóa sản phẩm:', error);
            });
    }
    function handleAdd() {
        if (CRUDShow) {
            SetCRUDShow(false);
            SetaddBack('Thêm Sản phẩm Mới');
            SetTitle('Quản lý Sản phẩm')
        } else {
            SetCRUDShow(true);
            SetaddBack('Quay lại');
            SetTitle('Thêm Sản phẩm Mới')
        }
    }

    const handleAccept = async (orderId) => {
        try {
            await axios.put(`http://localhost:8080/api/order/confirm/${orderId}`);

            const updatedOrders = orders.map(order => {
                if (order.order_id === orderId) {
                    return {
                        ...order,
                        order_status: order.order_status === 0 ? 1 : 1,
                    };
                }
                return order;
            });

            setOrders(updatedOrders);  // Cập nhật lại trạng thái của orders trong ứng dụng
        } catch (error) {
            console.error('Lỗi khi cập nhật trạng thái:', error);
        }
    };


    return (
        <div className="admin-dashboard">
            <div className="admin-sidebar">
                <div className="admin-nav">
                    <button
                        className={`nav-item ${selectedSection === 'dashboard' ? 'active' : ''}`}
                        onClick={() => setSelectedSection('dashboard')}
                    >
                        Dashboard
                    </button>
                    <button
                        className={`nav-item ${selectedSection === 'products' ? 'active' : ''}`}
                        onClick={() => setSelectedSection('products')}
                    >
                        Quản lý Sản phẩm
                    </button>

                    <button
                        className={`nav-item ${selectedSection === 'customers' ? 'active' : ''}`}
                        onClick={() => setSelectedSection('customers')}
                    >
                        Quản lý Khách hàng
                    </button>
                    <button
                        className={`nav-item ${selectedSection === 'orders' ? 'active' : ''}`}
                        onClick={() => setSelectedSection('orders')}
                    >
                        Quản lý Đơn hàng
                    </button>

                </div>
            </div>

            <div className="admin-main-content">
                {selectedSection === 'dashboard' && (
                    <>
                        {/* Tổng sản phẩm*/}
                        <div className="stats-grid">
                            <div className="stat-card">
                                <h3>Tổng Số Sản phẩm</h3>
                                <p>{total}</p>
                            </div>
                        </div>



                        {/* Bảng Sản Phẩm*/}
                        <div className="section-container">
                            <h2>Sản phẩm Tồn kho</h2>
                            <table className="admin-table">
                                <thead>
                                    <tr>
                                        <th>Tên sản phẩm</th>
                                        <th>Số Lượng</th>
                                        <th>Giá bán</th>
                                        <th>Hành động</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {products.map(product => (
                                        <tr key={product.product_id}>
                                            <td>{product.Name}</td>
                                            <td>{product.soluong}</td>
                                            <td>{product.gia} VND</td>
                                            <td>
                                                <button className="action-btn edit">Sửa</button>
                                                <button className="action-btn delete" onClick={() => handleDelete(product.product_id)}>Xóa</button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </>
                )}

                {selectedSection === 'products' && (
                    <div className="section-container">
                        {
                            CRUDShow ? (
                                <CRUDProduct />
                            ) : (
                                <div>
                                    <h2>{title}</h2>
                                    <table className="admin-table">
                                        <thead>
                                            <tr>
                                                <th>Tên sản phẩm</th>
                                                <th>Số Lượng</th>
                                                <th>Giá bán</th>
                                                <th>Hành động</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {products.map(product => (
                                                <tr key={product.product_id}>
                                                    <td>{product.Name}</td>
                                                    <td>{product.soluong}</td>
                                                    <td>{product.gia} VND</td>
                                                    <td>
                                                        <button className="action-btn edit">Sửa</button>
                                                        <button className="action-btn delete" onClick={() => handleDelete(product.product_id)}>Xóa</button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            )
                        }
                        <button className="add-btn" onClick={handleAdd}>{addBack}</button>
                    </div>
                )}

                {selectedSection === 'orders' && (
                    <div className="section-container">
                        <h2>Quản lý Đơn hàng</h2>
                        <table className="admin-table">
                            <thead>
                                <tr>
                                    <th>ID Đơn hàng</th>
                                    <th>ID Khách Hàng</th>
                                    <th>Ngày Đặt</th>
                                    <th>Giờ</th>
                                    <th>Ngày</th>
                                    <th>Giờ update</th>
                                    <th>Tổng tiền</th>
                                    <th>Trạng thái</th>
                                    <th>Hành động</th>
                                </tr>
                            </thead>
                            <tbody>
                                {orders.map(order => (
                                    <tr key={order.order_id}>
                                        <td>{order.order_id}</td>
                                        <td>{order.user_id}</td>
                                        <td>{new Date(order.created_at).toLocaleDateString()}</td>
                                        <td>{new Date(order.created_at).toLocaleTimeString()}</td>
                                        <td>{new Date(order.update_at).toLocaleDateString()}</td>
                                        <td>{new Date(order.update_at).toLocaleTimeString()}</td>
                                        <td>{order.total_price} VND</td>
                                        <td>{order.order_status === 1 ? 'Đã Xác Nhận' : 'Chưa Xác Nhận'}</td>
                                        <td>
                                            <button
                                                className="action-btn edit"
                                                onClick={() => handleAccept(order.order_id)}
                                            >
                                                Xác Nhận</button>
                                            <button
                                                className="action-btn delete"
                                                onClick={() => handleDeleteOrder(order.order_id)}
                                            >Xóa</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}

                {selectedSection === 'customers' && (
                    <div className="section-container">
                        <h2>Quản lý Khách hàng</h2>
                        <table className="admin-table">
                            <thead>
                                <tr>
                                    <th>ID user</th>
                                    <th>Tên</th>
                                    <th>Email</th>
                                    <th>Số Điện Thoại</th>
                                    <th>Hành động</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.map(user => (
                                    <tr key={user.user_id}>
                                        <td>{user.user_id}</td>
                                        <td>{user.username}</td>
                                        <td>{user.email}</td>
                                        <td>{user.sdt}</td>
                                        <td>
                                            <button className="action-btn edit">Sửa</button>
                                            <button className="action-btn delete" >Xóa</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
};

export default MainAdmin;