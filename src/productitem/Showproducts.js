import {
  TableRow,
  TableContainer,
  Paper,
  Typography,
  Card,
  CardContent,
} from "@mui/material";
import { Form, Formik } from "formik";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Showproducts = () => {
  const navigate = useNavigate();
  const url = "http://localhost:5656/api/products/images";
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

  useEffect(() => {
    axios.get("http://localhost:5656/api/products").then((response) => {
      setShow(response?.data?.product);
    });
  }, [url]);

  const AddToCart = (productId) => {
    axios
      .post(
        "http://localhost:5656/api/products/add-to-cart",
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
          PRODUCTS
        </h1>
      </center>
      <div style={{ marginLeft: "10px", marginTop: "10px", display: "flex" }}>
        <button
          type="button"
          onClick={logout}
          className=" px-6	text-white bg-gradient-to-r from-purple-400 via-purple-500 to-purple-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 shadow-lg shadow-purple-500/50 dark:shadow-lg dark:shadow-pink-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
        >
          LOGOUT
        </button>
        {/* <button
          onClick={() => navigate("/cart")}
          style={{ marginLeft: "1660px", color: "red" }}
        >
          <ShoppingCartIcon  />
        </button> */}
      </div>

      <center>
        <Formik initialValues={initialValue}>
          <Form>
            <TableContainer component={Paper}>
              <div
                style={{
                  display: "flex",
                  paddingLeft: "250px",
                  marginTop: "95px",
                }}
              >
                <div className="grid grid-cols-3 w-max h-max gap-20 max-sm:grid-cols-1">
                  {show?.map((value, i) => (
                    <div className="shadow-2xl drop-shadow-2xl">
                      <Card
                        key={i}
                        sx={{ maxWidth: 450, border: "1px  solid  #94a3b8" }}
                      >
                        <CardContent>
                          <TableRow key={i}>
                            <Typography>
                              <img
                                src={`${url}/${value.image}`}
                                alt={value.title}
                                style={{
                                  maxWidth: "300px",
                                  maxHeight: "250px",
                                  borderRadius: "10px",
                                }}
                                className="mb-5 "
                              />
                            </Typography>
                            <Typography className=" underline h-[4vh] ">
                              Title:-{value.title}
                            </Typography>
                            <Typography className=" underline uh-[9vh] ">
                              Description:-{value.description}
                            </Typography>
                            <Typography className="uh-[2vh] ">
                              Price:-${value.price?.toFixed(2)}
                            </Typography>
                            <Typography className="h-[4vh] ">
                              Stock:-{value.stock}
                            </Typography>
                            <Typography>
                              Quantity:-
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
                              />
                            </Typography>
                          </TableRow>
                          <Typography style={{ marginTop: "10px" }}>
                            <button
                              className="text-gray-900 bg-gradient-to-r from-lime-200 via-lime-400 to-lime-500 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-lime-300 dark:focus:ring-lime-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                              type="button"
                              onClick={() => AddToCart(value._id)}
                            >
                              Add to cart
                            </button>
                          </Typography>
                        </CardContent>
                      </Card>
                    </div>
                  ))}
                </div>
              </div>
            </TableContainer>
          </Form>
        </Formik>
      </center>
    </>
  );
};

export default Showproducts;
