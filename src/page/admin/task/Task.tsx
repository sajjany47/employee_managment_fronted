import { useState } from "react";
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
  const options = [...ConfigData.taskStatus, { label: "All", value: "all" }];

  const [loading, setLoading] = useState(false);
  const [taskStatus, setTaskStatus] = useState("all");
  const [tabValue, setTabValue] = useState(0);
  const [open, setOpen] = useState(false);
  const [actionType, setActionType] = useState("add");
  const [selectTask, setSelectTask] = useState({});

  const handleChange = (event: any) => {
    setTaskStatus(event.target.value);
  };
  const handleTab = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };
  const handleClickOpen = () => {
    setActionType("add");
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleTagAssign = (values: any) => {
    console.log(values);
    setLoading(false);
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
                  {options.map((item: any, index: number) => {
                    return (
                      <MenuItem value={item.value} key={index}>
                        {item.label}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
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
                <Tab label="Assign You" {...a11yProps(0)} />
                <Tab label="Assign By You" {...a11yProps(1)} />
              </Tabs>
            </Box>
            <CustomTabPanel value={tabValue} index={0}>
              <AssignTask />
            </CustomTabPanel>
            <CustomTabPanel value={tabValue} index={1}>
              <AssignTask />
            </CustomTabPanel>
          </Box>
        </Grid>
      </Grid>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="alert-dialog-title">{"Task Assign"}</DialogTitle>
        <DialogContent>
          <Formik
            initialValues={
              actionType === "edit"
                ? { ...selectTask }
                : {
                    taskStatus: "assign",
                    taskReceiver: "",
                    taskStartDate: "",
                    takDeadline: "",
                    taskDetails: "",
                    taskProject: "",
                  }
            }
            //   validationSchema={activationKeyValidation}
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
                      <InputField name="taskSender" label="Task Sender" />
                    </Grid>
                  )}

                  <Grid item xs={2} sm={4} md={6}>
                    <SelectField
                      name="taskReceiver"
                      label="Task Receiver"
                      options={ConfigData.taskStatus}
                    />
                  </Grid>
                  <Grid item xs={2} sm={4} md={6}>
                    <DateField
                      name="taskStartDate"
                      label="Task Start Date"
                      views={["year", "month", "day"]}
                    />
                  </Grid>
                  <Grid item xs={2} sm={4} md={6}>
                    <DateField
                      name="takDeadline"
                      label="Task End Date"
                      views={["year", "month", "day"]}
                    />
                  </Grid>
                  <Grid item xs={2} sm={4} md={6}>
                    <InputField name="taskProject" label="Task Project" />
                  </Grid>
                  <Grid item xs={2} sm={4} md={actionType === "edit" ? 6 : 12}>
                    <InputField
                      name="taskDetails"
                      label="Task Details"
                      multiline
                      rows={4}
                    />
                  </Grid>
                  {actionType === "edit" && (
                    <>
                      <Grid item xs={2} sm={4} md={6}>
                        <SelectField
                          name="taskStatus"
                          label="Task Status"
                          options={ConfigData.taskStatus}
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
