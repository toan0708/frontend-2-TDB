import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Menu from "../layout/Menu";
import Header from "../layout/Header";
import Footer from "../layout/Footer";
import { analytics } from "../firebase";
import { doc, updateDoc, getDoc } from "firebase/firestore";

function EditCate() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [category, setCategory] = useState({
    name: "",
    status: "0",
    order: 0,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const docRef = doc(analytics, "Category", id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setCategory(docSnap.data());
        } else {
          console.log("No such document!");
        }
      } catch (error) {
        console.error("Error fetching the category data", error);
      }
    };

    fetchData();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCategory((prevCategory) => ({
      ...prevCategory,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const docRef = doc(analytics, "Category", id);
      await updateDoc(docRef, category);
      navigate("/qllist"); // Điều hướng đến trang danh mục
    } catch (error) {
      console.error("Error updating document: ", error);
    }
  };
  return (
    <div className="page-wrapper">
      <Menu></Menu>
      <div className="page-container">
        <Header></Header>
        <div className="main-content">
          <div className="section__content section__content--p30">
            <div className="container-fluid">
              <div className="row">
                <div className="col-lg-12">
                  <div className="card">
                    <div className="card-header">
                      <strong>Form</strong> chỉnh sửa danh mục
                    </div>
                    <div className="card-body card-block">
                      <form onSubmit={handleSubmit} className="form-horizontal">
                        <div className="row form-group">
                          <div className="col col-md-3">
                            <label
                              for="text-input"
                              htmlFor="name"
                              className=" form-control-label"
                            >
                              Tên danh mục
                            </label>
                          </div>
                          <div className="col-12 col-md-9">
                            <input
                              type="text"                             
                              name="name"
                              placeholder="Nhập tên danh mục..."
                              className="form-control"
                              onChange={handleChange}
                              value={category.name}
                            />
                            <small className="form-text text-muted">
                              This is a help text
                            </small>
                          </div>
                        </div>

                        <div className="row form-group">
                          <div className="col col-md-3">
                            <label
                              for="disabledSelect"
                              className=" form-control-label"
                            >
                              Trạng thái
                            </label>
                          </div>
                          <div className="col-12 col-md-9">
                            <select
                              name="status"
                              id="status"
                              className="form-control"
                              onChange={handleChange}
                              value={category.status}
                            >
                              <option value="">Select Status</option>
                              <option value="0">Không Hoạt động</option>
                              <option value="1">hoạt động</option>
                            </select>
                          </div>
                        </div>
                        <div className="card-footer">
                          <button
                            type="submit"
                            className="btn btn-primary btn-sm"
                          >
                            <i className="fa fa-dot-circle-o"></i> Submit
                          </button>
                        </div>
                      </form>
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

export default EditCate;
