/* eslint-disable no-useless-escape */
import * as React from "react";
import EditNoteIcon from "@mui/icons-material/EditNote";
import {
  Box,
  Button,
  Chip,
  Grid,
  Paper,
  Switch,
  TextField,
  Typography,
} from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Formik, Form, Field } from "formik";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import InputAdornment from "@mui/material/InputAdornment";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useSelector } from "react-redux";
import { ActivationService } from "./ActivationServices";
import { useSnackbar } from "notistack";
import Loader from "../../../components/Loader";
import AddIcon from "@mui/icons-material/Add";
import moment from "moment";
import * as Yup from "yup";
import { inputField, selectField } from "../../../components/FieldType";
import { data } from "../../../shared/Config";
import { useNavigate } from "react-router-dom";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import VisibilityIcon from "@mui/icons-material/Visibility";

export default function ActivationKey() {
  const navigate = useNavigate();
  const activationService = new ActivationService();
  const { enqueueSnackbar } = useSnackbar();
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [id, setId] = React.useState("all");
  const [activationKey, setActivationKey] = React.useState("");
  const [activationKeyData, setActivationKeyData] = React.useState([]);
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
  });
  React.useEffect(() => {
    activationList(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const activationList = (id: any) => {
    activationService
      .activationKeyList(id)
      .then((res: any) => {
        setActivationKeyData(
          res.data.map((item: any, index: any) => ({ ...item, id: index }))
        );
      })
      .catch((err) => enqueueSnackbar(err.message, { variant: "error" }));
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
    { field: "name", headerName: "Name", width: 150 },
    { field: "mobile", headerName: "Number", width: 130 },
    { field: "activationCode", headerName: "Activation Code", width: 190 },
    {
      field: "role",
      headerName: "Role",
      width: 100,
      renderCell: (value: any) => (
        <span style={{ textTransform: "capitalize" }}>{value.value}</span>
      ),
    },
    {
      field: "registrationStatus",
      headerName: "Status",
      width: 110,
      renderCell: (value: any) => customRegistrationStatus(value.value),
      align: "center",
      // valueGetter: (value) => customRegistrationStatus(value.value),
    },
    {
      field: "activeStatus",
      headerName: "IsActive",
      width: 80,
      renderCell: (value: any) => (
        <Switch
          checked={value.value}
          onChange={() => handleToggle(value.value, value.row.username)}
        />
      ),
    },
    { field: "createdBy", headerName: "CreatedBy ", width: 110 },
    { field: "updatedBy", headerName: "UpdatedBy ", width: 110 },
    {
      field: "createdAt",
      headerName: "CreatedAt",
      width: 150,
      renderCell: (value: any) =>
        moment(value.value).format("Do MMM, YY HH:mm"),
    },
    {
      field: "action",
      headerName: "Action",
      width: 90,
      renderCell: (value: any) => (
        <>
          <EditNoteIcon
            color="primary"
            onClick={() => {
              navigate(`/admin/user-update/${value.row._id}`, {
                state: { data: value.row },
              });
            }}
          />
          <VisibilityIcon
            color="secondary"
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

    activationService
      .statusChange(payload)
      .then((res) => {
        enqueueSnackbar(res.message, { variant: "success" });
      })
      .catch((err: any) =>
        enqueueSnackbar(err.response.data.message, { variant: "error" })
      )
      .finally(() => {
        activationList(id);
        setLoading(false);
      });
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setActivationKey("");
  };

  const handleChange = (event: any) => {
    setId(event.target.value);
  };

  const handleGenerateKey = (value: any) => {
    setLoading(true);
    const reqBody = {
      ...value,
      createdBy: userType.username,
      dob: moment(value.dob).format("YYYY-MM-DD"),
    };
    activationService
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

  return (
    <div>
      {loading && <Loader />}
      <Grid container rowSpacing={2} columnSpacing={2}>
        <Grid item xs={12}>
          <Box className="mt-2 flex justify-end gap-2">
            <TextField label="Search" id="outlined-size-small" size="small" />
            <FormControl sx={{ minWidth: 120 }} size="small">
              <Select value={id} onChange={handleChange}>
                <MenuItem value={"all"}>All</MenuItem>
                <MenuItem value={"pending"}>Pending</MenuItem>
                <MenuItem value={"approved"}>Approved</MenuItem>
              </Select>
            </FormControl>
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={handleClickOpen}
            >
              Activation Key
            </Button>
          </Box>
        </Grid>
        <Grid item xs={12} className="mt-1">
          <Typography variant="h6" className="text-sm">
            Activation Key List
          </Typography>

          <Box>
            <DataGrid
              rows={activationKeyData}
              columns={columns}
              initialState={{
                pagination: {
                  paginationModel: {
                    pageSize: 5,
                  },
                },
              }}
              pageSizeOptions={[5]}
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
              {({ handleSubmit }) => (
                <Form onSubmit={handleSubmit} className="mt-1">
                  <Grid
                    container
                    spacing={{ xs: 2, md: 2 }}
                    columns={{ xs: 4, sm: 8, md: 12 }}
                  >
                    <Grid item xs={2} sm={4} md={6}>
                      <Field name="name" label="Name" component={inputField} />
                    </Grid>
                    <Grid item xs={2} sm={4} md={6}>
                      <Field
                        name="username"
                        label="Username"
                        component={inputField}
                      />
                    </Grid>
                    <Grid item xs={2} sm={4} md={6}>
                      <Field
                        name="email"
                        label="Email"
                        type="email"
                        component={inputField}
                      />
                    </Grid>
                    <Grid item xs={2} sm={4} md={6}>
                      <Field
                        name="mobile"
                        label="Mobile"
                        component={inputField}
                      />
                    </Grid>
                    <Grid item xs={2} sm={4} md={6}>
                      <Field
                        type="date"
                        name="dob"
                        label="Date Of Birth"
                        component={inputField}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start"></InputAdornment>
                          ),
                        }}
                      />
                    </Grid>
                    <Grid item xs={2} sm={4} md={6}>
                      <Field
                        name="role"
                        label="Role"
                        component={selectField}
                        options={
                          userType?.role === "admin"
                            ? data.adminType
                            : data.HRtype
                        }
                      />
                    </Grid>
                    <Grid item xs={2} sm={4} md={6}>
                      <Field
                        name="position"
                        label="Position"
                        component={inputField}
                      />
                    </Grid>
                    <Grid item xs={2} sm={4} md={6}>
                      <Field
                        name="password"
                        label="Password"
                        component={inputField}
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
                      <Button
                        // onClick={handleGenerateKey}
                        variant="contained"
                        autoFocus
                        type="submit"
                      >
                        Submit
                      </Button>
                    </Grid>
                  </Grid>
                </Form>
              )}
            </Formik>
          ) : (
            <Grid item xs={12} sm={12}>
              <Paper elevation={24}>
                <Typography sx={{ color: "blueviolet", fontWeight: "500px" }}>
                  {activationKey}
                </Typography>
              </Paper>
            </Grid>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
