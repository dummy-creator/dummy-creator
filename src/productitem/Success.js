import React, { useEffect, useState } from "react";
import axios from "axios";
const Success = () => {
  const token = localStorage.getItem("token");
  const search = window.location.search;
  const params = new URLSearchParams(search);
  const session_id = params.get("session_id");
  const [error, setError] = useState();

  useEffect(() => {
    axios
      .get(`http://localhost:5656/api/products/success/${session_id}`, {
        headers: { Authorization: ` ${token}` },
      })
      .then((response) => {
        setError(response.data.message);
      });
  }, [session_id]);

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
};

export default Success;
