import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Menu from "../layout/Menu";
import Header from "../layout/Header";
import Footer from "../layout/Footer";
import { analytics } from "../firebase";
import { addDoc, collection, getDocs } from "firebase/firestore";

function AddList() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [status, setStatus] = useState("");
  const [nameError, setNameError] = useState(""); // State for name error message
  const [statusError, setStatusError] = useState(""); // State for status error message

  const categoryCollectionRef = collection(analytics, 'Category');

  const createCate = async (event) => {
    event.preventDefault();

    // Reset error messages
    setNameError("");
    setStatusError("");

    // Validation
    let hasError = false;
    if (!name.trim()) {
      setNameError("Name is required.");
      hasError = true;
    }

    if (!status.trim()) {
      setStatusError("Status is required.");
      hasError = true;
    }

    if (hasError) return;

    try {
      // Fetch categories and add a new one
      const querySnapshot = await getDocs(categoryCollectionRef);
      const nextOrder = querySnapshot.docs.length + 1;
  
      await addDoc(categoryCollectionRef, { name, status, order: nextOrder });
  
      navigate("/qllist");
    } catch (error) {
      console.error("Error adding document: ", error);
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
                      <strong>Form</strong> thêm danh mục
                    </div>
                    <div className="card-body card-block">
                      <form onSubmit={createCate} className="form-horizontal">
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
                              id="name"
                              name="name"
                              placeholder="Nhập tên danh mục..."
                              className="form-control"
                              onChange={(event) => setName(event.target.value)}
                              value={name}
                            />
                             {nameError && <div style={{ color: 'red', fontSize: '12px' }}>{nameError}</div>}
                            
                          </div>
                        </div>

                        <div className="row form-group">
                          <div className="col col-md-3">
                            <label htmlFor="status" className=" form-control-label">
                              Trạng thái
                            </label>
                          </div>
                          <div className="col-12 col-md-9">
                            <select
                              name="status"
                              id="status"
                              className="form-control"
                              onChange={(event) => setStatus(event.target.value)}
                              value={status}
                            >
                              <option value="">Select Status</option>
                              <option value="0">Không Hoạt động</option>
                              <option value="1">hoạt động</option>
                            </select>
                            {statusError && <div style={{ color: 'red', fontSize: '12px' }}>{statusError}</div>}
                          </div>
                        </div>
                        <div className="card-footer">
                          <button
                            type="submit"
                            className="btn btn-primary btn-sm"
                          > Submit
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

export default AddList;
