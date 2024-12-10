import React, { useContext, useState } from 'react';
import '../styles/RegistrationForm.css';
import { useNavigate } from 'react-router-dom';
import Header from './Header';
import { UserContext } from './UserContext';
import axios from 'axios';

const Login = () => {
  const { login } = useContext(UserContext);
  const [usernameOrEmail, setUsernameOrEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [loginError, setLoginError] = useState('');

  const navigate = useNavigate();

  const onButtonClick = () => {
    setEmailError('');
    setPasswordError('');

    let valid = true;

    if (usernameOrEmail === '') {
      setEmailError('Vui lòng nhập Email hoặc Tên tài khoản');
      valid = false;
    }

    if (password === '') {
      setPasswordError('Vui lòng nhập mật khẩu');
      valid = false;
    } else if (password.length < 8) {
      setPasswordError('Mật khẩu tối thiểu 8 kí tự');
      valid = false;
    }

    if (valid) {
      axios
        .post('http://localhost:8080/api/login', {
          usernameOrEmail: usernameOrEmail,
          matkhau: password,
        })
        .then((response) => {
          const { token, user } = response.data;
          localStorage.setItem('token', token);
          localStorage.setItem('user', JSON.stringify(user));

          console.log('Đăng nhập thành công:', user);


          login(user);


          navigate('/');
        })
        .catch((error) => {
          if (error.response && error.response.data.message) {
            setLoginError(error.response.data.message);
          } else {
            setLoginError('Đăng nhập thất bại, vui lòng thử lại');
          }
        });
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      onButtonClick();
    }
  };

  const goToRegister = () => {
    navigate('/register');
  };

  return (
    <div>
      <Header />
      <div className="mainContainer">
        <div className="rightContainer">
          <div className="titleContainer">
            <img
              src="https://media.dau.edu.vn/Media/1_TH1057/Images/logo-dhktdn-150.png"
              alt="Logo"
            />
            <div>Đăng Nhập</div>
          </div>
          <div className="inputContainer">
            <label>
              Nhập Tên TK Hoặc Email Đăng Nhập: <br />
              <input
                value={usernameOrEmail}
                placeholder="Nhập Email hoặc Tên tài khoản"
                onChange={(ev) => setUsernameOrEmail(ev.target.value)}
                className="inputBox"
                onKeyDown={handleKeyPress}
              />
            </label>
            <label className="errorLabel">{emailError}</label>
          </div>
          <div className="inputContainer">
            <label>
              Nhập Mật Khẩu: <br />
              <input
                type="password"
                value={password}
                placeholder="Nhập Mật Khẩu"
                onChange={(ev) => setPassword(ev.target.value)}
                onKeyDown={handleKeyPress}
                className="inputBox"
              />
            </label>
            <label className="errorLabel">{passwordError}</label>
          </div>
          <div className="inputContainer">
            <input
              className="inputButton"
              type="button"
              onClick={onButtonClick}
              value="Đăng Nhập"
            />
            <label className="errorLabel">{loginError}</label>
          </div>
          <div className="reginter">
            Bạn chưa Có Tài Khoản:
            <button className="loginButton" onClick={goToRegister}>
              Đăng Ký Tài Khoản!!
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
