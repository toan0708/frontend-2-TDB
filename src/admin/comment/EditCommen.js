import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import Header from "../layout/Header";
import Footer from "../layout/Footer";
import Menu from "../layout/Menu";
import { analytics } from '../firebase';
import { doc, getDoc, updateDoc } from 'firebase/firestore';

function EditComment() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [comment, setComment] = useState('');
  const [date, setDate] = useState('');

  useEffect(() => {
    const fetchComment = async () => {
      const commentDoc = await getDoc(doc(analytics, 'comments', id));
      if (commentDoc.exists()) {
        const commentData = commentDoc.data();
        setName(commentData.name);
        setEmail(commentData.email);
        setComment(commentData.comment);
        setDate(commentData.date);
      }
    };

    fetchComment();
  }, [id]);

  const updateComment = async (event) => {
    event.preventDefault();
    const commentDoc = doc(analytics, 'comments', id);
    await updateDoc(commentDoc, { name, email, comment, date });
    navigate('/qlcomment'); // Redirect to the comments list or another route after updating the comment
  };
  const goBackToList = () => {
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
              <div className="card">
                <div className="card-header">
                  <h2>Chỉnh Sửa Bình Luận</h2>
                </div>
                <div className="card-body">
                  <form onSubmit={updateComment}> 
                    <div className="form-group">
                      <label htmlFor="name">Tên</label>
                      <input
                        type="text"
                        className="form-control"
                        id="name"
                        required
                        value={name}
                        onChange={(event) => setName(event.target.value)}
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="email">Email</label>
                      <input
                        type="email"
                        className="form-control"
                        id="email"
                        required
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="comment">Bình Luận</label>
                      <textarea
                        className="form-control"
                        id="comment"
                        required
                        value={comment}
                        onChange={(event) => setComment(event.target.value)}
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="date">Ngày</label>
                      <input
                        type="date"
                        className="form-control"
                        id="date"
                        required
                        value={date}
                        onChange={(event) => setDate(event.target.value)}
                      />
                    </div>
                    <button type="submit" className="btn btn-primary">
                      Chỉnh Sửa Bình Luận
                    </button>
                    <button type="button" className="btn btn-secondary" onClick={goBackToList} style={{ marginLeft: '10px' }}>
                        Trở về danh sách
                      </button>
                  </form>
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

export default EditComment;
