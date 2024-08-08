import "./App.css";
import Dashboard from "./admin/Dash";
import { Routes, Route } from "react-router-dom";
import AddPersonnel from "./admin/personnel/AddPersonnel";
import PersonnelList from "./admin/personnel/PersonnelList";
import PersonnelEdit from "./admin/personnel/PersonnelEdit";
import UserList from "./admin/customers/UserList";
import AddUser from "./admin/customers/AddUser";

import EditCate from "./admin/category/EditCate";
import QlList from "./admin/category/QlList";
import AddList from "./admin/category/AddList";
//product
import QlProduct from "./admin/product/QlProduct";
import AddProduct from "./admin/product/AddProduct";
import EditProduct from "./admin/product/EditProduct";

import Qlcomment from "./admin/comment/ListComment";
import AddComment from "./admin/comment/AddComment";
import EditComment from "./admin/comment/EditCommen";
import QlOder from "./admin/oder/QlOder";
import AddOrder from "./admin/oder/AddOrder";
import EditOrder from "./admin/oder/editorder";


function App() {
  return (
    <div className="App">
        <Routes>
         
          <Route path="/" exact element={<Dashboard />} />

          <Route path="/addUser" element={<AddUser/>}/>
          <Route path="/userList" element={<UserList />} />

          <Route path="/personnel" element={<PersonnelList />} />
          <Route path="/addpersonnel" element={<AddPersonnel />} />
          <Route path="/personnelEdit/:id" element={<PersonnelEdit />} />


          <Route path="/qllist" element={<QlList />} />
        <Route path="/addlist" element={<AddList />} />
        <Route path="/editCate/:id" element={<EditCate />} />
        {/* product */}
        <Route path="/qlproduct" element={<QlProduct />} />
        <Route path="/editproduct/:id" element={<EditProduct />} />
        <Route path="/addproduct" element={<AddProduct />} />
    
    
          <Route path="/qlcomment" element={<Qlcomment />} />
          <Route path="/addcomment" element={<AddComment />} />
          <Route path="/editcomment/:id" element={<EditComment />} />
          <Route path="/qlorder" element={<QlOder />} />
          <Route path="/addorder" element={<AddOrder />} />
          <Route path="/editorder/:id" element={<EditOrder />} />

        </Routes>
    </div>
  );
}

export default App;
