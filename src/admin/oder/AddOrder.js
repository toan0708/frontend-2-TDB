import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import Header from "../layout/Header";
import Footer from "../layout/Footer";
import Menu from "../layout/Menu";
import { analytics } from '../firebase';
import { addDoc, collection } from 'firebase/firestore';



function AddOrder() {
  const navigate = useNavigate();
  const [Idoder, setIdoder] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [productImage, setProductImage] = useState('');
  const [orderDate, setOrderDate] = useState('');
  const [status, setStatus] = useState('');

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      // Handle file locally (e.g., display preview or store URL)
      const imageUrl = URL.createObjectURL(file); // Local URL
      setProductImage(imageUrl);
    }
  };

  const ordersCollectionRef = collection(analytics, 'orders');

  const createOrder = async (event) => {
    event.preventDefault();
    await addDoc(ordersCollectionRef, { Idoder,customerEmail, productImage, orderDate, status });
    navigate('/qlorder'); 
  }


  

  

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
                  <h2 className="title">Thêm Đơn Hàng</h2>
                </div>
                <div className="card-body">
                  <form onSubmit={createOrder}>
                    <div className="form-group row">
                      <label htmlFor="Idoder" className="col-sm-2 col-form-label">Mã Đơn Hàng</label>
                      <div className="col-sm-10">
                        <input
                          type="text"
                          className="form-control"
                          id="Idoder"
                          placeholder="Nhập mã đơn hàng"
                          onChange={(event) => setIdoder(event.target.value)}
                        />
                      </div>
                    </div>
                    <div className="form-group row">
                      <label htmlFor="customerEmail" className="col-sm-2 col-form-label">Email Khách Hàng</label>
                      <div className="col-sm-10">
                        <input
                          type="email"
                          className="form-control"
                          id="customerEmail"
                          placeholder="Nhập email khách hàng"
                          onChange={(event) => setCustomerEmail(event.target.value)}
                       
                        />
                      </div>
                    </div>
                    <div className="form-group row">
                      <label htmlFor="productImage" className="col-sm-2 col-form-label">Hình Ảnh Sản Phẩm</label>
                      <div className="col-sm-10">
                        <input
                          type="file"
                          className="form-control"
                          id="productImage"
                          onChange={handleFileChange}
                       
                        />
                      </div>
                    </div>
                    <div className="form-group row">
                      <label htmlFor="orderDate" className="col-sm-2 col-form-label">Ngày Đặt Hàng</label>
                      <div className="col-sm-10">
                        <input
                          type="date"
                          className="form-control"
                          id="orderDate"
                          onChange={(event) => setOrderDate(event.target.value)}
                        />
                      </div>
                    </div>
                    <div className="form-group row">
                      <label htmlFor="status" className="col-sm-2 col-form-label">Trạng Thái</label>
                      <div className="col-sm-10">
                        <select className="form-control" id="status" 
                          onChange={(event) => setStatus(event.target.value)}
                         >
                          <option value="">Chọn trạng thái</option>
                          <option value="Đang xử lý">Đang xử lý</option>
                          <option value="Đã hoàn thành">Đã hoàn thành</option>
                          <option value="Đã hủy">Đã hủy</option>
                        </select>
                      </div>
                    </div>
                    <div className="form-group row">
                      <div className="col-sm-10 offset-sm-2">
                        <button type="submit" className="btn btn-primary" >
                          Thêm Đơn Hàng
                        </button>

                      </div>
                    </div>
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

export default AddOrder;
