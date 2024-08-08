import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import Header from '../layout/Header';
import Footer from '../layout/Footer';
import Menu from '../layout/Menu';
import { analytics } from '../firebase';
import { addDoc, collection } from 'firebase/firestore';

function AddComment() {
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm();
  const commentsCollectionRef = collection(analytics, 'comments');

  const onSubmit = async (data) => {
    await addDoc(commentsCollectionRef, data);
    navigate('/qlcomment');
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
                      <strong>Form</strong> thêm bình luận
                    </div>
                    <div className="card-body card-block">
                      <form onSubmit={handleSubmit(onSubmit)} className="form-horizontal">
                        <div className="row form-group">
                          <div className="col col-md-3">
                            <label htmlFor="name" className="form-control-label">
                              Tên
                            </label>
                          </div>
                          <div className="col-12 col-md-9">
                            <input
                              type="text"
                              id="name"
                              name="name"
                              placeholder="Nhập tên..."
                              className="form-control"
                              {...register('name', { required: 'Tên là bắt buộc.' })}
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
                              {...register('email', { required: 'Email là bắt buộc.', pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ })}
                            />
                            {errors.email && <small className="form-text text-danger">{errors.email.message}</small>}
                          </div>
                        </div>

                        <div className="row form-group">
                          <div className="col col-md-3">
                            <label htmlFor="comment" className="form-control-label">
                              Bình luận
                            </label>
                          </div>
                          <div className="col-12 col-md-9">
                            <textarea
                              name="comment"
                              id="comment"
                              rows="9"
                              placeholder="Nhập bình luận..."
                              className="form-control"
                              {...register('comment', { required: 'Bình luận là bắt buộc.' })}
                            ></textarea>
                            {errors.comment && <small className="form-text text-danger">{errors.comment.message}</small>}
                          </div>
                        </div>

                        <div className="row form-group">
                          <div className="col col-md-3">
                            <label htmlFor="date" className="form-control-label">
                              Ngày
                            </label>
                          </div>
                          <div className="col-12 col-md-9">
                            <input
                              type="date"
                              id="date"
                              name="date"
                              placeholder="Chọn ngày..."
                              className="form-control"
                              {...register('date', { required: 'Ngày là bắt buộc.' })}
                            />
                            {errors.date && <small className="form-text text-danger">{errors.date.message}</small>}
                          </div>
                        </div>

                        <div className="card-footer">
                          <button type="submit" className="btn btn-primary btn-sm">
                            <i className="fa fa-dot-circle-o"></i> Thêm bình luận
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

export default AddComment;
