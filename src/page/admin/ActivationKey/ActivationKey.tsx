import * as React from "react";
import EditNoteIcon from "@mui/icons-material/EditNote";
import TableData from "../../../components/TableData";
import { Button, Grid, Paper, TextField, Typography } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Formik, Form } from "formik";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import InputAdornment from "@mui/material/InputAdornment";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useSelector } from "react-redux";
import { ActivationService } from "./ActivationServices";
import { useSnackbar } from "notistack";
import Loader from "../../../components/Loader";
import AddIcon from "@mui/icons-material/Add";
import moment from "moment";

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

  React.useEffect(() => {
    activationList(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
        <Grid xs={12} className="mt-2 flex justify-end">
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={handleClickOpen}
          >
            Activation Key
          </Button>
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
              onSubmit={handleGenerateKey}
            >
              {({ errors, touched, handleSubmit }) => (
                <Form onSubmit={handleSubmit} className="mt-1">
                  <Grid
                    container
                    spacing={{ xs: 2, md: 2 }}
                    columns={{ xs: 4, sm: 8, md: 12 }}
                  >
                    <Grid item xs={2} sm={4} md={6}>
                      <TextField
                        name="name"
                        label="Name"
                        variant="outlined"
                        className="w-full"
                      />
                      {errors.name && touched.name && errors.name}
                    </Grid>
                    <Grid item xs={2} sm={4} md={6}>
                      <TextField
                        name="username"
                        label="Username"
                        variant="outlined"
                        className="w-full"
                      />
                      {errors.username && touched.username && errors.username}
                    </Grid>
                    <Grid item xs={2} sm={4} md={6}>
                      <TextField
                        name="email"
                        label="Email"
                        type="email"
                        variant="outlined"
                        className="w-full"
                      />
                      {errors.email && touched.email && errors.email}
                    </Grid>
                    <Grid item xs={2} sm={4} md={6}>
                      <TextField
                        name="mobile"
                        label="Mobile"
                        variant="outlined"
                        className="w-full"
                      />
                      {errors.mobile && touched.mobile && errors.mobile}
                    </Grid>
                    <Grid item xs={2} sm={4} md={6}>
                      <TextField
                        type="date"
                        name="dob"
                        label="Date Of Birth"
                        variant="outlined"
                        className="w-full"
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start"></InputAdornment>
                          ),
                        }}
                      />

                      {errors.dob && touched.dob && errors.dob}
                    </Grid>
                    <Grid item xs={2} sm={4} md={6}>
                      <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">
                          Role
                        </InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          name="role"
                          label="Role"
                          className="w-full"
                        >
                          <MenuItem value={"employee"}>Employee</MenuItem>
                          <MenuItem value={"hr"}>HR</MenuItem>
                          {userType && userType?.role === "admin" && (
                            <MenuItem value={"admin"}>Admin</MenuItem>
                          )}
                        </Select>
                      </FormControl>
                      {errors.role && touched.role && errors.role}
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
