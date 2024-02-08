import {
  Paper,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import style from "../cart.module.css";

const Singleproduct = () => {
  const [showsingleproduct, setShowsingleproduct] = useState();
  const [displayed, setDisplayed] = useState("image");
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
  return (
    <>
      <div>
        <TableContainer component={Paper} className={style.orderbackground1}>
          <center>
            <h1 className={style.heading}>product</h1>
          </center>
          <div
            style={{ display: "flex", marginLeft: "215px", marginTop: "95px" }}
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
                    {displayed === "video" && showsingleproduct?.videos && (
                      <video
                        src={showsingleproduct?.videos || null}
                        className={style.video}
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

                      {showsingleproduct?.videos && (
                        <video
                          src={showsingleproduct?.videos || null}
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
                  </div>
                </TableRow>
              </div>
            </div>
          </div>
        </TableContainer>
      </div>
    </>
  );
};

export default Singleproduct;
