import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

import axios from "axios";
import React, { useEffect, useState } from "react";
import { Outlet, useNavigate, useParams } from "react-router-dom";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";

import style from "../cart.module.css";

const Users = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const { id } = useParams();
  const [getall, setGetall] = useState();
  useEffect(() => {
    axios
      .get("http://localhost:4545/api/products/alluser", {
        headers: { Authorization: ` ${token}` },
      })
      .then((response) => {
        setGetall(response.data.userdata);
      });
  }, [id,token]);
  return (
    <>
      {id ? (
        <Outlet />
      ) : (
        <TableContainer className={style.userbackground}>
          <button
            style={{
              fontWeight: "bold",
              fontSize: "20px",
              marginLeft: "150px",
              marginTop: "10px",
              WebkitTextStroke: "medium",
            }}
            className="text-gray-900 bg-gradient-to-r from-red-400 via-red-400 to-red-500 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
            onClick={() => navigate("/productable")}
          >
            <KeyboardBackspaceIcon /> BACK
          </button>
          <center>
            <h1 className={style.heading}>USER DETAILS</h1>
          </center>

          <div
            style={{
              marginLeft: "250px",
              marginRight: "250px",
              marginTop: "80px",
            }}
          >
            <Table className={style.card}>
              <TableHead>
                <TableRow
                  style={{
                    fontWeight: "bold",
                    fontSize: "20px",
                    WebkitTextStroke: "medium",
                  }}
                >
                  <TableCell>ID</TableCell>
                  <TableCell>USERNAME</TableCell>
                  <TableCell>FIRSTNAME</TableCell>
                  <TableCell>LASTNAME</TableCell>
                  <TableCell>EMAIL</TableCell>
                  <TableCell>ROLE</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {getall?.map((value, i) => (
                  <TableRow key={i}>
                    <TableCell>{value?._id}</TableCell>
                    <TableCell>{value?.username}</TableCell>
                    <TableCell>{value?.firstname}</TableCell>
                    <TableCell>{value?.lastname}</TableCell>
                    <TableCell>{value?.email}</TableCell>
                    <TableCell>{value?.role}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </TableContainer>
      )}
    </>
  );
};

export default Users;
