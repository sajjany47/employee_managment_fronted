import { useSelector } from "react-redux";
import SidebarData from "../../components/SidebarData";
import Login from "./Login";
import Sidebar from "../../components/Sidebar";
import { RootState } from "../../store/store";

const Layout = () => {
  const auth = useSelector((state: RootState) => state.auth);

  const sidebarList =
    auth.auth.user &&
    (auth.auth.user.role === "admin"
      ? SidebarData.admin
      : auth.auth.user.role === "employee"
      ? SidebarData.employee
      : auth.auth.user.role === "hr"
      ? SidebarData.hr
      : []);
  return (
    <>
      {auth.auth.token === null ? (
        <Login />
      ) : (
        <Sidebar sidebarList={sidebarList} />
      )}
    </>
  );
};

export default Layout;
