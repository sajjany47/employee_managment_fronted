import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { getIn, useField, useFormikContext } from "formik";
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
        size="medium"
        {...field}
        {...props}
        value={field.value !== null ? field.value : ""}
        variant="outlined"
        className="w-full"
        // helperText={meta.touched ? meta.error : ""}
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
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">{props.label}</InputLabel>
        <Select
          // id={field.name}
          size="medium"
          labelId="demo-simple-select-label"
          {...field}
          {...props}
          value={field.value !== null ? field.value : ""}
          className="w-full"
          // helperText={meta.touched ? meta.error : ""}
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
      </FormControl>
      {/* {meta.touched && meta.error ? (
        <div className="error">{meta.error}</div>
      ) : null} */}
    </>
  );
};

export const DateField = (props: any) => {
  const [field, meta] = useField(props);
  const { setFieldValue } = useFormikContext();
  return (
    <>
      <LocalizationProvider dateAdapter={AdapterMoment}>
        <DemoContainer components={["DatePicker"]} sx={{ padding: 0 }}>
          <DatePicker
            label={props.label}
            // views={["year", "month", "day"]}
            value={field.value !== null ? moment.utc(field.value) : ""}
            views={props.views}
            onChange={(e: any) => setFieldValue(field.name, moment(e))}
            slotProps={{
              textField: {
                size: "medium",
                error:
                  getIn(meta.error, field.name) &&
                  getIn(meta.touched, field.name)
                    ? true
                    : false,
              },
            }}
          />
        </DemoContainer>
      </LocalizationProvider>

      {/* {meta.touched && meta.error ? (
        <div className="error">{meta.error}</div>
      ) : null} */}
    </>
  );
};
