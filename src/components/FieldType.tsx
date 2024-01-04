import { TextField } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { getIn } from "formik";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import moment from "moment";

interface MyFormValues {
  field: any;
  form: { touched: any; errors: any; setFieldValue: any };
  label: string;
  views: [];
}

interface SelectProps {
  field: any;
  form: { touched: any; errors: any };
  //   props: { label: string; options: any[] };
  options: any[];
  label: string;
}

export const inputField = ({
  field,
  form: { touched, errors },
  ...props
}: MyFormValues) => {
  return (
    <>
      <TextField
        {...field}
        {...props}
        variant="outlined"
        className="w-full"
        error={
          Boolean(getIn(errors, field.name)) && getIn(touched, field.name)
            ? true
            : false
        }
      />
      {/* {errors[field.name] && touched[field.name] && (
        <small style={{ color: "red" }}>{errors[field.name]}</small>
      )} */}
      {Boolean(getIn(errors, field.name)) && getIn(touched, field.name) && (
        <small className="text-red-600">{getIn(errors, field.name)}</small>
      )}
    </>
  );
};

export const selectField = ({
  field,
  form: { touched, errors },
  ...props
}: SelectProps) => {
  return (
    <>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">{props.label}</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          {...field}
          {...props}
          className="w-full"
          error={
            Boolean(getIn(errors, field.name)) && getIn(touched, field.name)
              ? true
              : false
          }
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
      {Boolean(getIn(errors, field.name)) && getIn(touched, field.name) && (
        <small className="text-red-600">{getIn(errors, field.name)}</small>
      )}
    </>
  );
};

export const dateField = ({
  field,
  form: { touched, errors, setFieldValue },
  ...props
}: MyFormValues) => {
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
      {Boolean(getIn(errors, field.name)) && getIn(touched, field.name) && (
        <small className="text-red-600">{getIn(errors, field.name)}</small>
      )}
    </>
  );
};
