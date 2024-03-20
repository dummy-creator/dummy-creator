import { Card, CardContent, Table, TableCell } from "@mui/material";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableContainer from "@mui/material/TableContainer";
import { ErrorMessage, Field, Form, Formik } from "formik";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import style from "../../cart.module.css";

const AddProducts = () => {
  const Navigate = useNavigate();
  const [imges, setImages] = useState();
  const [videos, setVideos] = useState();

  const initialValue = {
    title: "",
    description: "",
    stock: "",
    price: "",
    quantity: "",
    image: "",
    video: "",
  };

  const handleSubmit = (values, { resetForm }) => {
    const formData = new FormData();
    formData.append("title", values.title);
    formData.append("description", values.description);
    formData.append("stock", values.stock);
    formData.append("price", values.price);
    formData.append("video", videos);
    formData.append("image", imges);

    resetForm();

    axios
      .post("http://localhost:4545/api/products/save", formData)
      .then((response) => {
        console.log(response.data.product);
        resetForm();
        Navigate("/show");
      })
      .catch((error) => {
        console.error(error?.response?.data?.message);
      });
  };

  
  
  return (
    <>
      <center>
        <Formik initialValues={initialValue} onSubmit={handleSubmit}>
          <Form>
            <center>
              <TableContainer className={style.background}>
                <h1
                  // style={{
                  //   fontSize: "40px",
                  //   textDecoration: "underline",
                  //   WebkitTextStroke: "medium",
                  //   marginTop: "15px",
                  // }}
               className={style.heading}
                  
                >
                  ADD PRODUCTS
                </h1>

                <Table sx={{ minWidth: 100 }} aria-label="simple table">
                  <div style={{ marginLeft: "10px", marginTop: "85px" }}>
                    <div className="grid w-max h-max gap-20 max-sm:grid-cols-1">
                      <div
                        style={{ display: "flex", marginLeft: "730px" }}
                        className="shadow-2xl drop-shadow-2xl"
                      >
                        <Card
                          sx={{
                            maxWidth: 450,
                            border: "1px solid #94a3b8",
                            textAlign: "-webkit-center",
                          }}
                        >
                          <CardContent>
                            <TableHead>
                              <TableRow>
                                <TableRow>
                                  <TableCell>title</TableCell>
                                  <TableCell>
                                    <Field
                                      type="text"
                                      name="title"
                                      placeholder="title"
                                    />
                                    <ErrorMessage name="title" />
                                  </TableCell>
                                </TableRow>
                                <TableRow>
                                  <TableCell>description</TableCell>
                                  <TableCell>
                                    {" "}
                                    <Field
                                      type="text"
                                      name="description"
                                      placeholder="description"
                                    />
                                    <ErrorMessage name="description" />
                                  </TableCell>
                                </TableRow>
                                <TableRow>
                                  <TableCell> stock</TableCell>
                                  <TableCell>
                                    {" "}
                                    <Field
                                      type="number"
                                      name="stock"
                                      placeholder="stock"
                                    />
                                    <ErrorMessage name="stock" />
                                  </TableCell>
                                </TableRow>
                                <TableRow>
                                  <TableCell> price</TableCell>
                                  <TableCell>
                                    {" "}
                                    <Field
                                      type="number"
                                      name="price"
                                      placeholder="price"
                                    />
                                    <ErrorMessage name="price" />
                                  </TableCell>
                                </TableRow>
                                {/* <TableRow>
                                  <TableCell> quantity</TableCell>
                                  <TableCell>
                                    {" "}
                                    <Field
                                      type="number"
                                      name="quantity"
                                      placeholder="quantity"
                                    />
                                    <ErrorMessage name="quantity" />
                                  </TableCell>
                                </TableRow> */}
                                <TableRow>
                                  <TableCell> Image</TableCell>
                                  <TableCell colSpan={2}>
                                    <input
                                      type="file"
                                      name="image"
                                      onChange={(e) =>
                                        setImages(e.target.files[0])
                                      }
                                    />
                                  </TableCell>
                                </TableRow>
                                <TableRow>
                                  <TableCell> Video</TableCell>
                                  <TableCell colSpan={2}>
                                    <input
                                      type="file"
                                      name="videos"
                                      onChange={(e) =>
                                        setVideos(e.target.files[0])
                                      }
                                    />
                                  </TableCell>
                                </TableRow>
                                <button
                                  type="button"
                                  className="text-gray-900 bg-gradient-to-r from-red-400 via-red-400 to-red-500 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                                  onClick={() => Navigate("/setting")}
                                >
                                  CANCLE
                                </button>
                                &nbsp;
                                <button
                                  type="submit"
                                  className="text-gray-900 bg-gradient-to-r from-green-400 via-green-400 to-green-500 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                                >
                                  SUBMIT
                                  {/* {<SaveIcon />} */}
                                </button>
                              </TableRow>
                            </TableHead>
                          </CardContent>
                        </Card>
                      </div>
                    </div>
                  </div>
                </Table>
              </TableContainer>
            </center>
          </Form>
        </Formik>
      </center>
    </>
  );
};

export default AddProducts;
