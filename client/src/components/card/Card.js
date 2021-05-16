import React, { Fragment, useRef, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import PropTypes from "prop-types";
import { Draggable } from "react-beautiful-dnd";
import { getCard, editCard } from "../redux/action/board";
import getInitials from "../styles/getInitials";

import CardMUI from "@material-ui/core/Card";
import EditIcon from "@material-ui/icons/Edit";
import CloseIcon from "@material-ui/icons/Close";
import SubjectIcon from "@material-ui/icons/Subject";
import {
  TextField,
  CardContent,
  Button,
  Avatar,
  Tooltip,
} from "@material-ui/core";
import CardModal from "./CardModal";

const Card = ({ cardId, list, index }) => {
  const [editing, setEditing] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [mouseOver, setMouseOver] = useState(false);
  const [title, setTitle] = useState("");
  const [height, setHeight] = useState(0);
  const cardRef = useRef(null);
  const card = useSelector((state) =>
    state.board.board.cardObjects.find((object) => object._id === cardId)
  );
  const dateFormat = (e) => {
    let newDate = e.split("-");
    let updatedDate = `${newDate[2].slice(0, 2)}-${newDate[1]}-${newDate[0]}`;
    return updatedDate;
  };
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCard(cardId));
  }, [cardId, dispatch]);

  useEffect(() => {
    cardRef && cardRef.current && setHeight(cardRef.current.clientHeight);
  }, [list, card, cardRef]);

  const onSubmitEdit = async (e) => {
    e.preventDefault();
    dispatch(editCard(cardId, { title }));
    setEditing(false);
    setMouseOver(false);
  };

  return !card ? (
    ""
  ) : (
    <Fragment>
      <CardModal
        cardId={cardId}
        open={openModal}
        setOpen={setOpenModal}
        card={card}
        list={list}
      />
      {!editing ? (
        <Draggable draggableId={cardId} index={index}>
          {(provided) => (
            <CardMUI
              className={`card ${mouseOver && !editing ? "mouse-over" : ""}`}
              onMouseOver={() => setMouseOver(true)}
              onMouseLeave={() => setMouseOver(false)}
              ref={provided.innerRef}
              {...provided.draggableProps}
              {...provided.dragHandleProps}
            >
              {mouseOver && !editing && (
                <Button
                  style={{
                    position: "absolute",
                    bottom: height - 40,
                    left: "180px",
                    zIndex: 1,
                  }}
                  onClick={() => setEditing(true)}
                >
                  <EditIcon fontSize="small" />
                </Button>
              )}
              <CardContent
                onClick={() => {
                  setOpenModal(true);
                  setMouseOver(false);
                }}
                ref={cardRef}
              >
                {card.label && card.label !== "none" && (
                  <div
                    className="card-label"
                    style={{ backgroundColor: card.label }}
                  />
                )}
                <p>{card.title}</p>
                <p>Start: {dateFormat(card.date.startDate)}</p>
                <p>End: {dateFormat(card.date.endDate)}</p>

                <div className="card-bottom">
                  <div className="card-bottom-left">
                    {card.description && (
                      <SubjectIcon
                        className="description-indicator"
                        fontSize="small"
                      />
                    )}
                  </div>
                  <div className="card-member-avatars">
                    {card.members.map((member) => {
                      return (
                        <Tooltip title={member.name} key={member.user}>
                          <Avatar className="avatar">
                            {getInitials(member.name)}
                          </Avatar>
                        </Tooltip>
                      );
                    })}
                  </div>
                </div>
              </CardContent>
            </CardMUI>
          )}
        </Draggable>
      ) : (
        <form className="create-card-form" onSubmit={(e) => onSubmitEdit(e)}>
          <CardMUI>
            <CardContent className="card-edit-content">
              <TextField
                margin="normal"
                fullWidth
                multiline
                required
                label="Edit this card's title"
                autoFocus
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && onSubmitEdit(e)}
              />
            </CardContent>
          </CardMUI>
          <div className="card-actions">
            <Button type="submit" variant="contained" color="primary">
              Save
            </Button>
            <Button
              onClick={() => {
                setEditing(false);
                setMouseOver(false);
                setTitle(card.title);
              }}
            >
              <CloseIcon />
            </Button>
          </div>
        </form>
      )}
    </Fragment>
  );
};

Card.propTypes = {
  cardId: PropTypes.string.isRequired,
  list: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
};

export default Card;
