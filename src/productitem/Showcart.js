import React, { useEffect, useState } from "react";
import {
  TableRow,
  TableContainer,
  Paper,
  Typography,
  TableCell,
} from "@mui/material";
import { ErrorMessage, Field, Form, Formik } from "formik";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { Delete } from "@mui/icons-material";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import KeyboardTabIcon from "@mui/icons-material/KeyboardTab";
import style from "../cart.module.css";

const Showcart = () => {
  const Navigate = useNavigate();
  const initialValue = {
    quantity: "",
  };
  // const url = "http://localhost:4545/api/products/images";
  const token = localStorage.getItem("token");
  const [cart, setCart] = useState();
  const [deleteData, setDelete] = useState(true);

  useEffect(() => {
    axios
      .get("http://localhost:4545/api/products/showcart", {
        headers: { Authorization: ` ${token}` },
      })
      .then((response) => {
        setCart(response?.data?.products);
        toast.success(response.data.message);
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  }, [deleteData, token]);

  const deleteProduct = (productId) => {
    axios
      .delete(`http://localhost:4545/api/products/delete/${productId}`, {
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
        `http://localhost:4545/api/products/updatequantities/${productId}`,
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
      {cart?.length > 0 ? (
        <Formik initialValues={initialValue}>
          <Form>
            <TableContainer component={Paper} className={style.cartbackground}>
              <div>
                <center>
                  <h1
                   className={style.heading}
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
                <div
                  style={{
                    display: "flex",
                    marginLeft: "215px",
                    marginTop: "95px",
                  }}
                >
                  <div className={style.container}>
                    {cart?.map((value, i) => (
                      <div className={style.card} key={i}>
                        <button
                          type="button"
                          style={{ color: "red" }}
                          onClick={() => deleteProduct(value.productId)}
                        >
                          <Delete />
                        </button>

                        <TableRow key={i}>
                          <Typography>
                            <img
                              src={value.image}
                              alt={value.title}
                              className={style.image}
                            />
                          </Typography>
                          <div>
                            <TableRow>
                              <TableCell>
                                <Typography className={style.title}>Title:-{value.title}</Typography>
                              </TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell>
                                <Typography className={style.des}>
                                  Description:-{value.description}
                                </Typography>
                              </TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell>
                                <Typography>
                                  Price:-$
                                  {value.price.toFixed(2)}
                                </Typography>
                              </TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell>
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
                              </TableCell>
                            </TableRow>
                          </div>
                        </TableRow>
                      </div>
                    ))}
                  </div>
                </div>
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
              </div>
            </TableContainer>
          </Form>
        </Formik>
      ) : (
        "error"
      )}
    </>
  );
};

export default Showcart;
