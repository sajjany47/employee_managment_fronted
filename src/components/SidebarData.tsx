import TouchAppIcon from "@mui/icons-material/TouchApp";
import { MdDashboardCustomize } from "react-icons/md";
import { HiUserGroup } from "react-icons/hi2";
import { GiTakeMyMoney } from "react-icons/gi";
import { GiMoneyStack } from "react-icons/gi";
import { FcLeave } from "react-icons/fc";
import { BiTask } from "react-icons/bi";
import { IoIosChatbubbles } from "react-icons/io";
import { BiSupport } from "react-icons/bi";
import { FaUserAlt } from "react-icons/fa";
import { FaAngellist } from "react-icons/fa6";

const SidebarData = {
  employee: [
    {
      path: "/",
      title: "Dashboard",
      icon: <MdDashboardCustomize />,
    },
    {
      path: "/employee/attendance",
      title: "Attendance",
      icon: <TouchAppIcon />,
    },
    {
      path: "/employee/tasks",
      title: "Tasks",
      icon: <BiTask />,
    },
    {
      path: "/employee/leave",
      title: "Leave",
      icon: <FcLeave />,
    },

    {
      path: "/employee/payroll",
      title: "Payroll",
      icon: <GiTakeMyMoney />,
    },

    {
      path: "/employee/profile",
      title: "Profile",
      icon: <FaUserAlt />,
    },
    {
      path: "/employee/holiday-list",
      title: "Holiday List",
      icon: <FaAngellist />,
    },
    {
      path: "/employee/chats",
      title: "Chats",
      icon: <IoIosChatbubbles />,
    },
    {
      path: "/employee/support",
      title: "Support",
      icon: <BiSupport />,
    },
  ],

  admin: [
    {
      path: "/",
      title: "Dashboard",
      icon: <MdDashboardCustomize />,
    },
    {
      path: "/admin/employee-list",
      title: "Employee",
      icon: <HiUserGroup />,
    },
    {
      path: "/admin/salary",
      title: "Salary Alloted",
      icon: <GiMoneyStack />,
    },
    {
      path: "/admin/attendance",
      title: "Attendance List",
      icon: <TouchAppIcon />,
    },

    {
      path: "/admin/payroll",
      title: "Payroll",
      icon: <GiTakeMyMoney />,
    },
    {
      path: "/admin/leave",
      title: "Leave Alloted",
      icon: <FcLeave />,
    },
    {
      path: "/employee/holiday-list",
      title: "Holiday List",
      icon: <FaAngellist />,
    },
    {
      path: "/admin/tasks",
      title: "Tasks",
      icon: <BiTask />,
    },
    {
      path: "/hr/profile",
      title: "Profile",
      icon: <FaUserAlt />,
    },
    {
      path: "/admin/chats",
      title: "Chats",
      icon: <IoIosChatbubbles />,
    },
    {
      path: "/admin/support",
      title: "Support",
      icon: <BiSupport />,
    },
  ],

  hr: [
    {
      path: "/",
      title: "Dashboard",
      icon: <MdDashboardCustomize />,
    },
    {
      path: "/admin/employee-list",
      title: "Employee",
      icon: <HiUserGroup />,
    },
    {
      path: "/admin/salary",
      title: "Salary Alloted",
      icon: <GiMoneyStack />,
    },
    {
      path: "/admin/attendance",
      title: "Attendance List",
      icon: <TouchAppIcon />,
    },

    {
      path: "/admin/payroll",
      title: "Payroll",
      icon: <GiTakeMyMoney />,
    },
    {
      path: "/admin/leave",
      title: "Leave Alloted",
      icon: <FcLeave />,
    },
    {
      path: "/employee/holiday-list",
      title: "Holiday List",
      icon: <FaAngellist />,
    },
    {
      path: "/admin/tasks",
      title: "Tasks",
      icon: <BiTask />,
    },
    {
      path: "/hr/profile",
      title: "Profile",
      icon: <FaUserAlt />,
    },
    {
      path: "/admin/chats",
      title: "Chats",
      icon: <IoIosChatbubbles />,
    },
    {
      path: "/admin/support",
      title: "Support",
      icon: <BiSupport />,
    },
  ],
};

export default SidebarData;
