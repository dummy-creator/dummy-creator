import React, { useEffect, useState } from "react";
import {
  TableRow,
  TableContainer,
  Paper,
  Typography,
  Card,
  CardContent,
} from "@mui/material";
import { ErrorMessage, Field, Form, Formik } from "formik";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { Delete } from "@mui/icons-material";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import KeyboardTabIcon from "@mui/icons-material/KeyboardTab";

const Showcart = () => {
  const Navigate = useNavigate();
  const initialValue = {
    quantity: "",
  };
  const url = "http://localhost:5656/api/products/images";
  const token = localStorage.getItem("token");
  const [cart, setCart] = useState();
  const [deleteData, setDelete] = useState(true);

  useEffect(() => {
    axios
      .get("http://localhost:5656/api/products/showcart", {
        headers: { Authorization: ` ${token}` },
      })
      .then((response) => {
        setCart(response?.data?.products);
        toast.success(response.data.message);
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  }, [deleteData]);

  const deleteProduct = (productId) => {
    axios
      .delete(`http://localhost:5656/api/products/delete/${productId}`, {
        headers: { Authorization: ` ${token}` },
      })
      .then((response) => {
        setDelete(!deleteData);
        toast.success(response.data.message);
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  };

  const updateQuantity = (productId, quantity) => {
    axios
      .put(
        `http://localhost:5656/api/products/updatequantities/${productId}`,
        { quantity: quantity },
        {
          headers: { Authorization: ` ${token}` },
        }
      )
      .then((response) => {
        toast.success(response.data.message);
        setCart((prevCart) =>
          prevCart.map((product) =>
            product.productId === productId
              ? { ...product, quantity: quantity }
              : product
          )
        );
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  };

  const totalPrice = cart?.reduce((counttotal, item) => {
    return counttotal + item.quantity * item.price;
  }, 0);

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
          CART
        </h1>
      </center>
      <div
        style={{
          WebkitTextStroke: "medium",
          marginLeft: "100px",
          marginTop: "15px",
        }}
      >
        <button
          className="text-gray-900 bg-gradient-to-r from-red-400 via-red-400 to-red-500 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
          type="button"
          onClick={() => Navigate("/show")}
        >
          <KeyboardBackspaceIcon /> BACK
        </button>
      </div>
      {cart?.length > 0 ? (
        <center>
          <Formik initialValues={initialValue}>
            <Form>
              <TableContainer component={Paper}>
                <div
                  style={{
                    display: "flex",
                    marginLeft: "215px",
                    marginTop: "95px",
                  }}
                >
                  <div className="grid grid-cols-3 w-max h-max gap-20 max-sm:grid-cols-1">
                    {cart?.map((value, i) => (
                      <div className="shadow-2xl drop-shadow-2xl" key={i}>
                        <Card
                          sx={{ maxWidth: 450, border: "2px  solid  #94a3b8" }}
                        >
                          <button
                            type="button"
                            style={{ color: "red" }}
                            onClick={() => deleteProduct(value.productId)}
                          >
                            <Delete />
                          </button>
                          <CardContent>
                            <TableRow key={i}>
                              <Typography>
                                <img
                                  src={`${url}/${value.image}`}
                                  alt={value.title}
                                  className="mb-5 "
                                />
                              </Typography>
                              <Typography className="font-bold underline h-[4vh]  ">
                                Title:-{value.title}
                              </Typography>
                              <Typography className=" underline mb-8 uh-[9vh]">
                                Description:-{value.description}
                              </Typography>
                              {/* <Typography className="h-[5vh] ">
                              Stock:-{value.stock}
                            </Typography> */}
                              <Typography className="uh-[8vh]">
                                Price:-$
                                {value.price.toFixed(2)}
                              </Typography>
                              <Typography>
                                Quantity:-
                                <button
                                  type="button"
                                  onClick={() =>
                                    updateQuantity(
                                      value.productId,
                                      value.quantity - 1 || 1
                                    )
                                  }
                                  className="text-gray-900  bg-gradient-to-r from-lime-200 via-lime-400 to-lime-500 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-lime-300 dark:focus:ring-lime-800 font-medium rounded-lg text-sm px-3 py-1"
                                >
                                  -
                                </button>
                                <Field
                                  min={1}
                                  max={10}
                                  type="number"
                                  name={`quantity-${value.productId}`}
                                  value={value.quantity}
                                  onChange={(e) => {
                                    const quantity = e.target.value;
                                    updateQuantity(value.productId, quantity);
                                  }}
                                  className="text-gray-900  bg-white focus:ring-2 focus:ring-lime-300 dark:focus:ring-lime-800 font-medium rounded-lg text-sm px-3 py-1"
                                />
                                <ErrorMessage name=" quantity" />
                                <button
                                  type="button"
                                  onClick={() =>
                                    updateQuantity(
                                      value.productId,
                                      value.quantity + 1
                                    )
                                  }
                                  className="text-gray-900 bg-gradient-to-r from-lime-200 via-lime-400 to-lime-500 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-lime-300 dark:focus:ring-lime-800 font-medium rounded-lg text-sm px-3 py-1"
                                >
                                  +
                                </button>
                              </Typography>
                            </TableRow>
                          </CardContent>
                        </Card>
                      </div>
                    ))}
                  </div>
                </div>
              </TableContainer>
              <div style={{ display: "flex" }}>
                <h1
                  style={{
                    width: "220px",
                    marginBottom: "50px",
                    marginTop: "20px",
                    marginLeft: "1300px",
                    WebkitTextStroke: "medium",
                  }}
                  className="text-gray-900 bg-gradient-to-r from-yellow-200 via-yellow-400 to-yellow-500 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-yellow-300 dark:focus:ring-yellow-800 font-medium rounded-lg text-sm px-3 py-1"
                >
                  SUBTOTAL:-${totalPrice?.toFixed(2)}
                </h1>

                <button
                  type="button"
                  style={{
                    marginLeft: "15px",
                    width: "220px",
                    height: "30%",
                    marginTop: "20px",
                    marginBottom: "50px",
                    WebkitTextStroke: "medium",
                  }}
                  className="text-gray-900 bg-gradient-to-r from-yellow-200 via-yellow-400 to-yellow-500 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-yellow-300 dark:focus:ring-yellow-800 font-medium rounded-lg text-sm px-3 py-1"
                  onClick={() => Navigate("/checkout")}
                >
                  CHECKOUT <KeyboardTabIcon />
                </button>
              </div>
            </Form>
          </Formik>
        </center>
      ) : (
        "error"
      )}
    </>
  );
};

export default Showcart;
