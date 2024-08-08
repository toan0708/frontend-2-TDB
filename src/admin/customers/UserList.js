import React, { useEffect, useState } from "react";
import Header from "../layout/Header";
import Footer from "../layout/Footer";
import Menu from "../layout/Menu";
import { getDocs, collection, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { analytics } from '../firebase'; // Adjust the import path as needed
import ConfirmationModal from '../btn-delete'; // Make sure to import your ConfirmationModal component
import { Link } from "react-router-dom";

function UserList() {
  const [users, setUsers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      const data = await getDocs(collection(analytics, 'users'));
      setUsers(data.docs.map(doc => ({ ...doc.data(), id: doc.id })));
    };

    fetchUsers();
  }, []);

  const handleDeleteClick = (id) => {
    setSelectedId(id);
    setShowModal(true);
  };

  const handleConfirmDelete = async () => {
    if (selectedId) {
      await deleteDoc(doc(analytics, 'users', selectedId));
      setUsers(users.filter(user => user.id !== selectedId));
      setShowModal(false);
      setSelectedId(null);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedId(null);
  };

  const handleStatusChange = async (id, newStatus) => {
    const userDoc = doc(analytics, 'users', id);
    await updateDoc(userDoc, { status: newStatus });
    setUsers(users.map(user => user.id === id ? { ...user, status: newStatus } : user));
  };

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
                  <div className="row">
                    <div className="col-md-12">
                      <div className="overview-wrap">
                        <h2 className="title-1">Quản lý Khách hàng</h2>
                        <Link className="au-btn au-btn-icon au-btn--blue" to="/addUser">
                          <i className="zmdi zmdi-plus"></i>Thêm khách hàng
                        </Link>
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
                              <th scope="col">STT</th>
                              <th scope="col">Tên</th>
                              <th scope="col">Email</th>
                              <th scope="col">SDT</th>
                              <th scope="col">Địa chỉ</th>
                              <th scope="col">Status</th>
                              <th scope="col">Hành động</th>
                            </tr>
                          </thead>
                          <tbody>
                            {users.map((user, index) => (
                              <tr key={user.id}>
                                <td>{index + 1}</td>
                                <td>{user.name}</td>
                                <td><span className="block-email">{user.email}</span></td>
                                <td>{user.phone}</td>
                                <td>{user.address}</td>
                                <td>
                                  <select
                                    value={user.status}
                                    onChange={(e) => handleStatusChange(user.id, e.target.value)}
                                    className="form-control"
                                  >
                                    <option value="active">Hoạt động</option>
                                    <option value="inactive">Đã bị khóa</option>
                                  </select>
                                </td>
                                <td>
                                  <div className="btn-group" role="group">
                                    <button className="btn btn-danger btn-sm" data-toggle="tooltip" data-placement="top" title="Delete" onClick={() => handleDeleteClick(user.id)}>
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
      <ConfirmationModal
        show={showModal}
        handleClose={handleCloseModal}
        handleConfirm={handleConfirmDelete}
      />
    </div>
  );
}

export default UserList;
