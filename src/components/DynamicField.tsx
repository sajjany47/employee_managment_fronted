import { InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { useField, useFormikContext } from "formik";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import moment from "moment";

export const InputField = (props: any) => {
  const [field, meta] = useField(props);

  return (
    <>
      <TextField
        id={field.name}
        {...field}
        {...props}
        variant="outlined"
        className="w-full"
        helperText={meta.touched ? meta.error : ""}
        error={meta.touched && Boolean(meta.error)}
      />

      {/* {meta.touched && meta.error ? (
        <div className="error">{meta.error}</div>
      ) : null} */}
    </>
  );
};

export const SelectField = (props: any) => {
  const [field, meta] = useField(props);

  return (
    <>
      <InputLabel id="demo-simple-select-label">{props.label}</InputLabel>
      <Select
        id={field.name}
        labelId="demo-simple-select-label"
        {...field}
        {...props}
        className="w-full"
        helperText={meta.touched ? meta.error : ""}
        error={meta.touched && Boolean(meta.error)}
      >
        {props.options.map((item: any, index: any) => {
          return (
            <MenuItem value={item.value} key={index}>
              {item.label}
            </MenuItem>
          );
        })}
      </Select>

      {/* {meta.touched && meta.error ? (
        <div className="error">{meta.error}</div>
      ) : null} */}
    </>
  );
};

export const DateField = (props: any) => {
  const [field] = useField(props);
  const { setFieldValue } = useFormikContext();
  return (
    <>
      <LocalizationProvider dateAdapter={AdapterMoment}>
        <DemoContainer components={["DatePicker"]}>
          <DatePicker
            label={props.label}
            // views={["year", "month", "day"]}
            value={field.value ? moment.utc(field.value) : null}
            views={props.views}
            onChange={(e: any) => setFieldValue(field.name, moment(e))}
          />
        </DemoContainer>
      </LocalizationProvider>

      {/* {meta.touched && meta.error ? (
        <div className="error">{meta.error}</div>
      ) : null} */}
    </>
  );
};
