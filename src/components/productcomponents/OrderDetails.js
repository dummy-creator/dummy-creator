import React, { useEffect, useState } from "react";
import axios from "axios";
import moment from "moment";
import {
  Typography,
  TableContainer,
  Paper,
  IconButton,
} from "@mui/material";
import RedeemIcon from "@mui/icons-material/Redeem";
import { useNavigate } from "react-router-dom";
import style from "../../cart.module.css";


const OrderDetails = () => {
  const [success, setSuccess] = useState();
  const navigate = useNavigate();
  // const url = "http://localhost:4545/api/products/images";
  const token = localStorage.getItem("token");

  // const singleorder=()=>{
  //   axios
  //   .get("http://localhost:4545/api/products/singleordersuccess",{
  //     headers: { Authorization: ` ${token}` },
  //   }).then((response)=>{
  //     console.log(response.data.)
  //   })
  // }
  useEffect(() => {
    axios
      .get("http://localhost:4545/api/products/details", {
        headers: { Authorization: ` ${token}` },
      })
      .then((response) => {
        setSuccess(response.data.orders);
      });
  }, [token]);

  return (
    <>
      <TableContainer component={Paper} className={style.background}>
        <center>
          <h1
            className={style.heading}
          >
            ORDER
            <IconButton
              onClick={() => navigate("/ordertable")}
              style={{ marginLeft: "50px", color: "red" }}
            >
              <RedeemIcon />
            </IconButton>
          </h1>
        </center>
        <div
          style={{ display: "flex", marginLeft: "450px", marginTop: "95px" }}
        >
          <div className={style.cartcontainer}>
            {success?.map((value, i) => {
              return (
                <div className={style.ordercard} key={i}>
                  <h1 className="text-2xl font-bold mb-5 underline">ADDRESS</h1>
                  <Typography className="mb-5 font-bold">
                    {value.address.city}, {value.address.state},{" "}
                    {value.address.country}
                    {value.address.line1}, {value.address.line2}{" "}
                    {value.address.postal_code}
                  </Typography>
                  <h1 className="text-2xl font-bold mb-5 underline">
                    ORDER ITEMS
                  </h1>
                  <div>
                    {value.details.map((item, i) => (
                      <div key={i} className="m-2 p-4 border-2 ">
                        <Typography className="mb-4">
                          date:-
                          {moment(item.orderdetails.createdAt).format(
                            "DD-MM-YYYY"
                          )}
                        </Typography>
                        <Typography>
                          <img
                            src={item.product.image}
                            style={{
                              maxWidth: "150px",
                              maxHeight: "100px",
                              borderRadius: "10px",
                            }}
                            alt={item.product.title}
                          />
                        </Typography>
                        <Typography className="mb-5">
                          QUANTITY: {item.orderdetails.quantity}
                        </Typography>
                        <Typography className="mb-2">
                          PRICE: ${item.orderdetails.price.toFixed(2)}
                        </Typography>
                        <Typography className="mb-2">
                          TITLE : {item.product.title}
                        </Typography>
                        <Typography className="mb-2">
                          DESCRIPTION: {item.product.description}
                        </Typography>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </TableContainer>
    </>
  );
};

export default OrderDetails;
