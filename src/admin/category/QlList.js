import Menu from "../layout/Menu";
import Header from "../layout/Header";
import Footer from "../layout/Footer";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { analytics } from "../firebase";
import { getDocs, collection, deleteDoc, doc } from "firebase/firestore";

function QlList() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      const data = await getDocs(collection(analytics, "Category"));
      setCategories( data.docs.map((doc) => {
          const category = doc.data();
          return {...category, id: doc.id, order: Number(category.order), // Chuyển đổi `order` thành số
          };
        })
      );
    };

    fetchCategories();
  }, []);

  const deleteCate = async (id) => {
    
    const confirmDelete = window.confirm(
      "Bạn có chắc chắn muốn xóa danh mục này không?"
    );
    if (confirmDelete) {
      await deleteDoc(doc(analytics, "categories", id)); 
      setCategories(categories.filter((category) => category.id !== id));
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
                        <h2 className="title-1">Quản lý danh mục</h2>
                        <a
                          className="au-btn au-btn-icon au-btn--blue"
                          href="/addlist"
                        >
                          <i className="zmdi zmdi-plus"></i>Thêm danh mục
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
                              <th>Tên danh mục</th>
                              <th>Trạng thái</th>
                              <th></th>
                            </tr>
                          </thead>
                          <tbody>
                            {categories
                              .sort((a, b) => a.order - b.order) // Sắp xếp theo số thứ tự
                              .map((category) => (
                                <tr key={category.id}>
                                  <td>{category.order}</td>

                                  <td>{category.name}</td>
                                  <td className="">
                                    {category.status === "1" ? (
                                      <span className="status--process">
                                        Hoạt động
                                      </span>
                                    ) : (
                                      <span className="status--denied">
                                        Không Hoạt động
                                      </span>
                                    )}
                                  </td>
                                  <td>
                                    <div className="table-data-feature">
                                      <button>
                                        <Link
                                          className="btn btn-warning btn-sm mr-1"
                                          data-toggle="tooltip"
                                          data-placement="top"
                                          title="Edit"
                                          to={`/EditCate/${category.id}`}
                                        >
                                          <i className="zmdi zmdi-edit"></i>
                                        </Link>
                                      </button>
                                      <button
                                        className="btn btn-danger btn-sm "
                                        data-toggle="tooltip"
                                        data-placement="top"
                                        title="Delete"
                                        onClick={() => deleteCate(category.id)} // Sự kiện xóa
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

export default QlList;
