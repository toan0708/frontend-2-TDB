import React, { useState } from "react";
import Header from "../layout/Header";
import Footer from "../layout/Footer";
import Menu from "../layout/Menu";
import { addDoc, collection } from 'firebase/firestore';
import { analytics } from '../firebase'; // Adjust the import path as needed
import { useNavigate } from 'react-router-dom';

function AddUser() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [status, setStatus] = useState('active');
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    const validateForm = () => {
        const newErrors = {};
        if (name.length < 5) {
            newErrors.name = 'Tên phải có ít nhất 5 ký tự.';
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            newErrors.email = 'Email không hợp lệ.';
        }
        const phoneRegex = /^[0-9]{10}$/;
        if (!phoneRegex.test(phone)) {
            newErrors.phone = 'Số điện thoại phải là số và có 10 chữ số.';
        }
        if (address.trim() === '') {
            newErrors.address = 'Địa chỉ không được để trống.';
        }
        return newErrors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const validationErrors = validateForm();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return; 
        }
        try {
            await addDoc(collection(analytics, 'users'), {
                name,
                email,
                phone,
                address,
                status
            });
            alert("User added successfully!");
            navigate('/userList'); 
        } catch (error) {
            console.error("Error adding user: ", error.message); 
            alert("Error adding user: " + error.message); 
        }
    };

    return (
        <div className="page-wrapper">
            <Menu />
            <div className="page-container">
                <Header />
                <div className="main-content">
                    <div className="section__content section__content--p30">
                        <div className="container-fluid">
                            <div className="card">
                                <div className="card-header">
                                    <h2 className="title-1">Thêm Khách hàng</h2>
                                </div>
                                <div className="card-body">
                                    <form onSubmit={handleSubmit}>
                                        <div className="form-group">
                                            <label htmlFor="name">Tên</label>
                                            <input
                                                type="text"
                                                id="name"
                                                className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                                                value={name}
                                                onChange={(e) => setName(e.target.value)}
                                            />
                                            {errors.name && <div className="invalid-feedback">{errors.name}</div>}
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="email">Email</label>
                                            <input
                                                type="email"
                                                id="email"
                                                className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                            />
                                            {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="phone">SDT</label>
                                            <input
                                                type="text"
                                                id="phone"
                                                className={`form-control ${errors.phone ? 'is-invalid' : ''}`}
                                                value={phone}
                                                onChange={(e) => setPhone(e.target.value)}
                                            />
                                            {errors.phone && <div className="invalid-feedback">{errors.phone}</div>}
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="address">Địa chỉ</label>
                                            <input
                                                type="text"
                                                id="address"
                                                className={`form-control ${errors.address ? 'is-invalid' : ''}`}
                                                value={address}
                                                onChange={(e) => setAddress(e.target.value)}
                                            />
                                            {errors.address && <div className="invalid-feedback">{errors.address}</div>}
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="status">Status</label>
                                            <select
                                                id="status"
                                                className="form-control"
                                                value={status}
                                                onChange={(e) => setStatus(e.target.value)}
                                            >
                                                <option value="active">Hoạt động</option>
                                                <option value="inactive">Đã bị khóa</option>
                                            </select>
                                        </div>
                                        <button type="submit" className="btn btn-primary">Thêm Khách hàng</button>
                                        <button type="button" className="btn btn-secondary" onClick={() => navigate(-1)}>
                                            <i className="fa fa-arrow-left"></i> Trở về
                                        </button>
                                    </form>
                                </div>
                            </div>
                            <Footer />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AddUser;
