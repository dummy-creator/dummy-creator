import {
  Dialog,
  IconButton,
  Pagination,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";
import axios from "axios";

import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import VisibilityIcon from "@mui/icons-material/Visibility";
import React, { useEffect, useState } from "react";
import CancelPresentationIcon from "@mui/icons-material/CancelPresentation";
import style from "../../cart.module.css";

const OrderTable = () => {
  const token = localStorage.getItem("token");
  const [order, setOrder] = useState();
  const [showdetail, setDetails] = useState();
  const [searchQuery, setSearchQuery] = useState("");
  const [users, setUser] = useState();
  const [views, setviews] = useState(false);
  const [page, setPage] = useState(1);

  const [row, setRow] = useState();
  const productsdetail = () => {
    axios
      .get(`http://localhost:4545/api/products/pagination?page=${page}`, {
        headers: { Authorization: ` ${token}` },
      })
      .then((response) => {
        setOrder(response.data.orders);
        setRow(response.data.totalpage);
      });
  };

  const user = () => {
    axios
      .get("http://localhost:4545/api/products/user", {
        headers: { Authorization: ` ${token}` },
      })
      .then((response) => {
        setUser(response?.data.newuser);
      });
  };

  useEffect(() => {
    productsdetail();
    user();
  }, [token, row, page]);

  const view = (_id) => {
    setviews(true);
    axios
      .get(`http://localhost:4545/api/products/detailsdata/${_id}`, {
        headers: { Authorization: ` ${token}` },
      })
      .then((response) => setDetails(response?.data.ordershow.showorder));
  };
  const handleClose = () => {
    setviews(false);
  };

  const deletedata = (_id) => {
    const filterid = order.filter((orderItem) => orderItem._id !== _id);
    setOrder(filterid);
  };

  const handlechaneg = (event, value) => {
    setPage(value);
  };

  return (
    <div>
      <TableContainer className={style.background}>
        <center>
          <h1 className={style.heading}>Order Details Table</h1>

          <div>
            <TextField
              style={{
                backgroundColor: "cyan",
                color: "black",
                marginBottom: "40px",
                marginTop: "60px",
              }}
              type="text"
              placeholder="Search..."
              label="SEARCH HERE"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="rounded-lg"
            />
          </div>
          <br />
        </center>
        <div style={{ width: "75%", marginLeft: "300px" }}>
          <Table className="border-4 bg-sky-400 border-x-4 border-indigo-800 ">
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
                <TableCell>ADDRESS</TableCell>
                <TableCell>TITLE</TableCell>
                <TableCell>ACTION</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {order
                ?.filter((value) =>
                  value.details?.some((item) =>
                    item.product.title
                      .toLowerCase()
                      .includes(searchQuery.toLowerCase())
                  )
                )
                .map((value, i) => (
                  <TableRow key={i}>
                    <TableCell>{value?._id}</TableCell>
                    <TableCell>{users.username}</TableCell>
                    <TableCell>
                      {value.address.city}, {value.address.state},{" "}
                      {value.address.country}
                      {value.address.line1}, {value.address.line2}{" "}
                      {value.address.postal_code}
                    </TableCell>
                    <TableCell>
                      {value.details?.map((item) => (
                        <div>{item.product.title}</div>
                      ))}
                    </TableCell>
                    <TableCell>
                      <button
                        type="button"
                        onClick={() => deletedata(value?._id)}
                      >
                        <DeleteForeverIcon />
                      </button>
                      &nbsp;&nbsp;&nbsp;&nbsp;
                      <IconButton
                        aria-label="view"
                        style={{ color: "purple" }}
                        onClick={() => view(value?._id)}
                      >
                        {<VisibilityIcon />}
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </div>
        <Stack spacing={2}>
        <Pagination
          page={page}
          count={row}
          onChange={handlechaneg}
          // className={style.paginationbackground}
          style={{ marginLeft: "300px" ,marginRight:"1250px",backgroundColor:"white",marginTop:"10px",borderRadius:"45px"}}
        />
        </Stack>
      </TableContainer>
      <Dialog open={views} className="border border-indigo-600"  style={{borderRadius:"20px"}} >
        <TableContainer component={Paper}>
          {showdetail?.map((value) => (
            <div>
            <Table sx={{ minWidth: 350 }} aria-label="simple table" >
              <TableHead>
                <TableRow className="border-8 bg-violet-400 border-x-4 border-indigo-800 ">
                  <TableRow>
                    <TableCell
                      style={{
                        fontSize: "18px",
                        WebkitTextStroke: "medium",
                      }}
                    >
                      ID:-
                    </TableCell>
                    <TableCell>{showdetail[0]?._id}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell
                      style={{
                        fontSize: "15px",
                        WebkitTextStroke: "medium",
                      }}
                    >
                      USERNAME:-
                    </TableCell>
                    <TableCell>{users?.username}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell
                      style={{
                        fontSize: "15px",
                        WebkitTextStroke: "medium",
                      }}
                    >
                      ADDRESS:-
                    </TableCell>
                    <TableCell>
                      {value?.address?.city} {value?.address?.country}{" "}
                      {value?.address?.state} ,{value?.address?.line1} ,
                      {value?.address?.line2} ,{value?.address?.postal_code} ,
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell
                      style={{
                        fontSize: "15px",
                        WebkitTextStroke: "medium",
                      }}
                    >
                      TITLE:-
                    </TableCell>
                    <TableCell style={{ display: "flex" }}>
                      {value.details.map((item) => (
                        <div>
                          {item?.product?.title}

                          <img
                            src={item?.product?.image}
                            style={{ height: "100px", width: "100px" }}
                            alt={item.product.title}
                          />
                        </div>
                      ))}
                    </TableCell>
                  </TableRow>

                  <TableRow>
                    <IconButton
                      style={{ color: "black" }}
                      onClick={handleClose}
                    >
                      <CancelPresentationIcon />
                    </IconButton>
                  </TableRow>
                </TableRow>
              </TableHead>
            </Table>
            </div>
          ))}
        </TableContainer>
      </Dialog>
    </div>
  );
};

export default OrderTable;
