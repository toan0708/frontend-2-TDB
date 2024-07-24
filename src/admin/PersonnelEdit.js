import Header from "./layout/Header";
import Footer from "./layout/Footer";
import Menu from "./layout/Menu";
import image from "../asset/images/icon/avatar-01.jpg"
function PersonnelEdit() {
    return (
        <div className="page-wrapper">
            <Menu></Menu>
            <div className="page-container">
                <Header></Header>
                <div className="main-content">
                    <div className="section__content section__content--p30">
                        <div className="container-fluid">
                            <div className="container mt-5">
                                <div className="card">
                                    <div className="card-header">
                                        <div className="row">
                                            <div className="col-md-12">
                                                <div className="overview-wrap">
                                                    <h2 className="title-1">cập nhật thông tin nhân viên</h2>
                                                
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="card-body">
                                        <form action="" method="post" enctype="multipart/form-data" className="form-horizontal">
                                            <div className="form-group row">
                                                <label htmlFor="name-input" className="col-sm-2 col-form-label">Tên nhân viên</label>
                                                <div className="col-sm-10">
                                                    <input
                                                        type="text"
                                                        id="name-input"
                                                        name="name-input"
                                                        placeholder="Nhập tên..."
                                                        className="form-control"
                                                        value="Lori Lynch"
                                                    />
                                                </div>
                                            </div>
                                            <div className="form-group row">
                                                <label htmlFor="email-input" className="col-sm-2 col-form-label">Email</label>
                                                <div className="col-sm-10">
                                                    <input
                                                        type="email"
                                                        id="email-input"
                                                        name="email-input"
                                                        placeholder="Nhập email..."
                                                        className="form-control"
                                                        value="lori@example.com"
                                                    />
                                                </div>
                                            </div>
                                            <div className="form-group row">
                                                <label htmlFor="phone-input" className="col-sm-2 col-form-label">SDT</label>
                                                <div className="col-sm-10">
                                                    <input
                                                        type="text"
                                                        id="phone-input"
                                                        name="phone-input"
                                                        placeholder="Nhập sdt..."
                                                        className="form-control"
                                                        value="2018-09-27 02:12"
                                                    />
                                                </div>
                                            </div>
                                            <div className="form-group row">
                                                <label htmlFor="address-input" className="col-sm-2 col-form-label">Địa chỉ</label>
                                                <div className="col-sm-10">
                                                    <input
                                                        type="text"
                                                        id="address-input"
                                                        name="address-input"
                                                        placeholder="Nhập địa chỉ..."
                                                        className="form-control"
                                                        value="123 Main St"
                                                    />
                                                </div>
                                            </div>
                                            <div className="form-group row">
                                                <label htmlFor="position-select" className="col-sm-2 col-form-label">Chức vụ</label>
                                                <div className="col-sm-10">
                                                    <select id="position-select" name="position-select" className="form-control">
                                                        <option value="0" selected>Nhân viên</option>
                                                        <option value="1">Quản lý</option>
                                                    </select>
                                                </div>
                                            </div>
                                            <div className="form-group row">
                                                <label htmlFor="image-input" className="col-sm-2 col-form-label">Hình ảnh</label>
                                                <div className="col-sm-10">
                                                    <input
                                                        type="file"
                                                        id="image-input"
                                                        name="image-input"
                                                        className="form-control-file"
                                                    />
                                                    <img src={`${image}`} alt="Hình ảnh nhân viên" className="img-thumbnail mt-2" />
                                                </div>
                                            </div>
                                            <div className="form-group row">
                                                <div className="col-sm-10 offset-sm-2">
                                                    <button type="submit" className="btn btn-primary">Lưu</button>
                                                    <button type="reset" className="btn btn-secondary">Hủy</button>
                                                </div>
                                            </div>
                                        </form>
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
export default PersonnelEdit;