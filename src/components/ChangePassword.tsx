import { Button, Grid } from "@mui/material";
import { Form, Formik } from "formik";
import { InputField } from "./DynamicField";

const ChangePassword = (props: any) => {
  const handleChangePassword = (values: any) => {
    console.log(values);
  };
  return (
    <Formik
      initialValues={
        props.data.type === "user"
          ? {
              oldPassword: "",
              newPassword: "",
              confirmPassword: "",
            }
          : { newPassword: "", confirmPassword: "" }
      }
      // validationSchema={activationKeyValidation}
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
  );
};

export default ChangePassword;
