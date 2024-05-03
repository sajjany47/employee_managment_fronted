import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  // FormControl,
  Grid,
  IconButton,
  // MenuItem,
  // Select,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { Fragment, useEffect, useState } from "react";
import { Form, Formik } from "formik";
import { DateField, InputField } from "../../../components/DynamicField";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import { AttendanceService } from "./AttendanceService";
import { enqueueSnackbar } from "notistack";
import Loader from "../../../components/Loader";
import { useSelector } from "react-redux";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import moment from "moment";
import * as Yup from "yup";
import DeleteIcon from "@mui/icons-material/Delete";

const HolidayList = () => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const attendanceService = new AttendanceService();
  const [id, setId] = useState(moment.utc(new Date()));
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [holidayListData, setHolidayListData] = useState([]);

  const userType = useSelector((state: any) => state.auth.auth.user);

  useEffect(() => {
    holidayList(moment(id).format("YYYY"));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleChange = (value: any) => {
    setId(moment.utc(value));
    const formatDate = moment(value).format("YYYY");
    holidayList(formatDate);
  };

  const holidayList = (year: any) => {
    setLoading(true);
    attendanceService
      .getHolidayList(year)
      .then((res) => {
        setHolidayListData(res.data);
        setLoading(false);
      })
      .catch((err) => {
        enqueueSnackbar(err.response.data.message, { variant: "error" });
        setLoading(false);
      });
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const initialValue = { holidayDate: "", reason: "" };

  const validationSchema = Yup.object().shape({
    holidayDate: Yup.string().required("Date of Holiday is required"),
    reason: Yup.string().required("Reason is required"),
  });

  const submitLeave = (values: any) => {
    setLoading(true);
    attendanceService
      .createHolidayList({ ...values, createdBy: userType.username })
      .then((res) => {
        enqueueSnackbar(res.message, { variant: "success" });
        setLoading(false);
        handleClose();
        holidayList(id);
      })
      .catch((error) => {
        enqueueSnackbar(error.response.data.message, { variant: "error" });
        setLoading(false);
      })
      .finally(() => holidayList(moment(id).format("YYYY")));
  };

  const handelDeleteHoliday = (item: any) => {
    const requestData = {
      _id: item.holidayList._id,
      holidayYear: item.holidayYear,
    };
    attendanceService
      .deleteHolidayList(requestData)
      .then((res) => {
        enqueueSnackbar(res.message, { variant: "success" });
        holidayList(id);
      })
      .catch((error) => {
        enqueueSnackbar(error.response.data.message, { variant: "error" });
        setLoading(false);
      })
      .finally(() => holidayList(moment(id).format("YYYY")));
  };

  return (
    <>
      {loading && <Loader />}

      <Grid container rowSpacing={2} columnSpacing={2}>
        <Grid item xs={12}>
          <Box className="mt-2 flex justify-between">
            <Box className="mt-4">
              <h6>
                <strong>Holiday List</strong>
              </h6>
            </Box>
            <Box className="mt-2 flex justify-end gap-2">
              <LocalizationProvider dateAdapter={AdapterMoment}>
                <DemoContainer
                  components={["DatePicker"]}
                  sx={{ marginTop: -1 }}
                >
                  <DatePicker
                    // sx={{ width: "50% " }}
                    label="Select Year"
                    value={id}
                    slotProps={{
                      textField: { size: "small", fullWidth: false },
                    }}
                    views={["year"]}
                    // onChange={(newValue) => setId(moment.utc(newValue))}
                    onChange={handleChange}
                  />
                </DemoContainer>
              </LocalizationProvider>
              {userType.role !== "employee" && (
                <Button
                  variant="contained"
                  startIcon={<AddIcon />}
                  sx={{ minWidth: 140 }}
                  onClick={handleClickOpen}
                >
                  Add
                </Button>
              )}
            </Box>
          </Box>
        </Grid>
        <Grid item xs={12}>
          {holidayListData.length > 0 ? (
            holidayListData?.map((item: any, index: any) => {
              return (
                <Fragment key={index}>
                  <div
                    className=" rounded-xl shadow-md overflow-hidden  m-3 "
                    style={{ backgroundColor: "#e5e7eb" }}
                  >
                    <div className="flex justify-between">
                      <div className="p-4 flex items-center">
                        <div
                          className={`pr-4 ${
                            new Date(item.holidayList.holidayDate) > new Date()
                              ? "bg-blue-500"
                              : "bg-white"
                          } p-2 rounded-lg text-center`}
                        >
                          <p className="text-4xl font-bold text-orange-300">
                            {moment(item.holidayList.holidayDate).format("DD")}
                          </p>
                          <p className="text-sm text-orange-300">
                            {" "}
                            {moment(item.holidayList.holidayDate).format(
                              "MMMM, YYYY"
                            )}
                          </p>
                        </div>
                        <div className="ml-4">
                          <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">
                            {item.holidayList.reason}
                          </div>
                          <p className="mt-2 text-gray-500">
                            {moment(item.holidayList.holidayDate).format(
                              "dddd"
                            )}
                          </p>
                        </div>
                      </div>
                      <div className="p-4 flex items-center">
                        {" "}
                        <IconButton
                          aria-label="delete"
                          onClick={() => handelDeleteHoliday(item)}
                          sx={{
                            ":hover": {
                              backgroundColor: "whitesmoke",
                            },
                          }}
                        >
                          <DeleteIcon
                            sx={{
                              fontSize: "30px",
                              margin: "auto",
                              color: "red",
                            }}
                          />
                        </IconButton>
                      </div>
                    </div>
                  </div>
                </Fragment>
              );
            })
          ) : (
            <div className=" mt-20 ">
              <h4 className="text-center"> No Data Avliable</h4>
            </div>
          )}
        </Grid>
      </Grid>

      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">
          <strong>Add Holiday</strong>
        </DialogTitle>
        <DialogContent>
          <Formik
            initialValues={initialValue}
            onSubmit={submitLeave}
            validationSchema={validationSchema}
          >
            {({ handleSubmit }) => (
              <Form onSubmit={handleSubmit} className="mt-3">
                <Grid
                  container
                  spacing={{ xs: 2, md: 2 }}
                  columns={{ xs: 4, sm: 8, md: 12 }}
                >
                  <Grid item xs={2} sm={4} md={6}>
                    <DateField name="holidayDate" label="Date" />
                  </Grid>

                  <Grid item xs={2} sm={4} md={6}>
                    <InputField name="reason" label="Reason" />
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
    </>
  );
};

export default HolidayList;
