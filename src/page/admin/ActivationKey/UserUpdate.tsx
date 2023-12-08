import { Field, FieldArray, Form, Formik } from "formik";
import { useLocation } from "react-router-dom";
import { Box, Divider, Grid } from "@mui/material";
import { inputField, selectField } from "../../../components/FieldType";
import InputAdornment from "@mui/material/InputAdornment";
import { useSelector } from "react-redux";
import { data } from "../../../shared/Config";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";

const UserUpdate = () => {
  const { state } = useLocation();
  console.log(state.data);
  const userType = useSelector((state: any) => state.auth.auth.user);

  const intialValue = {
    education: [{ boardName: "", passingYear: "", marksPercentage: "" }],
  };
  const userUpdate = (value: any) => {
    console.log(value);
  };
  return (
    <div>
      <Formik initialValues={intialValue} onSubmit={userUpdate}>
        {({ handleSubmit, values }) => (
          <Form onSubmit={handleSubmit}>
            <Grid
              container
              spacing={{ xs: 2, md: 2 }}
              columns={{ xs: 4, sm: 8, md: 12 }}
            >
              <Grid item xs={12} sm={4} md={3}>
                <Field
                  name="activationCode"
                  label="Activation Code"
                  component={inputField}
                  disabled
                />
              </Grid>
              <Grid item xs={12} sm={4} md={3}>
                <Field name="name" label="Name" component={inputField} />
              </Grid>
              <Grid item xs={12} sm={4} md={3}>
                <Field
                  name="username"
                  label="Username"
                  component={inputField}
                />
              </Grid>
              <Grid item xs={12} sm={4} md={3}>
                <Field
                  name="email"
                  label="Email"
                  type="email"
                  component={inputField}
                />
              </Grid>
              <Grid item xs={12} sm={4} md={3}>
                <Field name="mobile" label="Mobile" component={inputField} />
              </Grid>
              <Grid item xs={12} sm={4} md={3}>
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
              <Grid item xs={12} sm={4} md={3}>
                <Field
                  name="role"
                  label="Role"
                  component={selectField}
                  options={
                    userType?.role === "admin" ? data.adminType : data.HRtype
                  }
                />
              </Grid>
              <Grid item xs={12} sm={4} md={3}>
                <Field
                  name="password"
                  label="Password"
                  component={inputField}
                  type="password"
                />
              </Grid>
              <Grid item xs={12} sm={4} md={3}>
                <Field name="address" label="Address" component={inputField} />
              </Grid>
              <Grid item xs={12} sm={4} md={3}>
                <Field name="state" label="State" component={inputField} />
              </Grid>
              <Grid item xs={12} sm={4} md={3}>
                <Field
                  name="district"
                  label="District"
                  component={inputField}
                />
              </Grid>
              <Grid item xs={12} sm={4} md={3}>
                <Field name="city" label="City" component={inputField} />
              </Grid>
              <Grid item xs={12} sm={4} md={3}>
                <Field name="pincode" label="Pincode" component={inputField} />
              </Grid>
            </Grid>
            <Divider sx={{ margin: "20px" }}>Education Details</Divider>

            <FieldArray
              name="education"
              render={(arrayHelpers) => (
                <Box sx={{ marginTop: "10px" }}>
                  {values.education &&
                    values.education.length > 0 &&
                    values.education.map((item, index) => (
                      <Grid
                        sm={12}
                        xs={12}
                        key={index}
                        container
                        spacing={{ xs: 2, md: 2 }}
                        columns={{ xs: 4, sm: 8, md: 12 }}
                        sx={{ marginBottom: "15px" }}
                      >
                        <Grid item xs={12} sm={4} md={3}>
                          <Field
                            name={`education.${index}.boardName`}
                            label="Board Name"
                            component={inputField}
                          />
                        </Grid>
                        <Grid item xs={12} sm={4} md={3}>
                          <Field
                            name={`education.${index}.passingYear`}
                            label="Passing Year"
                            component={inputField}
                          />
                        </Grid>
                        <Grid item xs={12} sm={4} md={3}>
                          <Field
                            name={`education.${index}.marksPercentage`}
                            label="Marks (%)"
                            component={inputField}
                          />
                        </Grid>

                        <IconButton
                          aria-label="delete"
                          onClick={() => arrayHelpers.remove(index)}
                          sx={{
                            ":hover": {
                              backgroundColor: "whitesmoke",
                            },
                          }}
                        >
                          <DeleteIcon
                            sx={{
                              fontSize: "30px",
                              margin: "auto",
                              color: "red",
                            }}
                          />
                        </IconButton>
                      </Grid>
                    ))}
                  <Grid xs={12} sm={12}>
                    <Button
                      variant="outlined"
                      startIcon={<AddIcon />}
                      onClick={() =>
                        arrayHelpers.push({
                          boardName: "",
                          passingYear: "",
                          marksPercentage: "",
                        })
                      }
                    >
                      Add More
                    </Button>
                  </Grid>
                </Box>
              )}
            />
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default UserUpdate;
