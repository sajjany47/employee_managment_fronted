import { useState } from "react";
import { Box, Tab, Tabs, Typography } from "@mui/material";
import EmpAttendance from "../employee/EmpAttendance";
import EmpLeave from "../employee/EmpLeave";
import EmpPayroll from "../employee/EmpPayroll";
import SalaryDetails from "../admin/Salary/SalaryDetails";
import UserVerified from "../admin/EmployeeList/UserVerified";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}
const HrDetail = () => {
  const [value, setValue] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  return (
    <>
      <Box sx={{ width: "100%" }}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
          >
            <Tab label="Attendance" {...a11yProps(0)} />
            <Tab label="Leave Details " {...a11yProps(1)} />
            <Tab label="Payroll Details" {...a11yProps(2)} />

            <Tab label="User Details" {...a11yProps(3)} />
            <Tab label="Salary Details" {...a11yProps(4)} />
          </Tabs>
        </Box>

        <CustomTabPanel value={value} index={0}>
          <EmpAttendance />
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
          <EmpLeave />
        </CustomTabPanel>
        <CustomTabPanel value={value} index={2}>
          <EmpPayroll />
        </CustomTabPanel>

        <CustomTabPanel value={value} index={3}>
          <UserVerified />
        </CustomTabPanel>
        <CustomTabPanel value={value} index={4}>
          <SalaryDetails />
        </CustomTabPanel>
      </Box>
    </>
  );
};

export default HrDetail;
