const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');  // Thêm để cho phép CORS từ React frontend
const { SquareEqual } = require('lucide-react');
const { Sequelize } = require('sequelize');

const app = express();
const port = 8080;  // Bạn có thể thay đổi cổng

// Cấu hình CORS để frontend React có thể gửi yêu cầu
app.use(cors());
app.use(express.json());  // Để đọc JSON từ frontend

// Kết nối MySQL 
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',  
  password: '', 
  database: 'webbangame' 
});

// Kiểm tra kết nối
connection.connect((err) => {
  if (err) {
    console.error('Lỗi kết nối CSDL: ' + err.stack);
    return;
  }
  console.log('Đã kết nối đến CSDL MySQL');
});

app.get('/api/users', (req, res) => {
  connection.query('SELECT * FROM user', (err, results) => {
    if (err) {
      res.status(500).json({ message: 'Lỗi truy vấn CSDL' });
    } else {
      res.json(results); 
    }
  });
});

app.get('/api/users/:id', (req, res) => {
  const id = req.params.id;
  const sql = 'SELECT * FROM user WHERE user_id = ?';

  connection.query(sql, [id], (err, results) => {
      if (err) {
          console.error(err);
          return res.status(500).json({ message: 'Lỗi !' });
      }

      if (results.length === 0) {
          return res.status(404).json({ message: 'Không tìm thấy!' });
      }

      res.json(results[0]);
  });
});

app.get('/api/products',(req, res) => {
  connection.query('SELECT * FROM sanpham', (err, results) => {
    if (err) {
      res.status(500).json({ message: 'Lỗi truy vấn CSDL' });
    } else {
      res.json(results);  // Trả về kết quả
    }
  });
})
app.get('/api/products/total', (req, res) => {
  const sql = 'SELECT SUM(soluong) as total FROM sanpham';

  connection.query(sql, (err, results) => {
    if (err) {
      console.error('Lỗi khi tính tổng sản phẩm:', err);
      res.status(500).json({ message: 'Không thể tính tổng sản phẩm' });
    } else {
      res.json({ total: results[0].total });
    }
  });
});

app.get('/api/products/:id', (req, res) => {
    const productId = req.params.id;
    const sql = 'SELECT * FROM sanpham WHERE product_id = ?';

    connection.query(sql, [productId], (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: 'Lỗi khi lấy sản phẩm!' });
        }

        if (results.length === 0) {
            return res.status(404).json({ message: 'Không tìm thấy sản phẩm!' });
        }

        res.json(results[0]);
    });
});



app.post('/api/products', (req, res) => {
  const { Name, image, soluong, mota, gia } = req.body;



  const sql = `
      INSERT INTO sanpham (Name, gia, soluong, mota, image)
      VALUES (?, ?, ?, ?, ?)
  `;

  connection.query(sql, [Name, gia, soluong, mota, image], (err, results) => {
      if (err) {
          console.error(err);
          return res.status(500).json({ message: 'Lỗi khi thêm sản phẩm!' });
      }
      res.status(201).json({ message: 'Thêm sản phẩm thành công!', ProductID: results.insertId });
  });
});

app.delete('/api/products/:id', (req, res) => {
  const { id } = req.params;

  const sql = 'DELETE FROM sanpham WHERE product_id = ?';
  connection.query(sql, [id], (err, results) => {
    if (err) {
      console.error("Lỗi khi xóa sản phẩm:", err);
      res.status(500).json({ message: "Không thể xóa sản phẩm" });
    } else if (results.affectedRows === 0) {
      res.status(404).json({ message: "Sản phẩm không tồn tại" });
    } else {
      res.status(200).json({ message: "Xóa sản phẩm thành công!" });
    }
  });
});

app.post('/api/login', (req, res) => {
  const { usernameOrEmail, matkhau } = req.body;

  // Truy vấn CSDL với điều kiện email hoặc username
  const query = `
    SELECT * FROM user 
    WHERE (email = ? OR username = ?) AND matkhau = ?
  `;
  connection.query(query, [usernameOrEmail, usernameOrEmail, matkhau], (err, results) => {
    if (err) {
      console.error('Lỗi truy vấn:', err);
      res.status(500).json({ message: 'Lỗi truy vấn CSDL' });
    } else if (results.length === 0) {
      res.status(401).json({ message: 'Tên Đăng Nhập Hoặc Mật khẩu Không Đúng' });
    } else {
      // Trả về thông tin người dùng (có thể bao gồm token)
      res.json({ message: 'Đăng nhập thành công', user: results[0] });
    }
  });
});

app.post('/api/register', (req, res) => {
  const { email, username, matkhau, sdt } = req.body;

  connection.query(
    'SELECT * FROM user WHERE email = ? OR username = ?',
    [email, username],
    (err, results) => {
      if (err) {
        return res.status(500).json({ message: 'Lỗi truy vấn CSDL' });
      }

      if (results.length > 0) {
        return res.status(400).json({ message: 'Đã Tồn Tại email hoặc Tên tài Khoản' });
      }

      const insertQuery = 'INSERT INTO user (email, username, matkhau, sdt) VALUES (?, ?, ?, ?)';
      connection.query(insertQuery, [email, username, matkhau, sdt], (err, result) => {
        if (err) {
          return res.status(500).json({ message: '111111' ,
            error: err,
          });
        }

        res.status(201).json({ message: 'Đăng ký thành công' });
      });
    }
  );
});

app.post('/api/cart/add', (req, res) => {
  const { userId, productId } = req.body;

  // Bước 1: Kiểm tra xem user có giỏ hàng chưa
  const findCartQuery = `SELECT cart_id FROM giohang WHERE user_id = ?`;
  connection.query(findCartQuery, [userId], (err, results) => {
      if (err) {
          console.error(err);
          return res.status(500).json({ message: 'Lỗi khi kiểm tra giỏ hàng' });
      }
      let cartId;
      if (results.length > 0) {
          // User đã có giỏ hàng
          cartId = results[0].cart_id;
          console.log('Cart found for user:', cartId);  
          addToCart(cartId, productId, res);
      } else {
          // Tạo giỏ hàng mới
          const createCartQuery = `INSERT INTO giohang (user_id, created_at) VALUES (?, NOW())`;
          connection.query(createCartQuery, [userId], (err, results) => {
              if (err) {
                  console.error(err);
                  return res.status(500).json({ message: 'Lỗi khi tạo giỏ hàng' });
              }
              cartId = results.insertId;
              console.log('Created new cart with ID:', cartId); 
              addToCart(cartId, productId, res);
          });
      }
  });
});


app.get('/api/cart/:userId', (req, res) => {
  const userId = req.params.userId;
  console.log("Received userId:", userId);  

  const sql = `
    SELECT sp.Name, sp.gia, sp.image, gh.created_at, gha.product_id, COUNT(gha.product_id) AS quantity
    FROM giohang gh
    JOIN giohangadd gha ON gh.cart_id = gha.cart_id
    JOIN sanpham sp ON gha.product_id = sp.product_id
    WHERE gh.user_id = ?
    GROUP BY gha.product_id, sp.Name, sp.gia, sp.image
  `;

  connection.query(sql, [userId], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: 'Lỗi khi lấy sản phẩm trong giỏ hàng' });
    }

    console.log("Cart query results:", results);  

    let totalPrice = 0;
    results.forEach(item => {
      if (item.gia && !isNaN(item.gia)) {
        totalPrice += item.gia * item.quantity;  
      }
    });

    res.json({ products: results, totalPrice });
  });
});


app.delete('/api/cart/products/:id', (req, res) => {
  const { id } = req.params;
  const sql = 'DELETE FROM giohangadd WHERE product_id = ? ';
  connection.query(sql, [id], (err, results) => {
    if (err) {
      console.error("Lỗi khi xóa sản phẩm:", err);
      res.status(500).json({ message: "Không thể xóa sản phẩm" });
    } else if (results.affectedRows === 0) {
      res.status(404).json({ message: "Sản phẩm không tồn tại" });
    } else {
      res.status(200).json({ message: "Xóa sản phẩm thành công!" });
    }
  });
});

app.delete('/api/cart/:userId', (req, res) => {
  const { userId } = req.params;

  // Bước 1: Xóa tất cả các sản phẩm trong giỏ hàng (giohangadd)
  const deleteCartItemsQuery = 'DELETE FROM giohangadd WHERE cart_id IN (SELECT cart_id FROM giohang WHERE user_id = ?)';
  connection.query(deleteCartItemsQuery, [userId], (err, results) => {
    if (err) {
      console.error('Lỗi khi xóa sản phẩm trong giỏ hàng:', err);
      return res.status(500).send('Lỗi khi xóa sản phẩm trong giỏ hàng');
    }
    
    // Bước 2: Xóa giỏ hàng của người dùng (giohang)
    const deleteCartQuery = 'DELETE FROM giohang WHERE user_id = ?';
    connection.query(deleteCartQuery, [userId], (err, results) => {
      if (err) {
        console.error('Lỗi khi xóa giỏ hàng:', err);
        return res.status(500).send('Lỗi khi xóa giỏ hàng');
      }

      if (results.affectedRows > 0) {
        return res.status(200).json({ message: `Giỏ hàng của người dùng ${userId} đã được làm sạch.` });
      } else {
        return res.status(404).json({ message: 'Không tìm thấy giỏ hàng cho người dùng này.' });
      }
    });
  });
});

// Hàm thêm sản phẩm vào giỏ hàng
function addToCart(cartId, productId, res) {
  const addProductQuery = `INSERT INTO giohangadd (cart_id, product_id) VALUES (?, ?)`;
  connection.query(addProductQuery, [cartId, productId], (err, results) => {
      if (err) {
          console.error(err);
          return res.status(500).json({ message: 'Lỗi khi thêm sản phẩm vào giỏ hàng' });
      }
      res.status(201).json({ message: 'Sản phẩm đã được thêm vào giỏ hàng!' });
  });
}


app.get('/api/orders/:userId', (req, res) => {
  const { userId } = req.params;  

  const query = 'SELECT * FROM orders WHERE user_id = ?';  
  
  connection.query(query, [userId], (err, results) => {
    if (err) {
      console.error('Lỗi khi lấy đơn hàng:', err);
      return res.status(500).send('Lỗi khi lấy đơn hàng');
    }
    if (results.length === 0) {
      return res.status(404).json({ message: 'Không có đơn hàng nào của người dùng này.' });
    }
    res.status(200).json(results);
  });
});

app.post('/api/order', (req, res) => {
  const { userId, cartItems, shippingAddress, paymentMethod } = req.body;

  // Tính tổng giá trị đơn hàng
  let totalPrice = 0;
  cartItems.forEach(item => {
    totalPrice += item.gia * item.quantity;
  });

  // Thêm đơn hàng vào bảng orders
  const orderSql = `
    INSERT INTO orders (user_id, total_price, shipping_address, payment_method)
    VALUES (?, ?, ?, ?)
  `;
  
  connection.query(orderSql, [userId, totalPrice, shippingAddress, paymentMethod], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: 'Lỗi khi tạo đơn hàng.' });
    }

    const orderId = result.insertId;

    // Thêm các sản phẩm vào bảng order_items
    const orderItemsSql = `
      INSERT INTO order_items (order_id, product_id, quantity, price)
      VALUES ?
    `;

    const orderItemsValues = cartItems.map(item => [
      orderId,
      item.product_id,
      item.quantity,
      item.gia
    ]);

    connection.query(orderItemsSql, [orderItemsValues], (err) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ message: 'Lỗi khi thêm sản phẩm vào đơn hàng.' });
      }

      // Xóa sản phẩm khỏi giỏ hàng sau khi đặt hàng thành công
      const deleteCartSql = `DELETE FROM giohangadd WHERE cart_id = ?`;
      connection.query(deleteCartSql, [userId], (err) => {
        if (err) {
          console.error(err);
          return res.status(500).json({ message: 'Lỗi khi xóa sản phẩm khỏi giỏ hàng.' });
        }
        res.status(200).json({ message: 'Đặt hàng thành công!' });
      });
    });
  });
});

app.put('/api/order/confirm/:id', (req, res) => {
  const { id } = req.params;

  // Truy vấn vừa cập nhật vừa lấy user_id
  const query = `
    UPDATE orders 
    SET order_status = 1, update_at = NOW() 
    WHERE order_id = ?;
  `;
  connection.query(query, [id], (err, results) => {
    if (err) {
      console.error('Lỗi khi xác nhận đơn hàng:', err);
      return res.status(500).json({ error: 'Lỗi khi xác nhận đơn hàng' });
    }

    if (results.affectedRows > 0) {
      const getUserQuery = 'SELECT user_id FROM orders WHERE order_id = ?';
      connection.query(getUserQuery, [id], (err, userResult) => {
        if (err) {
          console.error('Lỗi khi lấy thông tin người dùng:', err);
          return res.status(500).json({ error: 'Lỗi khi lấy thông tin người dùng' });
        }

        if (userResult.length > 0) {
          const userId = userResult[0].user_id;

          // Gửi thông báo
          if (typeof sendNotificationToUser === 'function') {
            sendNotificationToUser(`${userId}`, `Đơn hàng của bạn đã được xác nhận.`);
          } else {
            console.warn('sendNotificationToUser chưa được định nghĩa!');
          }

          return res.status(200).json({ message: 'Đơn hàng đã được xác nhận' });
        } else {
          return res.status(404).json({ error: 'Không tìm thấy thông tin người dùng cho đơn hàng này' });
        }
      });
    } else {
      return res.status(404).json({ error: 'Không tìm thấy đơn hàng' });
    }
  });
});



app.get('/api/orders', (req, res) => {
  const query = 'SELECT * FROM orders'; // Thay "orders" bằng tên bảng của bạn
  connection.query(query, (err, results) => {
    if (err) {
      console.error('Lỗi khi lấy đơn hàng:', err);
      return res.status(500).send('Lỗi khi lấy dữ liệu');
    }
    res.json(results);
  });
});

// API để thêm đơn hàng mới
app.post('/api/orders', (req, res) => {
  const { customerName, orderDate, totalPrice, status } = req.body;

  const query = 'INSERT INTO orders (customerName, orderDate, totalPrice, status) VALUES (?, ?, ?, ?)';
  connection.query(query, [customerName, orderDate, totalPrice, status], (err, results) => {
    if (err) {
      console.error('Lỗi khi thêm đơn hàng:', err);
      return res.status(500).send('Lỗi khi thêm đơn hàng');
    }
    res.status(201).json({
      orderId: results.insertId,
      customerName,
      orderDate,
      totalPrice,
      status
    });
  });
});


// API để xóa đơn hàng
app.delete('/api/orders/:id', (req, res) => {
  const { id } = req.params;

  const deleteOrderItemsQuery = 'DELETE FROM order_items WHERE order_id = ?';
  connection.query(deleteOrderItemsQuery, [id], (err, results) => {
    if (err) {
      console.error('Lỗi khi xóa mục liên quan trong order_items:', err);
      return res.status(500).send('Lỗi khi xóa mục liên quan trong order_items');
    }

    const deleteOrderQuery = 'DELETE FROM orders WHERE order_id = ?';
    connection.query(deleteOrderQuery, [id], (err, results) => {
      if (err) {
        console.error('Lỗi khi xóa đơn hàng:', err);
        return res.status(500).send('Lỗi khi xóa đơn hàng');
      }

      if (results.affectedRows > 0) {
        res.status(200).json({ message: `Đơn hàng ${id} và các mục liên quan đã được xóa` });
      } else {
        res.status(404).json({ message: 'Đơn hàng không tồn tại' });
      }
    });
  });
});
const WebSocket = require('ws');

// Khởi tạo WebSocket server
const wss = new WebSocket.Server({ port: 8081 });

// Lưu trữ kết nối của từng người dùng bằng Map
const clients = new Map();

wss.on('connection', (ws, req) => {
  try {
    // Xử lý URL và lấy userId
    const url = new URL(req.url, `http://${req.headers.host}`);
    const userId = url.searchParams.get('userId');

    if (userId) {
      // Lưu kết nối vào Map
      clients.set(userId, ws);
      console.log(`User ${userId} connected.`);

      // Lắng nghe sự kiện đóng kết nối
      ws.on('close', () => {
        clients.delete(userId); // Xóa kết nối khi người dùng ngắt kết nối
        console.log(`User ${userId} disconnected.`);
      });
    } else {
      console.log('Kết nối không hợp lệ: thiếu userId');
      ws.close(); // Đóng kết nối nếu không có userId
    }
  } catch (error) {
    console.error('Lỗi khi xử lý kết nối WebSocket:', error);
    ws.close(); // Đóng kết nối nếu có lỗi
  }
});

// Hàm gửi thông báo tới một người dùng cụ thể
const sendNotificationToUser = (userId, message) => {
  const client = clients.get(userId);
  if (client && client.readyState === WebSocket.OPEN) {
    client.send(JSON.stringify({ message }));
    console.log(`Thông báo đã được gửi tới user ${userId}`);
  } else {
    console.log('Danh sách websocketClients:', client);
    console.error(`Không thể gửi thông báo cho user ${userId}, kết nối WebSocket không tồn tại.`);
  }
};


// Chạy server
app.listen(port,async () => {
  try {
    console.log(`Server đang chạy tại http://localhost:${port}`);
    // await Sequelize.sync({ alter: false });  // Đảm bảo connection là một đối tượng hợp lệ (ví dụ như Sequelize)
    console.log('Cơ sở dữ liệu đã đồng bộ!');
  } catch (error) {
    console.error('Lỗi khi đồng bộ cơ sở dữ liệu:', error);
  }
});
