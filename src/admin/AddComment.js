import Menu from "./layout/Menu";
import Header from "./layout/Header";
import Footer from "./layout/Footer";

function AddComment() {
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
                  <h2>Thêm Bình Luận</h2>
                </div>
                <div className="card-body">
                  <form>
                    <div className="form-group">
                      <label htmlFor="name">Tên</label>
                      <input
                        type="text"
                        className="form-control"
                        id="name"
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="email">Email</label>
                      <input
                        type="email"
                        className="form-control"
                        id="email"
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="comment">Bình Luận</label>
                      <textarea
                        className="form-control"
                        id="comment"
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="date">Ngày</label>
                      <input
                        type="date"
                        className="form-control"
                        id="date"
                        required
                      />
                    </div>
                    <button type="submit" className="btn btn-primary">
                      Thêm Bình Luận
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

export default AddComment;
