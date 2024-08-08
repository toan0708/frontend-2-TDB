import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from "../layout/Header";
import Footer from "../layout/Footer";
import Menu from "../layout/Menu";
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { analytics } from '../firebase';

function PersonnelEdit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [personnel, setPersonnel] = useState({
    name: '',
    email: '',
    phone: '',
    background: '',
    position: '0'
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const docRef = doc(analytics, 'person', id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setPersonnel(docSnap.data());
        } else {
          console.log("No such document!");
        }
      } catch (error) {
        console.error("Error fetching the personnel data", error);
      }
    };

    fetchData();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPersonnel(prevPersonnel => ({
      ...prevPersonnel,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const docRef = doc(analytics, 'person', id);
      await updateDoc(docRef, personnel);
      navigate('/personnel');
    } catch (error) {
      console.error("Error updating document: ", error);
    }
  };

  return (
    <div className="page-wrapper">
      <Menu />
      <div className="page-container">
        <Header />
        <div className="main-content">
          <div className="section__content section__content--p30">
            <div className="container-fluid">
              <div className="container mt-5">
                <div className="card">
                  <div className="card-header">
                    <div className="row">
                      <div className="col-md-12">
                        <div className="overview-wrap">
                          <h2 className="title-1">Thông tin nhân viên</h2>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="card-body">
                    <form className="form-horizontal" onSubmit={handleSubmit}>
                      <div className="row form-group">
                        <div className="col col-md-3">
                          <label htmlFor="name" className="form-control-label">Tên nhân viên</label>
                        </div>
                        <div className="col-12 col-md-9">
                          <input
                            type="text"
                            id="name"
                            name="name"
                            className="form-control"
                            value={personnel.name}
                            onChange={handleChange}
                          />
                        </div>
                      </div>

                      <div className="row form-group">
                        <div className="col col-md-3">
                          <label htmlFor="email" className="form-control-label">Email</label>
                        </div>
                        <div className="col-12 col-md-9">
                          <input
                            type="email"
                            id="email"
                            name="email"
                            className="form-control"
                            value={personnel.email}
                            onChange={handleChange}
                          />
                        </div>
                      </div>

                      <div className="row form-group">
                        <div className="col col-md-3">
                          <label htmlFor="phone" className="form-control-label">SDT</label>
                        </div>
                        <div className="col-12 col-md-9">
                          <input
                            type="text"
                            id="phone"
                            name="phone"
                            className="form-control"
                            value={personnel.phone}
                            onChange={handleChange}
                          />
                        </div>
                      </div>

                      <div className="row form-group">
                        <div className="col col-md-3">
                          <label htmlFor="background" className="form-control-label">Lý lịch</label>
                        </div>
                        <div className="col-12 col-md-9">
                          <textarea
                            name="background"
                            id="background"
                            rows="9"
                            className="form-control"
                            value={personnel.background}
                            onChange={handleChange}
                          ></textarea>
                        </div>
                      </div>

                      <div className="row form-group">
                        <div className="col col-md-3">
                          <label htmlFor="position" className="form-control-label">Chức vụ</label>
                        </div>
                        <div className="col-12 col-md-9">
                          <select
                            name="position"
                            id="position"
                            className="form-control"
                            value={personnel.position}
                            onChange={handleChange}
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
              <Footer />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PersonnelEdit;
