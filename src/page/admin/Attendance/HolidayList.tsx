import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  FormControl,
  Grid,
  MenuItem,
  Select,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useState } from "react";
import { Field, Form, Formik } from "formik";
import { inputField } from "../../../components/FieldType";

const HolidayList = () => {
  const [id, setId] = useState("2024");
  const [open, setOpen] = useState(false);

  const handleChange = (event: any) => {
    setId(event.target.value);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const initialValue = {};

  const submitLeave = (values: any) => {
    console.log(values);
  };
  return (
    <>
      <div className="flex justify-between">
        <h6>
          <strong>Holiday List</strong>
        </h6>
        <div className="flex justify-between gap-1">
          <FormControl sx={{ minWidth: 150 }} size="small">
            <Select value={id} onChange={handleChange}>
              <MenuItem value={"2024"}>2024</MenuItem>
              <MenuItem value={"2023"}>2023</MenuItem>
              <MenuItem value={"2022"}>2022</MenuItem>
            </Select>
          </FormControl>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            sx={{ minWidth: 150 }}
            size="small"
            onClick={handleClickOpen}
          >
            Add
          </Button>
        </div>
      </div>

      {/* <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl m-5"> */}
      <div className="max-w-md  bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl m-3">
        <div className="p-4 flex items-center">
          <div className="pr-4 bg-blue-500 p-2 rounded-lg text-center">
            <p className="text-4xl font-bold text-white">18th</p>
            <p className="text-sm text-white">November, 2023</p>
          </div>
          <div className="ml-4">
            <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">
              9:20 AM - 9:40 AM
            </div>
            <p className="mt-2 text-gray-500">Event Details...</p>
          </div>
        </div>
      </div>

      <div className="max-w-md  bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl m-3">
        <div className="p-4 flex items-center">
          <div className="pr-4 bg-blue-200 p-2 rounded-lg text-center">
            <p className="text-4xl font-bold text-white">18th</p>
            <p className="text-sm text-white">November, 2023</p>
          </div>
          <div className="ml-4">
            <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">
              Clinic Appointment
            </div>
            <p className="mt-2 text-gray-500">9:20 AM - 9:40 AM</p>
          </div>
        </div>
      </div>
      {/* </div> */}

      <Dialog
        // fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">
          <strong>Add Holiday</strong>
        </DialogTitle>
        <DialogContent>
          <Formik initialValues={initialValue} onSubmit={submitLeave}>
            {({ handleSubmit }) => (
              <Form onSubmit={handleSubmit} className="mt-3">
                <Grid
                  container
                  spacing={{ xs: 2, md: 2 }}
                  columns={{ xs: 4, sm: 8, md: 12 }}
                >
                  <Grid item xs={2} sm={4} md={6}>
                    <Field
                      name="yearOfHoliday"
                      label="Year"
                      component={inputField}
                    />
                  </Grid>
                  <Grid item xs={2} sm={4} md={6}>
                    <Field
                      name="dateOfHoliday"
                      label="Holiday Date"
                      component={inputField}
                    />
                  </Grid>

                  <Grid item xs={2} sm={4} md={12}>
                    <Field
                      name="reason"
                      label="Reason"
                      component={inputField}
                      multiline
                      rows={1}
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

export default HolidayList;
