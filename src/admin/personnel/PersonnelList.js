import React, { useEffect, useState } from "react";
import Header from "../layout/Header";
import Footer from "../layout/Footer";
import Menu from "../layout/Menu";
import { Link } from "react-router-dom";
import { getDocs, collection, deleteDoc, doc } from 'firebase/firestore';
import { analytics } from '../firebase';
import ConfirmationModal from '../btn-delete';

function PersonnelList() {
  const [personnels, setPersonnels] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  useEffect(() => {
    const fetchPersonnels = async () => {
      const data = await getDocs(collection(analytics, 'person'));
      setPersonnels(data.docs.map(doc => ({ ...doc.data(), id: doc.id })));
    };

    fetchPersonnels();
  }, []);

  const handleDeleteClick = (id) => {
    setSelectedId(id);
    setShowModal(true);
  };

  const handleConfirmDelete = async () => {
    if (selectedId) {
      await deleteDoc(doc(analytics, 'person', selectedId));
      setPersonnels(personnels.filter(person => person.id !== selectedId));
      setShowModal(false);
      setSelectedId(null);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedId(null);
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
                        <h2 className="title-1">Quản lý nhân viên</h2>
                        <Link className="au-btn au-btn-icon au-btn--blue" to="/addpersonnel">
                          <i className="zmdi zmdi-plus"></i>Thêm nhân viên
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
                              <th scope="col">Lý lịch</th>
                              <th scope="col">Chức vụ</th>
                              <th scope="col">Hành động</th>
                            </tr>
                          </thead>
                          <tbody>
                            {personnels.map((person, index) => (
                              <tr key={person.id}>
                                <td>{index + 1}</td>
                                <td>{person.name}</td>
                                <td><span className="block-email">{person.email}</span></td>
                                <td>{person.phone}</td>
                                <td>{person.background}</td>
                                <td>
                                  {person.position === "1" ? (
                                    <span className="badge badge-danger">Quản lý</span>
                                  ) : (
                                    <span className="badge badge-success">Nhân viên</span>
                                  )}
                                </td>
                                <td>
                                  <div className="btn-group" role="group">
                                    <Link className="btn btn-warning btn-sm" data-toggle="tooltip" data-placement="top" title="Edit" to={`/personnelEdit/${person.id}`}>
                                      <i className="zmdi zmdi-edit"></i>
                                    </Link>
                                    <button className="btn btn-danger btn-sm" data-toggle="tooltip" data-placement="top" title="Delete" onClick={() => handleDeleteClick(person.id)}>
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
export default PersonnelList;
