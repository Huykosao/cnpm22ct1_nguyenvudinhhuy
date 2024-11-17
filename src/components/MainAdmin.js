import React, { useState , useEffect } from 'react';
import "../styles/MainAdmin.css";
import axios from 'axios';

const MainAdmin = () => {
    const [selectedSection, setSelectedSection] = useState('dashboard');

    // Mock data for demonstration
    const stats = {
        totalProducts: 156,
        totalOrders: 43,
        pendingOrders: 12,
        totalRevenue: "235,000,000đ"
    };

    const recentOrders = [
        { id: "ORD001", customer: "Nguyễn Văn A", total: "2,300,000đ", status: "Pending" },
        { id: "ORD002", customer: "Trần Thị B", total: "5,600,000đ", status: "Completed" },
        { id: "ORD003", customer: "Lê Văn C", total: "1,800,000đ", status: "Processing" }
    ];

    const products = [
        { id: "PS5001", name: "PlayStation 5 Digital", stock: 15, price: "11,990,000đ" },
        { id: "NSW001", name: "Nintendo Switch OLED", stock: 23, price: "8,800,000đ" },
        { id: "XBX001", name: "Xbox Series X", stock: 8, price: "12,990,000đ" }
    ];

    return (
        <div className="admin-dashboard">
            {/* Sidebar Navigation */}
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
                </div>
            </div>

            {/* Main Content Area */}
            <div className="admin-main-content">
                {selectedSection === 'dashboard' && (
                    <>
                        {/* Statistics Cards */}
                        <div className="stats-grid">
                            <div className="stat-card">
                                <h3>Tổng Sản phẩm</h3>
                                <p>{stats.totalProducts}</p>
                            </div>
                            <div className="stat-card">
                                <h3>Tổng Đơn hàng</h3>
                                <p>{stats.totalOrders}</p>
                            </div>
                            <div className="stat-card">
                                <h3>Đơn hàng Chờ xử lý</h3>
                                <p>{stats.pendingOrders}</p>
                            </div>
                            <div className="stat-card">
                                <h3>Doanh thu</h3>
                                <p>{stats.totalRevenue}</p>
                            </div>
                        </div>

                        {/* Recent Orders Table */}
                        <div className="section-container">
                            <h2>Đơn hàng Gần đây</h2>
                            <table className="admin-table">
                                <thead>
                                    <tr>
                                        <th>Mã đơn hàng</th>
                                        <th>Khách hàng</th>
                                        <th>Tổng tiền</th>
                                        <th>Trạng thái</th>
                                        <th>Hành động</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {recentOrders.map(order => (
                                        <tr key={order.id}>
                                            <td>{order.id}</td>
                                            <td>{order.customer}</td>
                                            <td>{order.total}</td>
                                            <td>{order.status}</td>
                                            <td>
                                                <button className="action-btn">Chi tiết</button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {/* Products Table */}
                        <div className="section-container">
                            <h2>Sản phẩm Tồn kho</h2>
                            <table className="admin-table">
                                <thead>
                                    <tr>
                                        <th>Mã SP</th>
                                        <th>Tên sản phẩm</th>
                                        <th>Tồn kho</th>
                                        <th>Giá bán</th>
                                        <th>Hành động</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {products.map(product => (
                                        <tr key={product.id}>
                                            <td>{product.id}</td>
                                            <td>{product.name}</td>
                                            <td>{product.stock}</td>
                                            <td>{product.price}</td>
                                            <td>
                                                <button className="action-btn edit">Sửa</button>
                                                <button className="action-btn delete">Xóa</button>
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
                        <h2>Quản lý Sản phẩm</h2>
                        <button className="add-btn">Thêm Sản phẩm Mới</button>
                        {/* Add your product management content here */}
                    </div>
                )}

                {selectedSection === 'customers' && (
                    <div className="section-container">
                        <h2>Quản lý Khách hàng</h2>
                        
                        {/* Add your customer management content here */}

                    </div>
                )}
            </div>
        </div>
    );
};

export default MainAdmin;