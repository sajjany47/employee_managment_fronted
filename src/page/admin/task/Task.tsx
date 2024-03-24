import { useState } from "react";
import Loader from "../../../components/Loader";
import {
  Box,
  Button,
  FormControl,
  Grid,
  MenuItem,
  Select,
  Tab,
  Tabs,
  TextField,
  Typography,
} from "@mui/material";
import { MdAssignmentAdd } from "react-icons/md";

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

const Task = () => {
  const [loading, setLoading] = useState(false);
  const [taskStatus, setTaskStatus] = useState("all");
  const [value, setValue] = useState(0);

  const handleChange = (event: any) => {
    setTaskStatus(event.target.value);
  };
  const handleTab = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  return (
    <div>
      {loading && <Loader />}
      <Grid container rowSpacing={2} columnSpacing={2}>
        <Grid item xs={12}>
          <Box className="mt-2 flex justify-between">
            <Box className="mt-4">
              <h6>
                <strong>Task Details</strong>
              </h6>
            </Box>
            <Box className="mt-2 flex justify-end gap-2">
              <TextField label="Search" id="outlined-size-small" size="small" />
              <FormControl sx={{ minWidth: 120 }} size="small">
                <Select value={taskStatus} onChange={handleChange}>
                  <MenuItem value={"all"}>All</MenuItem>
                  <MenuItem value={"todo"}>To Do</MenuItem>
                  <MenuItem value={"hold"}>On Hold</MenuItem>
                  <MenuItem value={"cancelled"}>Cancelled</MenuItem>
                  <MenuItem value={"need-Attention"}>Needs Attention</MenuItem>
                  <MenuItem value={"waiting-for-review"}>
                    Waiting for Review
                  </MenuItem>
                  <MenuItem value={"under-review"}>Under Review</MenuItem>
                  <MenuItem value={"completed"}>Completed</MenuItem>
                </Select>
              </FormControl>
              <Button
                variant="contained"
                startIcon={<MdAssignmentAdd />}
                // onClick={handleClickOpen}
              >
                Task Assign
              </Button>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Box sx={{ width: "100%" }}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <Tabs
                value={value}
                onChange={handleTab}
                aria-label="basic tabs example"
              >
                <Tab label="Assign You" {...a11yProps(0)} />
                <Tab label="Assign By You" {...a11yProps(1)} />
              </Tabs>
            </Box>
            <CustomTabPanel value={value} index={0}>
              Item One
            </CustomTabPanel>
            <CustomTabPanel value={value} index={1}>
              Item Two
            </CustomTabPanel>
          </Box>
        </Grid>
      </Grid>
    </div>
  );
};

export default Task;
