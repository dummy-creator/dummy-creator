import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import Toolbar from "@mui/material/Toolbar";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
const Header = (props) => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [selectedIndex, setSelectedIndex] = useState();
  const logout = () => {
    localStorage.clear("token");
    setTimeout(() => {
      navigate("/login");
    }, 500);
  };


  return (
    <>
      {/* <header>
        <div>
          <nav class="bg-blue-950 border-gray-200  lg:px-10 py-1.5 dark:bg-gray-800">
            <div style={{ display: "flex" }}>
              <img
                src="https://images.rawpixel.com/image_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIzLTA4L3Jhd3BpeGVsX29mZmljZV8zM18zZF9pbGx1c3RyYXRpb25fb2ZfYV9uZW9uX2ljb25zX3Nob3BwaW5nX2lzb19hYTQwZTZhNi0xOTk1LTRlMTUtOTJjYy03ZjJlODdlNjkyODNfMS5qcGc.jpg"
                style={{ blockSize: "100px", marginLeft: "200px" }}
                alt="welcome"
              />
            </div>
          </nav>
        </div>
      </header> */}
      <div>
        <Box>
          <Drawer
            variant="permanent"
            sx={{
              backgroundColor: "#010E46",
              "& .MuiDrawer-paper": {
                backgroundColor: "#010E46",
                boxSizing: "border-box",
              },
            }}
          >
            <div style={{ backgroundColor: "blue" }}>
              {" "}
              <div style={{ backgroundColor: "#010E46" }}>
                <Toolbar
                  style={{
                    color: "white",
                    fontWeight: "bold",
                    marginLeft: "40px",
                  }}
                >
                  WELCOME &nbsp;&nbsp;&nbsp;
                  <button
                    type="button"
                    className=" px-6	text-white bg-gradient-to-r from-purple-400 via-purple-500 to-purple-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 shadow-lg shadow-purple-500/50 dark:shadow-lg dark:shadow-pink-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                    // style={{ color: "red" }}
                    onClick={logout}
                  >
                    logout
                  </button>
                </Toolbar>
                <Divider />

                <ListItemButton
                  style={
                    selectedIndex === 0 ? { backgroundColor: "#9a97c9" } : {}
                  }
                  onClick={() => {
                    setSelectedIndex(0);
                    navigate("/chats");
                  }}
                >
                  <ListItemIcon>
                    <button style={{ marginLeft: "50px", color: "white" , }}>
                   {/* <WhatsAppIcon style={{color:"green"}}/> */}
                      <img
                        src="https://cdn-icons-png.flaticon.com/128/3670/3670051.png"
                        style={{ height: "50px", width: "50px" }}
                        alt="image"
                      />
                    </button>
                  </ListItemIcon>
                </ListItemButton>
                <Divider />
                <ListItemButton
                  style={
                    selectedIndex === 1 ? { backgroundColor: "#9a97c9" } : {}
                  }
                  onClick={() => {
                    setSelectedIndex(1);
                    navigate("/show");
                  }}
                >
                  <ListItemIcon>
                    <button style={{ marginLeft: "50px", color: "white" }}>
                      PRODUCTS
                      {/* <img
                        src="https://cdn-icons-png.flaticon.com/512/6136/6136590.png"
                        style={{ height: "50px", width: "50px" }}
                        alt="image"
                      /> */}
                    </button>
                  </ListItemIcon>
                </ListItemButton>
                <Divider />
                <ListItemButton
                  style={
                    selectedIndex === 2 ? { backgroundColor: "#9a97c9" } : {}
                  }
                  onClick={() => {
                    setSelectedIndex(2);
                    navigate("/cart");
                  }}
                >
                  <ListItemIcon>
                    <button style={{ marginLeft: "50px", color: "white" }}>
                      CART
                      {/* <img
                        src="https://cdn-icons-png.flaticon.com/512/6021/6021398.png"
                        style={{ height: "50px", width: "50px" }}
                        alt="image1"
                      /> */}
                    </button>
                  </ListItemIcon>
                </ListItemButton>
                <Divider />
                <ListItemButton
                  style={
                    selectedIndex === 3 ? { backgroundColor: "#9a97c9" } : {}
                  }
                  onClick={() => {
                    setSelectedIndex(3);
                    navigate("/order");
                  }}
                >
                  <ListItemIcon>
                    <button style={{ marginLeft: "50px", color: "white" }}>
                      {/* <img
                        src="https://cdn-icons-png.flaticon.com/512/2038/2038792.png"
                        style={{ height: "50px", width: "50px" }}
                        alt="image2"
                      /> */}
                      ORDER
                    </button>
                  </ListItemIcon>
                </ListItemButton>
                <Divider />
                <ListItemButton
                  style={
                    selectedIndex === 4 ? { backgroundColor: "#9a97c9" } : {}
                  }
                  onClick={() => {
                    setSelectedIndex(4);
                    navigate("/user");
                  }}
                >
                  <ListItemIcon>
                    <button style={{ marginLeft: "50px", color: "white" }}>
                      PROFILE
                      {/* <img
                        src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Circle-icons-profile.svg/2048px-Circle-icons-profile.svg.png"
                        style={{ height: "50px", width: "50px" }}
                        alt="image3"
                      /> */}
                    </button>
                  </ListItemIcon>
                </ListItemButton>
                <Divider />
                <ListItemButton
                  style={
                    selectedIndex === 5 ? { backgroundColor: "#9a97c9" } : {}
                  }
                  onClick={() => {
                    setSelectedIndex(5);
                    navigate("/chart");
                  }}
                >
                  <ListItemIcon>
                    <button
                      variant="contained"
                      style={{ marginLeft: "50px", color: "white" }}
                    >
                      CHART
                    </button>
                  </ListItemIcon>
                </ListItemButton>
                <Divider />
                <ListItemButton
                  style={
                    selectedIndex === 6 ? { backgroundColor: "#9a97c9" } : {}
                  }
                  onClick={() => {
                    setSelectedIndex(6);
                    navigate("/ordertable");
                  }}
                >
                  <ListItemIcon>
                    <button style={{ marginLeft: "40px", color: "white" }}>
                      ORDERTABLE
                      {/* <img
                        src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Circle-icons-profile.svg/2048px-Circle-icons-profile.svg.png"
                        style={{ height: "50px", width: "50px" }}
                        alt="image3"
                      /> */}
                    </button>
                  </ListItemIcon>
                </ListItemButton>
                <Divider />
                <ListItemButton
                  style={
                    selectedIndex === 7 ? { backgroundColor: "#9a97c9" } : {}
                  }
                  onClick={() => {
                    setSelectedIndex(7);
                    navigate("/setting");
                  }}
                >
                  <ListItemIcon>
                    {props.role && (
                      <>
                        <button
                          variant="contained"
                          style={{ marginLeft: "30px", color: "white" }}
                        >
                          MANAGE PRODUCTS
                          {/* <img
                            src="https://images.rawpixel.com/image_transparent_png_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIzLTA0L3Y5MzItbmluZy01Ni5wbmc.png"
                            style={{ height: "50px", width: "50px" }}
                            alt="image4"
                          /> */}
                        </button>
                      </>
                    )}
                  </ListItemIcon>
                </ListItemButton>

                <Divider />

                {/* <ListItemButton>
        <ListItemIcon>
          <img
            src="https://images.rawpixel.com/image_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIzLTA4L3Jhd3BpeGVsX29mZmljZV8zM18zZF9pbGx1c3RyYXRpb25fb2ZfYV9uZW9uX2ljb25zX3Nob3BwaW5nX2lzb19hYTQwZTZhNi0xOTk1LTRlMTUtOTJjYy03ZjJlODdlNjkyODNfMS5qcGc.jpg"
            style={{ blockSize: "100px" }}
            alt="welcome"
          />
        </ListItemIcon>
      </ListItemButton> */}
              </div>
            </div>
          </Drawer>
        </Box>
      </div>
    </>
  );
};

export default Header;
