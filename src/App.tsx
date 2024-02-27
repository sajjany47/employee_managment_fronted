import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Layout from "./page/user/Layout";
import { SnackbarProvider } from "notistack";
// import Copyright from "./components/Copyright";
// import UserUpdate from "./page/admin/ActivationKey/UserUpdate";
import UserVerified from "./page/admin/EmployeeList/UserVerified";
import Employee from "./page/admin/Emloyee/Employee";
import Attendance from "./page/admin/Attendance/Attendance";
import AttendanceDetail from "./page/admin/Attendance/AttendanceDetail";
import LeaveList from "./page/admin/leave/LeaveList";
import HolidayList from "./page/admin/Attendance/HolidayList";
import UserUpdate from "./page/admin/EmployeeList/UserUpdate";
import LeaveApply from "./page/admin/Attendance/LeaveApply";
import EmployeeList from "./page/admin/EmployeeList/EmployeeList";

function App() {
  return (
    <SnackbarProvider maxSnack={3}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="/admin/employee-list" element={<EmployeeList />} />
            <Route path="/admin/user-update/:id" element={<UserUpdate />} />
            <Route path="/admin/user-verified" element={<UserVerified />} />
            <Route path="/admin/employee" element={<Employee />} />
            <Route path="/admin/attendance" element={<Attendance />} />
            <Route
              path="/admin/attendance/details"
              element={<AttendanceDetail />}
            />
            <Route path="/user/leave/details" element={<LeaveApply />} />
            <Route path="/admin/leave" element={<LeaveList />} />
            <Route path="/admin/holiday-list" element={<HolidayList />} />
          </Route>
        </Routes>
        {/* <Copyright /> */}
      </BrowserRouter>
    </SnackbarProvider>
  );
}

export default App;
