/* eslint-disable no-useless-escape */
import * as React from "react";
import EditNoteIcon from "@mui/icons-material/EditNote";
import TableData from "../../../components/TableData";
import { Box, Button, Grid, Paper, TextField, Typography } from "@mui/material";
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

// interface Column {
//   id: "name" | "code" | "population" | "size" | "action";
//   label: string;
//   minWidth?: number;
//   align?: "right";
//   format?: (value: number) => string;
// }

export default function ActivationKey() {
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
  }, [activationKeyData]);

  const activationList = (id: any) => {
    activationService
      .activationKeyList(id)
      .then((res: any) => {
        setActivationKeyData(res.data);
      })
      .catch((err) => enqueueSnackbar(err.message, { variant: "error" }));
  };
  const columns = [
    { id: "name", label: "Name", align: "center" },
    { id: "mobile", label: "Number", align: "center" },
    { id: "role", label: "Role", align: "center" },
    { id: "registrationStatus", label: "Status", align: "center" },
    { id: "createdBy", label: "CreatedBy ", align: "center" },
    { id: "createdAt", label: "CreatedAt", align: "center" },
    { id: "action", label: "Action", align: "center" },
  ];

  const activationListData = activationKeyData.map((item: any) => ({
    ...item,
    createdAt: moment(item.createdAt).format("Do MMM, YY HH:mm"),
    action: <EditNoteIcon onClick={() => handleCheck(item)} />,
  }));
  const handleCheck = (item: any) => {
    console.log(item);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (event: any) => {
    setId(event.target.value);
  };

  const handleGenerateKey = (value: any) => {
    setLoading(true);
    const reqBody = { ...value, createdBy: userType.username };
    activationService
      .generateActivationKey(reqBody)
      .then((res) => {
        setActivationKey(res.activationKey);
        enqueueSnackbar(res.message, { variant: "success" });
      })
      .catch((error: any) => {
        console.log(error);
        enqueueSnackbar(error.message, { variant: "error" });
      })
      .finally(() => setLoading(false));
  };

  return (
    <div>
      {loading && <Loader />}
      <Grid container rowSpacing={2} columnSpacing={2}>
        <Grid xs={12}>
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
        <Grid xs={12} className="mt-1">
          <Typography variant="h6" className="text-sm">
            Activation Key List
          </Typography>
          <TableData columns={columns} rows={activationListData} />
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
          {"Generate Activation Key"}
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
            <Paper>
              <Typography sx={{ color: "blueviolet", fontWeight: "500px" }}>
                {activationKey}
              </Typography>
            </Paper>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
