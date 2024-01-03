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
import { Field, Form, Formik } from "formik";
import { selectField } from "../../../components/FieldType";
import AddIcon from "@mui/icons-material/Add";

const Attendance = () => {
  const navigate = useNavigate();
  const [allUserLeaveList, setAllUserLeaveList] = useState([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setAllUserLeaveList([]);
  }, []);

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
      field: "username",
      headerName: "Name",
      width: 150,
      // renderCell: (value: any) => (
      //   <span style={{ textTransform: "capitalize" }}>{value.value}</span>
      // ),
    },
    {
      field: "startDate",
      headerName: "Leave Start Date",
      width: 200,
      renderCell: (value: any) => moment(value.value).format("Do MMM, YYYY"),
    },
    {
      field: "endDate",
      headerName: "Leave Start Date",
      width: 200,
      renderCell: (value: any) => moment(value.value).format("Do MMM, YYYY"),
    },
    {
      field: "reason",
      headerName: "Reason",
      width: 200,
      renderCell: (value: any) => moment(value.value).format("Do MMM, YYYY"),
    },
    {
      field: "totalDay",
      headerName: "Total Days",
      width: 150,
      // renderCell: (value: any) => moment(value.value).format("Do MMM, YYYY"),
    },
    {
      field: "leaveStatus",
      headerName: "Leave Status",
      width: 100,
      renderCell: (value: any) => customRegistrationStatus(value.value),
    },
    { field: "approvedBy", headerName: "ApprovedBy ", width: 150 },
    {
      field: "action",
      headerName: "Action",
      width: 120,
      renderCell: (value: any) => (
        <>
          {value.value === "pending" && <EditNoteIcon color="primary" />}

          <VisibilityIcon
            color="secondary"
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
  };
  const initialValue = {};
  const handelStatusChanges = (values: any) => {
    console.log(values);
  };
  return (
    <>
      <Grid container rowSpacing={2} columnSpacing={2}>
        <Grid item xs={12}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6} md={7}>
              <h6>
                <strong>Attendance Details</strong>
              </h6>
            </Grid>
            <Grid item xs={12} sm={6} md={5}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={4} md={4}>
                  <TextField
                    label="Search"
                    id="outlined-size-small"
                    size="small"
                    // className="w-full"
                  />
                </Grid>
                <Grid item xs={12} sm={4} md={4}>
                  <Button
                    variant="contained"
                    startIcon={<AddIcon />}
                    onClick={() => navigate("/admin/holiday-list")}
                  >
                    Holiday List
                  </Button>
                </Grid>
                <Grid item xs={12} sm={4} md={4}>
                  <Button
                    variant="contained"
                    // startIcon={<AddIcon />}
                    onClick={handleClick}
                  >
                    My Attendance
                  </Button>
                </Grid>
              </Grid>
            </Grid>
            <Grid
              item
              xs={12}
              sm={12}
              md={12}
              sx={{
                height: allUserLeaveList.length > 0 ? "100%" : 200,
                width: "100%",
              }}
            >
              <DataGrid
                rows={allUserLeaveList}
                columns={columns}
                initialState={{
                  pagination: {
                    paginationModel: {
                      pageSize: ConfigData.pageSize,
                    },
                  },
                }}
                pageSizeOptions={ConfigData.pageRow}
                localeText={{ noRowsLabel: "No Data Available!!!" }}
                // checkboxSelection
                // disableRowSelectionOnClick
              />
            </Grid>
          </Grid>
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
                    <Field
                      name="statusChange"
                      label="Status"
                      component={selectField}
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
