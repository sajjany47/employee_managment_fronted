import { Button, Grid } from "@mui/material";
import { Form, Formik } from "formik";
import { InputField, SelectField } from "./DynamicField";
import { ConfigData } from "../shared/ConfigData";
import { EmployeeServices } from "../page/admin/EmployeeList/EmployeeServices";
import { enqueueSnackbar } from "notistack";
import { useEffect, useState } from "react";

const Search = (props: any) => {
  const data = props?.value;
  const employeeServices = new EmployeeServices();
  const [countryData, setCountryData] = useState([]);
  const [stateData, setStateData] = useState([]);

  useEffect(() => {
    getAllCountryList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const handelCountry = (setFieldValue: any, e: any) => {
    setFieldValue("country", e.target.value, true);
    getAllStateByCountry(e.target.value);
  };

  const getAllStateByCountry = (country: any) => {
    employeeServices
      .getStateByCountry(country)
      .then((res) => {
        setStateData(
          res.map((item: any) => ({ label: item.name, value: item.iso2 }))
        );
      })
      .catch((err) =>
        enqueueSnackbar(err.response.data.message, { variant: "error" })
      );
  };

  const getAllCountryList = () => {
    employeeServices
      .getAllCountry()
      .then((res) => {
        setCountryData(
          res.map((item: any) => ({ label: item.name, value: item.iso2 }))
        );
      })
      .catch((err) =>
        enqueueSnackbar(err.response.data.message, { variant: "error" })
      );
  };
  const handelSearch = (values: any) => {
    console.log(values);
  };

  return (
    <div>
      <Formik onSubmit={handelSearch} initialValues={{ ...data }}>
        {({ handleSubmit, setFieldValue }) => (
          <Form onSubmit={handleSubmit}>
            <Grid
              container
              spacing={{ xs: 2, md: 2 }}
              columns={{ xs: 4, sm: 8, md: 12 }}
            >
              {data?.activationCode && (
                <Grid item xs={6} sm={3} md={3}>
                  <InputField name="activationCode" label="Activation Code" />
                </Grid>
              )}
              {data?.name && (
                <Grid item xs={6} sm={3} md={3}>
                  <InputField name="name" label="Name" />
                </Grid>
              )}

              {data?.username && (
                <Grid item xs={6} sm={3} md={3}>
                  <InputField name="username" label="Username" />
                </Grid>
              )}

              {data?.email && (
                <Grid item xs={6} sm={3} md={3}>
                  <InputField name="email" label="Email" type="email" />
                </Grid>
              )}

              {data?.mobile && (
                <Grid item xs={6} sm={3} md={3}>
                  <InputField name="mobile" label="Mobile" />
                </Grid>
              )}

              {data?.position && (
                <Grid item xs={6} sm={3} md={3}>
                  <InputField name="position" label="Position" />
                </Grid>
              )}

              {data?.role && (
                <Grid item xs={6} sm={4} md={3}>
                  <SelectField
                    name="role"
                    label="Role"
                    options={ConfigData.adminType}
                  />
                </Grid>
              )}

              {data?.country && (
                <Grid item xs={6} sm={4} md={3}>
                  <SelectField
                    name="country"
                    label="Country"
                    options={countryData}
                    onChange={(e: any) => handelCountry(setFieldValue, e)}
                  />
                </Grid>
              )}

              {data?.state && (
                <Grid item xs={6} sm={4} md={3}>
                  <SelectField
                    name="state"
                    label="State"
                    options={stateData}
                    onChange={(e: any) =>
                      setFieldValue("state", e.target.value)
                    }
                  />
                </Grid>
              )}

              {data?.pincode && (
                <Grid item xs={6} sm={4} md={3}>
                  <InputField name="pincode" label="Pincode" />
                </Grid>
              )}

              {data?.activeStatus && (
                <Grid item xs={6} sm={4} md={3}>
                  <SelectField
                    name="activeStatus"
                    label="Active"
                    options={ConfigData.activeStatus}
                  />
                </Grid>
              )}

              {data?.registrationStatus && (
                <Grid item xs={6} sm={4} md={3}>
                  <SelectField
                    name="registrationStatus"
                    label="Status"
                    options={ConfigData.registrationStatus}
                  />
                </Grid>
              )}
              {data && Object.keys(data).length > 0 && (
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
                    //   onClick={handleClose}
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
              )}
            </Grid>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Search;
