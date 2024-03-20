import {
  Avatar,
  Button,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  TableContainer,
} from "@mui/material";
import Peer from "simple-peer";
import React, { useEffect, useState, useRef } from "react";
import VideoCallIcon from "@mui/icons-material/VideoCall";
import axios from "axios";
import style from "../../cart.module.css";
import { io } from "socket.io-client";
import Webcam from "react-webcam";


const Showchat = () => {
  const token = localStorage.getItem("token");
  const [userName, setUserName] = useState();
  const [getalluser, Setgetaluser] = useState();
  const [allMessages, setAllMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [selectedUserId, setSelectedUserId] = useState("");
  const [selectedIndex, setSelectedIndex] = useState();
  const [showWebcam, setShowWebcam] = useState(false);

  const connectionRef = useRef(null);

  const socket = io("http://localhost:7654");

  const getallusers = () => {
    axios
      .get("http://localhost:4545/api/products/alluser", {
        headers: { Authorization: ` ${token}` },
      })
      .then((response) => {
        Setgetaluser(response?.data?.userdata);
      });
  };

  const userchat = (_id) => {
    socket.emit("user_connected", {
      userId: userName._id,
    });

    axios
      .get(`http://localhost:4545/api/products/getmessage/${_id}`, {
        headers: { Authorization: ` ${token}` },
      })
      .then((response) => {
        setSelectedUserId(_id);
        setAllMessages(response?.data?.getallmessage);
      });
  };

  const handleSend = () => {
    if (selectedUserId && inputValue && socket) {
      axios
        .post(
          "http://localhost:4545/api/products/savechats",
          {
            To: selectedUserId,
            message: inputValue,
          },
          {
            headers: { Authorization: ` ${token}` },
          }
        )
        .then((res) => {
          socket.emit("sendMessage", {
            receiverId: selectedUserId,
            senderId: userName._id,
            message: inputValue,
          });
          setAllMessages((prevMessages) => [...prevMessages, res?.data]);
          setInputValue("");
        });
    }
  };

  const getusersdata = () => {
    axios
      .get("http://localhost:4545/api/products/user", {
        headers: { Authorization: ` ${token}` },
      })
      .then((response) => {
        setUserName(response?.data?.newuser);
      });
  };

  useEffect(() => {
    if (socket) {
      socket.on("receiveMessage", (data) => {
        console.log(data);
        setAllMessages(data);
      });
      socket.on("callUser", (data) => {
        console.log(data,"data")
        // setReceivingCall(true);
        // setCaller(data.from);
        // setName(data.name);
        // setCallerSignal(data.signal);
      });
      socket.on("disconnect", () => {
        console.log("Disconnected from server");
      });
    }
  }, [socket]);

  useEffect(() => {
    getusersdata();
    getallusers();
  }, []);

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const callUser = (id) => {
    const peer = new Peer({
      initiator: true,
      trickle: false,
    });

    peer.on("signal", (data) => {
      socket.emit("callUser", {
        receiverId: selectedUserId,
        signalData: data,
        senderId: userName._id,
      });
    });

    connectionRef.current = peer;
  };
  const videoConstraints = {
    facingMode: "user"
  };
  return (
    <TableContainer>
      <div style={{ marginLeft: "540px", display: "flex", marginTop: "150px" }}>
        <div className={style.chatcontainer}>
          <div className={style.chatcard}>
            <Grid>
              <List style={{ display: "flex" }}>
                <ListItem>
                  <Avatar
                    alt={userName?.username}
                    src={userName?.image}
                    sx={{ width: 56, height: 56 }}
                  />
                  &nbsp;&nbsp;
                  <ListItemText primary={`${userName?.username}`} />
                </ListItem>
              </List>
              <Divider />
              <Divider />
              <List>
                {getalluser
                  ?.filter((user) => user?._id !== userName?._id)
                  ?.map((value, i) => (
                    <>
                      <ListItemButton
                        key={i}
                        onClick={() => {
                          userchat(value._id);
                          setSelectedIndex(i);
                        }}
                        style={{
                          height: "50px",
                          backgroundColor:
                            selectedIndex === i ? "#808080" : "#E8E8E8",
                        }}
                      >
                        <Avatar
                          alt={value?.username}
                          src={value?.image}
                          sx={{ width: 40, height: 40 }}
                        />
                        &nbsp;&nbsp;
                        {value.username}
                      </ListItemButton>
                      <Divider />
                    </>
                  ))}
              </List>
            </Grid>
          </div>
        </div>
        <div className={style.showchatcontainer}>
          <div className={style.showchatcard}>
            {allMessages?.map((value) => {
              <Avatar
                alt={value?.username}
                src={value?.image}
                sx={{ width: 56, height: 56 }}
              />;
            })}
            <Grid item xs={9}>
              <div style={{ display: "flex" }}>
                <Avatar />
              </div>
              <Divider />
              <Grid>
                <Grid item xs={12}>
                  <List>
                    <div className={style.scrollbar}>
                      {allMessages?.map((message, index) => (
                        <ListItem
                          key={index}
                          style={{
                            backgroundColor:
                              message.From === selectedUserId
                                ? "green"
                                : "#A9A9A9",
                            maxWidth: "30%",
                            width: "fit-content",
                            borderRadius: "10px",
                            marginBottom: "10px",
                            marginLeft:
                              message.From === selectedUserId ? "0" : "auto",
                          }}
                        >
                          <h1>{message?.message}</h1>
                        </ListItem>
                      ))}
                    </div>
                  </List>
                </Grid>
              </Grid>
            </Grid>
            {showWebcam && (
              <Webcam height={300} width={300} videoConstraints={videoConstraints} />
            )}
            <div style={{ display: "flex" }}>
              <input
                style={{ width: "100%" }}
                type="text"
                value={inputValue}
                onChange={handleInputChange}
              />

              <Button type="button" onClick={handleSend}>
                send
              </Button>
              <button
                className="text-black hover:text-gray-400 mr-6"
                onClick={()=>{
                  setShowWebcam(!showWebcam)
                  callUser(selectedUserId)
                }}
              >
                <VideoCallIcon />
              </button>
              
            </div>
          </div>
        </div>
      </div>
    </TableContainer>
  );
};

export default Showchat;
