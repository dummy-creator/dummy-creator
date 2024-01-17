import React from "react";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import LocalMallIcon from "@mui/icons-material/LocalMall";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ShoppingBasketSharpIcon from '@mui/icons-material/ShoppingBasketSharp';
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();

  return (
    <>
      <header>
        <div>
          <nav class="bg-black border-gray-200 px-4 lg:px-6 py-2.5 dark:bg-gray-800">
            <div style={{ display: "flex" }}>
              <img
                src="https://images.rawpixel.com/image_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIzLTA4L3Jhd3BpeGVsX29mZmljZV8zM18zZF9pbGx1c3RyYXRpb25fb2ZfYV9uZW9uX2ljb25zX3Nob3BwaW5nX2lzb19hYTQwZTZhNi0xOTk1LTRlMTUtOTJjYy03ZjJlODdlNjkyODNfMS5qcGc.jpg"
                style={{ blockSize: "100px" }}
              />
              <button
                onClick={() => navigate("/show")}
                style={{ marginLeft: "150px", color: "red" }}
              >
                <ShoppingBasketSharpIcon />
              </button>
              <button
                onClick={() => navigate("/cart")}
                style={{ marginLeft: "460px", color: "red" }}
              >
                <ShoppingCartIcon />
              </button>
              <button
                onClick={() => navigate("/order")}
                style={{ marginLeft: "480px", color: "red" }}
              >
                <LocalMallIcon />
              </button>
              <button
                onClick={() => navigate("/user")}
                style={{ marginLeft: "500px", color: "red" }}
              >
                <AccountCircleIcon />
              </button>
            </div>
          </nav>
        </div>
      </header>
    </>
  );
};

export default Header;
