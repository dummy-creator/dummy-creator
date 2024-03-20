import axios from 'axios';
import React, { useEffect, useState } from 'react'

const OrderSuccess = () => {
    const token = localStorage.getItem("token");
    const search = window.location.search;
    const params = new URLSearchParams(search);
    const session_id = params.get("session_id");
    const [error, setError] = useState();
  
    useEffect(() => {
      axios
        .get(`http://localhost:4545/api/products/singleordersuccess/${session_id}`, {
          headers: { Authorization: ` ${token}` },
        })
        .then((response) => {
          setError(response.data.message);
        });
    }, [session_id,token]);
  
    return (
      <div>
        <center>
          <div className="text-shadow-lg">
            <h1
              style={{
                fontSize: "40px",
                WebkitTextStroke: "medium",
              }}
            >
              {error}
            </h1>
          </div>
        </center>
      </div>
    );
}

export default OrderSuccess