import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useEffect, useState } from "react";
import { Form, Formik, getIn } from "formik";
import EditNoteIcon from "@mui/icons-material/EditNote";
import { InputField, SelectField } from "../../../components/DynamicField";
import { LeaveService } from "./LeaveService";
import { enqueueSnackbar } from "notistack";
import Loader from "../../../components/Loader";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import moment from "moment";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { ConfigData } from "../../../shared/ConfigData";
import { useSelector } from "react-redux";

const LeaveList = () => {
  const leaveService = new LeaveService();
  const userType = useSelector((state: any) => state.auth.auth.user);
  const [open, setOpen] = useState(false);
  const [id, setId] = useState(moment.utc(new Date()));
  const [usernameList, setUsernameList] = useState([]);
  const [leaveListData, setLeaveListData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [modalStatus, setModalStatus] = useState("add");
  const [editData, setEditData] = useState<any>({});

  useEffect(() => {
    leaveListApi(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  const handleChange = (value: any) => {
    setId(moment.utc(value));
    const formatDate = moment(value).format("YYYY");
    leaveListApi(formatDate);
  };

  const leaveListApi = (value: any) => {
    leaveService
      .leaveList(moment(value).format("YYYY"))
      .then((res) => {
        setLeaveListData(res.data);
      })
      .catch((err: any) => {
        setLoading(false);
        enqueueSnackbar(err.response?.data?.message, { variant: "error" });
      });
  };
  const userList = (year: any) => {
    setLoading(true);
    leaveService
      .userList(moment(year).format("YYYY"))
      .then((res) => {
        setUsernameList(
          res.data.map((item: any) => ({
            ...item,
            value: item.username,
            label: `${item.name} (${item.username})`,
          }))
        );
        setLoading(false);
      })
      .catch((err: any) => {
        setLoading(false);
        enqueueSnackbar(err.response.data.message, { variant: "error" });
      });
  };

  const handleClickOpen = () => {
    setModalStatus("add");
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    setUsernameList([]);
    leaveListApi(new Date());
  };

  const submitLeave = (values: any) => {
    // console.log(values);
    setLoading(true);
    if (modalStatus === "add") {
      leaveService
        .singleLeaveAlloted({ ...values, createdBy: userType.username })
        .then((res) => {
          enqueueSnackbar(res.message, { variant: "success" });
          setLoading(false);
          handleClose();
        })
        .catch((error) => {
          enqueueSnackbar(error.response.data.message, { variant: "error" });
          setLoading(false);
        });
    }

    if (modalStatus === "edit") {
      let requestBody: any = {
        user_id: values.user_id,
        leaveAlloted: values.leaveAlloted,
        _id: values._id,
        updatedBy: userType.username,
      };
      if (editData?.leaveYear !== moment(values?.leaveYear).format("YYYY")) {
        requestBody = { ...requestBody, leaveYear: values?.leaveYear };
      }
      console.log(requestBody);
      leaveService
        .singleEditLeaveAlloted(requestBody)
        .then((res) => {
          enqueueSnackbar(res.message, { variant: "success" });
          setLoading(false);
          handleClose();
        })
        .catch((error) => {
          enqueueSnackbar(error.response.data.message, { variant: "error" });
          setLoading(false);
        });
    }
  };

  const handelDate = (setFieldValue: any, value: any) => {
    setFieldValue("leaveYear", moment.utc(value));
    userList(value);
  };

  const handelEditClick = (data: any) => {
    setModalStatus("edit");
    setEditData({
      user_id: data.user_id,
      leaveYear: data.leaveDetail.leaveYear,
      leaveAlloted: data.leaveDetail.totalLeave,
      _id: data.leaveDetail._id,
    });
    setOpen(true);
  };

  const columns: GridColDef[] = [
    {
      field: "leaveYear",
      headerName: "Year Of Leave",
      width: 200,
      renderCell: (value: any) => (
        <span>{value.row.leaveDetail.leaveYear}</span>
      ),
    },
    {
      field: "user_id",
      headerName: "Username",
      width: 200,
      renderCell: (value: any) => <span>{value.row.user_id}</span>,
    },
    {
      field: "totalLeave",
      headerName: "Alloted Leave",
      width: 200,
      renderCell: (value: any) => (
        <span>{value.row.leaveDetail.totalLeave}</span>
      ),
    },
    {
      field: "totalLeaveLeft",
      headerName: "Leave Left",
      width: 200,
      renderCell: (value: any) => (
        <span>{value.row.leaveDetail.totalLeaveLeft}</span>
      ),
    },

    {
      field: "",
      headerName: "UpdatedBy ",
      width: 200,
      renderCell: (value: any) => (
        <span>{value.row.leaveDetail?.updatedBy}</span>
      ),
    },
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (value: any) => (
        <>
          <EditNoteIcon
            style={{ cursor: "pointer" }}
            color="primary"
            onClick={() => handelEditClick(value.row)}
          />
        </>
      ),
    },
  ];

  const initialValue =
    modalStatus === "add"
      ? { user_id: "", leaveYear: "", leaveAlloted: "" }
      : { ...editData };

  return (
    <>
      {loading && <Loader />}
      <div className="flex justify-between">
        <h6>
          <strong>Leave Details</strong>
        </h6>
        <div className="flex gap-1">
          <LocalizationProvider dateAdapter={AdapterMoment}>
            <DemoContainer components={["DatePicker"]}>
              <DatePicker
                sx={{ width: "50% " }}
                label="Select Year"
                value={id}
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
            Leave Alloted
          </Button>
        </div>
      </div>
      <div className="mt-10">
        <DataGrid
          style={{
            height: leaveListData.length !== 0 ? "100%" : 200,
            width: "100%",
          }}
          rows={leaveListData}
          columns={columns}
          getRowId={(row) => row._id}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: ConfigData.pageSize,
              },
            },
          }}
          pageSizeOptions={ConfigData.pageRow}
          localeText={{ noRowsLabel: "No Data Available!!!" }}
        />
      </div>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">
          <strong>
            {modalStatus === "add"
              ? "Add Leave Allotment"
              : "Edit Leave Allotment"}
          </strong>
        </DialogTitle>
        <DialogContent>
          <Formik initialValues={initialValue} onSubmit={submitLeave}>
            {({ handleSubmit, setFieldValue, values, errors, touched }) => (
              <Form onSubmit={handleSubmit}>
                <Grid
                  container
                  spacing={{ xs: 2, md: 2 }}
                  columns={{ xs: 4, sm: 8, md: 12 }}
                >
                  <Grid item xs={2} sm={4} md={6}>
                    <LocalizationProvider dateAdapter={AdapterMoment}>
                      <DemoContainer components={["DatePicker"]}>
                        <DatePicker
                          label="Leave Year"
                          name="leaveYear"
                          value={
                            values.leaveYear !== null
                              ? moment.utc(values.leaveYear)
                              : ""
                          }
                          slotProps={{
                            textField: {
                              size: "medium",
                              error:
                                getIn(errors, "leaveYear") &&
                                getIn(touched, "leaveYear")
                                  ? true
                                  : false,
                            },
                          }}
                          views={["year"]}
                          onChange={(e: any) => handelDate(setFieldValue, e)}
                          disabled={modalStatus === "add" ? false : true}
                        />
                      </DemoContainer>
                    </LocalizationProvider>
                  </Grid>
                  <Grid item xs={2} sm={4} md={6}>
                    {modalStatus === "add" ? (
                      <SelectField
                        name="user_id"
                        label="Username"
                        options={usernameList}
                      />
                    ) : (
                      <InputField name="user_id" label="Username" disabled />
                    )}
                  </Grid>

                  <Grid item xs={2} sm={4} md={6}>
                    <InputField name="leaveAlloted" label="Alloted Leave" />
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

export default LeaveList;
