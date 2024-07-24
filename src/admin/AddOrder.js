import Header from "./layout/Header";
import Footer from "./layout/Footer";
import Menu from "./layout/Menu";


function AddOrder() {
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
                  <form>
                    <div className="form-group row">
                      <label htmlFor="orderId" className="col-sm-2 col-form-label">Mã Đơn Hàng</label>
                      <div className="col-sm-10">
                        <input
                          type="text"
                          className="form-control"
                          id="orderId"
                          placeholder="Nhập mã đơn hàng"
                          required
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
                          required
                        />
                      </div>
                    </div>
                    <div className="form-group row">
                      <label htmlFor="productImage" className="col-sm-2 col-form-label">Hình Ảnh Sản Phẩm</label>
                      <div className="col-sm-10">
                        <input
                          type="text"
                          className="form-control"
                          id="productImage"
                          placeholder="Nhập URL hình ảnh sản phẩm"
                          required
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
                          required
                        />
                      </div>
                    </div>
                    <div className="form-group row">
                      <label htmlFor="status" className="col-sm-2 col-form-label">Trạng Thái</label>
                      <div className="col-sm-10">
                        <select className="form-control" id="status" required>
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
