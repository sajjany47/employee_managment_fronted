import { TextField } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

import { MobileDatePicker } from "@mui/x-date-pickers";

interface MyFormValues {
  field: any;
  form: { touched: any; errors: any };
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
      <TextField {...field} {...props} variant="outlined" className="w-full" />
      {errors[field.name] && touched[field.name] && (
        <small style={{ color: "red" }}>{errors[field.name]}</small>
      )}
    </>
  );
};

export const dateField = ({
  field,
  form: { touched, errors },
  ...props
}: MyFormValues) => {
  return (
    <>
      <LocalizationProvider dateAdapter={AdapterMoment}>
        <MobileDatePicker
          {...field}
          {...props}
          renderInput={(params: any) => <TextField {...params} fullWidth />}
        />
      </LocalizationProvider>
      {errors[field.name] && touched[field.name] && (
        <small style={{ color: "red" }}>{errors[field.name]}</small>
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
      {errors[field.name] && touched[field.name] && (
        <small style={{ color: "red" }}>{errors[field.name]}</small>
      )}
    </>
  );
};
