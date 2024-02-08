import axios from 'axios';
import { Button, Table, TableCell } from '@mui/material';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableContainer from '@mui/material/TableContainer';
import Paper from '@mui/material/Paper';
import { Field, Form, Formik } from 'formik';
// import * as Yup from 'yup';/
import SaveIcon from '@mui/icons-material/Save';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
// import { toast } from 'react-toastify';

const Login = () => {
    const navigate = useNavigate();
    const [error, setError] = useState("");

    const initialValues = {
        email: "",
        password: "",
    }
    const handleSubmit = (values, { resetForm }) => {
        axios
            .post("http://localhost:4545/api/products/login", {
                email: values?.email,
                password: values?.password,
            })
            .then((response) => {
                const token = response?.data?.token;
                if (token) {
                    localStorage.setItem('token', token);
                    resetForm();
                    // toast.success("Login successfully");
                    navigate("/show");
                }
            })
            .catch((error) => {
                setError(error.response?.data.message);
            });
    }

    // const validationSchema = Yup.object().shape({
    //     email: Yup.string().email('Invalid email').required('email is required'),
    //     password: Yup.string().required('No password provided.') .min(8, 'Password is too short - should be 8 chars minimum.').matches(/[a-zA-Z]/, 'Password can only contain Latin letters.')
    // });
    return (
        <center>
 <h1 className="bg-clip-text font-extrabold text-4xl" style={{marginTop:"100px"}} >
                                Sign in to your account
                            </h1>
            <div style={{marginTop:"30px"}}>
                <Formik initialValues={initialValues} onSubmit={handleSubmit} >


                    <Form>
                        <TableContainer component={Paper}>
                           
                            <Table sx={{ minWidth: 100 }} aria-label="simple table">
                                <TableHead >
                                    <div
                                        style={{ margin: "auto", width: "25%" }} className="box-content h-50 w-50 p-6 border-4 border-gray-400 bg-cyan-200 rounded-lg bg-gradient-to-b from-rose-600 to-cyan-700">
                                        <TableRow >
                                            <TableCell>EMAIL</TableCell>
                                            <TableCell>
                                                <Field type="email" name="email" placeholder="email" />
                                                {/* <ErrorMessage name='email'/> */}
                                            </TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>PASSWORD</TableCell>
                                            <TableCell>
                                                <Field type="password" name="password" placeholder="password" />
                                                {/* <ErrorMessage name='password' /> */}
                                            </TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell colSpan={2}>
                                                <Button type="submit" variant='contained' startIcon={<SaveIcon />}>
                                                    Submit
                                                </Button>&nbsp;&nbsp;&nbsp;&nbsp;
                                                <Button type="submit" variant='contained' onClick={()=>navigate("/register")}>
                                                    Register
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                        
                                    </div>
                                </TableHead>
                            </Table>
                        </TableContainer>
                        <div style={{ color: "red" }}>{error && error}</div>
                    </Form>
                </Formik>
            </div>
        </center>

    );
}

export default Login;
