import React, { useState } from 'react'
import '../styles/RegistrationForm.css';
import { useNavigate } from 'react-router-dom'
import Header from './Header';

const Login = (props) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [emailError, setEmailError] = useState('')
  const [passwordError, setPasswordError] = useState('')
  

  const navigate = useNavigate()

  const onButtonClick = () => {
    // Set initial error values to empty
    setEmailError('')
    setPasswordError('')
  
    // Check if the user has entered both fields correctly
    if ('' === email) {
      setEmailError('Vui Lòng Nhập Email')
      return
    }
  
    if (!/^[\w-]+(\.[\w-]+)*@[a-zA-Z0-9-]+\.[a-zA-Z]{2,}$/.test(email)) {
      setEmailError('Sai Định Dạng Email VD : abc@gmail.com');
      return;
    }
    
    if ('' === password) {
      setPasswordError('Vui Lòng Nhập Password')
      return
    }
    
      
  
    if (password.length < 7) {
      setPasswordError('Mật khẩu tối thiệu 8 kí tự')
      return
    }
    
    // Authentication calls will be made here...
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
            value={email}
            placeholder="Nhập Email"
            onChange={(ev) => setEmail(ev.target.value)}
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
