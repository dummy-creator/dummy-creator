import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import Dummy from "./Alluser";

import "./App.css";
import Edits from "./noderegister/Edits";
import Error from "./noderegister/Error";
import Login from "./noderegister/Login";
import Protect from "./noderegister/Protect";
import Register from "./noderegister/Register";
import Cancel from "./productitem/Cancel";
import Checkout from "./productitem/Checkout";
import Header from "./productitem/Header";
import Order from "./productitem/Order";
import Product from "./productitem/Product";
import Showcart from "./productitem/Showcart";
import Showproducts from "./productitem/Showproducts";
import Success from "./productitem/Success";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Header />
        <ToastContainer limit={1} autoClose={1000} />
        <Routes>
          <Route path="/register" element={<Protect Component={Register} />} />
          <Route path="/login" element={<Protect Component={Login} />} />
          <Route
            path="user/edits/:id"
            element={<Protect Component={Edits} />}
          />
  
          <Route path="/user" element={<Protect Component={Dummy} />} />
          <Route path="/products" element={<Protect Component={Product} />} />
          <Route path="/show" element={<Protect Component={Showproducts} />} />
          <Route path="/cart" element={<Protect Component={Showcart} />} />
          <Route path="/checkout" element={<Protect Component={Checkout} />} />
          <Route path="/order" element={<Protect Component={Order} />} />
          <Route path="/success" element={<Protect Component={Success} />} />
          <Route path="/cancel" element={<Protect Component={Cancel} />} />
          <Route path="/*" element={<Error />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
