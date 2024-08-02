import React, { useEffect, useState } from "react";
import Header from "../layout/Header";
import Footer from "../layout/Footer";
import Menu from "../layout/Menu";
import axios from "axios";

function UserList() {
    
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/customers")
      .then(response => {
        console.log(response);
        setUsers(response.data.data);   
      })
      .catch(error => {
        console.error("There was an error fetching the user data!", error);
      });
  }, []);

  return (
    <div className="page-wrapper">
      <Menu />
      <div className="page-container">
        <Header />
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
                              <th scope="col">SDT</th>
                              <th scope="col">Địa chỉ</th>
                              <th scope="col">Status</th>
                              <th scope="col">Hành động</th>
                            </tr>
                          </thead>
                          <tbody>
                            {users.map(user => (
                              <tr key={user.id}>
                                <td>{user.name}</td>
                                <td><span className="block-email">{user.email}</span></td>
                                <td>{user.phone}</td>
                                <td>{user.address}</td>
                                <td>
                                  {user.status === 1 ? (
                                    <span className="badge badge-success">Hoạt động</span>
                                  ) : (
                                    <span className="badge badge-danger">Đã bị khóa</span>
                                  )}
                                </td>
                                <td>
                                  <div className="btn-group" role="group">
                                    <button className="btn btn-danger btn-sm" data-toggle="tooltip" data-placement="top" title="Delete">
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
              <Footer />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserList;
