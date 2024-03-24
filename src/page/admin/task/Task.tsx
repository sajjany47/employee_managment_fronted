import { useState } from "react";
import Loader from "../../../components/Loader";
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
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
import { Form, Formik } from "formik";
import {
  DateField,
  InputField,
  SelectField,
} from "../../../components/DynamicField";

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
  const [open, setOpen] = useState(false);

  const handleChange = (event: any) => {
    setTaskStatus(event.target.value);
  };
  const handleTab = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleTagAssign = (values: any) => {
    console.log(values);
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
                value={value}
                onChange={handleTab}
                aria-label="basic tabs example"
              >
                <Tab label="Assign You" {...a11yProps(0)} />
                <Tab label="Assign By You" {...a11yProps(1)} />
              </Tabs>
            </Box>
            <CustomTabPanel value={value} index={0}>
              <div className="w-full">
                <div className="p-2 pb-10">
                  <h1 className="text-2xl font-semibold text-gray-800 mt-4">
                    The Magnificent Bogra
                  </h1>
                  <p className="text-xl text-gray-400 mt-2 leading-relaxed">
                    Located in Rajshahi Division, Bogra is one of the oldest and
                    most fascinating towns in Bangladesh
                  </p>
                </div>
                <div className="bg-blue-50 p-5">
                  <div className="sm:flex sm:justify-between">
                    <div>
                      <div className="text-lg text-gray-700">
                        <span className="text-gray-900 font-bold">196 km</span>{" "}
                        from Dhaka
                      </div>
                      <div className="flex items-center">
                        <div className="flex">
                          <svg
                            className="w-4 h-4 mx-px fill-current text-green-600"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 14 14"
                          >
                            <path d="M6.43 12l-2.36 1.64a1 1 0 0 1-1.53-1.11l.83-2.75a1 1 0 0 0-.35-1.09L.73 6.96a1 1 0 0 1 .59-1.8l2.87-.06a1 1 0 0 0 .92-.67l.95-2.71a1 1 0 0 1 1.88 0l.95 2.71c.13.4.5.66.92.67l2.87.06a1 1 0 0 1 .59 1.8l-2.3 1.73a1 1 0 0 0-.34 1.09l.83 2.75a1 1 0 0 1-1.53 1.1L7.57 12a1 1 0 0 0-1.14 0z"></path>
                          </svg>
                          <svg
                            className="w-4 h-4 mx-px fill-current text-green-600"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 14 14"
                          >
                            <path d="M6.43 12l-2.36 1.64a1 1 0 0 1-1.53-1.11l.83-2.75a1 1 0 0 0-.35-1.09L.73 6.96a1 1 0 0 1 .59-1.8l2.87-.06a1 1 0 0 0 .92-.67l.95-2.71a1 1 0 0 1 1.88 0l.95 2.71c.13.4.5.66.92.67l2.87.06a1 1 0 0 1 .59 1.8l-2.3 1.73a1 1 0 0 0-.34 1.09l.83 2.75a1 1 0 0 1-1.53 1.1L7.57 12a1 1 0 0 0-1.14 0z"></path>
                          </svg>
                          <svg
                            className="w-4 h-4 mx-px fill-current text-green-600"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 14 14"
                          >
                            <path d="M6.43 12l-2.36 1.64a1 1 0 0 1-1.53-1.11l.83-2.75a1 1 0 0 0-.35-1.09L.73 6.96a1 1 0 0 1 .59-1.8l2.87-.06a1 1 0 0 0 .92-.67l.95-2.71a1 1 0 0 1 1.88 0l.95 2.71c.13.4.5.66.92.67l2.87.06a1 1 0 0 1 .59 1.8l-2.3 1.73a1 1 0 0 0-.34 1.09l.83 2.75a1 1 0 0 1-1.53 1.1L7.57 12a1 1 0 0 0-1.14 0z"></path>
                          </svg>
                          <svg
                            className="w-4 h-4 mx-px fill-current text-green-600"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 14 14"
                          >
                            <path d="M6.43 12l-2.36 1.64a1 1 0 0 1-1.53-1.11l.83-2.75a1 1 0 0 0-.35-1.09L.73 6.96a1 1 0 0 1 .59-1.8l2.87-.06a1 1 0 0 0 .92-.67l.95-2.71a1 1 0 0 1 1.88 0l.95 2.71c.13.4.5.66.92.67l2.87.06a1 1 0 0 1 .59 1.8l-2.3 1.73a1 1 0 0 0-.34 1.09l.83 2.75a1 1 0 0 1-1.53 1.1L7.57 12a1 1 0 0 0-1.14 0z"></path>
                          </svg>
                          <svg
                            className="w-4 h-4 mx-px fill-current text-green-600"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 14 14"
                          >
                            <path d="M6.43 12l-2.36 1.64a1 1 0 0 1-1.53-1.11l.83-2.75a1 1 0 0 0-.35-1.09L.73 6.96a1 1 0 0 1 .59-1.8l2.87-.06a1 1 0 0 0 .92-.67l.95-2.71a1 1 0 0 1 1.88 0l.95 2.71c.13.4.5.66.92.67l2.87.06a1 1 0 0 1 .59 1.8l-2.3 1.73a1 1 0 0 0-.34 1.09l.83 2.75a1 1 0 0 1-1.53 1.1L7.57 12a1 1 0 0 0-1.14 0z"></path>
                          </svg>
                        </div>
                        <div className="text-gray-600 ml-2 text-sm md:text-base mt-1">
                          16 reviews
                        </div>
                      </div>
                    </div>
                    <button className="mt-3 sm:mt-0 py-2 px-5 md:py-3 md:px-6 bg-purple-700 hover:bg-purple-600 font-bold text-white md:text-lg rounded-lg shadow-md">
                      Book Ticket
                    </button>
                  </div>
                  <div className="mt-3 text-gray-600 text-sm md:text-sm">
                    *Places to visit: Mahasthangarh, Vasu Bihar &amp; Momo Inn
                  </div>
                </div>
              </div>
            </CustomTabPanel>
            <CustomTabPanel value={value} index={1}>
              Item Two
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
            initialValues={{
              taskDeadline: "",
              user: "",
              taskStatus: "",
              taskDetails: "",
              remark: "",
            }}
            //   validationSchema={activationKeyValidation}
            onSubmit={handleTagAssign}
          >
            {() => (
              <Form className="mt-1">
                <Grid
                  container
                  spacing={{ xs: 1, md: 1 }}
                  columns={{ xs: 4, sm: 8, md: 12 }}
                >
                  <Grid item xs={2} sm={4} md={12}>
                    <DateField
                      name="taskDeadline"
                      label="Deadline"
                      views={["year", "month", "day"]}
                    />
                  </Grid>
                  <Grid item xs={2} sm={4} md={12}>
                    <SelectField name="user" label="User" options={[]} />
                  </Grid>

                  <Grid item xs={2} sm={4} md={12}>
                    <InputField
                      name="taskDetails"
                      label="Task Details"
                      multiline
                      rows={4}
                    />
                  </Grid>
                  <Grid item xs={2} sm={4} md={12}>
                    <SelectField
                      name="taskStatus"
                      label="Task Status"
                      options={[]}
                    />
                  </Grid>
                  <Grid item xs={2} sm={4} md={12}>
                    <InputField
                      name="remark"
                      label="Remark"
                      multiline
                      rows={2}
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
