import Header from "./layout/Header";
import Footer from "./layout/Footer";
import Menu from "./layout/Menu";
import image from "../asset/images/icon/avatar-01.jpg"

function UserList() {
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
                                                <h2 className="title-1">Quản lý Khách hàng</h2>                                               
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="card-body">
                                    <div className="row m-t-30">
                                        <div className="col-md-12">
                                            <div className="table-responsive table-responsive-data2">
                                                <table className="table table-hover table-bordered table-striped">
                                                    <thead className="thead-dark">
                                                        <tr>
                                                            <th scope="col">Tên</th>
                                                            <th scope="col">Email</th>
                                                            <th scope="col">Hình ảnh</th>
                                                            <th scope="col">SDT</th>
                                                            <th scope="col">Địa chỉ</th>
                                                            <th scope="col">Hành động</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>

                                                        <tr>
                                                            <td>Trung Toàn</td>
                                                            <td><span className="block-email">Toan@.com</span></td>
                                                            <td><img src={`${image}`} alt="Hình ảnh nhân viên" className="img-fluid" /></td>
                                                            <td>0789534411</td>
                                                            <td>Sóc Trăng</td>
                                                            <td>
                                                                <div className="btn-group" role="group">                                                    
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
                        </div>
                    </div>
                </div>
                <Footer></Footer>
            </div>
        </div>
    );
}

export default UserList;