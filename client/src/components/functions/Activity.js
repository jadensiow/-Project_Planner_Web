import React, { useState } from "react";
import { useSelector } from "react-redux";
import Moment from "react-moment";

import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import Button from "@material-ui/core/Button";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import CloseIcon from "@material-ui/icons/Close";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";

import useStyles from "../styles/activityStyles";

const ActivityBoard = () => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const activity = useSelector((state) => state.board.board.activity);
  console.log(activity);
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button
        onClick={() => setOpen(true)}
        variant="contained"
        className={open ? classes.hide : classes.showMenuButton}
      >
        <MoreHorizIcon fontSize="small" /> History
      </Button>
      <Drawer
        className={open ? classes.drawer : classes.hide}
        variant="persistent"
        anchor="right"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <h3>Menu</h3>
          <Button onClick={handleClose}>
            <CloseIcon />
          </Button>
        </div>{" "}
        <div className={classes.activityTitle}>
          <h3>Activity</h3>
        </div>
        <List>
          {activity.map((activity) => (
            <ListItem key={activity._id}>
              <ListItemText
                primary={activity.text}
                secondary={<Moment fromNow>{activity.date}</Moment>}
              />
            </ListItem>
          ))}
        </List>
      </Drawer>
    </div>
  );
};

export default ActivityBoard;
