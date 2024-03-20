// import Box from "@mui/material/Box";
// import Divider from "@mui/material/Divider";
// import Drawer from "@mui/material/Drawer";
// import ListItemButton from "@mui/material/ListItemButton";
// import ListItemIcon from "@mui/material/ListItemIcon";
// import Toolbar from "@mui/material/Toolbar";
// import React from "react";
// import { useNavigate } from "react-router-dom";

// const Header = (props) => {
//   const navigate = useNavigate();
//   const drawer = (
//     <div >
//       <Toolbar
//         style={{ color: "white", fontWeight: "bold", marginLeft: "40px" }}
//       >
//         WELCOME
//       </Toolbar>
//       <Divider />

//       {/* <ListItemButton>
//         <ListItemIcon>
//           <img
//             src="https://images.rawpixel.com/image_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIzLTA4L3Jhd3BpeGVsX29mZmljZV8zM18zZF9pbGx1c3RyYXRpb25fb2ZfYV9uZW9uX2ljb25zX3Nob3BwaW5nX2lzb19hYTQwZTZhNi0xOTk1LTRlMTUtOTJjYy03ZjJlODdlNjkyODNfMS5qcGc.jpg"
//             style={{ blockSize: "100px" }}
//             alt="welcome"
//           />
//         </ListItemIcon>
//       </ListItemButton> */}

//       <ListItemButton>
//         <ListItemIcon>
//           <button
//             onClick={() => navigate("/show")}
//             style={{ marginLeft: "150px" }}
//           >
//             <img
//               src="https://cdn-icons-png.flaticon.com/512/6136/6136590.png"
//               style={{ height: "50px", width: "50px" }}
//               alt="image"
//             />
//           </button>
//         </ListItemIcon>
//       </ListItemButton>
//       <Divider />
//       <ListItemButton>
//         <ListItemIcon>
//           <button
//             onClick={() => navigate("/cart")}
//             style={{ marginLeft: "150px" }}
//           >
//             <img
//               src="https://cdn-icons-png.flaticon.com/512/6021/6021398.png"
//               style={{ height: "50px", width: "50px" }}
//               alt="image1"
//             />
//           </button>
//         </ListItemIcon>
//       </ListItemButton>
//       <Divider />
//       <ListItemButton>
//         <ListItemIcon>
//           <button
//             onClick={() => navigate("/order")}
//             style={{ marginLeft: "160px" }}
//           >
//             <img
//               src="https://cdn-icons-png.flaticon.com/512/2038/2038792.png"
//               style={{ height: "50px", width: "50px" }}
//               alt="image2"
//             />
//           </button>
//         </ListItemIcon>
//       </ListItemButton>
//       <Divider />
//       <ListItemButton>
//         <ListItemIcon>
//           <button
//             onClick={() => navigate("/user")}
//             style={{ marginLeft: "160px" }}
//           >
//             <img
//               src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Circle-icons-profile.svg/2048px-Circle-icons-profile.svg.png"
//               style={{ height: "50px", width: "50px" }}
//               alt="image3"
//             />
//           </button>
//         </ListItemIcon>
//       </ListItemButton>
//       <Divider />
//       <ListItemButton>
//         <ListItemIcon>
//           {props.role && (
//             <>
//               <button
//                 variant="contained"
//                 onClick={() => navigate("/setting")}
//                 style={{ marginLeft: "160px" }}
//               >
//                 <img
//                   src="https://images.rawpixel.com/image_transparent_png_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIzLTA0L3Y5MzItbmluZy01Ni5wbmc.png"
//                   style={{ height: "50px", width: "50px" }}
//                   alt="image4"
//                 />
//               </button>
//             </>
//           )}
//         </ListItemIcon>
//       </ListItemButton>
//       <Divider />

//       {/* <ListItemButton>
//         <ListItemIcon></ListItemIcon>
//       </ListItemButton>
//       <Divider />
//       <ListItemButton>
//         <ListItemIcon></ListItemIcon>
//       </ListItemButton>
//       <Divider/> */}
//     </div>
//   );
//   // const navigate = useNavigate();

//   // const drawer = (
//   //   <div>
//   //     <nav class="bg-blue-950 border-gray-200  lg:px-10 py-1.5 dark:bg-gray-800">
//   //       <div style={{ display: "flex" }}>
//   // <img
//   //   src="https://images.rawpixel.com/image_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIzLTA4L3Jhd3BpeGVsX29mZmljZV8zM18zZF9pbGx1c3RyYXRpb25fb2ZfYV9uZW9uX2ljb25zX3Nob3BwaW5nX2lzb19hYTQwZTZhNi0xOTk1LTRlMTUtOTJjYy03ZjJlODdlNjkyODNfMS5qcGc.jpg"
//   //   style={{ blockSize: "100px" }}
//   //   alt="welcome"
//   // />
//   // <button
//   //   onClick={() => navigate("/show")}
//   //   style={{ marginLeft: "160px" }}
//   // >
//   //   <img
//   //     src="https://cdn-icons-png.flaticon.com/512/6136/6136590.png"
//   //     style={{ height: "50px", width: "50px" }}
//   //   />
//   // </button>
//   // <button
//   //   onClick={() => navigate("/cart")}
//   //   style={{ marginLeft: "190px" }}
//   // >
//   //   <img
//   //     src="https://cdn-icons-png.flaticon.com/512/6021/6021398.png"
//   //     style={{ height: "50px", width: "50px" }}
//   //   />
//   // </button>
//   // <button
//   //   onClick={() => navigate("/order")}
//   //   style={{ marginLeft: "210px" }}
//   // >
//   //   <img
//   //     src="https://cdn-icons-png.flaticon.com/512/2038/2038792.png"
//   //     style={{ height: "50px", width: "50px" }}
//   //   />
//   // </button>
//   // <button
//   //   onClick={() => navigate("/user")}
//   //   style={{ marginLeft: "250px" }}
//   // >
//   //   <img
//   //     src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Circle-icons-profile.svg/2048px-Circle-icons-profile.svg.png"
//   //     style={{ height: "50px", width: "50px" }}
//   //   />
//   // </button>
//   // {props.role && (
//   //   <>
//   //     <button
//   //       variant="contained"
//   //       onClick={() => navigate("/productable")}
//   //       style={{ marginLeft: "310px" }}
//   //     >
//   //       <img
//   //         src="https://images.rawpixel.com/image_transparent_png_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIzLTA0L3Y5MzItbmluZy01Ni5wbmc.png"
//   //         style={{ height: "50px", width: "50px" }}
//   //       />
//   //     </button>
//   //   </>
//   // )}
//   //       </div>
//   //     </nav>
//   //   </div>
//   // );
//   return (
    
//       <div>
//         <Box>
//         <Drawer variant="permanent" 
//         >
//           <div>{drawer}</div>
//         </Drawer>
//         <Drawer  variant="temporary">
//           {drawer}
//         </Drawer>
//         </Box>
//       </div>
    
//   );
// };

// export default Header;

