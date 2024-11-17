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

// API Endpoint - Ví dụ truy vấn dữ liệu
app.get('/api/users', (req, res) => {
  connection.query('SELECT * FROM user', (err, results) => {
    if (err) {
      res.status(500).json({ message: 'Lỗi truy vấn CSDL' });
    } else {
      res.json(results);  // Trả về kết quả
    }
  });
});

app.post('/api/login', (req, res) => {
  const { email, username, MatKhau } = req.body;
  connection.query(
    'SELECT * FROM user WHERE (email = ? OR username = ?) AND MatKhau = ?',
    [email, username, MatKhau],
    (err, results) => {
      if (err) {
        res.status(500).json({ message: 'Lỗi truy vấn CSDL' });
      } else {
        res.json(results); // Trả về kết quả
      }
    }
  );
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
