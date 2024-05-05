import React, { useEffect, useState } from "react";
import { styled, useTheme, Theme, CSSObject } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { RiLockPasswordFill } from "react-icons/ri";
import Badge from "@mui/material/Badge";
import MailIcon from "@mui/icons-material/Mail";
import NotificationsIcon from "@mui/icons-material/Notifications";
import {
  Avatar,
  Dialog,
  DialogContent,
  DialogTitle,
  Menu,
  MenuItem,
  useMediaQuery,
} from "@mui/material";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../store/reducer/authReducer";
// import { AttendanceService } from "../page/admin/Attendance/AttendanceService";
// import { enqueueSnackbar } from "notistack";
import { CiLogout } from "react-icons/ci";
import ChangePassword from "./ChangePassword";

type Props = {
  sidebarList: { path: string; title: string; icon: JSX.Element }[] | null;
};
const drawerWidth = 240;

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

export default function Sidebar(props: Props) {
  // const attendanceService = new AttendanceService();
  const location = useLocation();
  const user = useSelector((state: any) => state.auth.auth.user);
  const pathname = location.pathname;

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const theme = useTheme();
  const [open, setOpen] = React.useState(true);
  const [passwordModal, setPasswordModal] = useState(false);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  // const [notificationData, setNotificationData] = useState([]);
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));
  useEffect(() => {
    // notifiCall();
  }, []);

  // const notifiCall = () => {
  //   // setInterval(() => {
  //   attendanceService
  //     .notificationList()
  //     .then((res) => {
  //       setNotificationData(res.data);
  //     })
  //     .catch((err: any) =>
  //       enqueueSnackbar(err.response.data.message, { variant: "error" })
  //     );
  //   // }, 1000);
  // };
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    navigate("/");
    dispatch(setUser({ token: null, user: null }));
  };
  const handelClosePassword = () => {
    setPasswordModal(false);
  };
  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="fixed" open={open} sx={{ backgroundColor: "#336BE4" }}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 5,
              ...(open && { display: "none" }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
            {/* GURUKOOL */}
          </Typography>
          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            <IconButton
              size="large"
              aria-label="show 4 new mails"
              color="inherit"
            >
              <Badge badgeContent={4} color="error">
                <MailIcon />
              </Badge>
            </IconButton>
            <IconButton
              size="large"
              aria-label="show 17 new notifications"
              color="inherit"
            >
              <Badge badgeContent={5} color="error">
                <NotificationsIcon />
              </Badge>
            </IconButton>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu}
              color="inherit"
              className="rounded-full focus:shadow-outline-purple focus:outline-none"
            >
              <Avatar
                alt="Remy Sharp"
                src="https://wallpapercave.com/wp/wp4041985.jpg"
              />
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  fontSize: "10px",
                }}
              >
                <Typography sx={{ marginLeft: 1 }}>{user.username}</Typography>
                <small
                  style={{ fontSize: "12px", textTransform: "capitalize" }}
                >
                  {user.role}
                </small>
              </div>
            </IconButton>

            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem
                sx={{ width: 150 }}
                onClick={() => setPasswordModal(true)}
              >
                <ListItemIcon>
                  <RiLockPasswordFill fontSize="small" />
                </ListItemIcon>
                <ListItemText>Password</ListItemText>
              </MenuItem>
              <MenuItem sx={{ width: 150 }} onClick={handleLogout}>
                <ListItemIcon>
                  <CiLogout fontSize="small" />
                </ListItemIcon>
                <ListItemText>Logout</ListItemText>
              </MenuItem>

              {/* <MenuItem className="w-full h-full m-6">Change Password</MenuItem> */}
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>

      <Drawer
        variant="permanent"
        open={open}
        sx={{
          "& .MuiDrawer-paper": {
            backgroundColor: "#336BE4",
          },
        }}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {props.sidebarList &&
            props.sidebarList.map((text, index) => (
              <Link
                to={text.path}
                key={index}
                style={{
                  textDecoration: "none",
                }}
              >
                <ListItem
                  disablePadding
                  sx={{
                    display: "block",
                    color: pathname === text.path ? "#336BE4" : "white",
                    backgroundColor:
                      pathname !== text.path ? "#336BE4" : "white",
                  }}
                >
                  <ListItemButton
                    sx={{
                      minHeight: 48,
                      justifyContent: open ? "initial" : "center",
                      px: 2.5,
                    }}
                  >
                    <ListItemIcon
                      sx={{
                        minWidth: 0,
                        mr: open ? 3 : "auto",
                        justifyContent: "center",
                        color: pathname === text.path ? "#F9AE48" : "white",
                      }}
                    >
                      {text.icon}
                    </ListItemIcon>
                    <ListItemText
                      primary={text.title}
                      sx={{ opacity: open ? 1 : 0 }}
                    />
                  </ListItemButton>
                </ListItem>
              </Link>
            ))}
        </List>
      </Drawer>
      <Box
        component="main"
        // sx={{ flexGrow: 1, p: 3 }}
        sx={{
          backgroundColor: (theme) =>
            theme.palette.mode === "light"
              ? theme.palette.grey[100]
              : theme.palette.grey[900],
          flexGrow: 1,
          height: "100vh",
          overflow: "auto",
          p: 3,
        }}
      >
        <DrawerHeader />

        <Outlet />
      </Box>

      <Dialog
        fullScreen={fullScreen}
        open={passwordModal}
        onClose={() => setPasswordModal(false)}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="alert-dialog-title">{"Change Password"}</DialogTitle>
        <DialogContent>
          <ChangePassword
            data={{ type: "user", _id: user._id }}
            closeAction={handelClosePassword}
          />
        </DialogContent>
      </Dialog>
    </Box>
  );
}
