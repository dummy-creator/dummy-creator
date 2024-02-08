import {
  TableRow,
  TableContainer,
  Paper,
  Typography,
  TableCell,
  Button,
} from "@mui/material";
import { Form, Formik } from "formik";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import style from "../cart.module.css";
import "../App.css";
import Carousel from "react-material-ui-carousel";
// import { Carousel } from 'react-responsive-carousel';
const Showproducts = () => {
  const navigate = useNavigate();
  // const url = "http://localhost:4545/api/products/images";
  const initialValue = {
    title: "",
    description: "",
    stock: "",
    price: "",
    image: "",
    quantity: "",
  };

  const token = localStorage.getItem("token");
  const [show, setShow] = useState();
  const [quantities, setQuantities] = useState({});
  const [limit, setlimt] = useState(6);
  const [page, setPage] = useState();

  useEffect(() => {
    axios
      .get(
        `http://localhost:4545/api/products/allproducts/?page=${page}&limit=${limit}`,
        {
          headers: { Authorization: ` ${token}` },
        }
      )
      .then((response) => {
        setShow(response?.data?.product);
        console.log(response?.data?.product);

        setPage(response.data.currentPage);
      });
  }, [limit, page, token]);

  const AddToCart = (productId) => {
    axios
      .post(
        "http://localhost:4545/api/products/add-to-cart",
        {
          productId: productId,
          quantity: quantities[productId] || 1,
        },
        { headers: { Authorization: ` ${token}` } }
      )
      .then((res) => {
        toast.success(res.data.message);
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  };

  const logout = () => {
    localStorage.clear("token");
    setTimeout(() => {
      navigate("/login");
    }, 500);
  };

  const loadMoreItems = () => {
    setlimt(limit + 6);
  };

  return (
    <>
      <div>
        <div>
          <center>
            <Formik initialValues={initialValue}>
              <Form>
                <TableContainer component={Paper} className={style.background}>
                  <center>
                    <h1
                      className={style.heading}
                      // style={{
                      //   fontSize: "40px",
                      //   textDecoration: "underline",
                      //   WebkitTextStroke: "medium",
                      // }}
                    >
                      PRODUCTS
                    </h1>
                  </center>
                  <div
                    style={{
                      marginLeft: "10px",
                      marginTop: "10px",
                      display: "flex",
                    }}
                  >
                    <button
                      type="button"
                      onClick={logout}
                      className=" px-6	text-white bg-gradient-to-r from-purple-400 via-purple-500 to-purple-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 shadow-lg shadow-purple-500/50 dark:shadow-lg dark:shadow-pink-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                    >
                      LOGOUT
                    </button>
                  </div>
                  <div className={style.container}>
                    {show?.map((value, i) => (
                      <div className={style.card}>
                        <button
                          type="button"
                          onClick={() =>
                            navigate(`/show/singleproduct/${value?._id}`)
                          }
                        >
                          <TableRow key={i}>
                            <Typography>
                              {(value?.videos && value.image && (
                                <Carousel autoPlay>
                                  {value?.image.map((data) => (
                                    <img
                                      src={data}
                                      className={style.image}
                                      alt={value?.title}
                                    />
                                  ))}
                                  {/* <img
                                  src={value.image}
                                  alt={value.title}
                                  className={style.image}
                                /> */}

                                  {value?.videos && (
                                    <video
                                      width="400"
                                      src={value?.videos || null}
                                      className={style.image}
                                      controls
                                    />
                                  )}
                                </Carousel>
                              )) || (
                                <img
                                  src={value.image}
                                  alt={value.title}
                                  className={style.image}
                                />
                              )}
                              <br />
                            </Typography>
                            <div>
                              <TableRow>
                                <TableCell>
                                  <Typography className={style.title}>
                                    TITLE:-{value.title}
                                  </Typography>
                                </TableCell>
                              </TableRow>
                              <TableRow>
                                <TableCell>
                                  <Typography className={style.des}>
                                    DESCRIPTION:-{value.description}
                                  </Typography>
                                </TableCell>
                              </TableRow>
                              <TableRow>
                                <TableCell>
                                  <Typography>
                                    PRICE:-${value.price?.toFixed(2)}
                                  </Typography>
                                </TableCell>
                              </TableRow>
                              <TableRow>
                                <TableCell>
                                  <Typography>STOCK:-{value.stock}</Typography>
                                </TableCell>
                              </TableRow>
                              <TableRow>
                                <TableCell>
                                  <Typography>
                                    QUANTITY:-
                                    <input
                                      min={1}
                                      max={10}
                                      type="number"
                                      name={`quantity-${value._id}`}
                                      value={quantities[value._id] || 1}
                                      onChange={(e) =>
                                        setQuantities((prev) => ({
                                          ...prev,
                                          [value._id]: e.target.value,
                                        }))
                                      }
                                      className={style.quantity}
                                    />
                                  </Typography>
                                </TableCell>
                              </TableRow>
                            </div>
                          </TableRow>
                        </button>

                        <Typography style={{ marginTop: "10px" }}>
                          <button
                            className="text-gray-900 bg-gradient-to-r from-lime-200 via-lime-400 to-lime-500 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-lime-300 dark:focus:ring-lime-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                            type="button"
                            onClick={() => AddToCart(value._id)}
                          >
                            ADD TO CART
                          </button>
                        </Typography>
                      </div>
                    ))}
                  </div>
                  <div>
                    <Button variant="contained" onClick={loadMoreItems}>
                      Load more
                    </Button>
                  </div>
                </TableContainer>
              </Form>
            </Formik>
          </center>
        </div>
      </div>
    </>
  );
};

export default Showproducts;
