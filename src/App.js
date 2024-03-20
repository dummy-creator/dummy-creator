import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import "./App.css";

import Drag from "./components/usercomponents/Drag";
import Home from "./components/usercomponents/Home";
import Cancel from "./components/productcomponents/Cancel";
import Singleordersuccess from "./components/productcomponents/OrderSuccess";
import Success from "./components/productcomponents/Success";
import EditProfile from "./components/usercomponents/EditProfile";
import NotFound from "./components/usercomponents/NotFound";
import UserLogin from "./components/usercomponents/UserLogin";
import ProtectedRoute from "./components/usercomponents/ProtectedRoute";
import UserProfile from "./components/usercomponents/UserProfile";
import AdminUserAdd from "./components/usercomponents/AdminUserAdd";
import ShowAllUsers from "./components/usercomponents/ShowAllUsers";
import AddProducts from "./components/productcomponents/AddProducts";
import AddToCart from "./components/productcomponents/AddToCart";
import Payment from "./components/productcomponents/Payment";
import Buy from "./components/productcomponents/Buy";
import OrderDetails from "./components/productcomponents/OrderDetails";
import OrderTable from "./components/productcomponents/OrderTable";
import Chart from "./components/productcomponents/Chart";
import Products from "./components/productcomponents/Products";
import AdminSetting from "./components/productcomponents/AdminSetting";
import Register from "./components/usercomponents/Register";
import Showchat from "./components/chats/Showchat";
import Chat from "./components/chats/Chat";

function App() {
  return (
    <div>
      <BrowserRouter>
        <ToastContainer limit={1} autoClose={1000} />
        <Routes>
          <Route path="/*" element={<NotFound />} />
          <Route path="/home" element={<Home />} />
          <Route
            path="/chatting"
            element={<ProtectedRoute Component={Chat} />}
          />
          <Route
            path="/chats"
            element={<ProtectedRoute Component={Showchat} />}
          />
          <Route
            path="/register"
            element={<ProtectedRoute Component={Register} />}
          />
          <Route
            path="/login"
            element={<ProtectedRoute Component={UserLogin} />}
          />
          <Route
            path="/user"
            element={<ProtectedRoute Component={UserProfile} />}
          />
          <Route
            path="user/edits/:id"
            element={<ProtectedRoute Component={EditProfile} />}
          />
          <Route
            path="/adduser"
            element={<ProtectedRoute Component={AdminUserAdd} />}
          />
          <Route
            path="/alluser"
            element={<ProtectedRoute Component={ShowAllUsers} />}
          />
          <Route
            path="/addproducts"
            element={<ProtectedRoute Component={AddProducts} />}
          />
          <Route path="/drag" element={<ProtectedRoute Component={Drag} />} />
          <Route
            path="/setting"
            element={<ProtectedRoute Component={AdminSetting} />}
          />
          <Route
            path="/show"
            element={<ProtectedRoute Component={Products} />}
          />
          <Route
            path="/show/buy/:id"
            element={<ProtectedRoute Component={Buy} />}
          />
          <Route
            path="/cart"
            element={<ProtectedRoute Component={AddToCart} />}
          />
          <Route path="/chart" element={<ProtectedRoute Component={Chart} />} />
          <Route
            path="/payment"
            element={<ProtectedRoute Component={Payment} />}
          />
          <Route
            path="/ordertable"
            element={<ProtectedRoute Component={OrderTable} />}
          />
          <Route
            path="/order"
            element={<ProtectedRoute Component={OrderDetails} />}
          />
          <Route
            path="/success"
            element={<ProtectedRoute Component={Success} />}
          />
          <Route
            path="/successorder"
            element={<ProtectedRoute Component={Singleordersuccess} />}
          />
          <Route
            path="/cancel"
            element={<ProtectedRoute Component={Cancel} />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
