import "./App.css";
import Dashboard from "./admin/Dash";
import { Routes, Route } from "react-router-dom";
import AddPersonnel from "./admin/AddPersonnel";
import AddList from "./admin/AddList";
import AddProduct from "./admin/AddProduct";
import PersonnelList from "./admin/PersonnelList";
import QlProduct from "./admin/QlProduct";
import QlList from "./admin/QlList";
import PersonnelEdit from "./admin/PersonnelEdit";
import UserList from "./admin/UserList";
import Qlcomment from "./admin/QlComment";
import AddComment from "./admin/AddComment";
import QlOder from "./admin/QlOder";
import AddOrder from "./admin/AddOrder";



function App() {
  return (
    <div className="App">
        <Routes>
          <Route path="/" exact element={<Dashboard />} />
          <Route path="/qllist" element={<QlList />} />
          <Route path="/personnel" element={<PersonnelList />} />
          <Route path="/qlproduct" element={<QlProduct />} />

          <Route path="/addlist" element={<AddList />} />
          <Route path="/addproduct" element={<AddProduct />} />
          <Route path="/addpersonnel" element={<AddPersonnel />} />
          <Route path="/personnelEdit" element={<PersonnelEdit />} />
          <Route path="/userList" element={<UserList />} />
          <Route path="/qlcomment" element={<Qlcomment />} />
          <Route path="/addcomment" element={<AddComment />} />
          <Route path="/qlorder" element={<QlOder />} />
          <Route path="/addorder" element={<AddOrder />} />

        </Routes>
    </div>
  );
}

export default App;
