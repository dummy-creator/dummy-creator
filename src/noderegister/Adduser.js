import {  Card, CardContent, Table, TableCell } from "@mui/material";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useState } from "react";

const Adduser = () => {
  const navigate = useNavigate();
  const [images, setImages] = useState();
  const initialValue = {
    username: "",
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    image: "",
  };

  const handleSubmit = (values, { resetForm }) => {
    const formData = new FormData();
    formData.append("username", values.username);
    formData.append("firstname", values.firstname);
    formData.append("lastname", values.lastname);
    formData.append("email", values.email);
    formData.append("password", values.password);
    formData.append("image", images);
    axios
      .post("http://localhost:4545/api/products/usersave", formData)
      .then((response) => {
        console.log(response.data.user);
        toast.success(response?.data?.message);
        resetForm();
        navigate("/alluser");
      })
      .catch((error) => {
        toast.error(error?.response?.data.message);
      });
  };

  const validation = Yup.object().shape({
    username: Yup.string()
      .min(4, "Too Short!")
      .max(10, "Too Long!")
      .required("username requied"),
    firstname: Yup.string()
      .min(4, "Too Short!")
      .max(10, "Too Long!")
      .required("first name is required"),
    lastname: Yup.string()
      .min(5, "Too Short!")
      .max(10, "Too Long!")
      .required("lasname is required"),
    email: Yup.string().email("Invalid email").required("email is required"),
    password: Yup.string()
      .required("password is required.")
      .min(6, "Password is too short - should be 8 chars minimum.")
      .matches(/[a-zA-Z]/, "Password can only contain Latin letters."),
  });
  return (
    <>
      {" "}
      <center>
        <h1
          style={{
            fontSize: "40px",
            textDecoration: "underline",
            WebkitTextStroke: "medium",
          }}
        >
          ADD USER
        </h1>
      </center>
      <div>
        <center>
          <Formik
            initialValues={initialValue}
            onSubmit={handleSubmit}
            validationSchema={validation}
          >
            <Form>
              <Table>
                <div style={{ marginLeft: "10px", marginTop: "10px" }}>
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
                                <TableCell>USERNAME</TableCell>
                                <TableCell>
                                  <Field
                                    type="text"
                                    name="username"
                                    placeholder="username"
                                  />
                                  <ErrorMessage name="username" />
                                </TableCell>
                              </TableRow>
                              <TableRow>
                                <TableCell>FIRST NAME</TableCell>
                                <TableCell>
                                  <Field
                                    type="firstname"
                                    name="firstname"
                                    placeholder="firstname"
                                  />

                                  <ErrorMessage name="firstname" />
                                </TableCell>
                              </TableRow>
                              <TableRow>
                                <TableCell>LAST NAME</TableCell>
                                <TableCell>
                                  <Field
                                    type="lastname"
                                    name="lastname"
                                    placeholder="lastname"
                                  />
                                  <ErrorMessage name="lastname" />
                                </TableCell>
                              </TableRow>
                              <TableRow>
                                <TableCell>EMAIL</TableCell>
                                <TableCell>
                                  <Field
                                    type="email"
                                    name="email"
                                    placeholder="email"
                                  />
                                  <ErrorMessage name="email" />
                                </TableCell>
                              </TableRow>
                              <TableRow>
                                <TableCell>PASSWORD</TableCell>
                                <TableCell>
                                  <Field
                                    type="password"
                                    name="password"
                                    placeholder="password"
                                  />
                                  <ErrorMessage name="password" />
                                </TableCell>
                              </TableRow>
                              <TableRow>
                                <TableCell>IMAGE</TableCell>
                                <TableCell>
                                  <input
                                    type="file"
                                    name="image"
                                    onChange={(e) =>
                                      setImages(e.target.files[0])
                                    }
                                  />
                                </TableCell>
                              </TableRow>
                              <button
                                type="button"
                                className="text-gray-900 bg-gradient-to-r from-red-400 via-red-400 to-red-500 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                                onClick={() => navigate("/productable")}
                              >
                                CANCLE
                              </button>
                              <button
                                type="submit"
                                className="text-gray-900 bg-gradient-to-r from-green-400 via-green-400 to-green-500 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                                variant="contained"
                              >
                                SUBMIT
                              </button>
                            </TableRow>
                          </TableHead>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                </div>
              </Table>
            </Form>
          </Formik>
        </center>
      </div>
    </>
  );
};

export default Adduser;
