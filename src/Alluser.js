import React, { useEffect, useState } from "react";
import {
  Typography,
  TableCell,
  TableRow,
  TableContainer,
} from "@mui/material";

import axios from "axios";
import { Outlet, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import style from "./cart.module.css";

const Dummy = () => {
  const Navigate = useNavigate();
  const initialValue = {
    username: "",
    firstname: "",
    lastname: "",
    email: "",
    image: "",
  };
  const [detail, setDetail] = useState(initialValue);
  const token = localStorage.getItem("token");
  const { id } = useParams();
  const url = "http://localhost:4545/api/products/images";
 
  useEffect(() => {
    const getUsersDetail = () => {
      axios
        .get("http://localhost:4545/api/products/user", {
          headers: { Authorization: ` ${token}` },
        })
        .then((response) => {
          setDetail(response?.data.newuser);
          // toast.success(response?.data?.message);
        });
    };
    getUsersDetail();
  }, [token,detail]);

  const updateuser = (e) => {
    const files = e.target.files[0];
    const formData = new FormData();
    formData.append("image", files);
    axios
      .put(`http://localhost:4545/api/products/imageupdate`, formData, {
        headers: { Authorization: ` ${token}` },
      })
      .then((response) => {
        setDetail(response?.data?.updatedUser);
        // getUsersDetail();
        toast.success(response?.data?.message);
      })
      .catch((error) => {
        toast.error(error?.response?.data.message);
      });
  };

  const logout = () => {
    localStorage.clear("token");
    setTimeout(() => {
      Navigate("/login");
    }, 500);
  };

  return (
    <div>
      {id ? (
        <Outlet />
      ) : (
        <center>
          <TableContainer className={style.profilebackground}>
            <div style={{ marginLeft: "800px", marginTop: "10px" }}>
              {/* <center> */}
              <h1
                style={{
                  fontSize: "40px",
                  textDecoration: "underline",
                  WebkitTextStroke: "medium",
                }}
              >
                PROFILE
              </h1>

              <div className={style.container}>
                <div
                  // style={{ display: "flex", marginLeft: "780px" }}
                  className={style.card}
                >
                  {/* <Card
                  sx={{
                    maxWidth: 450,
                    border: "1px solid #94a3b8",
                    textAlign: "-webkit-center",
                  }}
                >
                  <CardContent> */}
                  <Typography>
                    <div style={{ marginBottom: "20px" }}>
                      <label
                        htmlFor="image"
                        className=" px-6	text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 shadow-lg shadow-green-500/50 dark:shadow-lg dark:shadow-pink-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                      >
                        Change profile
                      </label>
                      <input
                        type="file"
                        name="image"
                        id="image"
                        style={{ display: "none" }}
                        onChange={updateuser}
                      />
                    </div>
                    <img
                      src={`${url}/${detail?.image}`}
                      className={style.image}
                      alt={detail?.title}
                    />
                  </Typography>

                  <TableRow>
                    <TableCell style={{ WebkitTextStroke: "medium" }}>
                      USERNAME:-
                    </TableCell>
                    <TableCell>
                      <Typography>{detail?.username}</Typography>
                    </TableCell>
                  </TableRow>
                  {/* <TableRow>
                      <TableCell style={{ WebkitTextStroke: "medium" }}>
                        FIRSTNAME:-
                      </TableCell>
                      <TableCell>
                        <Typography>{detail?.firstname}</Typography>
                      </TableCell>
                    </TableRow> */}
                  {/* <TableRow>
                      <TableCell style={{ WebkitTextStroke: "medium" }}>
                        LASTNAME:-
                      </TableCell>
                      <TableCell>
                        <Typography>{detail?.lastname}</Typography>
                      </TableCell>
                    </TableRow> */}
                  <TableRow>
                    <TableCell style={{ WebkitTextStroke: "medium" }}>
                      EMAIL:-
                    </TableCell>
                    <TableCell>
                      <Typography>{detail?.email}</Typography>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell style={{ WebkitTextStroke: "medium" }}>
                      Role:-
                    </TableCell>
                    <TableCell>
                      <Typography>{detail?.role}</Typography>
                    </TableCell>
                  </TableRow>
                  <Typography>
                    <button
                      className="text-gray-900 bg-gradient-to-r from-red-400 via-red-400 to-red-500 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                      onClick={() => Navigate(`/user/edits/${detail?._id}`)}
                    >
                      edit
                    </button>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <button
                      type="button"
                      onClick={logout}
                      className=" px-6	text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 shadow-lg shadow-green-500/50 dark:shadow-lg dark:shadow-pink-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                    >
                      LOGOUT
                    </button>
                  </Typography>
                  {/* </CardContent>
                </Card> */}
                </div>
              </div>
              {/* </center> */}
            </div>
          </TableContainer>
        </center>
      )}
    </div>
  );
};

export default Dummy;
