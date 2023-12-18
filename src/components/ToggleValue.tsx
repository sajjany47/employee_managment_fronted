import { Switch } from "@mui/material";
import { ChangeEvent } from "react";

const ToggleValue = (props: any) => {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    console.log(event);
  };
  return <Switch checked={props.value} onChange={handleChange} />;
};

export default ToggleValue;
