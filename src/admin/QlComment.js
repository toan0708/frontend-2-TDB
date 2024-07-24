import React from "react";
import Header from "./layout/Header";
import Footer from "./layout/Footer";
import Menu from "./layout/Menu";
// import "./css/css.css";

function Qlcomment() {
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
                    <h2 className="title-1">Quản lý bình luận</h2>
                    <a className="au-btn au-btn-icon au-btn--blue" href="/addcomment">
                      <i className="zmdi zmdi-plus"></i>Thêm bình luận
                    </a>
                  </div>
                </div>
                <div className="card-body">
                  <div className="table-responsive table-responsive-data2">
                    <table className="table table-data2">
                      <thead>
                        <tr>
                          <th>Tên</th>
                          <th>Email</th>
                          <th>Bình luận</th>
                          <th>Ngày</th>
                          <th>Hành động</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>Nguyễn Văn A</td>
                          <td>
                            <span className="block-email">example1@example.com</span>
                          </td>
                          <td>Đây là một bình luận mẫu.</td>
                          <td>2023-07-21 14:32</td>
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
                          <td>Trần Thị B</td>
                          <td>
                            <span className="block-email">example2@example.com</span>
                          </td>
                          <td>Đây là một bình luận khác.</td>
                          <td>2023-07-22 10:45</td>
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

export default Qlcomment;
