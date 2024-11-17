import React, { useState } from 'react';
import '../styles/RegistrationForm.css';
import { useNavigate } from 'react-router-dom';
import Header from './Header';
import axios from 'axios';

const RegistrationForm = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [repassword, setRepassword] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [repasswordError, setRepasswordError] = useState('');
    const [sdt, setSdt] = useState('');
    const [sdtError, setSdtError] = useState('');
    const [tk, setTk] = useState('');
    const [tkError, setTkError] = useState('');

    const navigate = useNavigate();



    const onButtonClick = () => {
        // Reset all error messages before validation
        setTkError('');
        setSdtError('');
        setEmailError('');
        setPasswordError('');
        setRepasswordError('');
    
        let valid = true;
    
        // Validate Tên Tài Khoản (Username)
        if (tk === '') {
            setTkError('Vui Lòng Nhập Tên Tài Khoản');
            valid = false;
        }
    
        // Validate Số Điện Thoại (Phone Number)
        if (sdt === '') {
            setSdtError('Vui Lòng Nhập Số Điện Thoại');
            valid = false;
        } else if (!/^(09|03|07|08|05)[0-9]{8}$/.test(sdt)) {
            setSdtError('Số Điện Thoại Không Hợp Lệ');
            valid = false;
        }
    
        // Validate Email
        if (email === '') {
            setEmailError('Vui Lòng Nhập Email');
            valid = false;
        } else if (!/^[\w-]+(\.[\w-]+)*@[a-zA-Z0-9-]+\.[a-zA-Z]{2,}$/.test(email)) {
            setEmailError('Sai Định Dạng Email VD : abc@gmail.com');
            valid = false;
        }
    
        // Validate Password
        if (password === '') {
            setPasswordError('Vui Lòng Nhập Mật Khẩu');
            valid = false;
        } else if (password.length < 7) {
            setPasswordError('Mật khẩu tối thiểu 8 ký tự');
            valid = false;
        }
    
        // Validate Re-password (Confirm Password)
        if (repassword === '') {
            setRepasswordError('Vui Lòng Xác Nhận Mật Khẩu');
            valid = false;
        } else if (repassword !== password) {
            setRepasswordError('Mật Khẩu Không Trùng Khớp');
            valid = false;
        }
    
        // If all inputs are valid, proceed with the registration API call
        if (valid) {
            axios.post('http://localhost:8080/api/register', {
                email: email,
                matkhau: password,
                sdt: sdt,
                username: tk,
            }, {
                headers: {
                    'Content-Type': 'application/json',
                }
            }).then(response => {
                console.log('Registration successful:', response);
                navigate('/login');  // Redirect to login page after successful registration
            }).catch(error => {
                console.error('There was an error registering:', error.response);
            });
        }
    };
    

    const goToLogin = () => {
        navigate('/login');  // Redirect to login page
    };

    return (
        <div>
            <Header />
            <div className={'mainContainer'}>
                <div className={'titleContainer'}>
                    <div>Đăng Ký</div>
                </div>

                <div className="inputContainer">
                    <label>Tên TK :</label>
                    <input
                        value={tk}
                        className="inputBox"
                        onChange={(ev) => setTk(ev.target.value)}
                        placeholder="asd"
                    />
                    <label className="errorLabel">{tkError}</label>
                </div>
                <br />

                <div className={'inputContainer'}>
                    <label>Số Điện Thoại: <br />
                        <input
                            value={sdt}
                            placeholder="Nhập Số Điện Thoại"
                            onChange={(ev) => setSdt(ev.target.value)}
                            className={'inputBox'}
                        />
                    </label>
                    <label className="errorLabel">{sdtError}</label>
                </div>
                <br />

                <div className={'inputContainer'}>
                    <label>Email: <br />
                        <input
                            value={email}
                            placeholder="Nhập Email"
                            onChange={(ev) => setEmail(ev.target.value)}
                            className={'inputBox'}
                        />
                    </label>
                    <label className="errorLabel">{emailError}</label>
                </div>
                <br />

                <div className={'inputContainer'}>
                    <label>Nhập Mật Khẩu: <br />
                        <input
                            type='password'
                            value={password}
                            placeholder="Nhập Mật Khẩu"
                            onChange={(ev) => setPassword(ev.target.value)}
                            className={'inputBox'}
                        />
                    </label>
                    <label className="errorLabel">{passwordError}</label>
                </div>
                <br />

                <div className={'inputContainer'}>
                    <label>Xác Nhận Mật Khẩu: <br />
                        <input
                            type='password'
                            value={repassword}
                            placeholder="Nhập Lại Mật Khẩu"
                            onChange={(ev) => setRepassword(ev.target.value)}
                            className={'inputBox'}
                        />
                    </label>
                    <label className="errorLabel">{repasswordError}</label>
                </div>
                <br />

                <div className={'inputContainer'}>
                    <input className={'inputButton'} type="button" onClick={onButtonClick} value={'Đăng Ký'} />
                </div>

                <div className='login'>
                    Bạn Đã Có Tài Khoản :
                    <button className="loginButton" onClick={goToLogin}>Đăng Nhập!!!</button>
                </div>
            </div>
        </div>
    );
};

export default RegistrationForm;
