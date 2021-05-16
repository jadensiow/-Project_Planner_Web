import React, { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { Container } from "react-bootstrap";
import { Redirect, useHistory } from "react-router-dom";
import Navbar from "../functions/Navbar";

import { Button } from "@material-ui/core";
import { motion } from "framer-motion";
import { chatRouteTransition } from "../../animations/routeAnimations";

import io from "socket.io-client";
import "../styles/chat.css";
import StyledBadge from "../styles/onlinelight";

const socket = io();

const Chat = () => {
  const chatMessagesDiv = useRef();

  useEffect(() => {
    document.title = "Chatrooms";
  }, []);

  const { user, isAuthenticated } = useSelector((state) => state.auth);

  const boards = useSelector((state) => state.board.boards);

  const [chatUsers, setChatUsers] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const [msgList, setMsgList] = useState([]);
  const [currentRoom, setCurrentRoom] = useState("General");
  const pageID = useSelector((state) => state.board.board);

  let history = useHistory();

  useEffect(() => {
    socket.emit("userJoin", user.name);

    return () => {
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    socket.on("newMessage", (newMessage) => {
      // return message
      setMsgList((m) => [...m, { ...newMessage }]);

      chatMessagesDiv.current.scrollTop = chatMessagesDiv.current.scrollHeight;
    });
    // whenever send from server and set it
    socket.on("listOfUsers", (listOfUsers) => {
      setChatUsers(listOfUsers);
    });
  }, [socket]);

  const onSubmit = (e) => {
    e.preventDefault();

    const newMessage = {
      name: user.name,
      msg: inputMessage,
      room: currentRoom,
      isPM: checkPM(currentRoom, chatUsers),
    };

    // Once confirm sent out need to check backend
    socket.emit("newMessage", newMessage);

    setInputMessage("");
  };

  const enterRoom = (e) => {
    let oldRoom = currentRoom;
    let newRoom = e.target.textContent;
    setCurrentRoom(newRoom);
    socket.emit("roomEntered", { oldRoom, newRoom });

    // to empty out chat or it will bring over
    setMsgList([]);
  };

  const checkPM = (roomName, userList) => {
    let isPM = false;
    userList.forEach((userName) => {
      if (userName === roomName) {
        isPM = true;
      }
    });
    return isPM;
  };
  const handleBack = () => {
    history.push(`/board/${pageID._id}`);
  };
  if (!isAuthenticated) {
    return <Redirect to="/" />;
  }
  return (
    <motion.div
      variants={chatRouteTransition}
      initial="hidden"
      animate="show"
      exit="exit"
      className="outer-div"
    >
      {" "}
      <Navbar />
      <Button id="backpage" variant="contained" onClick={handleBack}>
        Back To Board
      </Button>
      <Container className="chat clearfix">
        <div className="chat-wrapper">
          <div id="user-list">
            <h4>
              <b>Project Chatrooms</b>
            </h4>
            <ul style={{ listStyleType: "none" }} className="clearfix">
              {boards.map((board) => {
                return (
                  <li
                    onClick={enterRoom}
                    style={{ cursor: "pointer" }}
                    key={board._id}
                  >
                    <h4>{board.title}</h4>
                    <hr className="line" size="8" width="100%"></hr>
                  </li>
                );
              })}
            </ul>

            <h4 className="name">
              <strong>Online Users</strong>
            </h4>
            <ul style={{ listStyleType: "none" }} className="clearfix">
              {chatUsers.map((user) => {
                return (
                  <li
                    onClick={enterRoom}
                    style={{ cursor: "pointer" }}
                    key={user}
                  >
                    <span className="onlineStatus">
                      <StyledBadge
                        className="light"
                        overlap="circle"
                        anchorOrigin={{
                          vertical: "bottom",
                          horizontal: "right",
                        }}
                        variant="dot"
                        style={{ marginRight: "1rem" }}
                      ></StyledBadge>
                      <h4>{user}</h4>
                    </span>
                    <hr className="line" size="8" width="100%"></hr>
                  </li>
                );
              })}
            </ul>
          </div>
          <div className="chat-messages-container">
            <h4 className="room-name"> Chat Messages ({currentRoom}) Room </h4>
            <div id="chatMessages" ref={chatMessagesDiv}>
              {msgList.map((msgList, index) => {
                let odd;
                msgList.name === user.name ? (odd = false) : (odd = true);
                return (
                  <div
                    key={index}
                    style={{ width: "100%", minHeight: "100px" }}
                  >
                    <div className={odd ? "left-align" : "right-align"}>
                      <div>
                        <div className="sender-name">
                          <span
                            className="circle-div"
                            style={{
                              backgroundColor: odd ? "#86BB71" : "#94C2ED",
                            }}
                          ></span>
                          <strong>
                            {msgList.isPM
                              ? `PM from ${msgList.name}`
                              : `${msgList.name}`}
                          </strong>

                          <span style={{ marginLeft: "0.5rem" }}>
                            {msgList.time}
                          </span>
                        </div>

                        <div
                          className={`single-msg  ${
                            odd ? "not-my-msg" : "my-msg"
                          }`}
                        >
                          <em>
                            <span style={{ color: "white" }}>
                              {msgList.msg}
                            </span>
                          </em>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            <form onSubmit={onSubmit} id="message-input">
              <input
                type="text"
                name="msg"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                required
                style={{ width: "80%" }}
              />
              <input className="msg-Send" type="submit" value="Send" />
            </form>
          </div>
        </div>
      </Container>
    </motion.div>
  );
};

export default Chat;
