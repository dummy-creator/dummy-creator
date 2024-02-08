import React from "react";
// import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
// import LocalMallIcon from "@mui/icons-material/LocalMall";
// import AccountCircleIcon from "@mui/icons-material/AccountCircle";
// import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
// import ShoppingBasketSharpIcon from "@mui/icons-material/ShoppingBasketSharp";
import { useNavigate } from "react-router-dom";
// import Button from '@mui/material/Button';


const Header = (props) => {
  const navigate = useNavigate();

  return (
    <>
      <header>
        <div>
          <nav class="bg-blue-950 border-gray-200  lg:px-10 py-1.5 dark:bg-gray-800">
            <div style={{ display: "flex" }}>
              <img
                src="https://images.rawpixel.com/image_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIzLTA4L3Jhd3BpeGVsX29mZmljZV8zM18zZF9pbGx1c3RyYXRpb25fb2ZfYV9uZW9uX2ljb25zX3Nob3BwaW5nX2lzb19hYTQwZTZhNi0xOTk1LTRlMTUtOTJjYy03ZjJlODdlNjkyODNfMS5qcGc.jpg"
                style={{ blockSize: "100px" }}
                alt="welcome"
              />
              <button
                onClick={() => navigate("/show")}
                style={{ marginLeft: "160px", color: "red" }}
              >
                PRODUCTS
                {/* <ShoppingBasketSharpIcon /> */}
              </button>
              <button
                onClick={() => navigate("/cart")}
                style={{ marginLeft: "190px", color: "red" }}
              >
                {/* <ShoppingCartIcon /> */}
                CART
              </button>
              <button
                onClick={() => navigate("/order")}
                style={{ marginLeft: "210px", color: "red" }}
              >
                {/* <LocalMallIcon /> */}
                ORDER
              </button>
              <button
                onClick={() => navigate("/user")}
                style={{ marginLeft: "250px", color: "red" }}
              >
                {/* <AccountCircleIcon /> */}
                PROFILE
              </button>
              {props.role && (
                <>
                  <button
                    variant="contained"
                    onClick={() => navigate("/productable")}
                    style={{ marginLeft: "310px", color: "red" }}
                   
                  >
                    MANAGE PRODUCTS
                  </button>
                </>
              )}
            </div>
          </nav>
        </div>
      </header>
    </>
  );
};

export default Header;
