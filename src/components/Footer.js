import React from 'react';
import '../styles/Footer.css'

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-info">
                <div className="about-section">
                    <h4>About</h4>
                    <p>Thông Tin</p>
                </div>
                <div className="contact-section">
                    <h4>Contact</h4>
                    <p>Địa Chỉ: ABC XYZ</p>
                    <p>SĐT: 123456789</p>
                    <p>Email: info@huyshop.com</p>
                </div>
            </div>
            <div className="footer-social">
                <a href="#facebook" aria-label="Facebook">
                    <i className="fab fa-facebook"></i>
                </a>
                <a href="#twitter" aria-label="Twitter">
                    <i className="fab fa-twitter"></i>
                </a>
                <a href="#instagram" aria-label="Instagram">
                    <i className="fab fa-instagram"></i>
                </a>
            </div>
        </footer>
    );
};

export default Footer;
