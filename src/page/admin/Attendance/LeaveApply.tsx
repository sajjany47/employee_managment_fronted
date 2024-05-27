import { useEffect, useState } from "react";
import Loader from "../../../components/Loader";
import {
  Box,
  Button,
  Chip,
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
} from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import moment from "moment";
import { enqueueSnackbar } from "notistack";
import { AttendanceService } from "./AttendanceService";
import { useSelector } from "react-redux";
import { ConfigData } from "../../../shared/ConfigData";
import { Form, Formik } from "formik";
import { DateField, InputField } from "../../../components/DynamicField";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import LanguageIcon from "@mui/icons-material/Language";
import ContentPasteIcon from "@mui/icons-material/ContentPaste";
import NoEncryptionIcon from "@mui/icons-material/NoEncryption";
import * as Yup from "yup";
import { useLocation } from "react-router-dom";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

const LeaveApply = () => {
  const attendanceService = new AttendanceService();
  const location = useLocation();

  const user = useSelector((state: any) => state.auth.auth.user);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [year, setYear] = useState(moment.utc(new Date()));
  const [leaveUseListData, setLeaveUseListData] = useState<any>([]);
  const [leaveListData, setLeaveListData] = useState<any>({});

  const leaveSchema = Yup.object().shape({
    startDay: Yup.string().required("Start Day is required"),
    endDay: Yup.string()
      .required("End Day is requird")
      .when(
        "startDay",
        (startDate: any, schema) =>
          startDate &&
          schema.min(startDate, "End date is greater than start Date")
      ),
    reason: Yup.string().required("Reason is required"),
  });
  useEffect(() => {
    applyLeaveList(
      location.state === null ? user.username : location.state.data,
      moment(year).format("YYYY")
    );

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const applyLeaveList = (id: any, leaveYear: any) => {
    setLoading(true);
    attendanceService
      .applyLeaveList({ user_id: id, leaveYear: leaveYear })
      .then((res) => {
        if (Object.keys(res.data).length > 0) {
          setLeaveListData(res.data);
          setLeaveUseListData(
            res.data?.leaveUse?.map((item: any) => ({
              ...item,
              user_id: res.data?.user_id,
            }))
          );
        }
      })
      .catch((err: any) =>
        enqueueSnackbar(err.response.data.message, { variant: "error" })
      )
      .finally(() => {
        setLoading(false);
      });
  };

  const handleChange = (value: any) => {
    setLeaveUseListData([]);
    setLeaveListData({});
    setYear(moment.utc(value));
    const formatDate = moment(value).format("YYYY");
    applyLeaveList(user.username, formatDate);
  };

  const customRegistrationStatus = (value: any) => {
    switch (value) {
      case "pending":
        return (
          <Chip
            color="warning"
            label={value}
            sx={{ textTransform: "capitalize" }}
          />
        );
        break;

      case "approved":
        return (
          <Chip
            label={value}
            color="success"
            sx={{ textTransform: "capitalize" }}
          />
        );
        break;
      case "rejected":
        return (
          <Chip
            label={value}
            color="error"
            sx={{ textTransform: "capitalize" }}
          />
        );
      default:
        break;
    }
  };
  const columns: GridColDef[] = [
    {
      field: "user_id",
      headerName: "Username",
      width: 150,
      renderCell: (value: any) => <span>{value.value}</span>,
    },
    {
      field: "startDay",
      headerName: "Start Date",
      width: 150,
      renderCell: (value: any) => moment(value.value).format("Do MMM, YYYY"),
    },
    {
      field: "endDay",
      headerName: "End Date",
      width: 150,
      renderCell: (value: any) => moment(value.value).format("Do MMM, YYYY"),
    },
    {
      field: "reason",
      headerName: "Reason",
      width: 150,
    },
    {
      field: "totalDays",
      headerName: "Total Days",
      width: 150,
    },
    {
      field: "leaveStatus",
      headerName: "Leave Status",
      width: 150,
      renderCell: (value: any) => customRegistrationStatus(value.value),
    },
    { field: "approvedBy", headerName: "ApprovedBy ", width: 130 },
  ];

  const initialValue = { startDay: "", endDay: "", reason: "" };

  const submitLeave = (values: any) => {
    setLoading(true);
    const requestData = {
      startDay: values.startDay,
      endDay: values.endDay,
      reason: values.reason,
      user_id: user.username,
    };
    attendanceService
      .leaveApply(requestData)
      .then((res) => {
        enqueueSnackbar(res.message, { variant: "success" });
        handleClose();
      })
      .catch((err: any) =>
        enqueueSnackbar(err.response.data.message, { variant: "error" })
      )
      .finally(() => {
        setLoading(false);
        applyLeaveList(user.username, "2024");
      });
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <>
      {loading && <Loader />}
      <Grid container rowSpacing={2} columnSpacing={2}>
        <Grid item xs={12}>
          <Box className="mt-2 flex justify-between">
            <Box className="mt-4">
              <h6>
                <strong>Leave Details</strong>
              </h6>
            </Box>
            <Box className="mt-2 flex justify-end gap-2">
              <LocalizationProvider dateAdapter={AdapterMoment}>
                <DemoContainer
                  components={["DatePicker"]}
                  sx={{ marginTop: -1 }}
                >
                  <DatePicker
                    label="Select Year"
                    value={year}
                    slotProps={{
                      textField: { size: "small", fullWidth: false },
                    }}
                    views={["year"]}
                    onChange={handleChange}
                  />
                </DemoContainer>
              </LocalizationProvider>

              <Button
                variant="contained"
                // startIcon={<AddIcon />}
                onClick={handleClickOpen}
              >
                Apply Leave
              </Button>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Grid item xs={12}>
            <div className="max-w-screen-xl mx-auto px-4 md:px-8">
              <ul className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                <li className="border rounded-lg">
                  <div className="flex items-start justify-center p-4">
                    <div className="space-y-2 text-center">
                      <LanguageIcon />
                      <h4 className="text-gray-800 font-semibold ">
                        Total Leave Alloted
                      </h4>
                      <p className="text-gray-600 text-sm">
                        {Object.keys(leaveListData).length > 0
                          ? leaveListData?.leaveDetail?.totalLeave
                          : 0}
                      </p>
                    </div>
                  </div>
                </li>
                <li className="border rounded-lg">
                  <div className="flex items-start justify-center p-4">
                    <div className="space-y-2 text-center">
                      <NoEncryptionIcon />

                      <h4 className="text-gray-800 font-semibold">
                        Total Leave Used
                      </h4>
                      <p className="text-gray-600 text-sm">
                        {Object.keys(leaveListData).length > 0
                          ? leaveListData?.leaveDetail?.totalLeave -
                            leaveListData?.leaveDetail?.totalLeaveLeft
                          : 0}
                      </p>
                    </div>
                  </div>
                </li>
                <li className="border rounded-lg">
                  <div className="flex items-start justify-center p-4">
                    <div className="space-y-2 text-center">
                      <ContentPasteIcon />
                      <h4 className="text-gray-800 font-semibold">
                        Total Leave Left
                      </h4>
                      <p className="text-gray-600 text-sm">
                        {Object.keys(leaveListData).length > 0
                          ? leaveListData?.leaveDetail?.totalLeaveLeft
                          : 0}
                      </p>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </Grid>
          <Grid item xs={12}>
            <div className="mt-10">
              <DataGrid
                style={{
                  height: leaveUseListData.length !== 0 ? "100%" : 200,
                  width: "100%",
                }}
                rows={leaveUseListData}
                columns={columns}
                initialState={{
                  pagination: {
                    paginationModel: {
                      pageSize: 10,
                      page: 1,
                    },
                  },
                }}
                pageSizeOptions={ConfigData.pageRow}
                getRowId={(row) => row._id}
                localeText={{ noRowsLabel: "No Data Available!!!" }}
                // checkboxSelection
                // disableRowSelectionOnClick
              />
            </div>
          </Grid>
        </Grid>
      </Grid>

      <Dialog
        open={open}
        // onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">
          <Box display="flex" alignItems="center">
            <Box flexGrow={1}>
              <strong>Apply Leave</strong>
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
            initialValues={initialValue}
            onSubmit={submitLeave}
            validationSchema={leaveSchema}
          >
            {({ handleSubmit }) => (
              <Form onSubmit={handleSubmit}>
                <Grid
                  container
                  spacing={{ xs: 2, md: 2 }}
                  columns={{ xs: 4, sm: 8, md: 12 }}
                >
                  <Grid item xs={2} sm={4} md={6}>
                    <DateField
                      name="startDay"
                      label="Start Day"
                      views={["year", "month", "day"]}
                    />
                  </Grid>
                  <Grid item xs={2} sm={4} md={6}>
                    <DateField
                      name="endDay"
                      label="End Day"
                      views={["year", "month", "day"]}
                    />
                  </Grid>
                  <Grid item xs={2} sm={12} md={12}>
                    <InputField
                      name="reason"
                      label="Reason For Leave"
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
                    <Button
                      // onClick={handleGenerateKey}
                      variant="contained"
                      type="submit"
                    >
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

export default LeaveApply;
