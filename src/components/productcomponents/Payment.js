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
import { useNavigate } from "react-router-dom";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import KeyboardTabIcon from "@mui/icons-material/KeyboardTab";
import { loadStripe } from "@stripe/stripe-js";
import style from "../../cart.module.css"
const Payment = () => {
  const Navigate = useNavigate();
  const [checkout, setCheckout] = useState();

  // const url = "http://localhost:4545/api/products/images";

  const token = localStorage.getItem("token");

  const stripepublish =
    "pk_test_51OU6RHEGEcAgpKUXAp1d2TXdQ1mFtENKLKKvCKHgI4nKSuZCr1zuF9POZyV6MKm6Tgk02NR9SoLz5PDQC0jmMNws00o7veVcdH";

  useEffect(() => {
    axios
      .get("http://localhost:4545/api/products/showcart", {
        headers: { Authorization: ` ${token}` },
      })
      .then((response) => {
        setCheckout(response?.data?.products);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [token]);

  const totalPrice = checkout?.reduce((counttotal, item) => {
    return counttotal + item.quantity * item.price;
  }, 0);

  const payment = async () => {
    const stripe = await loadStripe(stripepublish);
   
    const body = {
      products: checkout,
    };
    try {
      const response = await axios.post(
        "http://localhost:4545/api/products/payment",
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
    <div>
    
      <TableContainer className={style.background}>
      <div style={{ display: "flex" ,marginLeft: '240px' }} >
        <button
          style={{
            fontWeight: "bold",
            fontSize: "20px",
            marginLeft: "150px",
            marginTop: "10px",
            WebkitTextStroke: "medium",
          }}
          className="text-gray-900 bg-gradient-to-r from-red-400 via-red-400 to-red-500 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
          onClick={() => Navigate("/cart")}
        >
          <KeyboardBackspaceIcon /> BACK
        </button>

        <h1
          style={{
            marginLeft: "420px",
            // fontWeight: "bold",
            fontSize: "40px",
            textDecoration: "underline",
            WebkitTextStroke: "medium",
          }}
        >
          ORDER DETAIL
        </h1>
      </div>
<div style={{marginLeft: '300px',marginRight:"60px"}} className={style.settingcart}>

        <Table>
          <TableHead>
            <TableRow>
              <TableCell
                style={{
                  fontWeight: "bold",
                  fontSize: "20px",
                  WebkitTextStroke: "medium",
                }}
              >
                TITLE
              </TableCell>
              <TableCell
                style={{
                  fontWeight: "bold",
                  fontSize: "20px",
                  WebkitTextStroke: "medium",
                }}
              >
                DESCRIPTION
              </TableCell>
              <TableCell
                style={{
                  fontWeight: "bold",
                  fontSize: "20px",
                  WebkitTextStroke: "medium",
                }}
              >
                QUANTITY
              </TableCell>
              <TableCell
                style={{
                  fontWeight: "bold",
                  fontSize: "20px",
                  WebkitTextStroke: "medium",
                }}
              >
                PRICE
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {checkout?.map((value, i) => (
              <TableRow key={i}>
                <TableCell>{value?.title}</TableCell>
                <TableCell>{value?.description}</TableCell>
                {/* <TableCell>
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
                            </TableCell> */}
                <TableCell>
                  {value?.quantity} x ${value.price?.toFixed(2)}
                </TableCell>
                <TableCell>
                  ${(value?.price * value.quantity).toFixed(2)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <div >
          <h1
            style={{
              fontWeight: "bold",
              fontSize: "20px",
              marginLeft: "1235px",
              textDecoration: "underline",
            }}
          >
            SUBTOTAL :-${totalPrice?.toFixed(2)}
          </h1>
          <button
            style={{ marginLeft: "1364px", WebkitTextStroke: "medium" }}
            type="button"
            onClick={payment}
            className="text-gray-900 bg-gradient-to-r from-green-400 via-green-400 to-green-500 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
          >
            pay
            <KeyboardTabIcon />
          </button>
        </div>
      </div>
      
      </TableContainer>
     
    </div>
  );
};

export default Payment;
