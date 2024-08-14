import React, { useEffect, useState } from "react";
import Header from "../layout/Header";
import Footer from "../layout/Footer";
import Menu from "../layout/Menu";
import { Link } from "react-router-dom";
import { getDocs, collection,deleteDoc,doc  } from 'firebase/firestore';
import { analytics } from '../firebase';

// import "./css/css.css";

function Qlcomment() {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const fetchComments = async () => {
      const data = await getDocs(collection(analytics, 'comments'));
      setComments(data.docs.map(doc => ({ ...doc.data(), id: doc.id })));
    };

    fetchComments();
  }
  , []);

  const deleteComment = async (id) => {
    const confirmDelete = window.confirm("Bạn có chắc chắn muốn xóa bình luận này không?");
    if (confirmDelete) {
      await deleteDoc(doc(analytics, 'comments', id));
      setComments(comments.filter(comment => comment.id !== id));
    }
  }

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
                  <div className="overview-wrap">
                    <h2 className="title-1">Quản lý bình luận</h2>
                    <a className="au-btn au-btn-icon au-btn--blue" href="/addcomment">
                      <i className="zmdi zmdi-plus"></i>Thêm bình luận
                    </a>
                  </div>
                </div>
                <div className="card-body">
                  <div className="table-responsive table-responsive-data2">
                    <table className="table table-data2">
                      <thead>
                        <tr>
                          <th>#</th>
                          <th>Tên</th>
                          <th>Email</th>
                          <th>Bình luận</th>
                          <th>Ngày</th>
                          <th>Hành động</th>
                        </tr>
                      </thead>
                      <tbody>                  
                        {comments.map((comment) => (
                          // thenm so thu tu

                          <tr key={comment.id}>
                            <td>{comments.indexOf(comment) + 1}</td>
                            <td>{comment.name}</td>
                            <td>{comment.email}</td>
                            <td>{comment.comment}</td>
                            <td>{comment.date}</td>
                            <td>
                              <Link to={`/editcomment/${comment.id}`} className="btn btn-info">Sửa</Link>
                              <button onClick={() => deleteComment(comment.id)} className="btn btn-danger">Xóa</button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
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

export default Qlcomment;
