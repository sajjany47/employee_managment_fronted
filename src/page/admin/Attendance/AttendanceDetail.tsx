import { Box, Chip, Divider, Grid } from "@mui/material";

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
import { useLocation } from "react-router-dom";
import { percentageColor } from "../../../shared/UtlityFunction";

const AttendanceDetail = () => {
  const attendanceService = new AttendanceService();
  const location = useLocation();
  const user = useSelector((state: any) => state.auth.auth.user);
  const [loading, setLoading] = useState(false);
  const [month, setMonth] = useState(moment(new Date()));
  const [dateCheckData, setDateCheckData] = useState<any>({});
  const [showTime, setShowTime] = useState<any>(null);
  const [userAttendanceData, setUserAttendanceData] = useState<any>([]);
  const [averageAttendance, setAverageAttendance] = useState<any>({});

  useEffect(() => {
    Promise.all([
      attendanceDateChecker(),
      userAttendance({
        username: location.state === null ? user.username : location.state.data,
        date: month,
      }),
    ]);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const attendanceDateChecker = () => {
    setLoading(true);
    attendanceService
      .attendanceDateCheck({
        username: location.state === null ? user.username : location.state.data,
        checkDate: new Date(),
      })
      .then((res) => {
        setDateCheckData(res.data);
        if (res.data.startTime !== null && res.data.endTime !== null) {
          setShowTime(
            moment(res.data.endTime).diff(moment(res.data.startTime), "minutes")
          );
        }
        if (res.data.startTime !== null && res.data.endTime === null) {
          setShowTime(
            moment(new Date()).diff(moment(res.data.startTime), "minutes")
          );
        }
        setInterval(() => {
          setShowTime(
            calculateTotalTime(
              res.data.startTime === null ? new Date() : res.data.startTime,
              res.data.endTime === null ? new Date() : res.data.endTime
            )
          );
        }, 60000);
      })
      .catch((err: any) =>
        enqueueSnackbar(err.response.data.message, { variant: "error" })
      )
      .finally(() => {
        setLoading(false);
      });
  };

  function calculateTotalTime(startTime: any, endTime: any) {
    const endTimeData: any = new Date(endTime);
    const startTimeData: any = new Date(startTime);

    const timeDif = moment(endTimeData).diff(moment(startTimeData), "minutes");

    return timeDif;
  }

  const timeColumns: GridColDef[] = [
    {
      field: "username",
      headerName: "Username",
      width: 150,
      renderCell: (value: any) => <span>{value.value}</span>,
    },
    {
      field: "date",
      headerName: "Date",
      width: 150,
      renderCell: (value: any) =>
        moment(value.row.timeSchedule.date).format("Do MMM, YYYY"),
    },
    {
      field: "startTime",
      headerName: "Clock In",
      width: 150,
      renderCell: (value: any) =>
        moment(value.row.timeSchedule.startTime).format("HH:mm:ss"),
    },
    {
      field: "endTime",
      headerName: "Clock Out",
      width: 150,
      renderCell: (value: any) =>
        moment(value.row.timeSchedule.endTime).format("HH:mm:ss"),
    },
    {
      field: "average",
      headerName: "Average",
      width: 150,
      renderCell: (value: any) => {
        const percentage: any = percentageColor(
          9 * 60,
          value.row.timeSchedule.totalTime
        );
        return (
          <Chip
            color={percentage.color}
            label={`${percentage.value.toFixed(2)} %`}
          />
        );
      },
    },
    {
      field: "totalTime",
      headerName: "Total Time",
      width: 150,
      renderCell: (value: any) => (
        <span>{value.row.timeSchedule.totalTime}</span>
      ),
    },
    {
      field: "updatedBy",
      headerName: "Updated By",
      width: 150,
      renderCell: (value: any) => (
        <span>{value.row.timeSchedule?.updatedBy}</span>
      ),
    },
  ];

  const handleMonthChange = (value: any) => {
    const formatDate: any = moment(value);
    setMonth(formatDate);
    userAttendance({
      username: location.state === null ? user.username : location.state.data,
      date: value,
    });
  };

  const userAttendance = (data: any) => {
    attendanceService
      .userAttendanceList(data)
      .then((res) => {
        setUserAttendanceData(res.data);
        let totalGetTime = 0;
        res.data.forEach((item: any) => {
          totalGetTime += item.timeSchedule.totalTime;
        });
        const total: any = res.data.length * 9 * 60;
        const average: any = percentageColor(
          Number(total),
          Number(totalGetTime)
        );
        if (average === undefined || average === null) {
          setAverageAttendance({});
        } else {
          setAverageAttendance(average);
        }
      })
      .catch((err: any) =>
        enqueueSnackbar(err.response.data.message, { variant: "error" })
      )
      .finally(() => {
        setLoading(false);
      });
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
        userAttendance({
          username:
            location.state === null ? user.username : location.state.data,
          date: month,
        });
      });
  };

  const handleEndTime = () => {
    setLoading(true);
    const reqData = {
      endTime: new Date(),
      username: user.username,
      totalTime: moment(new Date()).diff(
        moment(new Date(dateCheckData.startTime)),
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
        userAttendance({
          username:
            location.state === null ? user.username : location.state.data,
          date: month,
        });
      });
  };
  return (
    <>
      {loading && <Loader />}

      <Grid container rowSpacing={2} columnSpacing={2}>
        <Grid item xs={12}>
          <Box className="mt-2 flex justify-between">
            <Box className="mt-4">
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
          <div style={{ backgroundColor: "#DBE9F4", height: "100%" }}>
            <div className="flex items-start justify-center p-4 ">
              <div className="space-y-2 text-center">
                <WatchLaterIcon />
                <h4 className="text-gray-800 font-semibold ">
                  Today Total Time
                </h4>
                <p className="text-gray-600 text-sm">{showTime}</p>
              </div>
            </div>

            <div>
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

              {Object.keys(averageAttendance).length > 0 && (
                <>
                  {" "}
                  <Divider sx={{ margin: 2 }} />
                  <div className="flex items-start justify-center p-4 ">
                    <div className="space-y-2 text-center">
                      <h4 className="text-gray-800 font-semibold ">
                        Average Attendance
                      </h4>
                      <Chip
                        color={averageAttendance.color}
                        label={`${averageAttendance.value.toFixed(2)} %`}
                      />
                    </div>
                  </div>
                </>
              )}
            </div>
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
            style={{
              height: userAttendanceData.length !== 0 ? "100%" : 200,
              width: "100%",
            }}
            rows={userAttendanceData}
            columns={timeColumns}
            initialState={{
              pagination: {
                paginationModel: {
                  pageSize: 10,
                  page: 1,
                },
              },
            }}
            pageSizeOptions={ConfigData.pageRow}
            localeText={{ noRowsLabel: "No Data Available!!!" }}
            getRowId={(row) => row.timeSchedule._id}

            // checkboxSelection
            // disableRowSelectionOnClick
          />
        </Grid>
      </Grid>
    </>
  );
};

export default AttendanceDetail;
