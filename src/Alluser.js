import React, { useEffect, useState } from "react";
import {
  CardContent,
  Card,
  Typography,
  TableCell,
  TableRow,
} from "@mui/material";

import axios from "axios";
import { Outlet, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

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
  const url = "http://localhost:5656/api/products/images";
const getUsersDetail=()=>{
  axios
      .get("http://localhost:5656/api/products/user", {
        headers: { Authorization: ` ${token}` },
      })
      .then((response) => {
        setDetail(response?.data.newuser);
        toast.success(response?.data?.message);
      });
}
  useEffect(() => {
    getUsersDetail()
  }, [token,]);

  const updateuser = (e) => {
    const files = e.target.files[0];
    const formData = new FormData();
    formData.append("image", files);
    axios
      .put(`http://localhost:5656/api/products/imageupdate`, formData, {
        headers: { Authorization: ` ${token}` },
      })
      .then((response) => {
        setDetail(response?.data?.updatedUser);
        getUsersDetail()
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
    <>
      <center>
        <h1
          style={{
            fontSize: "40px",
            textDecoration: "underline",
            WebkitTextStroke: "medium",
          }}
        >
          PROFILE
        </h1>
      </center>
      {id ? (
        <Outlet />
      ) : (
        <div style={{ marginLeft: "10px", marginTop: "10px" }}>
          <button
            type="button"
            onClick={logout}
            className=" px-6	text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 shadow-lg shadow-green-500/50 dark:shadow-lg dark:shadow-pink-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
          >
            LOGOUT
          </button>
          <center>
            <div className="grid grid-cols-3 w-max h-max gap-20 max-sm:grid-cols-1">
              <div
                style={{ display: "flex", marginLeft: "780px" }}
                className="shadow-2xl drop-shadow-2xl"
              >
                <Card sx={{ maxWidth: 450, border: "1px solid #94a3b8" }}>
                  <CardContent>
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
                        style={{
                          maxWidth: "200px",
                          maxHeight: "150px",
                          borderRadius: "10px",
                        }}
                        className="mb-5 "
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
                    <TableRow>
                      <TableCell style={{ WebkitTextStroke: "medium" }}>
                        FIRSTNAME:-
                      </TableCell>
                      <TableCell>
                        <Typography>{detail?.firstname}</Typography>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell style={{ WebkitTextStroke: "medium" }}>
                        LASTNAME:-
                      </TableCell>
                      <TableCell>
                        <Typography>{detail?.lastname}</Typography>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell style={{ WebkitTextStroke: "medium" }}>
                        EMAIL:-
                      </TableCell>
                      <TableCell>
                        <Typography>{detail?.email}</Typography>
                      </TableCell>
                    </TableRow>
                    <Typography>
                      <button
                        className="text-gray-900 bg-gradient-to-r from-red-400 via-red-400 to-red-500 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                        onClick={() => Navigate(`/user/edits/${detail?._id}`)}
                      >
                        edit
                      </button>
                    </Typography>
                  </CardContent>
                </Card>
              </div>
            </div>
          </center>
        </div>
      )}
    </>
  );
};

export default Dummy;
