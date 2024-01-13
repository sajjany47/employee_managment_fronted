import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useEffect, useState } from "react";
import { Form, Formik } from "formik";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { ConfigData } from "../../../shared/ConfigData";
import EditNoteIcon from "@mui/icons-material/EditNote";
import {
  DateField,
  InputField,
  SelectField,
} from "../../../components/DynamicField";
import { LeaveService } from "./LeaveService";
import { enqueueSnackbar } from "notistack";
import Loader from "../../../components/Loader";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import moment from "moment";

const LeaveList = () => {
  const leaveService = new LeaveService();
  const [open, setOpen] = useState(false);
  const [id, setId] = useState(moment.utc(new Date()));
  const [usernameList, setUsernameList] = useState([]);
  const [leaveListData, setLeaveListData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    userList();
    leaveListApi(moment(id).format("YYYY"));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  const handleChange = (value: any) => {
    setId(moment.utc(value));
    const formatDate = moment(value).format("YYYY");
    leaveListApi(formatDate);
  };

  const leaveListApi = (value: any) => {
    leaveService
      .leaveList(value)
      .then((res) => {
        setLeaveListData(res.data);
      })
      .catch((err: any) => {
        setLoading(false);
        enqueueSnackbar(err.response.data.message, { variant: "error" });
      });
  };
  const userList = () => {
    setLoading(true);
    leaveService
      .userList()
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

  const columns: GridColDef[] = [
    {
      field: "leaveDetail.leaveYear",
      headerName: "Year Of Leave",
      width: 200,
    },
    {
      field: "",
      headerName: "Username",
      width: 150,
    },
    {
      field: "",
      headerName: "Alloted Leave",
      width: 200,
    },

    {
      field: "",
      headerName: "Used Leave",
      width: 200,
    },
    {
      field: "",
      headerName: "Total Days",
      width: 150,
    },

    { field: "", headerName: "UpdatedBy ", width: 130 },
    {
      field: "action",
      headerName: "Action",
      width: 120,
      renderCell: (value: any) => (
        <>
          <EditNoteIcon
            color="primary"
            onClick={() => console.log(value.row)}
          />
        </>
      ),
    },
  ];

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const initialValue = { user_id: "", leaveYear: "", leaveAlloted: "" };

  const submitLeave = (values: any) => {
    setLoading(true);
    leaveService
      .singleLeaveAlloted(values)
      .then((res) => {
        enqueueSnackbar(res.message, { variant: "success" });
        setLoading(false);
      })
      .catch((error) => {
        enqueueSnackbar(error.response.data.message, { variant: "error" });
        setLoading(false);
      });
  };

  console.log(leaveListData);
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
                // onChange={(newValue) => setId(moment.utc(newValue))}
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
      <div
        className="mt-10"
        style={{
          height: leaveListData.length > 0 ? "100%" : 200,
          width: "100%",
        }}
      >
        <DataGrid
          rows={[]}
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
      </div>

      <Dialog
        // fullScreen={fullScreen}
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
                    <SelectField
                      name="user_id"
                      label="Username"
                      options={usernameList}
                    />
                  </Grid>
                  <Grid item xs={2} sm={4} md={6}>
                    <DateField
                      name="leaveYear"
                      label="Leave Year"
                      views={["year"]}
                    />
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

export default LeaveList;
