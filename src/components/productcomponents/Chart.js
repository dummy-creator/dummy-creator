import axios from "axios";
import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import style from "../../cart.module.css";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
 
  Title,

  PointElement,
  LineController,
  LineElement,
  Filler,
} from "chart.js";
import moment from "moment";
import { TableContainer } from "@mui/material";

ChartJS.register(
  LineController,
  LineElement,
  PointElement,
  LinearScale,
  Title,
  CategoryScale,
  Filler
);
const Chart = () => {
  const [chart1, setChart] = useState();
  const token = localStorage.getItem("token");

  useEffect(() => {
    axios
      .get("http://localhost:4545/api/products/details", {
        headers: { Authorization: ` ${token}` },
      })
      .then((response) => {
        console.log(response.data.orders)
        setChart(response.data.orders);
      });
  }, [token]);

  const dataz = chart1
    ?.map((val) =>
      val?.details?.map((item) =>
        moment(item.orderdetails?.createdAt).format("DD-MM-YYYY")
      )
    )
    .flat(Infinity);
  const chartdataData = dataz?.reduce((acc, current) => {
    acc[current] = acc[current] + 1 || 1;
    return acc;
  }, {});

  

  const data = {
    type: "line",
    datasets: [
      {
        label: "chart",
        data: chartdataData,
        borderColor: "rgba(0,0,255,0.4)",
        backgroundColor: "rgba(255, 0, 0, 0.3)",
        fill: "origin",
        lineTension: 0.4,
        borderWidth: 3,
        pointRadius: 5,
  
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: " line Chart",
      },
    },
  };

  return (
    <div>
    <TableContainer className={style.background}>
      <br />
      <center>
        <div style={{ height: "400%", width: "70%",marginLeft:"350px" ,marginTop:"50px"}}>
          <Line
            className={style.canvas}
            data={data}
            options={options}
            color="white"
          />
        </div>
        <div></div>
      </center>
    </TableContainer>
    </div>
  );
};

export default Chart;
