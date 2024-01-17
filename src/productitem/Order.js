import React, { useEffect, useState } from "react";
import axios from "axios";
import moment from "moment";
import {
  TableRow,
  Card,
  CardContent,
  Typography,
  TableContainer,
  Paper,
} from "@mui/material";
const Order = () => {
  const [success, setSuccess] = useState();
  const url = "http://localhost:5656/api/products/images";
  const token = localStorage.getItem("token");

  useEffect(() => {
    axios
      .get("http://localhost:5656/api/products/details", {
        headers: { Authorization: ` ${token}` },
      })
      .then((response) => {
        setSuccess(response.data.orders);
      });
  }, [token]);

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
          ORDER
        </h1>
      </center>

      <TableContainer component={Paper}>
        <div
          style={{ display: "flex", marginLeft: "215px", marginTop: "95px" }}
        >
          <div className="grid  w-max h-max gap-20 max-sm:grid-cols-1">
            {success?.map((value, i) => {
              return (
                <div className="shadow-2xl drop-shadow-2xl" key={i}>
                  <Card>
                    <CardContent>
                      <h1 className="text-2xl font-bold mb-5 underline">
                        ADDRESS
                      </h1>
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
                          <div key={i } className="m-2 p-4 border-2 ">
                            <Typography className="mb-4">
                              date:-
                              {moment(item.orderdetails.createdAt).format(
                                "DD-MM-YYYY"
                              )}
                            </Typography>
                            <Typography>
                              <img
                                src={`${url}/${item.product.image}`}
                                style={{
                                  maxWidth: "150px",
                                  maxHeight: "100px",
                                  borderRadius: "10px",
                                }}
                                className="mb-5"
                              />
                            </Typography>
                            <Typography className="mb-5">
                              Quantity: {item.orderdetails.quantity}
                            </Typography>
                            <Typography className="mb-2">
                              Price: ${item.orderdetails.price.toFixed(2)}
                            </Typography>
                            <Typography className="mb-2">
                              Title : {item.product.title}
                            </Typography>
                            <Typography className="mb-2">
                              Description: {item.product.description}
                            </Typography>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              );
            })}
          </div>
        </div>
      </TableContainer>
    </>
  );
};

export default Order;
