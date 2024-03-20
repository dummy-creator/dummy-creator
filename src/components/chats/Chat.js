// import style from "../../cart.module.css";
// import React, { useEffect, useState } from "react";
// import {
//   Avatar,
//   Card,
//   Divider,
//   Grid,
//   List,
//   ListItem,
//   ListItemButton,
//   ListItemText,
//   Typography,
// } from "@mui/material";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// const Chat = () => {
//   const navigate = useNavigate();
//   const token = localStorage.getItem("token");
//   const [userName, setUserName] = useState();
//   const [getalluser, Setgetaluser] = useState();

//   const getallusers = () => {
//     axios
//       .get("http://localhost:4545/api/products/alluser", {
//         headers: { Authorization: ` ${token}` },
//       })
//       .then((response) => {
//         Setgetaluser(response?.data?.userdata);
//       });
//   };
//   useEffect(() => {
//     axios
//       .get("http://localhost:4545/api/products/user", {
//         headers: { Authorization: ` ${token}` },
//       })
//       .then((response) => {
//         setUserName(response?.data.newuser);
//       });
//     getallusers();
//   }, [token]);

//   return (
//     <div className={style.chatcontainer}>
//       <div className={style.chatcard}>
//         {/* <Grid>
//           <Grid item xs={12}>
//             <Typography variant="h5" className="header-message">
//               Chat
//             </Typography>
//           </Grid>
//         </Grid> */}

//         <Grid>
//           <List style={{ display: "flex" }}>
//             <ListItem>
//               <Avatar
//                 alt={userName?.username}
//                 src={userName?.image}
//                 sx={{ width: 56, height: 56 }}
//               />
//               &nbsp;&nbsp;
//               <ListItemText primary={`${userName?.username}`} />
//             </ListItem>
//           </List>
//           <Divider />
//           <Divider />

//           <List>
//             {getalluser
//               ?.filter((user) => user._id !== userName?._id)
//               ?.map((value, i) => (
//                 <>
//                   <ListItemButton
//                     key={i}
//                     onClick={() =>
//                       navigate(`/chats/${value._id}`)
//                     }
//                     style={{ height: "50px" }}
//                   >
//                     <Avatar
//                       alt={value?.username}
//                       src={value?.image}
//                       sx={{ width: 40, height: 40 }}
//                     />
//                     &nbsp;&nbsp;
//                     {value.username}
//                   </ListItemButton>
//                   <Divider />
//                 </>
//               ))}
//           </List>
//         </Grid>
//       </div>
      
//     </div>
//   );
// };

// export default Chat;
