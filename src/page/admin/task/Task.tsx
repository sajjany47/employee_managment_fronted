import { useEffect, useState } from "react";
import Loader from "../../../components/Loader";
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  FormControl,
  Grid,
  MenuItem,
  Rating,
  Select,
  Tab,
  Tabs,
  TextField,
  Typography,
} from "@mui/material";
import { MdAssignmentAdd } from "react-icons/md";
import { Form, Formik } from "formik";
import {
  DateField,
  InputField,
  SelectField,
} from "../../../components/DynamicField";
import AssignTask from "./AssignTask";
import { ConfigData } from "../../../shared/ConfigData";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import moment from "moment";
import { TaskService } from "./TaskService";
import { enqueueSnackbar } from "notistack";
import { useSelector } from "react-redux";
import * as Yup from "yup";
import { containsSearchTerm } from "../../../shared/UtlityFunction";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

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
  const taskService = new TaskService();
  const userType = useSelector((state: any) => state.auth.auth.user);
  const options = [...ConfigData.taskStatus, { label: "All", value: "all" }];
  const [loading, setLoading] = useState(false);
  const [taskStatus, setTaskStatus] = useState("all");
  const [tabValue, setTabValue] = useState(0);
  const [open, setOpen] = useState(false);
  const [actionType, setActionType] = useState("add");
  const [selectTask, setSelectTask] = useState<any>({});
  const [year, setYear] = useState(moment.utc(new Date()));
  const [taskListData, setTaskListData] = useState([]);
  const [copyTaskListData, setCopyTaskListData] = useState([]);
  const [employeeListData, setEmployeeListData] = useState([]);
  const [tabType, setTabType] = useState("Sender");
  const [search, setSearch] = useState("");

  const taskAssignValidation = Yup.object().shape({
    taskStatus: Yup.string().required("Task status is required"),
    taskReceiver: Yup.string().required("Task receiver is required"),
    taskStartDate: Yup.string().required("Task start date is required"),
    takDeadline: Yup.string().required("Task deadline is required"),
    taskDetails: Yup.string().required("Task details is required"),
    taskProject: Yup.string().required("Project name is required"),
  });
  useEffect(() => {
    if (tabValue === 0) {
      taskList("receiver", userType.username, year, taskStatus);
    }
    if (tabValue === 1) {
      taskList("sender", userType.username, year, taskStatus);
    }
    taskService
      .employeeList()
      .then((res) => {
        const filterUsername = res.data.filter(
          (item: any) => item.username !== userType.username
        );
        setEmployeeListData(
          filterUsername.map((item: any) => ({
            label: `${item.name}(${item.username})`,
            value: item.username,
          }))
        );
      })
      .catch((err: any) =>
        enqueueSnackbar(err.response.data.message, { variant: "error" })
      )
      .finally(() => setLoading(false));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  const taskList = (type: any, username: any, date: any, status: any) => {
    taskService
      .taskList(type, username, moment(date).format("YYYY"), status)
      .then((res) => {
        setTaskListData(res.data);
        setCopyTaskListData(res.data);
      })
      .catch((err: any) =>
        enqueueSnackbar(err.response.data.message, { variant: "error" })
      )
      .finally(() => setLoading(false));
  };
  const handleYear = (value: any) => {
    setTaskListData([]);
    setYear(moment.utc(value));
    if (tabValue === 0) {
      taskList("receiver", userType.username, value, taskStatus);
    }
    if (tabValue === 1) {
      taskList("sender", userType.username, value, taskStatus);
    }
  };
  const handleChange = (event: any) => {
    setTaskListData([]);
    setTaskStatus(event.target.value);
    if (tabValue === 0) {
      taskList("receiver", userType.username, year, event.target.value);
    }
    if (tabValue === 1) {
      taskList("sender", userType.username, year, event.target.value);
    }
  };
  const handleTab = (event: React.SyntheticEvent, newValue: number) => {
    setTaskListData([]);
    setTabValue(newValue);
    if (newValue === 0) {
      taskList("receiver", userType.username, year, taskStatus);
    }
    if (newValue === 1) {
      taskList("sender", userType.username, year, taskStatus);
    }
  };
  const handleClickOpen = () => {
    setActionType("add");
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    setActionType("add");
    setSelectTask({});
    if (tabValue === 0) {
      taskList("receiver", userType.username, year, taskStatus);
    }
    if (tabValue === 1) {
      taskList("sender", userType.username, year, taskStatus);
    }
  };

  const handleTagAssign = (values: any) => {
    setLoading(true);
    if (actionType === "add") {
      taskService
        .taskCreate(values)
        .then((res) => {
          enqueueSnackbar(res.message, { variant: "success" });
        })
        .catch((err: any) =>
          enqueueSnackbar(err.response.data.message, { variant: "error" })
        )
        .finally(() => setLoading(false));
    }
    if (actionType === "edit") {
      taskService
        .taskUpdate({
          ...values,
          id: selectTask._id,
          type: tabType === "Sender" ? "receiver" : "sender",
        })
        .then((res) => {
          enqueueSnackbar(res.message, { variant: "success" });
        })
        .catch((err: any) =>
          enqueueSnackbar(err.response.data.message, { variant: "error" })
        )
        .finally(() => setLoading(false));
    }
    handleClose();
  };

  const selectTaskData = (item: any, type: any) => {
    setOpen(true);
    setActionType("edit");
    setSelectTask(item);
    setTabType(type);
  };

  const handelSearch = (e: any) => {
    setSearch(e.target.value);

    const filteredTasks = copyTaskListData.filter((task) =>
      containsSearchTerm(task, e.target.value)
    );

    setTaskListData(filteredTasks);
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
              <TextField
                label="Search"
                id="outlined-size-small"
                size="small"
                value={search}
                onChange={handelSearch}
              />
              <FormControl sx={{ minWidth: 120 }} size="small">
                <Select value={taskStatus} onChange={handleChange}>
                  {options.map((item: any, index: number) => {
                    return (
                      <MenuItem value={item.value} key={index}>
                        {item.label}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
              <LocalizationProvider dateAdapter={AdapterMoment}>
                <DemoContainer
                  components={["DatePicker"]}
                  sx={{ marginTop: -1 }}
                >
                  <DatePicker
                    // sx={{ width: "50% " }}
                    label="Select Year"
                    value={year}
                    slotProps={{
                      textField: { size: "small", fullWidth: false },
                    }}
                    views={["year"]}
                    onChange={handleYear}
                  />
                </DemoContainer>
              </LocalizationProvider>
              <Button
                variant="contained"
                startIcon={<MdAssignmentAdd />}
                onClick={handleClickOpen}
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
                value={tabValue}
                onChange={handleTab}
                aria-label="basic tabs example"
              >
                <Tab label="Assign To You" {...a11yProps(0)} />
                <Tab label="Assign By You" {...a11yProps(1)} />
              </Tabs>
            </Box>
            <CustomTabPanel value={tabValue} index={0}>
              <AssignTask
                data={taskListData}
                selectData={selectTaskData}
                type="Sender"
              />
            </CustomTabPanel>
            <CustomTabPanel value={tabValue} index={1}>
              <AssignTask
                data={taskListData}
                selectData={selectTaskData}
                type="Receiver"
              />
            </CustomTabPanel>
          </Box>
        </Grid>
      </Grid>
      <Dialog
        open={open}
        // onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="alert-dialog-title">
          <Box display="flex" alignItems="center">
            <Box flexGrow={1}>
              <strong>Task Assign</strong>
            </Box>
            <Box>
              <IconButton onClick={handleClose}>
                <CloseIcon />
              </IconButton>
            </Box>
          </Box>
        </DialogTitle>
        <DialogContent>
          <Formik
            initialValues={
              actionType === "edit"
                ? { ...selectTask, taskStatus: "" }
                : {
                    taskStatus: "assign",
                    taskReceiver: "",
                    taskStartDate: "",
                    takDeadline: "",
                    taskDetails: "",
                    taskProject: "",
                  }
            }
            validationSchema={taskAssignValidation}
            onSubmit={handleTagAssign}
          >
            {({ values }) => (
              <Form className="mt-1">
                <Grid
                  container
                  spacing={{ xs: 1, md: 1 }}
                  columns={{ xs: 4, sm: 8, md: 12 }}
                >
                  {actionType === "edit" && (
                    <Grid item xs={2} sm={4} md={6}>
                      <InputField
                        name="taskSender"
                        label="Task Sender"
                        disabled
                      />
                    </Grid>
                  )}

                  <Grid item xs={2} sm={4} md={6}>
                    <SelectField
                      name="taskReceiver"
                      label="Task Receiver"
                      options={employeeListData}
                      disabled={actionType === "edit" ? true : false}
                    />
                  </Grid>
                  <Grid item xs={2} sm={4} md={6}>
                    <DateField
                      name="taskStartDate"
                      label="Task Start Date"
                      views={["year", "month", "day"]}
                      disabled={
                        actionType === "edit"
                          ? tabType === "Sender"
                            ? true
                            : false
                          : false
                      }
                    />
                  </Grid>
                  <Grid item xs={2} sm={4} md={6}>
                    <DateField
                      name="takDeadline"
                      label="Task End Date"
                      views={["year", "month", "day"]}
                      disabled={
                        actionType === "edit"
                          ? tabType === "Sender"
                            ? true
                            : false
                          : false
                      }
                    />
                  </Grid>
                  <Grid item xs={2} sm={4} md={6}>
                    <InputField
                      name="taskProject"
                      label="Task Project"
                      disabled={actionType === "edit" ? true : false}
                    />
                  </Grid>
                  {actionType === "edit" && (
                    <>
                      <Grid item xs={2} sm={4} md={6}>
                        <SelectField
                          name="taskStatus"
                          label="Task Status"
                          options={
                            tabType === "Sender"
                              ? ConfigData.recieverStatus
                              : ConfigData.senderStatus
                          }
                        />
                      </Grid>
                      {values.taskStatus === "completed" && (
                        <>
                          <Grid item xs={2} sm={4} md={6}>
                            <Typography component="legend">
                              Task Rating
                            </Typography>
                            <Rating name="taskRating" precision={0.5} />
                          </Grid>
                          <Grid item xs={2} sm={4} md={6}>
                            <InputField
                              name="taskRemark"
                              label="Remark"
                              multiline
                              rows={2}
                            />
                          </Grid>
                        </>
                      )}
                    </>
                  )}
                  <Grid item xs={2} sm={4} md={actionType === "edit" ? 6 : 12}>
                    <InputField
                      name="taskDetails"
                      label="Task Details"
                      multiline
                      rows={4}
                      disabled={actionType === "edit" ? true : false}
                    />
                  </Grid>

                  <Grid
                    item
                    xs={12}
                    sm={12}
                    md={12}
                    sx={{
                      display: "flex",
                      justifyContent: "end",
                      gap: "5px",
                    }}
                  >
                    <Button
                      onClick={handleClose}
                      variant="contained"
                      sx={{
                        backgroundColor: "red",
                        ":hover": { backgroundColor: "red" },
                      }}
                    >
                      Cancel
                    </Button>
                    <Button variant="contained" type="submit">
                      Submit
                    </Button>
                  </Grid>
                </Grid>
              </Form>
            )}
          </Formik>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Task;
