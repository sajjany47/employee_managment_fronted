import { TextField } from "@mui/material";

interface MyFormValues {
  field: any;
  form: { touched: any; errors: any };
  props: any;
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
