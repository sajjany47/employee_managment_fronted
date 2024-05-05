import { Button, Grid } from "@mui/material";
import { Form, Formik } from "formik";
import { InputField } from "./DynamicField";
import { EmployeeService } from "../page/admin/Emloyee/EmployeeService";
import { enqueueSnackbar } from "notistack";
import { useState } from "react";
import Loader from "./Loader";
import * as Yup from "yup";

const ChangePassword = (props: any) => {
  const employeeService = new EmployeeService();
  const [loading, setLoading] = useState(false);

  const passwordValidation = Yup.object().shape({
    oldPassword: Yup.string().when("type", {
      is: (type: any) => type === "user",
      then: () => Yup.string().required("Old password is required"),
      otherwise: () => Yup.string().notRequired(),
    }),
    newPassword: Yup.string().required("New password is required"),
    confirmPassword: Yup.string()
      .required("Confirm password is required")
      .oneOf([Yup.ref("newPassword"), ""], "Password must match"),
  });

  const handleChangePassword = (values: any) => {
    setLoading(true);
    const reqData = {
      _id: props.data._id,
      newPassword: values.newPassword,
    };
    if (props.data.type === "user") {
      employeeService
        .userPasswordChange({ ...reqData, oldPassword: values.oldPassword })
        .then((res) => {
          enqueueSnackbar(res.message, { variant: "success" });
        })
        .catch((err: any) => {
          enqueueSnackbar(err.response.data.message, { variant: "error" });
        })
        .finally(() => {
          setLoading(false);
          props.closeAction();
        });
    } else {
      employeeService
        .adminPasswordChange({ ...reqData })
        .then((res) => {
          enqueueSnackbar(res.message, { variant: "success" });
        })
        .catch((err: any) => {
          enqueueSnackbar(err.response.data.message, { variant: "error" });
        })
        .finally(() => {
          setLoading(false);
          props.closeAction();
        });
    }
  };
  return (
    <>
      {loading && <Loader />}
      <Formik
        initialValues={
          props.data.type === "user"
            ? {
                oldPassword: "",
                newPassword: "",
                confirmPassword: "",
                type: "user",
              }
            : { newPassword: "", confirmPassword: "", type: "admin" }
        }
        validationSchema={passwordValidation}
        onSubmit={handleChangePassword}
      >
        {() => (
          <Form className="mt-1">
            <Grid
              container
              spacing={{ xs: 2, md: 2 }}
              columns={{ xs: 4, sm: 8, md: 12 }}
            >
              {props.data.type === "user" && (
                <Grid item xs={2} sm={8} md={12}>
                  <InputField
                    name="oldPassword"
                    label="Old Password"
                    type="password"
                  />
                </Grid>
              )}

              <Grid item xs={2} sm={8} md={12}>
                <InputField
                  name="newPassword"
                  label="New Password"
                  type="password"
                />
              </Grid>
              <Grid item xs={2} sm={8} md={12}>
                <InputField
                  name="confirmPassword"
                  label="Confirm Password"
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
                  onClick={() => props.closeAction()}
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
    </>
  );
};

export default ChangePassword;
