import React, { useState, useRef } from 'react';

import "../styles/MainAdmin.css";
import "../styles/CRUDProducts.css"
import axios from 'axios';

const CRUDProduct = () => {
    const [text, SetText] = useState('');
    const [textArea, SetTextArea] = useState('');
    const [price, SetPrice] = useState('');
    const [sl, SetSl] = useState('');
    const [errorSl, SetErrorSl] = useState('');
    const [errorPrice, SetErrorPrice] = useState('');
    const [errorText, SetErrorText] = useState('');
    const [errorTextArea, SetErrorTextArea] = useState('');
    const [selectedFile, setSelectedFile] = useState(null);
    const [fileError, setFileError] = useState('');
    const fileInputRef = useRef(null);

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const fileType = file.type;
            if (fileType === 'image/png' || fileType === 'image/jpeg' || fileType === 'image/jpg') {
                setSelectedFile(file);
                setFileError('');
            } else {
                setFileError('Vui lòng chọn tệp hình ảnh (.png, .jpg, .jpeg)');
                setSelectedFile(null);
            }
        }
    };

    function onButtonClick() {
        let valid = true;

        SetErrorSl('');
        SetErrorText('');
        SetErrorPrice('');
        SetErrorTextArea('');
        setFileError('');

        if (text === '') {
            SetErrorText('Vui Lòng Nhập Tên Sản Phẩm');
            valid = false;
        }
        if (textArea === '') {
            SetErrorTextArea('Vui Lòng Nhập Mô Tả');
            valid = false;
        }
        if (price <= 100000) {
            SetErrorPrice('Vui Lòng Nhập Số Lớn Hơn 100000');
            valid = false;
        }
        if (sl <= 0) {
            SetErrorSl('Vui Lòng Nhập Số Lớn Hơn 0');
            valid = false;
        }
        if (!selectedFile) {
            setFileError('Vui lòng chọn hình ảnh cho sản phẩm');
            valid = false;
        }



        if (valid) {
            axios.post("http://localhost:8080/api/products", {
                Name: text,
                gia: price,
                soluong: sl,
                image: selectedFile ? selectedFile.name : null,
                mota: textArea,
            })
                .then(response => {
                    alert("Sản phẩm đã được thêm thành công!");
                    SetText('')
                    SetTextArea('')
                    SetPrice('')
                    SetSl('')
                    setSelectedFile(null)
                    if (fileInputRef.current) {
                        fileInputRef.current.value = '';
                    }
                })
                .catch(error => {

                    alert("Đã xảy ra lỗi khi thêm sản phẩm. Vui lòng thử lại.");
                });
        }
    }

    return (
        <div className="add-product-container">
            <h2 className="add-product-title">Thêm Sản Phẩm Mới</h2>
            <div className="add-product-form">
                <div className="add-product-group">
                    <label className="add-product-label">Tên sản phẩm:</label>
                    <input
                        type="text"
                        value={text}
                        className="add-product-input"
                        placeholder="Nhập tên sản phẩm"
                        onChange={(ev) => SetText(ev.target.value)}
                    />
                    <label className='errorLabel'>{errorText}</label>
                </div>
                <div className="add-product-group">
                    <label className="add-product-label">Giá bán:</label>
                    <input
                        type="number"
                        value={price}
                        className="add-product-input"
                        placeholder="Nhập giá bán"
                        onChange={(ev) => SetPrice(ev.target.value)}
                    />
                    <label className='errorLabel'>{errorPrice}</label>
                </div>
                <div className="add-product-group">
                    <label className="add-product-label">Số lượng:</label>
                    <input
                        type="number"
                        value={sl}
                        className="add-product-input"
                        placeholder="Nhập số lượng"
                        onChange={(ev) => SetSl(ev.target.value)}
                    />
                    <label className='errorLabel'>{errorSl}</label>
                </div>
                <div className="add-product-group">
                    <label className="add-product-label">Hình ảnh:</label>
                    <input
                        type="file"
                        className="add-product-file-input"
                        accept="image/png, image/jpeg, image/jpg"
                        onChange={handleFileChange}
                        ref={fileInputRef}
                    />
                    <label className='errorLabel'>{fileError}</label>
                </div>
                <div className="add-product-group">
                    <label className="add-product-label">Mô Tả Sản Phẩm:</label>
                    <textarea
                        className="add-product-input"
                        placeholder="Nhập Mô tả"
                        value={textArea}
                        rows="4"
                        cols="10"
                        onChange={(ev) => SetTextArea(ev.target.value)}
                    />
                    <label className='errorLabel'>{errorTextArea}</label>
                </div>
                <button type="submit" className="add-product-button" onClick={onButtonClick}>Lưu</button>
            </div>
        </div>
    )

}

export default CRUDProduct;