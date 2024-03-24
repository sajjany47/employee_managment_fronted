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
              <ul className="grid grid-cols-1 xl:grid-cols-3 gap-y-10 gap-x-6 items-start p-8">
                <li className="relative flex flex-col sm:flex-row xl:flex-col items-start">
                  <div className="order-1 sm:ml-6 xl:ml-0">
                    <h3 className="mb-1 text-slate-900 font-semibold dark:text-slate-200">
                      <span className="mb-1 block text-sm leading-6 text-indigo-500">
                        Headless UI
                      </span>
                      Completely unstyled, fully accessible UI components
                    </h3>
                    <div className="prose prose-slate prose-sm text-slate-600 dark:prose-dark">
                      <p>
                        Completely unstyled, fully accessible UI components,
                        designed to integrate beautifully with Tailwind CSS.
                      </p>
                    </div>
                    <a
                      className="group inline-flex items-center h-9 rounded-full text-sm font-semibold whitespace-nowrap px-3 focus:outline-none focus:ring-2 bg-slate-100 text-slate-700 hover:bg-slate-200 hover:text-slate-900 focus:ring-slate-500 dark:bg-slate-700 dark:text-slate-100 dark:hover:bg-slate-600 dark:hover:text-white dark:focus:ring-slate-500 mt-6"
                      href="https://headlessui.dev"
                    >
                      Learn more
                      <span className="sr-only">
                        , Completely unstyled, fully accessible UI components
                      </span>
                      <svg
                        className="overflow-visible ml-3 text-slate-300 group-hover:text-slate-400 dark:text-slate-500 dark:group-hover:text-slate-400"
                        width={3}
                        height={6}
                        viewBox="0 0 3 6"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M0 0L3 3L0 6" />
                      </svg>
                    </a>
                  </div>
                  <img
                    src="https://tailwindcss.com/_next/static/media/headlessui@75.c1d50bc1.jpg"
                    alt=""
                    className="mb-6 shadow-md rounded-lg bg-slate-50 w-full sm:w-[17rem] sm:mb-0 xl:mb-6 xl:w-full"
                    width={1216}
                    height={640}
                  />
                </li>
                <li className="relative flex flex-col sm:flex-row xl:flex-col items-start">
                  <div className="order-1 sm:ml-6 xl:ml-0">
                    <h3 className="mb-1 text-slate-900 font-semibold dark:text-slate-200">
                      <span className="mb-1 block text-sm leading-6 text-purple-500">
                        Heroicons
                      </span>
                      Beautiful hand-crafted SVG icons, by the makers of
                      Tailwind CSS.
                    </h3>
                    <div className="prose prose-slate prose-sm text-slate-600 dark:prose-dark">
                      <p>
                        A set of 450+ free MIT-licensed SVG icons. Available as
                        basic SVG icons and via first-party React and Vue
                        libraries.
                      </p>
                    </div>
                    <a
                      className="group inline-flex items-center h-9 rounded-full text-sm font-semibold whitespace-nowrap px-3 focus:outline-none focus:ring-2 bg-slate-100 text-slate-700 hover:bg-slate-200 hover:text-slate-900 focus:ring-slate-500 dark:bg-slate-700 dark:text-slate-100 dark:hover:bg-slate-600 dark:hover:text-white dark:focus:ring-slate-500 mt-6"
                      href="https://heroicons.com"
                    >
                      Learn more
                      <span className="sr-only">
                        , Beautiful hand-crafted SVG icons, by the makers of
                        Tailwind CSS.
                      </span>
                      <svg
                        className="overflow-visible ml-3 text-slate-300 group-hover:text-slate-400 dark:text-slate-500 dark:group-hover:text-slate-400"
                        width={3}
                        height={6}
                        viewBox="0 0 3 6"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M0 0L3 3L0 6" />
                      </svg>
                    </a>
                  </div>
                  <img
                    src="https://tailwindcss.com/_next/static/media/heroicons@75.4a558f35.jpg"
                    alt=""
                    className="mb-6 shadow-md rounded-lg bg-slate-50 w-full sm:w-[17rem] sm:mb-0 xl:mb-6 xl:w-full"
                    width={1216}
                    height={640}
                  />
                </li>
                <li className="relative flex flex-col sm:flex-row xl:flex-col items-start">
                  <div className="order-1 sm:ml-6 xl:ml-0">
                    <h3 className="mb-1 text-slate-900 font-semibold dark:text-slate-200">
                      <span className="mb-1 block text-sm leading-6 text-cyan-500">
                        Hero Patterns
                      </span>
                      Seamless SVG background patterns by the makers of Tailwind
                      CSS.
                    </h3>
                    <div className="prose prose-slate prose-sm text-slate-600 dark:prose-dark">
                      <p>
                        A collection of over 100 free MIT-licensed high-quality
                        SVG patterns for you to use in your web projects.
                      </p>
                    </div>
                    <a
                      className="group inline-flex items-center h-9 rounded-full text-sm font-semibold whitespace-nowrap px-3 focus:outline-none focus:ring-2 bg-slate-100 text-slate-700 hover:bg-slate-200 hover:text-slate-900 focus:ring-slate-500 dark:bg-slate-700 dark:text-slate-100 dark:hover:bg-slate-600 dark:hover:text-white dark:focus:ring-slate-500 mt-6"
                      href="https://heropatterns.com"
                    >
                      Learn more
                      <span className="sr-only">
                        , Seamless SVG background patterns by the makers of
                        Tailwind CSS.
                      </span>
                      <svg
                        className="overflow-visible ml-3 text-slate-300 group-hover:text-slate-400 dark:text-slate-500 dark:group-hover:text-slate-400"
                        width={3}
                        height={6}
                        viewBox="0 0 3 6"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M0 0L3 3L0 6" />
                      </svg>
                    </a>
                  </div>
                  <img
                    src="https://tailwindcss.com/_next/static/media/heropatterns@75.82a09697.jpg"
                    alt=""
                    className="mb-6 shadow-md rounded-lg bg-slate-50 w-full sm:w-[17rem] sm:mb-0 xl:mb-6 xl:w-full"
                    width={1216}
                    height={640}
                  />
                </li>
              </ul>
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
