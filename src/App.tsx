import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Layout from "./page/user/Layout";
import { SnackbarProvider } from "notistack";
// import Copyright from "./components/Copyright";
import UserVerified from "./page/admin/EmployeeList/UserVerified";
import Employee from "./page/admin/Emloyee/Employee";
import Attendance from "./page/admin/Attendance/Attendance";
import AttendanceDetail from "./page/admin/Attendance/AttendanceDetail";
import LeaveList from "./page/admin/leave/LeaveList";
import HolidayList from "./page/admin/Attendance/HolidayList";
import UserUpdate from "./page/admin/EmployeeList/UserUpdate";
import LeaveApply from "./page/admin/Attendance/LeaveApply";
import EmployeeList from "./page/admin/EmployeeList/EmployeeList";
import Salary from "./page/admin/Salary/Salary";
import SalaryDetails from "./page/admin/Salary/SalaryDetails";
import Payroll from "./page/admin/Payroll/Payroll";
import PayrollUpdate from "./page/admin/Payroll/PayrollUpdate";
import UserPayroll from "./page/admin/Payroll/UserPayroll";

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
            <Route path="/admin/salary" element={<Salary />} />
            <Route path="/admin/salary/:id" element={<SalaryDetails />} />
            <Route path="/admin/payroll" element={<Payroll />} />
            <Route path="/admin/payroll/update" element={<PayrollUpdate />} />
            <Route path="/admin/user-payroll/view" element={<UserPayroll />} />
          </Route>
        </Routes>
        {/* <Copyright /> */}
      </BrowserRouter>
    </SnackbarProvider>
  );
}

export default App;
