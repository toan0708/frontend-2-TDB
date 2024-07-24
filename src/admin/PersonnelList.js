import Header from "./layout/Header";
import Footer from "./layout/Footer";
import Menu from "./layout/Menu";
import image from "../asset/images/icon/avatar-01.jpg"
import image1 from "../asset/images/icon/avatar-02.jpg"
import { Link } from "react-router-dom";

function PersonnelList() {
  return (
    <div className="page-wrapper">
      <Menu></Menu>
      <div className="page-container">
        <Header></Header>
        <div className="main-content">
          <div className="section__content section__content--p30">
            <div className="container-fluid">
              <div className="">
                <div className="card-header">
                  <div className="row">
                    <div className="col-md-12">
                      <div className="overview-wrap">
                        <h2 className="title-1">Quản lý nhân viên</h2>
                        <Link className="au-btn au-btn-icon au-btn--blue" to="/addpersonnel">
                          <i className="zmdi zmdi-plus"></i>Thêm nhân viên
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="card-body">
                  <div className="row m-t-30">
                    <div className="col-md-12">
                      <div className="table-data__tool"></div>
                      <div className="table-responsive table-responsive-data2">
                        <table className="table table-hover table-bordered table-striped">
                          <thead className="thead-dark">
                            <tr>
                              <th scope="col">Tên</th>
                              <th scope="col">Email</th>
                              <th scope="col">Hình ảnh</th>
                              <th scope="col">SDT</th>
                              <th scope="col">Chức vụ</th>
                              <th scope="col">Hành động</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td>Trung Toàn</td>
                              <td><span className="block-email">toan@.com</span></td>
                              <td><img src={`${image}`} alt="Hình ảnh nhân viên" className="img-fluid" /></td>
                              <td>0789534411</td>
                              <td><span className="badge badge-success">Nhân viên</span></td>
                              <td>
                                <div className="btn-group" role="group">
                                  <Link className="btn btn-warning btn-sm" data-toggle="tooltip" data-placement="top" title="Edit" to="/personnelEdit">
                                    <i className="zmdi zmdi-edit"></i>
                                  </Link>

                                  <button className="btn btn-danger btn-sm" data-toggle="tooltip" data-placement="top" title="Delete">
                                    <i className="zmdi zmdi-delete"></i>
                                  </button>
                                </div>
                              </td>
                            </tr>
                            <tr>
                              <td>Thanh Bảo</td>
                              <td><span className="block-email">bao@.com</span></td>
                              <td><img src={`${image1}`} alt="Hình ảnh nhân viên" className="img-fluid" /></td>
                              <td>078961231</td>
                              <td><span className="badge badge-success">Nhân viên</span></td>
                              <td>
                                <div className="btn-group" role="group">
                                  <button className="btn btn-warning btn-sm" data-toggle="tooltip" data-placement="top" title="Edit">
                                    <i className="zmdi zmdi-edit"></i>
                                  </button>
                                  <button className="btn btn-danger btn-sm" data-toggle="tooltip" data-placement="top" title="Delete">
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
                </div>
              </div>
              <Footer></Footer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default PersonnelList;
