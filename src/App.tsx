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
import SalarySlip from "./page/admin/Payroll/SalarySlip";
import Task from "./page/admin/task/Task";
import EmpAttendance from "./page/employee/EmpAttendance";
import EmpLeave from "./page/employee/EmpLeave";
import EmpTask from "./page/employee/EmpTask";
import EmpPayroll from "./page/employee/EmpPayroll";
import EmpHoliday from "./page/employee/EmpHoliday";
import EmpDetails from "./page/employee/EmpDetails";
import HrDetail from "./page/hr/HrDetail";
import Chat from "./page/user/Chat";

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
            <Route path="/salary-slip/generate" element={<SalarySlip />} />
            <Route path="/admin/tasks" element={<Task />} />
            <Route path="/admin/chats" element={<Chat />} />
            <Route path="/employee/attendance" element={<EmpAttendance />} />
            <Route path="/employee/leave" element={<EmpLeave />} />
            <Route path="/employee/tasks" element={<EmpTask />} />
            <Route path="/employee/payroll" element={<EmpPayroll />} />
            <Route path="/employee/holiday-list" element={<EmpHoliday />} />
            <Route path="/employee/profile" element={<EmpDetails />} />
            <Route path="/hr/profile" element={<HrDetail />} />
          </Route>
        </Routes>
        {/* <Copyright /> */}
      </BrowserRouter>
    </SnackbarProvider>
  );
}

export default App;
