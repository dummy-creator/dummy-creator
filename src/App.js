import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import Dummy from "./Alluser";
import "./App.css";
import Adduser from "./noderegister/Adduser";
import Edits from "./noderegister/Edits";
import Error from "./noderegister/Error";
import Home from "./noderegister/Home";
import Login from "./noderegister/Login";
import Protect from "./noderegister/Protect";
import Register from "./noderegister/Register";
import Users from "./noderegister/Users";
import Cancel from "./productitem/Cancel";
import Checkout from "./productitem/Checkout";
// import Header from "./productitem/Header";
import Order from "./productitem/Order";
import Orderdetails from "./productitem/Orderdetails";
import Product from "./productitem/Product";
import Productable from "./productitem/Productable";
import Showcart from "./productitem/Showcart";
import Showproducts from "./productitem/Showproducts";
import Singleproduct from "./productitem/Singleproduct";
import Success from "./productitem/Success";

function App() {
  return (
    <div>
      <BrowserRouter>
        {/* <Header /> */}
        <ToastContainer limit={1} autoClose={1000} />
        <Routes>
          <Route path="/register" element={<Protect Component={Register} />} />
          <Route path="/login" element={<Protect Component={Login} />} />
          <Route
            path="user/edits/:id"
            element={<Protect Component={Edits} />}
          />
          <Route path="/" element={<Protect Component={Home} />} />
          <Route path="/user" element={<Protect Component={Dummy} />} />
          <Route path="/adduser" element={<Protect Component={Adduser} />} />
          <Route path="/alluser" element={<Protect Component={Users} />} />
          <Route
            path="/addproducts"
            element={<Protect Component={Product} />}
          />
          <Route
            path="/productable"
            element={<Protect Component={Productable} />}
          />
          <Route path="/show" element={<Protect Component={Showproducts} />} />
          <Route path="/show/singleproduct/:id" element={<Protect Component={Singleproduct} />} />
          <Route path="/cart" element={<Protect Component={Showcart} />} />
          <Route path="/checkout" element={<Protect Component={Checkout} />} />
          <Route path="/order" element={<Protect Component={Order} />} />
          <Route
            path="/orderdetail"
            element={<Protect Component={Orderdetails} />}
          />
          <Route path="/success" element={<Protect Component={Success} />} />
          <Route path="/cancel" element={<Protect Component={Cancel} />} />

          <Route path="/*" element={<Error />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
