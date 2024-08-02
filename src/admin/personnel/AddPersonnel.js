import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import Header from "../layout/Header";
import Footer from "../layout/Footer";
import Menu from "../layout/Menu";
import { analytics } from '../firebase';
import { addDoc, collection } from 'firebase/firestore';

function AddPersonnel() {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [background, setBackground] = useState('');
  const [position, setPosition] = useState('');

  const usersCollectionRef = collection(analytics, 'users');

  const createUser = async (event) => {
    event.preventDefault();
    await addDoc(usersCollectionRef, { name, email, phone, background, position });
    navigate('/personnel'); // Redirect to home or another route after adding user
  };
  return (
    <div className="page-wrapper">
      <Menu />
      <div className="page-container">
        <Header />
        <div className="main-content">
          <div className="section__content section__content--p30">
            <div className="container-fluid">
              <div className="row">
                <div className="col-lg-12">
                  <div className="card">
                    <div className="card-header">
                      <strong>Form</strong> thêm nhân viên
                    </div>
                    <div className="card-body card-block">
                      <form onSubmit={createUser} className="form-horizontal">
                        <div className="row form-group">
                          <div className="col col-md-3">
                            <label htmlFor="name" className="form-control-label">
                              Tên nhân viên
                            </label>
                          </div>
                          <div className="col-12 col-md-9">
                            <input
                              type="text"
                              id="name"
                              name="name"
                              placeholder="Nhập tên..."
                              className="form-control"
                              onChange={(event) => setName(event.target.value)}
                              value={name}
                            />
                            <small className="form-text text-muted">This is a help text</small>
                          </div>
                        </div>

                        <div className="row form-group">
                          <div className="col col-md-3">
                            <label htmlFor="email" className="form-control-label">
                              Email
                            </label>
                          </div>
                          <div className="col-12 col-md-9">
                            <input
                              type="email"
                              id="email"
                              name="email"
                              placeholder="Nhập email..."
                              className="form-control"
                              onChange={(event) => setEmail(event.target.value)}
                              value={email}
                            />
                            <small className="help-block form-text">Please enter your email</small>
                          </div>
                        </div>

                        <div className="row form-group">
                          <div className="col col-md-3">
                            <label htmlFor="phone" className="form-control-label">
                              SDT
                            </label>
                          </div>
                          <div className="col-12 col-md-9">
                            <input
                              type="text"
                              id="phone"
                              name="phone"
                              placeholder="Nhập sdt..."
                              className="form-control"
                              onChange={(event) => setPhone(event.target.value)}
                              value={phone}
                            />
                            <small className="help-block form-text">Please enter a complex password</small>
                          </div>
                        </div>

                        <div className="row form-group">
                          <div className="col col-md-3">
                            <label htmlFor="background" className="form-control-label">
                              Lý lịch
                            </label>
                          </div>
                          <div className="col-12 col-md-9">
                            <textarea
                              name="background"
                              id="background"
                              rows="9"
                              placeholder="Lý lịch..."
                              className="form-control"
                              onChange={(event) => setBackground(event.target.value)}
                              value={background}
                            ></textarea>
                          </div>
                        </div>

                        <div className="row form-group">
                          <div className="col col-md-3">
                            <label htmlFor="position" className="form-control-label">
                              Chức vụ
                            </label>
                          </div>
                          <div className="col-12 col-md-9">
                            <select
                              name="position"
                              id="position"
                              className="form-control"
                              onChange={(event) => setPosition(event.target.value)}
                              value={position}
                            >
                              <option value="0">Nhân viên</option>
                              <option value="1">Quản lí</option>
                            </select>
                          </div>
                        </div>

                        <div className="card-footer">
                          <button type="submit" className="btn btn-primary btn-sm">
                            <i className="fa fa-dot-circle-o"></i> Submit
                          </button>
                        </div>
                      </form>
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

export default AddPersonnel;
