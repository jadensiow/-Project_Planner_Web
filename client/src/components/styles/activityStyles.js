import { makeStyles } from "@material-ui/core/styles";

const drawerWidth = 500;

const useStyles = makeStyles((theme) => ({
  hide: {
    display: "none",
  },
  showMenuButton: {
    display: "flex",
    justifyContent: "space-between",
    width: 150,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: "10px 20px",
    justifyContent: "space-between",
  },
  activityTitle: {
    textAlign: "center",
    padding: "20px 20px 0",
  },
}));

export default useStyles;
