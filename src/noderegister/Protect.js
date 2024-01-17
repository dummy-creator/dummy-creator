import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

const Protect = (props) => {
    const [verified, setVerified] = useState(false);
    
    const location = useLocation();
    const navigate = useNavigate();
    const url = "http://localhost:5656/api/products/allproducts";
    const token = localStorage.getItem('token');

    useEffect(() => {
        if (!token) { 
            location.pathname==="/register"?navigate("/register"):
            navigate("/login");
            return;
        }
        axios.get(url, { headers: { "Authorization": ` ${token}` } })
            .then((res) => {
                console.log(res?.data?.product);
                setVerified(true); 
            }).catch((error) => {
                setVerified(false); 
                localStorage.removeItem("token");
           
                navigate("/login");
                toast.error(error.response?.data?.error);
            });
    }, [url, token, navigate]);

    if ((!token )&& (location.pathname === "/login" || location.pathname === "/register")) {
        return <props.Component />;
    }

    if (verified && (location.pathname === "/login" || location.pathname === "/register")) {
        navigate(-1);
        return null; 
    }

    return (
        <div>
            {<props.Component />}
        </div>
    );
}

export default Protect;
