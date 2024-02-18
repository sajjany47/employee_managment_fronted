import { Box, Button, Chip, Grid } from "@mui/material";

import { useEffect, useState } from "react";

import { DataGrid, GridColDef } from "@mui/x-data-grid";
// import EditNoteIcon from "@mui/icons-material/EditNote";
import moment from "moment";
import { ConfigData } from "../../../shared/ConfigData";
import { useSelector } from "react-redux";
import { AttendanceService } from "./AttendanceService";
import { enqueueSnackbar } from "notistack";
import Loader from "../../../components/Loader";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import WatchLaterIcon from "@mui/icons-material/WatchLater";
import { useNavigate } from "react-router-dom";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

const AttendanceDetail = () => {
  const navigation = useNavigate();
  const attendanceService = new AttendanceService();
  const user = useSelector((state: any) => state.auth.auth.user);
  const [loading, setLoading] = useState(false);
  const [month, setMonth] = useState(moment.utc(new Date()));
  const [dateCheckData, setDateCheckData] = useState<any>({});

  const [showTime, setShowTime] = useState<any>(
    calculateTotalTime(
      dateCheckData.startTime === null ? new Date() : dateCheckData.startTime,
      dateCheckData.endTime === null ? new Date() : dateCheckData.endTime
    )
  );

  useEffect(() => {
    attendanceDateChecker();

    const timer = setInterval(() => {
      setShowTime(
        calculateTotalTime(
          dateCheckData.startTime === null
            ? new Date()
            : dateCheckData.startTime,
          dateCheckData.endTime === null ? new Date() : dateCheckData.endTime
        )
      );
    }, 1000);

    return () => clearInterval(timer);
    // setShowTime(
    //   dateCheckData.endTime === null && dateCheckData.startTime === null
    //     ? 0
    //     : moment(
    //         dateCheckData.endTime === null ? new Date() : dateCheckData.endTime
    //       ).diff(moment(dateCheckData.startTime), "minutes")
    // );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const attendanceDateChecker = () => {
    setLoading(true);
    attendanceService
      .attendanceDateCheck({ username: user.username, checkDate: new Date() })
      .then((res) => {
        setDateCheckData(res.data);
        calculateTotalTime(
          res.data.startTime === null ? new Date() : res.data.startTime,
          res.data.endTime === null ? new Date() : res.data.endTime
        );
      })
      .catch((err: any) =>
        enqueueSnackbar(err.response.data.message, { variant: "error" })
      )
      .finally(() => {
        setLoading(false);
      });
  };

  function calculateTotalTime(startTime: any, endTime: any) {
    // const timeDetails =
    //   dateCheckData.endTime === null && dateCheckData.startTime === null
    //     ? 0
    //     : moment(
    //         dateCheckData.endTime === null ? new Date() : dateCheckData.endTime
    //       ).diff(moment(dateCheckData.startTime), "seconds");

    const endTimeData: any = new Date(endTime);
    const startTimeData: any = new Date(startTime);

    // const timeDif = moment(endTimeData).diff(moment(startTimeData), "seconds");
    const timeDif = endTimeData - startTimeData;

    return timeDif;
  }

  const timeColumns: GridColDef[] = [
    {
      field: "Username",
      headerName: "Username",
      width: 150,
      renderCell: (value: any) => <span>{value.value}</span>,
    },
    {
      field: "date",
      headerName: "Date",
      width: 150,
      renderCell: (value: any) => moment(value.value).format("Do MMM, YYYY"),
    },
    {
      field: "startTime",
      headerName: "Clock In",
      width: 150,
      // renderCell: (value: any) => moment(value.value).format("Do MMM, YYYY"),
    },
    {
      field: "endTime",
      headerName: "Clock Out",
      width: 200,
      // renderCell: (value: any) => moment(value.value).format("Do MMM, YYYY"),
    },
    {
      field: "totalTime",
      headerName: "Total Time",
      width: 150,
      // renderCell: (value: any) => moment(value.value).format("Do MMM, YYYY"),
    },
    {
      field: "updatedBy",
      headerName: "Updated By",
      width: 150,
    },
  ];

  const handleMonthChange = (value: any) => {
    const formatDate: any = moment(value).format("MM-YYYY");
    setMonth(formatDate);
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
                    value={month}
                    slotProps={{
                      textField: { size: "small", fullWidth: false },
                    }}
                    views={["month", "year"]}
                    onChange={handleMonthChange}
                  />
                </DemoContainer>
              </LocalizationProvider>

              <Button
                variant="contained"
                startIcon={<ArrowForwardIosIcon />}
                onClick={() => navigation("/user/leave/details")}
              >
                Leave
              </Button>
            </Box>
          </Box>
        </Grid>

        <Grid
          item
          xs={12}
          sm={12}
          md={3}
          sx={{ marginTop: 10, marginBottom: 10 }}
        >
          <div className="flex items-start justify-center p-4 border-solid">
            <div className="space-y-2 text-center">
              <WatchLaterIcon />
              <h4 className="text-gray-800 font-semibold ">Today Total Time</h4>
              <p className="text-gray-600 text-sm">{showTime}</p>
            </div>
          </div>

          <div className="mt-6 flex flex-wrap gap-4 justify-center">
            <Chip
              color="success"
              label={"Clock In"}
              disabled={dateCheckData.startDisabled === true ? true : false}
              onClick={handleStartTime}
            />
            <Chip
              color="warning"
              label={"Clock Out"}
              disabled={dateCheckData.endDisabled === true ? true : false}
              onClick={handleEndTime}
            />
          </div>
        </Grid>

        <Grid
          item
          xs={12}
          sm={12}
          md={9}
          sx={{ marginTop: 10, marginBottom: 10 }}
        >
          <DataGrid
            // style={{
            //   height: leaveUseListData.length !== 0 ? "100%" : 200,
            //   width: "100%",
            // }}
            rows={[]}
            columns={timeColumns}
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
        </Grid>
      </Grid>
    </>
  );
};

export default AttendanceDetail;
