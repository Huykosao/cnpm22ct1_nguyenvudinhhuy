import React, { useState } from 'react'
import '../styles/RegistrationForm.css';
import { useNavigate } from 'react-router-dom'
import Header from './Header';
import axios from 'axios'

const Login = (props) => {
  const [usernameOrEmail, setUsernameOrEmail] = useState('');
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [emailError, setEmailError] = useState('')
  const [passwordError, setPasswordError] = useState('')
  const [loginError, setLoginError] = useState('');
  

  const navigate = useNavigate()

  let valid = true;

  const onButtonClick = () => {
    // Set initial error values to empty
    setEmailError('')
    setPasswordError('')
    
    // Check if the user has entered both fields correctly
    if ('' === usernameOrEmail) {
      setEmailError('Vui Lòng Nhập Email')
      valid = false;
    }
    if ('' === password) {
      setPasswordError('Vui Lòng Nhập Password')
      valid = false;
    }
  
    if (password.length < 7) {
      setPasswordError('Mật khẩu tối thiệu 8 kí tự')
      valid = false;
    }
    
    if(valid){
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
    
  }
  

  // Function to navigate to the Register page
  const goToRegister = () => {
    navigate('/register')  // Use navigate to go to the register page
  }

  return (
    <div><Header/>
      <div className={'mainContainer'}>
        <div className={'titleContainer'}>
          <div>Đăng Nhập</div>
        </div>
        <br />
        <div className={'inputContainer'}>
          <label>Nhập Tên TK Hoặc Email Đăng Nhập: <br></br>
          <input
            value={usernameOrEmail}
            placeholder="Nhập Email"
            onChange={(ev) => setUsernameOrEmail(ev.target.value)}
            className={'inputBox'}
          /></label>
          <label className="errorLabel">{emailError}</label>
        </div>
        <br />
        <div className={'inputContainer'}>
          <label>Nhập Mật Khẩu: <br></br>
          <input
            type='password'
            value={password}
            placeholder="Nhập Mật Khẩu"
            onChange={(ev) => setPassword(ev.target.value)}
            className={'inputBox'}
          /></label>
          <label className="errorLabel">{passwordError}</label>
        </div>
        <br />
        <div className={'inputContainer'}>
          <input className={'inputButton'} type="button" onClick={onButtonClick} value={'Đăng Nhập'} />
          <label className="errorLabel">{loginError}</label>
        </div>
        <br />
        {/* Replace <a> with a button or div that triggers navigate */}
        <div className='reginter'>
          Bạn chưa Có Tài Khoản : 
          <button className="loginButton" onClick={goToRegister}>Đăng Ký Tài Khoản!!</button>
        </div>
      </div>
    </div>
  )
}

export default Login
