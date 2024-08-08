import Header from "../layout/Header";
import Footer from "../layout/Footer";
import Menu from "../layout/Menu";
import { Link } from "react-router-dom";
import { getDocs, collection,deleteDoc,doc  } from 'firebase/firestore';
import { analytics } from '../firebase';
import React, { useEffect, useState } from "react";

function QlOrders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      const data = await getDocs(collection(analytics, 'orders'));
      setOrders(data.docs.map(doc => ({ ...doc.data(), id: doc.id })));
    };

    fetchOrders();
  }
  , []);

  const deleteOrder = async (id) => {
    const confirmDelete = window.confirm("Bạn có chắc chắn muốn xóa đơn hàng này không?");
    if (confirmDelete) {
      await deleteDoc(doc(analytics, 'orders', id));
      setOrders(orders.filter(order => order.id !== id));
    }
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
                  <div className="overview-wrap">
                    <h2 className="title-1">Quản lý đơn hàng</h2>
                    <Link className="au-btn au-btn-icon au-btn--blue" to="/addorder">
                          <i className="zmdi zmdi-plus"></i>Thêm Đơn Hàng
                        </Link>
                    {/* <a className="au-btn au-btn-icon au-btn--blue" href="/addorder">
                      <i className="zmdi zmdi-plus"></i>Thêm đơn hàng
                    </a> */}
                  </div>
                </div>
                <div className="card-body">
                  <div className="table-responsive table-responsive-data2">
                    <table className="table table-data2">
                      <thead>
                        <tr>
                          <th>Mã đơn hàng</th>
                          <th>Khách hàng</th>
                          <th>Sản phẩm</th>
                          <th>Ngày đặt hàng</th>
                          <th>Trạng thái</th>
                          <th>Hành động</th>
                        </tr>
                      </thead>
                      <tbody>
                        {orders.map((order) => (
                          <tr key={order.id}>
                            <td>{order.Idoder}</td>
                            <td>{order.customerEmail}</td>
                            <td>
                              <img src={order.productImage} alt="product" style={{ width: '100px' }} />
                            </td>
                            <td>{order.orderDate}</td>
                            <td>{order.status}</td>
                            <td>
                              <Link to={`/editorder/${order.id}`} className="btn btn-info">Sửa</Link>
                              <button onClick={() => deleteOrder(order.id)} className="btn btn-danger">Xóa</button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
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

export default QlOrders;
