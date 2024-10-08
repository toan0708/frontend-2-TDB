import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import Header from '../layout/Header';
import Footer from '../layout/Footer';
import Menu from '../layout/Menu';
import { analytics } from '../firebase';
import { addDoc, collection } from 'firebase/firestore';

function AddPersonnel() {
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm();
  const personCollectionRef = collection(analytics, 'person');

  const onSubmit = async (data) => {
    await addDoc(personCollectionRef, data);
    navigate('/personnel');
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
                      <form onSubmit={handleSubmit(onSubmit)} className="form-horizontal">
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
                              {...register('name', { required: 'Tên phải có ít nhất 5 ký tự.', minLength: 5 })}
                            />
                            {errors.name && <small className="form-text text-danger">{errors.name.message}</small>}
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
                              {...register('email', { required: 'Email không hợp lệ.', pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ })}
                            />
                            {errors.email && <small className="form-text text-danger">{errors.email.message}</small>}
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
                              {...register('phone', { required: 'Số điện thoại phải là số và có 10 chữ số.', pattern: /^[0-9]{10}$/ })}
                            />
                            {errors.phone && <small className="form-text text-danger">{errors.phone.message}</small>}
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
                              {...register('background', { required: 'Lý lịch không được để trống.' })}
                            ></textarea>
                            {errors.background && <small className="form-text text-danger">{errors.background.message}</small>}
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
                              {...register('position')}
                            >
                              <option value="0">Nhân viên</option>
                              <option value="1">Quản lí</option>
                            </select>
                          </div>
                        </div>

                        <div className="card-footer">
                          <button type="submit" className="btn btn-primary btn-sm">
                            <i className="fa fa-dot-circle-o"></i> Lưu
                          </button>
                          <button type="button" className="btn btn-secondary btn-sm" onClick={() => navigate(-1)}>
                            <i className="fa fa-arrow-left"></i> Trở về
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
