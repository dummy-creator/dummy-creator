import { Button, Table, TableCell } from "@mui/material";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import { ErrorMessage, Field, Form, Formik } from "formik";
// import * as Yup from 'yup';
import SaveIcon from "@mui/icons-material/Save";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Product = () => {
  const Navigate = useNavigate();
  const [imges, setImages] = useState();
  const initialValue = {
    title: "",
    description: "",
    stock: "",
    price: "",
    image: "",
  };

  const handleSubmit = (values, { resetForm }) => {
    const formData = new FormData();
    formData.append("title", values.title);
    formData.append("description", values.description);
    formData.append("stock", values.stock);
    formData.append("price", values.price);
    formData.append("image", imges);
    resetForm();

    axios
      .post("http://localhost:5656/api/products/save", formData)
      .then((response) => {
        console.log(response.data.product);
        resetForm();
        Navigate("/show")
      })
      .catch((error) => {
        console.error(error.response.data.message);
      });
  };

  return (
    <>
      <center>
        <button
          type="button"
          className="text-gray-900 bg-gradient-to-r from-red-400 via-red-400 to-red-500 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
          onClick={() => Navigate("/show")}
        >
          CANCLE
        </button>
        <Formik initialValues={initialValue} onSubmit={handleSubmit}>
          <Form>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 100 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <tr>
                      <TableCell>
                        {" "}
                        <td>title</td>
                      </TableCell>
                      <TableCell>
                        {" "}
                        <Field type="text" name="title" placeholder="title" />
                        <ErrorMessage name="title" />
                      </TableCell>
                    </tr>
                    <tr>
                      <TableCell>
                        <td>description</td>
                      </TableCell>
                      <TableCell>
                        {" "}
                        <Field
                          type="text"
                          name="description"
                          placeholder="description"
                        />
                        <ErrorMessage name="description" />
                      </TableCell>
                    </tr>
                    <tr>
                      <TableCell>
                        {" "}
                        <td>stock</td>
                      </TableCell>
                      <TableCell>
                        {" "}
                        <Field type="number" name="stock" placeholder="stock" />
                        <ErrorMessage name="stock" />
                      </TableCell>
                    </tr>
                    <tr>
                      <TableCell>
                        {" "}
                        <td>price</td>
                      </TableCell>
                      <TableCell>
                        {" "}
                        <Field type="number" name="price" placeholder="price" />
                        <ErrorMessage name="price" />
                      </TableCell>
                    </tr>
                    <tr>
                      <TableCell>
                        {" "}
                        <td>Image</td>
                      </TableCell>
                      <TableCell colSpan={2}>
                        <input
                          type="file"
                          name="image"
                          onChange={(e) => setImages(e.target.files[0])}
                        />
                      </TableCell>
                    </tr>
                    <Button type="submit" variant="contained">
                      {<SaveIcon />}
                    </Button>
                  </TableRow>
                </TableHead>
              </Table>
            </TableContainer>
          </Form>
        </Formik>
      </center>
    </>
  );
};

export default Product;
