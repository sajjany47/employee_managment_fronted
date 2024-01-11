import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  // FormControl,
  Grid,
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

  const submitLeave = (values: any) => {
    setLoading(true);
    attendanceService
      .createHolidayList({ ...values, createdBy: userType.username })
      .then((res) => {
        enqueueSnackbar(res.message, { variant: "success" });
        setLoading(false);
        handleClose();
      })
      .catch((error) => {
        enqueueSnackbar(error.response.data.message, { variant: "error" });
        setLoading(false);
      });
  };

  console.log(holidayListData);
  return (
    <>
      {loading && <Loader />}
      <div className="flex justify-between">
        <h6>
          <strong>Holiday List</strong>
        </h6>
        <div className="flex justify-between gap-1">
          <LocalizationProvider dateAdapter={AdapterMoment}>
            <DemoContainer components={["DatePicker"]}>
              <DatePicker
                label="Select Year"
                value={id}
                views={["year"]}
                // onChange={(newValue) => setId(moment.utc(newValue))}
                onChange={handleChange}
              />
            </DemoContainer>
          </LocalizationProvider>

          <Button
            variant="contained"
            startIcon={<AddIcon />}
            sx={{ minWidth: 150, height: "55px", marginTop: "6px" }}
            onClick={handleClickOpen}
          >
            Add
          </Button>
        </div>
      </div>

      {/* <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl m-5"> */}
      {holidayListData?.map((item: any, index) => {
        return (
          <Fragment key={index}>
            {moment(item.holidayList.holidayDate).format("DD-MM-YYYY") <
            moment(new Date()).format("DD-MM-YYYY") ? (
              <>
                {" "}
                <div className="max-w-md  bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl m-3">
                  <div className="p-4 flex items-center">
                    <div className="pr-4 bg-blue-500 p-2 rounded-lg text-center">
                      <p className="text-4xl font-bold text-white">
                        {moment(item.holidayList.holidayDate).format("DDDD")}
                      </p>
                      <p className="text-sm text-white">
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
                      {/* <p className="mt-2 text-gray-500">Event Details...</p> */}
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <>
                {" "}
                <div className="max-w-md  bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl m-3">
                  <div className="p-4 flex items-center">
                    <div className="pr-4 bg-blue-200 p-2 rounded-lg text-center">
                      <p className="text-4xl font-bold text-white">
                        {" "}
                        {moment(item.holidayList.holidayDate).format("DDD")}
                      </p>
                      <p className="text-sm text-white">
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
                      {/* <p className="mt-2 text-gray-500">9:20 AM - 9:40 AM</p> */}
                    </div>
                  </div>
                </div>
              </>
            )}
          </Fragment>
        );
      })}

      {/* </div> */}

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
          <Formik initialValues={initialValue} onSubmit={submitLeave}>
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
