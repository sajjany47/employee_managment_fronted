import {
  Button,
  Chip,
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  TextField,
} from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditNoteIcon from "@mui/icons-material/EditNote";
import moment from "moment";
import { ConfigData } from "../../../shared/ConfigData";
import { Form, Formik } from "formik";
import AddIcon from "@mui/icons-material/Add";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AttendanceService } from "./AttendanceService";
import { enqueueSnackbar } from "notistack";
import Loader from "../../../components/Loader";
import { SelectField } from "../../../components/DynamicField";
import { useSelector } from "react-redux";

const Attendance = () => {
  const navigate = useNavigate();
  const attendanceService = new AttendanceService();
  const user = useSelector((state: any) => state.auth.auth.user);
  const [allUserLeaveList, setAllUserLeaveList] = useState([]);
  const [open, setOpen] = useState(false);
  const [year, setYear] = useState(moment.utc(new Date()));
  const [loading, setLoading] = useState(false);
  const [selectLeave, setSelectLeave] = useState<any>({});

  useEffect(() => {
    allUserLeave(year);
  }, []);

  const allUserLeave = (year: any) => {
    attendanceService
      .allUserLeaveList(moment(year).format("YYYY"))
      .then((res) => {
        setAllUserLeaveList(res.data);
      })
      .catch((err: any) =>
        enqueueSnackbar(err.response.data.message, { variant: "error" })
      )
      .finally(() => setLoading(false));
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
      headerName: "UserName",
      width: 150,
      renderCell: (value: any) => <span>{value.row.user_id}</span>,
    },
    {
      field: "totalLeaveLeft",
      headerName: "Leave Left",
      width: 150,
      renderCell: (value: any) => (
        <span>{value.row.leaveDetail.totalLeaveLeft}</span>
      ),
    },
    {
      field: "startDay",
      headerName: "Leave Start Date",
      width: 200,
      renderCell: (value: any) =>
        moment(value.row.leaveDetail.leaveUseDetail.startDay).format(
          "Do MMM, YYYY"
        ),
    },
    {
      field: "endDay",
      headerName: "Leave Start Date",
      width: 200,
      renderCell: (value: any) =>
        moment(value.row.leaveDetail.leaveUseDetail.endDay).format(
          "Do MMM, YYYY"
        ),
    },
    {
      field: "reason",
      headerName: "Reason",
      width: 200,
      renderCell: (value: any) => (
        <span>{value.row.leaveDetail.leaveUseDetail.reason}</span>
      ),
    },
    {
      field: "totalDays",
      headerName: "Total Days",
      width: 150,
      renderCell: (value: any) => (
        <span>{value.row.leaveDetail.leaveUseDetail.totalDays}</span>
      ),
    },
    {
      field: "leaveStatus",
      headerName: "Leave Status",
      width: 100,
      renderCell: (value: any) =>
        customRegistrationStatus(
          value.row.leaveDetail.leaveUseDetail.leaveStatus
        ),
    },
    {
      field: "approvedBy",
      headerName: "ApprovedBy ",
      width: 150,
      renderCell: (value: any) => (
        <span>{value.row.leaveDetail.leaveUseDetail.approvedBy}</span>
      ),
    },
    {
      field: "action",
      headerName: "Action",
      width: 120,
      renderCell: (value: any) => (
        <>
          {value.row.leaveDetail.leaveUseDetail.leaveStatus === "pending" && (
            <EditNoteIcon
              color="primary"
              style={{
                cursor: "pointer",
                fontSize: "30px",
                marginRight: "5px",
              }}
              onClick={() => {
                setSelectLeave(value.row);
                setOpen(true);
              }}
            />
          )}

          <VisibilityIcon
            color="secondary"
            style={{
              cursor: "pointer",
              fontSize: "30px",
            }}
            onClick={() => {
              navigate("/admin/attendance/details", {
                state: { data: value.row },
              });
            }}
          />
        </>
      ),
    },
  ];
  const handleClick = () => {
    navigate("/admin/attendance/details");
  };
  const handleClose = () => {
    setOpen(false);
    setLoading(false);
    setSelectLeave({});
  };
  const handleChange = (value: any) => {
    setAllUserLeaveList([]);
    setYear(moment.utc(value));

    allUserLeave(value);
  };
  const initialValue = {
    statusChange:
      Object.keys(selectLeave).length > 0
        ? selectLeave.leaveDetail.leaveUseDetail.leaveStatus
        : "",
  };
  const handelStatusChanges = (values: any) => {
    setLoading(true);
    const requestBody = {
      id: selectLeave.leaveDetail.leaveUseDetail._id,
      leaveStatus: values.statusChange,
      approvedBy: user.username,
      leaveYear: selectLeave.leaveDetail.leaveYear,
      user_id: selectLeave.user_id,
      outerId: selectLeave.leaveDetail._id,
    };
    attendanceService
      .applyLeaveApproved(requestBody)
      .then((res) => {
        enqueueSnackbar(res.message, { variant: "success" });
        handleClose();
      })
      .catch((err: any) => {
        enqueueSnackbar(err.response.data.message, { variant: "error" });
        setLoading(false);
      })
      .finally(() => allUserLeave(year));
  };

  return (
    <>
      {loading && <Loader />}
      <div className="flex justify-between">
        <div>
          <h6>
            <strong>Attendance Details</strong>
          </h6>
        </div>
        <div className="flex gap-2">
          <TextField
            label="Search"
            id="outlined-size-small"
            size="small"
            // className="w-full"
          />
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
            onClick={() => navigate("/admin/holiday-list")}
          >
            Holiday List
          </Button>

          <Button
            variant="contained"
            // startIcon={<AddIcon />}
            onClick={handleClick}
          >
            My Attendance
          </Button>
        </div>
      </div>

      <Grid container rowSpacing={2} columnSpacing={2} marginTop={5}>
        <Grid item xs={12} sm={12} md={12}>
          <DataGrid
            style={{
              height: allUserLeaveList.length !== 0 ? "100%" : 200,
              width: "100%",
            }}
            rows={allUserLeaveList}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: {
                  pageSize: ConfigData.pageSize,
                },
              },
            }}
            getRowId={(row) => row.leaveDetail.leaveUseDetail._id}
            pageSizeOptions={ConfigData.pageRow}
            localeText={{ noRowsLabel: "No Data Available!!!" }}
            // checkboxSelection
            // disableRowSelectionOnClick
          />
        </Grid>
      </Grid>
      <Dialog
        // fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">
          <strong>Leave Status Change</strong>
        </DialogTitle>
        <DialogContent>
          <Formik initialValues={initialValue} onSubmit={handelStatusChanges}>
            {({ handleSubmit }) => (
              <Form onSubmit={handleSubmit} className="mt-5">
                <Grid
                  container
                  spacing={{ xs: 2, md: 2 }}
                  columns={{ xs: 4, sm: 8, md: 12 }}
                >
                  <Grid item xs={2} sm={4} md={12}>
                    <SelectField
                      name="statusChange"
                      label="Status"
                      options={ConfigData.leaveStatus}
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

export default Attendance;
