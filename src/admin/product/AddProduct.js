import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Menu from "../layout/Menu";
import Header from "../layout/Header";
import Footer from "../layout/Footer";
import { collection, addDoc, getDocs } from 'firebase/firestore'; 
import { analytics } from "../firebase"; // Adjusted to use Firestore only

function AddProduct() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [describe, setDescribe] = useState("");
  const [image, setImage] = useState(""); // This will be the URL or path of the image
  const [loading, setLoading] = useState(false); // State to manage loading status
  const [nameError, setNameError] = useState("");
  const [priceError, setPriceError] = useState("");
  const [quantityError, setQuantityError] = useState("");
  const [describeError, setDescribeError] = useState("");
  const [imageError, setImageError] = useState("");

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file); // Local URL
      setImage(imageUrl);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Reset errors
    setNameError("");
    setPriceError("");
    setQuantityError("");
    setDescribeError("");
    setImageError("");
    

    // Validation
    let hasError = false;
    if (!name.trim()) {
      setNameError("Name is required.");
      hasError = true;
    }

    if (!price.trim() || isNaN(price) || parseFloat(price) <= 0) {
      setPriceError("Valid price is required.");
      hasError = true;
    }

    if (!quantity.trim() || isNaN(quantity) || parseInt(quantity) <= 0) {
      setQuantityError("Valid quantity is required.");
      hasError = true;
    }

    if (!describe.trim()) {
      setDescribeError("Description is required.");
      hasError = true;
    }
    if (!image) {
      setImageError("Please select an image.");
      hasError = true;
    }

    if (hasError) return;

    setLoading(true); // Set loading to true while processing

    try {
      // Fetch existing products to determine the next order number
      const querySnapshot = await getDocs(collection(analytics, 'Product'));
      const existingOrders = querySnapshot.docs.map(doc => doc.data().order).filter(order => !isNaN(order));
      const nextOrder = existingOrders.length > 0 ? Math.max(...existingOrders) + 1 : 1;

      // Add product to Firestore
      await addDoc(collection(analytics, 'Product'), {
        name,
        price,
        quantity,
        describe,
        image, // Image URL or path
        order: nextOrder, // Sequential order number
        status: "0" // Default status, adjust as needed
      });

      // Navigate to another page after successful submission
      navigate('/qlproduct');
    } catch (error) {
      console.error('Error adding product: ', error);
    } finally {
      setLoading(false);
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
              <div className="row">
                <div className="col-lg-12">
                  <div className="card">
                    <div className="card-header">
                      <strong>Form</strong> thêm sản phẩm
                    </div>
                    <div className="card-body card-block">
                      <form onSubmit={handleSubmit} className="form-horizontal">
                        <div className="row form-group">
                          <div className="col col-md-3">
                            <label htmlFor="name" className="form-control-label">
                              Tên sản phẩm
                            </label>
                          </div>
                          <div className="col-12 col-md-9">
                            <input
                              type="text"
                              id="name"
                              name="name"
                              placeholder="Nhập tên sản phẩm..."
                              className="form-control"
                              onChange={(event) => setName(event.target.value)}
                              value={name}
                            />
                            {nameError && <div style={{ color: 'red', fontSize: '12px' }}>{nameError}</div>}
                          </div>
                        </div>
                        <div className="row form-group">
                          <div className="col col-md-3">
                            <label htmlFor="price" className="form-control-label">
                              Giá
                            </label>
                          </div>
                          <div className="col-12 col-md-9">
                            <input
                              type="number"
                              id="price"
                              name="price"
                              placeholder="Nhập giá sản phẩm..."
                              className="form-control"
                              onChange={(event) => setPrice(event.target.value)}
                              value={price}
                            />
                             {priceError && <div style={{ color: 'red', fontSize: '12px' }}>{priceError}</div>}
                          </div>
                        </div>

                        <div className="row form-group">
                          <div className="col col-md-3">
                            <label className="form-control-label">
                              Số lượng
                            </label>
                          </div>
                          <div className="col-12 col-md-9">
                            <input
                              type="number"
                              id="quantity"
                              name="quantity"
                              placeholder="Nhập số lượng..."
                              className="form-control"
                              onChange={(event) => setQuantity(event.target.value)}
                              value={quantity}
                            />
                            {quantityError && <div style={{ color: 'red', fontSize: '12px' }}>{quantityError}</div>}
                          </div>
                        </div>
                        <div className="row form-group">
                          <div className="col col-md-3">
                            <label htmlFor="describe" className="form-control-label">
                              Mô tả
                            </label>
                          </div>
                          <div className="col-12 col-md-9">
                            <textarea
                              name="describe"
                              id="describe"
                              rows="9"
                              placeholder="Nhập mô tả..."
                              className="form-control"
                              onChange={(event) => setDescribe(event.target.value)}
                              value={describe}
                            ></textarea>
                            {describeError && <div style={{ color: 'red', fontSize: '12px' }}>{describeError}</div>}
                          </div>
                        </div>
                        <div className="row form-group">
                          <div className="col col-md-3">
                            <label htmlFor="file-input" className="form-control-label">
                              Hình ảnh
                            </label>
                          </div>
                          <div className="col-12 col-md-9">
                            <input
                              type="file"
                              id="file-input"
                              name="file-input"
                              className="form-control-file"
                              onChange={handleFileChange}
                            />
                            {imageError && <div style={{ color: 'red', fontSize: '12px' }}>{imageError}</div>}
                          </div>
                        </div>
                        <div className="card-footer">
                          <button 
                            type="submit" 
                            className="btn btn-primary btn-sm"
                            disabled={loading} // Disable the button while loading
                          >
                            {loading ? 'Submitting...' : 'Submit'}
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

export default AddProduct;
