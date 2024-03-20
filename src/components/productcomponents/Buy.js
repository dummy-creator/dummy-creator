import {
  Paper,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
} from "@mui/material";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
import { Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import style from "../../cart.module.css";

const Buy = () => {
  const initialValue = {};
  const token = localStorage.getItem("token");
  const stripepublish =
    "pk_test_51OU6RHEGEcAgpKUXAp1d2TXdQ1mFtENKLKKvCKHgI4nKSuZCr1zuF9POZyV6MKm6Tgk02NR9SoLz5PDQC0jmMNws00o7veVcdH";
  const [showsingleproduct, setShowsingleproduct] = useState();
  const [displayed, setDisplayed] = useState("image");
  const [quantities, setQuantities] = useState();

  const { id } = useParams();
  useEffect(() => {
    axios
      .get(`http://localhost:4545/api/products/getproduct/${id}`)
      .then((response) => {
        setShowsingleproduct(response.data.product);
      });
  }, [id]);

  const handleshowClick = (e) => {
    setDisplayed(e);
  };

  const payment = async () => {
    const stripe = await loadStripe(stripepublish);

    const body = {
      products: showsingleproduct,
      quantities,
    };
console.log(body,"body")
    try {
      const response = await axios.post(
        `http://localhost:4545/api/products/paywithproduct/${id}`,
        body,
        {
          headers: { Authorization: ` ${token}` },
        }
      );

      const session = response.data;

      const result = await stripe.redirectToCheckout({
        sessionId: session.id,
      });
      console.log(result, "resiljjhsgfdhd");
    } catch (error) {
      console.error("Payment error", error);
    }
  };

  return (
    <>
      <div>
        <Formik initialValues={initialValue}>
          <Form>
          <TableContainer component={Paper} className={style.background}>
            <center>
              <h1 className={style.heading}>product</h1>
            </center>
            <div
              style={{
                display: "flex",
                marginLeft: "215px",
                marginTop: "95px",
              }}
            >
              <div className={style.singleproductcontainer}>
                <div className={style.ordercard}>
                  <h1 className="text-2xl font-bold mb-5 underline">VIEW</h1>
                  <TableRow>
                    <Typography>
                      {displayed === "image" && showsingleproduct?.image && (
                        <div style={{ display: "flex" }}>
                          {showsingleproduct?.image.map((data) => (
                            <img
                              src={data}
                              className={style.image}
                              alt={showsingleproduct?.title}
                              onClick={() => handleshowClick(null)}
                            />
                          ))}
                        </div>
                      )}
                      {displayed === "video" && showsingleproduct?.video && (
                        <video
                          src={showsingleproduct?.video || null}
                          className={style.videos}
                          autoPlay="autoplay"
                          loop
                          onClick={() => handleshowClick(null)}
                        />
                      )}
                      <br />

                      <div style={{ display: "flex" }}>
                        {showsingleproduct?.image.map((data, i) => (
                          <div>
                            <button
                              type="button"
                              onMouseOver={() => handleshowClick("image")}
                            >
                              <img
                                src={data}
                                className={style.image1}
                                alt={showsingleproduct?.title}
                              />
                            </button>
                          </div>
                        ))}

                        {showsingleproduct?.video && (
                          <video
                            src={showsingleproduct?.video || null}
                            autoPlay="autoplay"
                            className={style.image1}
                            onMouseOver={() => handleshowClick("video")}
                          />
                        )}
                      </div>
                    </Typography>
                    <h1 className="text-2xl font-bold mb-5 underline">
                      product detail
                    </h1>
                    <div>
                      <TableRow>
                        <TableCell>
                          <Typography>
                            TITLE:-{showsingleproduct?.title}
                          </Typography>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>
                          <Typography className={style.des}>
                            DESCRIPTION:-{showsingleproduct?.description}
                          </Typography>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>
                          <Typography>
                            PRICE:-${showsingleproduct?.price?.toFixed(2)}
                          </Typography>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>
                          <Typography>
                            STOCK:-{showsingleproduct?.stock}
                          </Typography>
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
                              defaultValue={1}
                              onChange={(e) =>
                                setQuantities((prev) => ({
                                  ...prev,
                                  [showsingleproduct?._id]: e.target.value,
                                }))
                              }
                              className={style.quantity}
                            />
                          </Typography>
                        </TableCell>
                      </TableRow>
                      <button
                        type="button"
                        onClick={payment}
                        className="text-gray-900 bg-gradient-to-r from-green-400 via-green-400 to-green-500 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                      >
                        BUY
                      </button>
                    </div>
                  </TableRow>
                </div>
              </div>
            </div>
          </TableContainer>
          </Form>
        </Formik>
      </div>
    </>
  );
};

export default Buy;
