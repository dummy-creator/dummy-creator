import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { TableContainer, Button } from "@mui/material";
import style from "../../cart.module.css";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import { DataGridPro } from "@mui/x-data-grid-pro";

const ShowAllUsers = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const [getall, setGetall] = useState();
  const [getcolumnapi, setColumnapi] = useState();

  const getcolumn = () => {
    axios.get("http://localhost:4545/api/products/getsequence").then((res) => {
      setColumnapi(res?.data?.sequence[0].sequence);
    });
  };

  useEffect(() => {
    axios
      .get("http://localhost:4545/api/products/alluser", {
        headers: { Authorization: ` ${token}` },
      })
      .then((response) => {
        setGetall(response?.data?.userdata);
      });
    getcolumn();
  }, [token]);

  const rows = getall
    ? getall.map((user) => ({
        id: user._id,
        username: user.username,
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email,
        role: user.role,
      }))
    : [];

  const columns = [];

  for (let i = 0; i < getcolumnapi?.length; i++) {
    columns[getcolumnapi[i].display_order] = {
      field: getcolumnapi[i]?.column_name,
      headerName: getcolumnapi[i]?.column_name?.toUpperCase(),
    };
  }

  const handleColumnOrderChange = (getorder) => {
    console.log("getorder",getorder);
    const movedIndex = getorder?.targetIndex;
    const originalIndex = getorder?.oldIndex;
    const updatedColumns = [...getcolumnapi];
    const originalDisplayOrder = getcolumnapi[originalIndex]?.display_order;
    const [itemToMove] = updatedColumns.splice(originalIndex, 1);
    updatedColumns.splice(movedIndex, 0, itemToMove);
    itemToMove.display_order = movedIndex;
    updatedColumns.forEach((column, index) => {
      column.display_order = index;
    });
    axios
      .put("http://localhost:4545/api/products/updateuserorder", {
        updatedColumns,
      })
      .then((response) => {
        if (response.data.updatedColumns) {
          itemToMove.display_order = originalDisplayOrder;
        }
        getcolumn();
      });
  };

  return (
    // <DndProvider backend={HTML5Backend}>
    <TableContainer className={style.userbackground}>
      <div
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Button
          variant="contained"
          startIcon={<KeyboardBackspaceIcon />}
          onClick={() => navigate("/setting")}
          style={{ marginLeft: "300px" }}
        >
          BACK
        </Button>
      </div>
      <center>
        <h1 variant="h4" component="h1" className={style.heading}>
          USER DETAILS
        </h1>
      </center>
      <center>
        <div className={style.container1}>
          <div className={style.userdetails}>
            <DataGridPro
              rows={rows}
              columns={columns}
              pageSize={10}
              hideFooterRowCount
              disableColumnMenu
              disableColumnSelector
              autoHeight
              onColumnOrderChange={handleColumnOrderChange}
              // rowReordering
            />
          </div>
        </div>
      </center>
    </TableContainer>
    // </DndProvider>
  );
};

export default ShowAllUsers;
