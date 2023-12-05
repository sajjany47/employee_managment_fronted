import { Field, Form, Formik } from "formik";
import { useLocation } from "react-router-dom";
import { Grid } from "@mui/material";
import { inputField, selectField } from "../../../components/FieldType";
import InputAdornment from "@mui/material/InputAdornment";
import { useSelector } from "react-redux";
import { data } from "../../../shared/Config";

const UserUpdate = () => {
  const { state } = useLocation();
  console.log(state.data);
  const userType = useSelector((state: any) => state.auth.auth.user);

  const intialValue = {};
  const userUpdate = (value: any) => {
    console.log(value);
  };
  return (
    <div>
      <Formik initialValues={intialValue} onSubmit={userUpdate}>
        {({ handleSubmit }) => (
          <Form onSubmit={handleSubmit}>
            <Grid
              container
              spacing={{ xs: 2, md: 2 }}
              columns={{ xs: 4, sm: 8, md: 12 }}
            >
              <Grid item xs={2} sm={4} md={4}>
                <Field name="name" label="Name" component={inputField} />
              </Grid>
              <Grid item xs={2} sm={4} md={4}>
                <Field
                  name="username"
                  label="Username"
                  component={inputField}
                />
              </Grid>
              <Grid item xs={2} sm={4} md={4}>
                <Field
                  name="email"
                  label="Email"
                  type="email"
                  component={inputField}
                />
              </Grid>
              <Grid item xs={2} sm={4} md={4}>
                <Field name="mobile" label="Mobile" component={inputField} />
              </Grid>
              <Grid item xs={2} sm={4} md={4}>
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
              <Grid item xs={2} sm={4} md={4}>
                <Field
                  name="role"
                  label="Role"
                  component={selectField}
                  options={
                    userType?.role === "admin" ? data.adminType : data.HRtype
                  }
                />
              </Grid>
            </Grid>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default UserUpdate;
