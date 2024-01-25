import { Button, Chip, Grid } from "@mui/material";
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

const AttendanceDetail = () => {
  const attendanceService = new AttendanceService();
  const theme = useTheme();
  const user = useSelector((state: any) => state.auth.auth.user);
  const [open, setOpen] = useState(false);
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  // const [leaveListData, setLeaveListData] = useState<any>({});
  const [leaveUseListData, setLeaveUseListData] = useState<any>([]);
  const [loading, setLoading] = useState(false);
  const [year, setYear] = useState(moment.utc(new Date()));

  useEffect(() => {
    applyLeaveList(user.username, moment(year).format("YYYY"));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const applyLeaveList = (id: any, leaveYear: any) => {
    setLoading(true);
    attendanceService
      .applyLeaveList({ user_id: id, leaveYear: leaveYear })
      .then((res) => {
        if (Object.keys(res.data).length > 0) {
          // setLeaveListData(res.data);
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
    setYear(moment.utc(value));
    const formatDate = moment(value).format("YYYY");
    applyLeaveList(user.username, formatDate);
  };

  return (
    <>
      {loading && <Loader />}
      <div className="flex justify-between">
        <h6>
          <strong>Attendance Details</strong>
        </h6>
        <div className="flex gap-1">
          <LocalizationProvider dateAdapter={AdapterMoment}>
            <DemoContainer components={["DatePicker"]}>
              <DatePicker
                sx={{ width: "50% " }}
                label="Select Year"
                value={year}
                slotProps={{ textField: { size: "small", fullWidth: false } }}
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
        </div>
        {/* <Button variant="contained" onClick={handleClickOpen}>
          Apply Leave
        </Button> */}
      </div>

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
