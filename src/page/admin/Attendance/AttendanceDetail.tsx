import { Box, Button, Card, Chip, Grid } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import { useEffect, useState } from "react";
import { Field, Form, Formik } from "formik";
import { inputField } from "../../../components/FieldType";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
// import EditNoteIcon from "@mui/icons-material/EditNote";
import moment from "moment";
import { ConfigData } from "../../../shared/ConfigData";
import { DateField } from "../../../components/DynamicField";
import { useSelector } from "react-redux";
import { AttendanceService } from "./AttendanceService";
import { enqueueSnackbar } from "notistack";
import Loader from "../../../components/Loader";
import AddIcon from "@mui/icons-material/Add";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import LanguageIcon from "@mui/icons-material/Language";
import ContentPasteIcon from "@mui/icons-material/ContentPaste";
import NoEncryptionIcon from "@mui/icons-material/NoEncryption";

const AttendanceDetail = () => {
  const attendanceService = new AttendanceService();
  const theme = useTheme();
  const user = useSelector((state: any) => state.auth.auth.user);
  const [open, setOpen] = useState(false);
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const [leaveListData, setLeaveListData] = useState<any>({});
  const [leaveUseListData, setLeaveUseListData] = useState<any>([]);
  const [loading, setLoading] = useState(false);
  const [year, setYear] = useState(moment.utc(new Date()));

  const [dateCheckData, setDateCheckData] = useState<any>({});
  // const [startTime, setStartTime] = useState<any>("");

  useEffect(() => {
    applyLeaveList(user.username, moment(year).format("YYYY"));
    attendanceDateChecker();
    // setStartTime(
    //   moment(new Date()).diff(moment(dateCheckData.startTime), "minutes")
    // );

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const attendanceDateChecker = () => {
    setLoading(true);
    attendanceService
      .attendanceDateCheck({ username: user.username, checkDate: new Date() })
      .then((res) => {
        setDateCheckData(res.data);
      })
      .catch((err: any) =>
        enqueueSnackbar(err.response.data.message, { variant: "error" })
      )
      .finally(() => {
        setLoading(false);
      });
  };
  const applyLeaveList = (id: any, leaveYear: any) => {
    setLoading(true);
    attendanceService
      .applyLeaveList({ user_id: id, leaveYear: leaveYear })
      .then((res) => {
        if (Object.keys(res.data).length > 0) {
          setLeaveListData(res.data.leaveDetail);
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
      headerName: "Leave Start Date",
      width: 150,
      renderCell: (value: any) => moment(value.value).format("Do MMM, YYYY"),
    },
    {
      field: "endDay",
      headerName: "Leave End Date",
      width: 150,
      renderCell: (value: any) => moment(value.value).format("Do MMM, YYYY"),
    },
    {
      field: "reason",
      headerName: "Reason",
      width: 200,
      // renderCell: (value: any) => moment(value.value).format("Do MMM, YYYY"),
    },
    {
      field: "totalDays",
      headerName: "Total Days",
      width: 150,
      // renderCell: (value: any) => moment(value.value).format("Do MMM, YYYY"),
    },
    {
      field: "leaveStatus",
      headerName: "Leave Status",
      width: 150,
      renderCell: (value: any) => customRegistrationStatus(value.value),
    },
    { field: "approvedBy", headerName: "ApprovedBy ", width: 130 },
    // {
    //   field: "action",
    //   headerName: "Action",
    //   width: 150,
    //   renderCell: (value: any) => (
    //     <>{value.value === "pending" && <EditNoteIcon color="primary" />}</>
    //   ),
    // },
  ];
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

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
  const handleChange = (value: any) => {
    setLeaveUseListData([]);
    setLeaveListData({});
    setYear(moment.utc(value));
    const formatDate = moment(value).format("YYYY");
    applyLeaveList(user.username, formatDate);
  };

  const handleStartTime = () => {
    setLoading(true);
    const reqData = {
      startTime: new Date(),
      username: user.username,
      date: new Date(),
    };
    attendanceService
      .dailyAttendance(reqData)
      .then(() => {
        enqueueSnackbar("Attendance time started", { variant: "success" });
      })
      .catch((err) =>
        enqueueSnackbar(err.response.data.message, { variant: "error" })
      )
      .finally(() => {
        setLoading(false);
        attendanceDateChecker();
      });
  };

  const handleEndTime = () => {
    setLoading(true);
    const reqData = {
      endTime: new Date(),
      username: user.username,
      totalTime: moment(new Date()).diff(
        moment(dateCheckData.startTime),
        "minutes"
      ),
      date: dateCheckData.date,
    };

    attendanceService
      .dailyAttendance(reqData)
      .then(() => {
        enqueueSnackbar("Attendance time End", { variant: "success" });
      })
      .catch((err) =>
        enqueueSnackbar(err.response.data.message, { variant: "error" })
      )
      .finally(() => {
        setLoading(false);
        attendanceDateChecker();
      });
  };
  return (
    <>
      {loading && <Loader />}

      <Grid container rowSpacing={2} columnSpacing={2}>
        <Grid item xs={12}>
          <Box className="mt-2 flex justify-between">
            <Box>
              <h6>
                <strong>Attendance Details</strong>
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
                startIcon={<AddIcon />}
                onClick={handleClickOpen}
              >
                Apply Leave
              </Button>
            </Box>
          </Box>
        </Grid>
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
                    pageSize: ConfigData.pageSize,
                  },
                },
              }}
              getRowId={(row) => row._id}
              pageSizeOptions={ConfigData.pageRow}
              localeText={{ noRowsLabel: "No Data Available!!!" }}
              // checkboxSelection
              // disableRowSelectionOnClick
            />
          </div>
        </Grid>
        <Grid item xs={12}>
          <div className="mt-5 flex gap-2">
            <Card sx={{ minWidth: 200 }}>TotalTime:</Card>
            <Button
              variant="contained"
              disabled={dateCheckData.startDisabled === true ? true : false}
              onClick={handleStartTime}
            >
              Start Time
            </Button>
            <Button
              variant="contained"
              disabled={dateCheckData.endDisabled === true ? true : false}
              onClick={handleEndTime}
            >
              End Time
            </Button>
          </div>
        </Grid>
      </Grid>

      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">
          <strong>Apply Leave</strong>
        </DialogTitle>
        <DialogContent>
          <Formik initialValues={initialValue} onSubmit={submitLeave}>
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
                    <Field
                      name="reason"
                      label="Reason For Leave"
                      component={inputField}
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

export default AttendanceDetail;
