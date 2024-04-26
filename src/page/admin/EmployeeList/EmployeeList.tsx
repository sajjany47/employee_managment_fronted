/* eslint-disable no-useless-escape */
import * as React from "react";
import EditNoteIcon from "@mui/icons-material/EditNote";
import { Box, Button, Chip, Grid, Switch } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Formik, Form } from "formik";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useSelector } from "react-redux";
import { useSnackbar } from "notistack";
import Loader from "../../../components/Loader";
import AddIcon from "@mui/icons-material/Add";
import moment from "moment";
import * as Yup from "yup";
import { ConfigData } from "../../../shared/ConfigData";
import { useNavigate } from "react-router-dom";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import VisibilityIcon from "@mui/icons-material/Visibility";
import {
  DateField,
  InputField,
  SelectField,
} from "../../../components/DynamicField";
import { EmployeeServices } from "./EmployeeServices";
import { CiSearch } from "react-icons/ci";
import { RxCross2 } from "react-icons/rx";
import Search from "../../../components/Search";

export default function EmployeeList() {
  const navigate = useNavigate();
  const employeeServices = new EmployeeServices();
  const { enqueueSnackbar } = useSnackbar();
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [activationKey, setActivationKey] = React.useState("");
  const [activationKeyData, setActivationKeyData] = React.useState([]);
  const [searchStatus, setSearchStatus] = React.useState(false);
  const [searchDetails, setSearchDetails] = React.useState({});
  const [page, setPage] = React.useState(1);
  const [pageRow, setPageRow] = React.useState(10);

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const userType = useSelector((state: any) => state.auth.auth.user);

  const activationKeyValidation = Yup.object().shape({
    name: Yup.string().min(2, "Too short! name").required("Name is required"),
    username: Yup.string()
      .min(4, "Too short! username")
      .required("Username is required"),
    email: Yup.string()
      .matches(
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Enter valid email"
      )
      .required("Email is required"),
    mobile: Yup.string()
      .required("Mobile number is required")
      .matches(/^\d{10}$/, "Enter 10 digit mobile number"),
    dob: Yup.string().required("Date of birth is required"),
    role: Yup.string().required("Role is required"),
    position: Yup.string().required("Position is required"),
    password: Yup.string().required("Password is required"),
  });
  React.useEffect(() => {
    activationList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchDetails, page, pageRow]);

  const activationList = () => {
    let reqData: object = {
      page: page,
      limit: pageRow,
    };

    if (Object.keys(searchDetails).length > 0) {
      reqData = { ...reqData, ...searchDetails };
    }
    employeeServices
      .activationKeyList(reqData)
      .then((res: any) => {
        setActivationKeyData(
          res.data.map((item: any, index: any) => ({ ...item, id: index }))
        );
      })
      .catch((err) =>
        enqueueSnackbar(err.response.data.message, { variant: "error" })
      );
  };
  const customRegistrationStatus = (value: any) => {
    switch (value) {
      case "waiting":
        return (
          <Chip
            color="warning"
            label={value}
            sx={{ textTransform: "capitalize" }}
          />
        );
        break;
      case "pending":
        return (
          <Chip
            color="secondary"
            label={value}
            sx={{ textTransform: "capitalize" }}
          />
        );
        break;
      case "verified":
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
      field: "name",
      headerName: "Name",
      width: 150,
      renderCell: (value: any) => (
        <span style={{ textTransform: "capitalize" }}>{value.value}</span>
      ),
    },
    {
      field: "username",
      headerName: "Username",
      width: 150,
      renderCell: (value: any) => <span>{value.value}</span>,
    },
    { field: "mobile", headerName: "Number", width: 120 },
    {
      field: "role",
      headerName: "Role",
      width: 120,
      renderCell: (value: any) => (
        <span style={{ textTransform: "capitalize" }}>{value.value}</span>
      ),
    },
    {
      field: "registrationStatus",
      headerName: "Status",
      width: 120,

      renderCell: (value: any) => customRegistrationStatus(value.value),
    },
    {
      field: "activeStatus",
      headerName: "Active",
      width: 120,
      renderCell: (value: any) => (
        <Switch
          checked={value.value}
          onChange={() => handleToggle(value.value, value.row.username)}
        />
      ),
    },
    // { field: "createdBy", headerName: "CreatedBy ", width: 120 },
    { field: "updatedBy", headerName: "UpdatedBy ", width: 120 },
    { field: "approvedBy", headerName: "ApprovedBy ", width: 120 },
    {
      field: "createdAt",
      headerName: "CreatedAt",
      width: 120,
      align: "center",
      headerAlign: "center",
      renderCell: (value: any) => moment(value.value).format("Do MMM,YYYY"),
    },
    {
      field: "action",
      headerName: "Action",
      width: 120,
      renderCell: (value: any) => (
        <>
          <EditNoteIcon
            color="primary"
            style={{ cursor: "pointer" }}
            onClick={() => {
              navigate(`/admin/user-update/${value.row._id}`);
            }}
          />
          <VisibilityIcon
            color="secondary"
            style={{ cursor: "pointer" }}
            onClick={() => {
              navigate("/admin/user-verified/", { state: { data: value.row } });
            }}
          />
        </>
      ),
    },
  ];

  const handleToggle = (e: any, username: any) => {
    setLoading(true);
    const payload = {
      activeStatus: !e,
      username: username,
      updatedBy: userType.username,
    };

    employeeServices
      .statusChange(payload)
      .then((res) => {
        enqueueSnackbar(res.message, { variant: "success" });
      })
      .catch((err: any) =>
        enqueueSnackbar(err.response.data.message, { variant: "error" })
      )
      .finally(() => {
        activationList();
        setLoading(false);
      });
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setActivationKey("");
    activationList();
  };

  const handleGenerateKey = (value: any) => {
    setLoading(true);
    const reqBody = {
      ...value,
      createdBy: userType.username,
      // dob: moment(value.dob).format("YYYY-MM-DD"),
      dob: moment.utc(value.dob),
    };

    employeeServices
      .generateActivationKey(reqBody)
      .then((res) => {
        setActivationKey(res.activationKey);
        enqueueSnackbar(res.message, { variant: "success" });
      })
      .catch((error: any) => {
        enqueueSnackbar(error.response.data.message, { variant: "error" });
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handelSearch = (values: any) => {
    console.log(values);
    if (Object.keys(values).length > 0) {
      setSearchDetails(values);
    }
  };

  const handelResetSearch = () => {
    activationList();
    setSearchDetails({});
  };

  return (
    <div>
      {loading && <Loader />}
      <Grid container rowSpacing={2} columnSpacing={2}>
        <Grid item xs={12}>
          <Box className="mt-2 flex justify-between">
            <Box className="mt-4">
              <h6>
                <strong>All Users List</strong>
              </h6>
            </Box>
            <Box className="mt-2 flex justify-end gap-2">
              <Button
                variant="outlined"
                color={searchStatus === true ? "error" : "primary"}
                startIcon={searchStatus === true ? <RxCross2 /> : <CiSearch />}
                onClick={() => setSearchStatus(!searchStatus)}
              >
                {searchStatus === true ? "Cancel" : "Search"}
              </Button>

              <Button
                variant="contained"
                startIcon={<AddIcon />}
                onClick={handleClickOpen}
              >
                Activation Key
              </Button>
            </Box>
          </Box>
        </Grid>
        {searchStatus && (
          <Grid item xs={12} className="mt-1">
            <Search
              value={{
                name: "",
                username: "",
                activationCode: "",
                email: "",
                mobile: "",
                position: "",
                role: "",
                country: "",
                state: "",
                pincode: "",
                activeStatus: "",
                registrationStatus: "",
              }}
              handelSearch={handelSearch}
              handelResetSearch={handelResetSearch}
            />
          </Grid>
        )}

        <Grid item xs={12} className="mt-1">
          <Box>
            <DataGrid
              style={{
                height: activationKeyData.length > 0 ? "100%" : 200,
                width: "100%",
              }}
              rows={activationKeyData}
              columns={columns}
              onPaginationModelChange={(e) => {
                setPageRow(e.pageSize);
                setPage(e.page);
              }}
              initialState={{
                pagination: {
                  paginationModel: {
                    pageSize: pageRow,
                  },
                },
              }}
              pageSizeOptions={ConfigData.pageRow}
              localeText={{ noRowsLabel: "No Data Available!!!" }}
              // checkboxSelection
              // disableRowSelectionOnClick
            />
          </Box>
        </Grid>
      </Grid>

      {/* Dialog */}

      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="alert-dialog-title">
          {/* {"Generate Activation Key"} */}
        </DialogTitle>
        <DialogContent>
          {activationKey === "" ? (
            <Formik
              initialValues={{
                name: "",
                username: "",
                email: "",
                mobile: "",
                dob: "",
                role: "",
                password: "",
                position: "",
              }}
              validationSchema={activationKeyValidation}
              onSubmit={handleGenerateKey}
            >
              {() => (
                <Form className="mt-1">
                  <Grid
                    container
                    spacing={{ xs: 2, md: 2 }}
                    columns={{ xs: 4, sm: 8, md: 12 }}
                  >
                    <Grid item xs={2} sm={4} md={6}>
                      <InputField name="name" label="Name" />
                    </Grid>
                    <Grid item xs={2} sm={4} md={6}>
                      <InputField name="username" label="Username" />
                    </Grid>
                    <Grid item xs={2} sm={4} md={6}>
                      <InputField name="email" label="Email" type="email" />
                    </Grid>
                    <Grid item xs={2} sm={4} md={6}>
                      <InputField name="mobile" label="Mobile" />
                    </Grid>
                    <Grid item xs={2} sm={4} md={6}>
                      <DateField
                        name="dob"
                        label="Date Of Birth"
                        views={["year", "month", "day"]}
                      />
                    </Grid>
                    <Grid item xs={2} sm={4} md={6}>
                      <SelectField
                        name="role"
                        label="Role"
                        options={
                          userType?.role === "admin"
                            ? ConfigData.adminType
                            : ConfigData.HRtype
                        }
                      />
                    </Grid>
                    <Grid item xs={2} sm={4} md={6}>
                      <InputField name="position" label="Position" />
                    </Grid>
                    <Grid item xs={2} sm={4} md={6}>
                      <InputField
                        name="password"
                        label="Password"
                        type="password"
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
                      <Button variant="contained" type="submit">
                        Submit
                      </Button>
                    </Grid>
                  </Grid>
                </Form>
              )}
            </Formik>
          ) : (
            <Grid item xs={12} sm={12}>
              <div className="flex max-w-sm rounded-xl bg-gradient-to-tr from-pink-300 to-blue-300 p-0.5 shadow-lg">
                <button className="flex-1 font-bold text-xl bg-white px-6 py-3 rounded-xl">
                  {activationKey}
                </button>
              </div>
            </Grid>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
