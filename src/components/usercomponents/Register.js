import { Button, Table, TableCell } from "@mui/material";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import SaveIcon from "@mui/icons-material/Save";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useState } from "react";

const Register = () => {
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
    formData.append("password",values.password)
    formData.append("image", images);
    axios
      .post("http://localhost:4545/api/products/usersave", formData)
      .then((response) => {
        console.log(response.data.user);
        toast.success(response?.data?.message);
        resetForm();
        navigate("/login");
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
    <div>
      <center>
        <Formik
          initialValues={initialValue}
          onSubmit={handleSubmit}
          validationSchema={validation}
        >
          <Form>
            <TableContainer component={Paper} style={{marginTop:"40px"}}>
              <Table sx={{ minWidth: 100 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <tr>
                      <TableCell>
                        {" "}
                        <td>USERNAME</td>
                      </TableCell>
                      <TableCell>
                        {" "}
                        <Field
                          type="text"
                          name="username"
                          placeholder="username"
                        />
                        <ErrorMessage name="username" />
                      </TableCell>
                    </tr>
                    <tr>
                      <TableCell>
                        <td>FIRST NAME</td>
                      </TableCell>
                      <TableCell>
                        {" "}
                        <Field
                          type="firstname"
                          name="firstname"
                          placeholder="firstname"
                        />
                        <ErrorMessage name="firstname" />
                      </TableCell>
                    </tr>
                    <tr>
                      <TableCell>
                        {" "}
                        <td>LAST NAME</td>
                      </TableCell>
                      <TableCell>
                        {" "}
                        <Field
                          type="lastname"
                          name="lastname"
                          placeholder="lastname"
                        />
                        <ErrorMessage name="lastname" />
                      </TableCell>
                    </tr>
                    <tr>
                      <TableCell>
                        {" "}
                        <td>EMAIL</td>
                      </TableCell>
                      <TableCell>
                        {" "}
                        <Field type="email" name="email" placeholder="email" />
                        <ErrorMessage name="email" />
                      </TableCell>
                    </tr>
                    <tr>
                      <TableCell>
                        {" "}
                        <td>PASSWORD</td>
                      </TableCell>
                      <TableCell>
                        {" "}
                        <Field
                          type="password"
                          name="password"
                          placeholder="password"
                        />
                        <ErrorMessage name="password" />
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
    </div>
  );
};

export default Register;
