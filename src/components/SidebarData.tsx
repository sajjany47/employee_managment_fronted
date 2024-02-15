import DashboardCustomizeIcon from "@mui/icons-material/DashboardCustomize";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import TouchAppIcon from "@mui/icons-material/TouchApp";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import RememberMeIcon from "@mui/icons-material/RememberMe";
import AssignmentIcon from "@mui/icons-material/Assignment";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import MessageIcon from "@mui/icons-material/Message";
import SupervisorAccountIcon from "@mui/icons-material/SupervisorAccount";
// import KeyIcon from "@mui/icons-material/Key";

const SidebarData = {
  employee: [
    {
      path: "/",
      title: "Dashboard",
      icon: <DashboardCustomizeIcon />,
    },
    {
      path: "/employee/attendance",
      title: "Attendance",
      icon: <TouchAppIcon />,
    },
    {
      path: "/employee/tasks",
      title: "Tasks",
      icon: <AssignmentIcon />,
    },
    {
      path: "/employee/leave",
      title: "Leave",
      icon: <RememberMeIcon />,
    },

    {
      path: "/employee/payroll",
      title: "Payroll",
      icon: <AccountBalanceWalletIcon />,
    },

    {
      path: "/employee/profile",
      title: "Profile",
      icon: <AssignmentIndIcon />,
    },
    {
      path: "/employee/announcements",
      title: "Announcements",
      icon: <NotificationsActiveIcon />,
    },
    {
      path: "/employee/chats",
      title: "Chats",
      icon: <SupervisorAccountIcon />,
    },
    {
      path: "/employee/support",
      title: "Support",
      icon: <MessageIcon />,
    },
  ],

  admin: [
    {
      path: "/",
      title: "Dashboard",
      icon: <DashboardCustomizeIcon />,
    },
    {
      path: "/admin/employee-list",
      title: "Employee",
      icon: <SupervisorAccountIcon />,
    },
    // {
    //   path: "/admin/employee",
    //   title: "Employee",
    //   icon: <SupervisorAccountIcon />,
    // },
    {
      path: "/admin/attendance",
      title: "Attendance",
      icon: <TouchAppIcon />,
    },

    {
      path: "/admin/payroll",
      title: "Payroll",
      icon: <AccountBalanceWalletIcon />,
    },
    {
      path: "/admin/leave",
      title: "Leave",
      icon: <RememberMeIcon />,
    },
    {
      path: "/admin/tasks",
      title: "Tasks",
      icon: <AssignmentIcon />,
    },
    {
      path: "/admin/tasks",
      title: "Performance",
      icon: <AssignmentIcon />,
    },
    {
      path: "/admin/announcements",
      title: "Announcements",
      icon: <NotificationsActiveIcon />,
    },
    {
      path: "/admin/chats",
      title: "Chats",
      icon: <MessageIcon />,
    },
    {
      path: "/admin/support",
      title: "Support",
      icon: <MessageIcon />,
    },
  ],

  hr: [
    {
      path: "/",
      title: "Dashboard",
      icon: <DashboardCustomizeIcon />,
    },
    {
      path: "/employee/profile",
      title: "Profile",
      icon: <AssignmentIndIcon />,
    },
    {
      path: "/employee/attendance",
      title: "Attendance",
      icon: <TouchAppIcon />,
    },

    {
      path: "/employee/payroll",
      title: "Payroll",
      icon: <AccountBalanceWalletIcon />,
    },
    {
      path: "/employee/leave",
      title: "Leave",
      icon: <RememberMeIcon />,
    },
    {
      path: "/employee/tasks",
      title: "Tasks",
      icon: <AssignmentIcon />,
    },
    {
      path: "/employee/announcements",
      title: "Announcements",
      icon: <NotificationsActiveIcon />,
    },
    {
      path: "/employee/chats",
      title: "Chats",
      icon: <MessageIcon />,
    },
    {
      path: "/employee/support",
      title: "Support",
      icon: <MessageIcon />,
    },
  ],
};

export default SidebarData;
