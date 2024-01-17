import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
    TableRow,
    TableContainer,
    Table,
    TableBody,
    TableCell,
    Paper,
    Button,
} from '@mui/material';

import axios from 'axios';
import { toast } from 'react-toastify';

const Edits = () => {

    const initialValue = {
        username: '',
        firstname: '',
        lastname: '',
        email: '',
        image:'',
    }

    const navigate = useNavigate();
    const [update, setUpdates] = useState(initialValue);
    const token = localStorage.getItem("token");
    const { id } = useParams();
   
    
    useEffect(() => {
        axios
            .get(`http://localhost:5656/api/products/users/${id}`,{
                headers: { Authorization: ` ${token}` }
              })
            .then((response) => {
                setUpdates(response.data.user);
              
            })
            .catch((error) => {
                toast.error('Error fetching user data', error);
            });
    }, [id,token]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
    
        if (name === "image") {
          setUpdates((data) => ({ ...data, [name]: e.target.files[0] }));
        } else {
          setUpdates((data) => ({ ...data, [name]: value }));
        }
      };
      
      const submitHandler = () => {
        const formData = new FormData();
        formData.append("image", update.image);
        formData.append("username", update.username);
        formData.append("firstname", update.firstname);
        formData.append("lastname", update.lastname);   
        formData.append("email", update.email);
    

      
        axios
          .put(`http://localhost:5656/api/products/update/${id}`, formData, {
            headers: { Authorization: ` ${token}` }
          })
          .then((response) => {
            setUpdates(response?.data?.updatedUser);
            setTimeout(() => {
              navigate('/user');
            }, 500);
            toast.success(response?.data?.message);
          })
          .catch((error) => {
            toast.error(error?.response?.data.message);
          });
      };
      
    
    return (
        <>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableBody>
                        <div style={{ margin: 'auto', width: '25%' }}>
                            <TableRow>
                                <TableCell className="">Id</TableCell>
                                <TableCell>
                                    <input type="text" name="_id" value={update._id} disabled />
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell className="">Profile </TableCell>
                                <TableCell>
                                    <input type="file" name="image"  onChange={handleInputChange} />
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell style={{ fontWeight: 'bold' }}>USERNAME</TableCell>
                                <TableCell>
                                    <input
                                        type="text"
                                        name="username"
                                        value={update.username}
                                        onChange={handleInputChange}
                                    />
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell style={{ fontWeight: 'bold' }}>First Name</TableCell>
                                <TableCell>
                                    <input
                                        type="text"
                                        name="firstname"
                                        value={update.firstname}
                                        onChange={handleInputChange}
                                    />
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell style={{ fontWeight: 'bold' }}>Last Name</TableCell>
                                <TableCell>
                                    <input
                                        type="text"
                                        name="lastname"
                                        value={update.lastname}
                                        onChange={handleInputChange}
                                    />
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell style={{ fontWeight: 'bold' }}>Email</TableCell>
                                <TableCell>
                                    <input
                                        type="email"
                                        name="email"
                                        value={update.email}
                                        onChange={handleInputChange}
                                    />
                                </TableCell>
                            </TableRow>

                            <br />
                            <center>
                                <div>
                                    <Button variant="contained" type="button" onClick={submitHandler}>
                                        Update
                                    </Button>
                                </div>
                            </center>
                        </div>
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
};

export default Edits;
