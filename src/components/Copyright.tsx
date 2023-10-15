import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";

const Copyright = () => {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      sx={{ mt: 8, mb: 4 }}
    >
      {"Copyright © "}
      <Link color="inherit" to="">
        www.Grow2Tech.com
      </Link>{" "}
      2023 - {new Date().getFullYear()}
      {"."}
    </Typography>
  );
};

export default Copyright;
