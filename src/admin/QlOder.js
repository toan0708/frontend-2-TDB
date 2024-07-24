import React from "react";
import Header from "./layout/Header";
import Footer from "./layout/Footer";
import Menu from "./layout/Menu";
import image from "../asset/images/icon/avatar-01.jpg";
import image1 from "../asset/images/icon/avatar-02.jpg";
import { Link } from "react-router-dom";


function QlOrders() {
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
                          <i className="zmdi zmdi-plus"></i>Thêm nhân viên
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
                        <tr>
                          <td>ORD001</td>
                          <td>
                            <span className="block-email">lori@example.com</span>
                          </td>
                          <td><img src={image} alt="product" className="product-image" /></td>
                          <td>2018-09-27 02:12</td>
                          <td>
                            <span className="status--process">Đang xử lý</span>
                          </td>
                          <td>
                            <div className="table-data-feature">
                              <button className="item" title="Edit">
                                <i className="zmdi zmdi-edit"></i>
                              </button>
                              <button className="item" title="Delete">
                                <i className="zmdi zmdi-delete"></i>
                              </button>
                            </div>
                          </td>
                        </tr>
                        <tr className="spacer"></tr>
                        <tr>
                          <td>ORD002</td>
                          <td>
                            <span className="block-email">john@example.com</span>
                          </td>
                          <td><img src={image1} alt="product" className="product-image" /></td>
                          <td>2018-09-29 05:57</td>
                          <td>
                            <span className="status--process">Đang xử lý</span>
                          </td>
                          <td>
                            <div className="table-data-feature">
                              <button className="item" title="Edit">
                                <i className="zmdi zmdi-edit"></i>
                              </button>
                              <button className="item" title="Delete">
                                <i className="zmdi zmdi-delete"></i>
                              </button>
                            </div>
                          </td>
                        </tr>
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
