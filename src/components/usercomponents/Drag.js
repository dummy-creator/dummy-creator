import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import style from "../../cart.module.css";

const Drag = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const [getall, setGetall] = useState();
  const [column, setcolumn] = useState();
  console.log(column, "coluns");
  const getcolumn = () => {
    axios.get("http://localhost:4545/api/products/getsequence").then((res) => {
      setcolumn(res?.data?.sequence[0].sequence);
    });
  };
  useEffect(() => {
    axios
      .get("http://localhost:4545/api/products/alluser", {
        headers: { Authorization: ` ${token}` },
      })
      .then((response) => {
        setGetall(response.data.userdata);
      });
    getcolumn();
  }, [token]);

  const onDragEnd = (result) => {
    if (!result.destination) {
      return;
    }
    const newItems = Array.from(getall);
    const [removed] = newItems.splice(result.source.index, 1);
    newItems.splice(result.destination.index, 0, removed);
    setGetall(newItems);
  };

  return (
    <>
      <TableContainer className={style.userbackground}>
        <button
          style={{
            fontWeight: "bold",
            fontSize: "20px",
            marginLeft: "150px",
            marginTop: "10px",
            WebkitTextStroke: "medium",
          }}
          className="text-gray-900 bg-gradient-to-r from-red-400 via-red-400 to-red-500 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
          onClick={() => navigate("/productable")}
        >
          <KeyboardBackspaceIcon /> BACK
        </button>
        <center>
          <h1 className={style.heading}>USER DETAILS</h1>
        </center>

        <div
          style={{
            marginLeft: "250px",
            marginRight: "250px",
          }}
        >
          <Table className={style.card}>
            <DragDropContext onDragEnd={onDragEnd}>
              <TableHead>
                {column?.map((value) => (
                  <TableCell
                    style={{
                      fontWeight: "bold",
                      fontSize: "20px",
                      WebkitTextStroke: "medium",
                    }}
                  >
                    <TableRow>{value.column_name}</TableRow>
                  </TableCell>
                ))}
              </TableHead>

              {getall?.map((value, index) => (
                <Droppable key={value._id} droppableId={value._id}>
                  {(provided) => (
                    <TableBody
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                    >
                      <Draggable
                        key={value._id}
                        draggableId={value._id}
                        index={index}
                      >
                        {(provided) => (
                          <TableRow
                            key={value._id}
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                          >
                            <TableCell>{value.username}</TableCell>
                            <TableCell>{value.firstname}</TableCell>
                            <TableCell>{value.lastname}</TableCell>
                            <TableCell>{value.email}</TableCell>
                            <TableCell>{value.role}</TableCell>
                          </TableRow>
                        )}
                      </Draggable>
                      {provided.placeholder}
                    </TableBody>
                  )}
                </Droppable>
              ))}
            </DragDropContext>
          </Table>
        </div>
      </TableContainer>
    </>
  );
};

export default Drag;
