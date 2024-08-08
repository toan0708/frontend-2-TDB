import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import Header from "../layout/Header";
import Footer from "../layout/Footer";
import Menu from "../layout/Menu";
import { getFirestore, doc, getDoc, updateDoc, collection, addDoc } from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

function EditOrder() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [Idoder, setIdoder] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [productImage, setProductImage] = useState('');
  const [orderDate, setOrderDate] = useState('');
  const [status, setStatus] = useState('');
  const [productImageFile, setProductImageFile] = useState(null);

  const db = getFirestore();
  const storage = getStorage();

  useEffect(() => {
    if (id) {
      const fetchOrder = async () => {
        const orderDocRef = doc(db, 'orders', id);
        const orderDoc = await getDoc(orderDocRef);
        if (orderDoc.exists()) {
          const order = orderDoc.data();
          setIdoder(order.Idoder);
          setCustomerEmail(order.customerEmail);
          setProductImage(order.productImage);
          setOrderDate(order.orderDate);
          setStatus(order.status);
        }
      };
      fetchOrder();
    }
  }, [id, db]);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setProductImageFile(file);
      const imageUrl = URL.createObjectURL(file);
      setProductImage(imageUrl);
    }
  };

  const saveOrder = async (event) => {
    event.preventDefault();
    let productImageUrl = productImage;

    if (productImageFile) {
      const storageRef = ref(storage, `productImages/${productImageFile.name}`);
      await uploadBytes(storageRef, productImageFile);
      productImageUrl = await getDownloadURL(storageRef);
    }

    const orderData = { Idoder, customerEmail, productImage: productImageUrl, orderDate, status };

    try {
      if (id) {
        const orderDocRef = doc(db, 'orders', id);
        await updateDoc(orderDocRef, orderData);
      } else {
        await addDoc(collection(db, 'orders'), orderData);
      }
      navigate('/qlorder');
    } catch (error) {
      console.error("Error updating document: ", error);
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
                  <h2 className="title">{id ? "Chỉnh Sửa Đơn Hàng" : "Thêm Đơn Hàng"}</h2>
                </div>
                <div className="card-body">
                  <form onSubmit={saveOrder}>
                    <div className="form-group row">
                      <label htmlFor="Idoder" className="col-sm-2 col-form-label">Mã Đơn Hàng</label>
                      <div className="col-sm-10">
                        <input
                          type="text"
                          className="form-control"
                          id="Idoder"
                          placeholder="Nhập mã đơn hàng"
                          value={Idoder}
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
                          value={customerEmail}
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
                        {productImage && <img src={productImage} alt="Product Preview" style={{ marginTop: "10px", maxWidth: "100%" }} />}
                      </div>
                    </div>
                    <div className="form-group row">
                      <label htmlFor="orderDate" className="col-sm-2 col-form-label">Ngày Đặt Hàng</label>
                      <div className="col-sm-10">
                        <input
                          type="date"
                          className="form-control"
                          id="orderDate"
                          value={orderDate}
                          onChange={(event) => setOrderDate(event.target.value)}
                        />
                      </div>
                    </div>
                    <div className="form-group row">
                      <label htmlFor="status" className="col-sm-2 col-form-label">Trạng Thái</label>
                      <div className="col-sm-10">
                        <select
                          className="form-control"
                          id="status"
                          value={status}
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
                        <button type="submit" className="btn btn-primary">
                          {id ? "Cập Nhật Đơn Hàng" : "Thêm Đơn Hàng"}
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

export default EditOrder;
