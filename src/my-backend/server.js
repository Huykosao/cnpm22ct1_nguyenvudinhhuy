const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');  // Thêm để cho phép CORS từ React frontend

const app = express();
const port = 8080;  // Bạn có thể thay đổi cổng

// Cấu hình CORS để frontend React có thể gửi yêu cầu
app.use(cors());
app.use(express.json());  // Để đọc JSON từ frontend

// Kết nối MySQL 
const connection = mysql.createConnection({
  host: 'localhost', // Thường là localhost khi sử dụng XAMPP
  user: 'root',  // Tên người dùng MySQL
  password: '',  // Mật khẩu (thường là rỗng với XAMPP)
  database: 'webbangame'  // Tên CSDL của bạn
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
      res.json(results);  // Trả về kết quả
    }
  });
});

app.get('api/products',(req, res) => {
  connection.query('SELECT * FROM product', (err, results) => {
    if (err) {
      res.status(500).json({ message: 'Lỗi truy vấn CSDL' });
    } else {
      res.json(results);  // Trả về kết quả
    }
  });
})

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

// Chạy server
app.listen(port, () => {
  console.log(`Server đang chạy tại http://localhost:${port}`);
});
