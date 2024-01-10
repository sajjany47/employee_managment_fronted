import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  FormControl,
  Grid,
  MenuItem,
  Select,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useState } from "react";
import { Form, Formik } from "formik";
import { DateField, InputField } from "../../../components/DynamicField";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import { AttendanceService } from "./AttendanceService";
import { enqueueSnackbar } from "notistack";
import Loader from "../../../components/Loader";

const HolidayList = () => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const attendanceService = new AttendanceService();
  const [id, setId] = useState("2024");
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (event: any) => {
    setId(event.target.value);
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
      .createHolidayList(values)
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

  return (
    <>
      {loading && <Loader />}
      <div className="flex justify-between">
        <h6>
          <strong>Holiday List</strong>
        </h6>
        <div className="flex justify-between gap-1">
          <FormControl sx={{ minWidth: 150 }} size="small">
            <Select value={id} onChange={handleChange}>
              <MenuItem value={"2024"}>2024</MenuItem>
              <MenuItem value={"2023"}>2023</MenuItem>
              <MenuItem value={"2022"}>2022</MenuItem>
            </Select>
          </FormControl>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            sx={{ minWidth: 150 }}
            size="small"
            onClick={handleClickOpen}
          >
            Add
          </Button>
        </div>
      </div>

      {/* <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl m-5"> */}
      <div className="max-w-md  bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl m-3">
        <div className="p-4 flex items-center">
          <div className="pr-4 bg-blue-500 p-2 rounded-lg text-center">
            <p className="text-4xl font-bold text-white">18th</p>
            <p className="text-sm text-white">November, 2023</p>
          </div>
          <div className="ml-4">
            <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">
              9:20 AM - 9:40 AM
            </div>
            <p className="mt-2 text-gray-500">Event Details...</p>
          </div>
        </div>
      </div>

      <div className="max-w-md  bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl m-3">
        <div className="p-4 flex items-center">
          <div className="pr-4 bg-blue-200 p-2 rounded-lg text-center">
            <p className="text-4xl font-bold text-white">18th</p>
            <p className="text-sm text-white">November, 2023</p>
          </div>
          <div className="ml-4">
            <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">
              Clinic Appointment
            </div>
            <p className="mt-2 text-gray-500">9:20 AM - 9:40 AM</p>
          </div>
        </div>
      </div>
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
