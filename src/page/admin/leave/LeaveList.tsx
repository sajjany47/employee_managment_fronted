import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  TextField,
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
import * as Yup from "yup";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import SimCardDownloadIcon from "@mui/icons-material/SimCardDownload";
import UploadLeave from "./upload/UploadLeave";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

const LeaveList = () => {
  const leaveService = new LeaveService();

  const userType = useSelector((state: any) => state.auth.auth.user);
  const [open, setOpen] = useState(false);
  const [id, setId] = useState(moment(new Date()));
  const [usernameList, setUsernameList] = useState([]);
  const [leaveListData, setLeaveListData] = useState<any>([]);
  const [loading, setLoading] = useState(false);
  const [modalStatus, setModalStatus] = useState("add");
  const [editData, setEditData] = useState<any>({});
  const [page, setPage] = useState(1);
  const [pageRow, setPageRow] = useState(10);
  const [search, setSearch] = useState("");
  const [uploadLeaveDialoge, setUploadLeaveDialoge] = useState(false);

  const validationSchema = Yup.object().shape({
    leaveYear: Yup.string().required("Year is required"),
    user_id: Yup.string().required("Username is required"),
    leaveAlloted: Yup.string().required("Total leave number is required"),
  });

  useEffect(() => {
    leaveListApi();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, pageRow, page, search, id]);

  const handleChange = (value: any) => {
    setId(moment(value));
    leaveListApi();
  };

  const leaveListApi = () => {
    const reqData: any = {
      page: page,
      limit: pageRow,
      year: moment(id).format("YYYY"),
    };

    if (search !== "") {
      reqData.username = search;
    }
    leaveService
      .leaveList(reqData)
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
    leaveListApi();
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

  const handleDownload = () => {
    const data = leaveListData.map((item: any) => ({
      Year: item.leaveDetail.leaveYear,
      Username: item.user_id,
      Leave: item.leaveDetail.totalLeave,
    }));
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet(data);

    XLSX.utils.book_append_sheet(wb, ws, "Sheet1");

    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const blob = new Blob([excelBuffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8",
    });

    saveAs(blob, "Leave_Details.xlsx");
  };
  return (
    <>
      {loading && <Loader />}
      <Grid container rowSpacing={2} columnSpacing={2}>
        <Grid item xs={12}>
          <Box className="mt-2 flex justify-between">
            <Box className="mt-4">
              <h6>
                <strong>Leave Alloted Details</strong>
              </h6>
            </Box>
            <Box className="mt-2 flex justify-end gap-2">
              <TextField
                label="Search"
                id="outlined-size-small"
                size="small"
                onChange={(e) => setSearch(e.target.value)}
                sx={{ width: "150px" }}
              />
              <LocalizationProvider dateAdapter={AdapterMoment}>
                <DemoContainer
                  components={["DatePicker"]}
                  sx={{ marginTop: -1 }}
                >
                  <DatePicker
                    sx={{ width: "40px" }}
                    label="Select Year"
                    value={id}
                    slotProps={{
                      textField: { size: "small", fullWidth: false },
                    }}
                    views={["year"]}
                    onChange={handleChange}
                  />
                </DemoContainer>
              </LocalizationProvider>
              <Button
                sx={{ width: "100px" }}
                variant="contained"
                endIcon={<AddIcon />}
                onClick={handleClickOpen}
              >
                Leave
              </Button>
              <Button
                sx={{ width: "110px" }}
                variant="contained"
                endIcon={<UploadFileIcon />}
                onClick={() => setUploadLeaveDialoge(true)}
              >
                Upload
              </Button>
              <Button
                sx={{ width: "130px" }}
                variant="contained"
                endIcon={<SimCardDownloadIcon />}
                onClick={handleDownload}
              >
                Download
              </Button>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={12}>
          <DataGrid
            style={{
              height: leaveListData.length !== 0 ? "100%" : 200,
              width: "100%",
            }}
            rows={leaveListData}
            columns={columns}
            getRowId={(row) => row._id}
            onPaginationModelChange={(e) => {
              setPageRow(Number(e.pageSize));
              setPage(Number(e.page) + 1);
            }}
            initialState={{
              pagination: {
                paginationModel: {
                  pageSize: pageRow,
                  page: page,
                },
              },
            }}
            pageSizeOptions={ConfigData.pageRow}
            localeText={{ noRowsLabel: "No Data Available!!!" }}
          />
        </Grid>
      </Grid>

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
          <Formik
            initialValues={initialValue}
            onSubmit={submitLeave}
            validationSchema={validationSchema}
          >
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
                              ? moment(values.leaveYear)
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
                    {getIn(errors, "leaveYear") &&
                      getIn(touched, "leaveYear") && (
                        <small className="text-red-600">
                          Years is required
                        </small>
                      )}
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

      <Dialog
        fullWidth
        maxWidth="md"
        open={uploadLeaveDialoge}
        onClose={() => setUploadLeaveDialoge(false)}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="alert-dialog-title">
          {<strong>Upload Leave Excel</strong>}
        </DialogTitle>
        <DialogContent>
          <UploadLeave />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default LeaveList;
