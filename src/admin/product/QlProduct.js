import Menu from "../layout/Menu";
import Header from "../layout/Header";
import Footer from "../layout/Footer";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { analytics } from "../firebase";
import { getDocs, collection, deleteDoc, doc } from "firebase/firestore";
import img from "../../asset/images/icon/thun1.webp";

function QlProduct() {
  const [products, setProducts] = useState([]); // Changed from categories to products

  useEffect(() => {
    const fetchProducts = async () => {
      const data = await getDocs(collection(analytics, "Product")); // Changed 'Category' to 'Product'
      setProducts(
        data.docs.map((doc) => {
          const product = doc.data();
          return {
            ...product,
            id: doc.id,
            order: Number(product.order), // Convert `order` to a number
          };
        })
      );
    };

    fetchProducts();
  }, []);

  const deleteProduct = async (id) => {
    // Changed from deleteCate to deleteProduct
    const confirmDelete = window.confirm(
      "Bạn có chắc chắn muốn xóa sản phẩm này không?" // Updated confirmation message
    );
    if (confirmDelete) {
      await deleteDoc(doc(analytics, "Product", id)); // Changed 'Category' to 'Product'
      setProducts(products.filter((product) => product.id !== id)); // Changed from categories to products
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
              <div className="">
                <div className="card-header">
                  <div className="row">
                    <div className="col-md-12">
                      <div className="overview-wrap">
                        <h2 className="title-1">Quản lý sản phẩm</h2>
                        <a
                          className="au-btn au-btn-icon au-btn--blue"
                          href="/addproduct"
                        >
                          <i className="zmdi zmdi-plus"></i>Thêm sản phẩm
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="card-body">
                  <div className="row m-t-30">
                    <div className="col-md-12">
                      <div className="table-responsive table--no-card m-b-30">
                        <table className="table table-borderless table-data3">
                          <thead>
                            <tr>
                              <th>STT</th>
                              <th>Tên sản phẩm</th>
                              <th>Hình ảnh</th>
                              <th>Giá</th>
                              <th>Số lượng</th>
                              <th>Mô tả</th>
                              <th></th>
                            </tr>
                          </thead>
                          <tbody>
                            {products
                              .sort((a, b) => a.order - b.order) // Sort by order
                              .map((product) => (
                                <tr key={product.id}>
                                  <td>{product.order}</td>
                                  <td>{product.name}</td>
                                  <td>
                                    <img
                                      src={product.image} // Use product.image for the image source
                                      style={{
                                        width: "130px",
                                        height: "130px",
                                      }}
                                    />
                                  </td>
                                  <td>{product.price}</td>
                                  <td>{product.quantity}</td>{" "}
                                  {/* Make sure this field is part of your product data */}
                                  <td>{product.describe}</td>
                                  <td>
                                    <div className="table-data-feature">
                                      <button>
                                        <Link
                                          className="btn btn-warning btn-sm mr-1"
                                          data-toggle="tooltip"
                                          data-placement="top"
                                          title="Edit"
                                          to={`/EditProduct/${product.id}`}
                                        >
                                          <i className="zmdi zmdi-edit"></i>
                                        </Link>
                                      </button>
                                      <button
                                        className="btn btn-danger btn-sm"
                                        data-toggle="tooltip"
                                        data-placement="top"
                                        title="Delete"
                                        onClick={() =>
                                          deleteProduct(product.id)
                                        } 
                                      >
                                        <i className="zmdi zmdi-delete"></i>
                                      </button>
                                    </div>
                                  </td>
                                </tr>
                              ))}
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

export default QlProduct;
