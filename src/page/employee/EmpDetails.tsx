import { useState } from "react";
import { Box, Tab, Tabs, Typography } from "@mui/material";
import UserUpdate from "../admin/EmployeeList/UserUpdate";
import SalaryDetails from "../admin/Salary/SalaryDetails";

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
const EmpDetails = () => {
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
            <Tab label="User Details" {...a11yProps(0)} />
            <Tab label="Salary Details" {...a11yProps(1)} />
          </Tabs>
        </Box>

        <CustomTabPanel value={value} index={3}>
          <UserUpdate />
        </CustomTabPanel>
        <CustomTabPanel value={value} index={4}>
          <SalaryDetails />
        </CustomTabPanel>
      </Box>
    </>
  );
};

export default EmpDetails;
