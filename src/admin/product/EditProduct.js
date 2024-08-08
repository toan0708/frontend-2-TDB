import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Menu from "../layout/Menu";
import Header from "../layout/Header";
import Footer from "../layout/Footer";
import { analytics } from "../firebase";
import { doc, updateDoc, getDoc } from "firebase/firestore";

function EditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState({
    name: "",
    image: "", 
    price: "",
    describe: "",
    quantity: "",
    order: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const docRef = doc(analytics, "Product", id); 
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setProduct(docSnap.data());
        } else {
          console.log("No such document!");
        }
      } catch (error) {
        console.error("Error fetching the product data", error);
      }
    };

    fetchData();
  }, [id]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  // const handleFileChange = (event) => {
  //   const selectedFile = event.target.files[0];
  //   if (selectedFile) {
  //     setProduct(selectedFile);
  //   }
  // };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const docRef = doc(analytics, "Product", id);
      await updateDoc(docRef, {
        ...product,
        
      });
      navigate("/qlproduct"); 
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
                      <strong>Form</strong> thêm sản phẩm
                    </div>
                    <div className="card-body card-block">
                      <form onSubmit={handleSubmit} className="form-horizontal">
                        <div className="row form-group">
                          <div className="col col-md-3">
                            <label
                              htmlFor="text-input"
                              className="form-control-label"
                            >
                              Tên sản phẩm
                            </label>
                          </div>
                          <div className="col-12 col-md-9">
                            <input
                              type="text"
                              name="name"
                              placeholder="Nhập tên sản phẩm..."
                              className="form-control"
                              onChange={handleChange}
                              value={product.name}
                            />
                            <small className="form-text text-muted">
                              This is a help text
                            </small>
                          </div>
                        </div>
                        <div className="row form-group">
                          <div className="col col-md-3">
                            <label
                              htmlFor="price"
                              className="form-control-label"
                            >
                              Giá
                            </label>
                          </div>
                          <div className="col-12 col-md-9">
                            <input
                              type="number"
                              id="price"
                              name="price"
                              placeholder="Nhập giá sản phẩm..."
                              className="form-control"
                              onChange={handleChange}
                              value={product.price}
                            />
                            <small className="form-text text-muted">
                              This is a help text
                            </small>
                          </div>
                        </div>

                        <div className="row form-group">
                          <div className="col col-md-3">
                            <label
                              htmlFor="quantity"
                              className="form-control-label"
                            >
                              Số lượng
                            </label>
                          </div>
                          <div className="col-12 col-md-9">
                            <input
                              type="number"
                              id="quantity"
                              name="quantity" // Updated to match state
                              placeholder="Nhập số lượng..."
                              className="form-control"
                              onChange={handleChange}
                              value={product.quantity} // Updated to match state
                            />
                          </div>
                        </div>
                        <div className="row form-group">
                          <div className="col col-md-3">
                            <label
                              htmlFor="describe"
                              className="form-control-label"
                            >
                              Mô tả
                            </label>
                          </div>
                          <div className="col-12 col-md-9">
                            <textarea
                              name="describe"
                              id="describe"
                              rows="9"
                              placeholder="Nhập mô tả..."
                              className="form-control"
                              onChange={handleChange}
                              value={product.describe}
                            ></textarea>
                          </div>
                        </div>
                        {/* <div className="row form-group">
                          <div className="col col-md-3">
                            <label
                              htmlFor="file-input"
                              className="form-control-label"
                            >
                              Hình ảnh
                            </label>
                          </div>
                          <div className="col-12 col-md-9">
                            <input
                              type="file"
                              id="file-input"
                              name="image" // Updated to match state
                              className="form-control-file"
                              onChange={handleFileChange} // Use handleFileChange for file input
                              value={product.image}
                            />
                          </div>
                        </div> */}
                        <div className="card-footer">
                          <button
                            type="submit"
                            className="btn btn-primary btn-sm"
                          >
                            Submit
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

export default EditProduct;
